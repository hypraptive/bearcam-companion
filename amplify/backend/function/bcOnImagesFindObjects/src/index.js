/* Amplify Params - DO NOT EDIT
	API_BEARCAMCOMPANION_GRAPHQLAPIENDPOINTOUTPUT
	API_BEARCAMCOMPANION_GRAPHQLAPIIDOUTPUT
	API_BEARCAMCOMPANION_GRAPHQLAPIKEYOUTPUT
	API_BEARCAMCOMPANION_IMAGESTABLE_ARN
	API_BEARCAMCOMPANION_IMAGESTABLE_NAME
	API_BEARCAMCOMPANION_OBJECTSTABLE_ARN
	API_BEARCAMCOMPANION_OBJECTSTABLE_NAME
	ENV
	REGION
	STORAGE_S3BEARCAMCOMPANIONSTORAGECB0D4917_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// Load the SDK
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const rekognition = new AWS.Rekognition();
const fetch = require('node-fetch'); // use node-fetch@2

const environment = process.env.ENV;
const GRAPHQL_ENDPOINT = process.env.API_BEARCAMCOMPANION_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_BEARCAMCOMPANION_GRAPHQLAPIKEYOUTPUT;
const objectsTableName = process.env.API_BEARCAMCOMPANION_OBJECTSTABLE_NAME;

const MinimumConfidence = 50.0
const query = /* GraphQL */ `
  mutation CREATE_OBJECTS($input: CreateObjectsInput!) {
    createObjects(input: $input) {
      id
      label
    	confidence
    	width
    	height
    	left
    	top
    	imagesID
    	_version
      createdAt
      updatedAt
      _lastChangedAt
    }
  }
`;

function parseRecords (records) {
  var inserts = [];
  records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    if (record.eventName === "INSERT")
    {
      // get image info
      const imageS3obj = record.dynamodb.NewImage.file.M
      const insert = {
        imageID: record.dynamodb.NewImage.id.S,
        Bucket: imageS3obj.bucket.S,
        Region: imageS3obj.region.S,
        Key: "public/" + imageS3obj.key.S
      }
      console.log(insert);
      inserts.push(insert);
    }
  });
  return (inserts);
}

async function processImage(imageInfo) {
  const params = {
    Image: {
      S3Object: {
        Bucket: imageInfo.Bucket,
        Name: imageInfo.Key
      },
    },
    MinConfidence: MinimumConfidence
  }
  return await rekognition.detectLabels(params).promise();
}

function parseDetections(detections) {
  var boxes = [];
  const labels = detections.Labels;
  labels.forEach(object => {
    object.Instances.forEach(instance => {
      //console.log("Label", object.Name)
      //console.log("Confidence", instance.Confidence)
      //console.log("Box", instance.BoundingBox)
      var bb = instance.BoundingBox;
      const box = {
        Name: object.Name,
        Confidence: instance.Confidence,
        Width: bb.Width,
        Height: bb.Height,
        Left: bb.Left,
        Top: bb.Top
      }
      boxes.push(box);
    })
  })
  return (boxes);
}

function getFetchOptions (box, imageID) {
  const variables = {
    input: {
      label: box.Name,
      confidence: box.Confidence,
      width: box.Width,
      height: box.Height,
      left: box.Left,
      top: box.Top,
      imagesID: imageID
    }
  };
  console.log(variables)

  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY
    },
    body: JSON.stringify({ query, variables })
  };

  return(options)
}

updateImageInfo = async (imagesID, bearCount, bearList) => {
  try {
    const query = /* GraphQL */ `
    mutation UPDATE_IMAGES($input: UpdateImagesInput!) {
      updateImages(input: $input) {
        id
        bearCount
        bearList
      }
    }`;
  
    const variables = {
      input: {
        id: imagesID,
        bearCount: bearCount,
        bearList: bearList
      }
    };

    const options = {
      method: 'POST',
      headers: {
        'x-api-key': GRAPHQL_API_KEY
      },
      body: JSON.stringify({ query, variables })
    };
            
    response = await fetch(GRAPHQL_ENDPOINT, options);
    body = await response.json();
    //console.log("body",body)
  } catch (error) {
    console.log("ERROR:", error);
  }
}

exports.handler = async function(event, context, callback) {
  try { // Parse DynamoDB Images Records
    console.log("Parsing DynamoDB Images Records");
    const inserts = parseRecords(event.Records);
    for (insert of inserts) {
      var bearCount = 0;
      var bearList = ""
      // Call Rekognition on every new image
      console.log("Sending image to Rekognition", insert.Key)
      let detections = await processImage(insert);
      const boxes = parseDetections(detections);
      for (box of boxes) {
        // Save Bear bounding box to Objects, skip non-bears
        if (box.Name === "Bear") {
          console.log("Saving Bear box to Objects for Image", insert.imageID);
          bearCount += 1
          bearList = bearList + "Unknown,"
          const options = getFetchOptions(box, insert.imageID);
          console.log(options);
          response = await fetch(GRAPHQL_ENDPOINT, options);
          console.log(response)
          body = await response.json();
          if (body.errors) {
            console.log("GraphQL error", body);
          } else {
            console.log("GraphQL success")
          }
        } else {
          console.log("Skipping non-bear for Image", insert.imageID);
        }
      }
      if (bearList) {
        bearList = bearList.substring(0,bearList.length-1);
      }

      // Update bear count for image
      await updateImageInfo(insert.imageID, bearCount, bearList)
    }
  } catch (err) {
    callback(err.message);
  }

  return { status: "complete" };
}
