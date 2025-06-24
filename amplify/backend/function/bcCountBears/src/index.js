/* Amplify Params - DO NOT EDIT
	API_BEARCAMCOMPANION_GRAPHQLAPIENDPOINTOUTPUT
	API_BEARCAMCOMPANION_GRAPHQLAPIIDOUTPUT
	API_BEARCAMCOMPANION_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { default: fetch, Request } = require("node-fetch");

const GRAPHQL_ENDPOINT = process.env.API_BEARCAMCOMPANION_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_BEARCAMCOMPANION_GRAPHQLAPIKEYOUTPUT;

const query = /* GraphQL */ `
  query LIST_IMAGES($nextToken: String) {
    listImages(
      limit: 10000
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

function groupIdents(list, key) {
  return list.reduce(function(rv, x) {
    //(rv[x[key]] = rv[x[key]] || []).push(x);
    rv[x[key]] = rv[x[key]] ? ++rv[x[key]] : 1;
    return rv;
  }, {});
};

getIdForObject = async (objectsID) => {
  try {
      // get identification
      const query = /* GraphQL */ `
        query LIST_IDENTIFICATIONS($objectsID: ID) {
          listIdentifications(
            limit: 10000
            filter: { objectsID: { eq: $objectsID } }
          ) {
            items {
              id
              name
            }
          }
        }
      `;
      const options = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables: { objectsID: objectsID } })
      };
      //console.log(options)
          
      const request = new Request(GRAPHQL_ENDPOINT, options);

      response = await fetch(request);
      body = await response.json();

      //console.log("body:", body);
      var idents = body.data.listIdentifications.items;
      //console.log("ident count:", idents.length);

      if (idents.length) {
        const gIdents = groupIdents(idents,"name");
        const pairIdents = Object.entries(gIdents).sort((a,b) => b[1]-a[1]);
        //console.log("Ident:", pairIdents[0][0]);
        bearID = pairIdents[0][0];
      } else {
        bearID = "Unknown"
      }
  } catch (error) {
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    };
  }
  return bearID;

}

updateImageInfo = async (image, bearCount, bearList) => {
  try {
    const query = /* GraphQL */ `
    mutation UPDATE_IMAGES($input: UpdateImagesInput!) {
      updateImages(input: $input) {
        id
        url
        date
        camFeed
        bearCount
        bearList
        file{
          bucket
          region
          key
        }
        _version
        createdAt
        updatedAt
        _lastChangedAt
     }
    }`;
  
    const variables = {
      input: {
        id: image.id,
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

    //console.log("Image: ", image)
        
    const request = new Request(GRAPHQL_ENDPOINT, options);
    
    response = await fetch(request);
    body = await response.json();
    //console.log("body",body)
  } catch (error) {
    console.log("ERROR:", error);
  }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  //console.log("Query:", query)

  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables: { next: "" } })
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);
  let statusCode = 200;
  let body;
  let response;

  //console.log("Options:", options)

  try {
    // Get all image ids
    response = await fetch(request);
    body = await response.json();
    //console.log("body:", body);
    var items = body.data.listImages.items;
    console.log("image count:", items.length);
    //console.log("items:", items);
    var nextToken = body.data.listImages.nextToken;
    //console.log("nextToken:", nextToken);
    while (nextToken)
    {
      const options2 = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables: { nextToken: nextToken } })
      };
    
      const request = new Request(GRAPHQL_ENDPOINT, options2);

      response = await fetch(request);
      body = await response.json();
      //console.log("body:", body);
      const newItems = body.data.listImages.items;
      items = items.concat(newItems);
      //items = [.items, .newItems);
      console.log("image count:", items.length);
      //console.log("items:", items);
      nextToken = body.data.listImages.nextToken;
      //console.log("nextToken:", nextToken);
    }
    if (body.errors) statusCode = 400;
    // loop through images
    imageCount = 1
    for (item of items) {
      console.log("Image #", imageCount);
      imageCount = imageCount + 1;
      console.log("ID", item.id);
      // get objects
      const query = /* GraphQL */ `
        query LIST_OBJECTS($imagesID: ID) {
          listObjects(
            limit: 10000
            filter: { imagesID: { eq: $imagesID } }
          ) {
            items {
              id
              label
            }
          }
        }
      `;
      const options = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables: { imagesID: item.id } })
      };
      //console.log(options)
          
      const request = new Request(GRAPHQL_ENDPOINT, options);

      response = await fetch(request);
      body = await response.json();

      //console.log("objects:", body);
      var objects = body.data.listObjects.items;
      //console.log("object count:", objects.length);

      // get identifications
      bearCount = 0
      bearList = ""
      for (object of objects) {
        // count bears
        if (object.label === 'Bear') {
          //console.log("ObjID", object.id)
          bearCount += 1
          // list bears
          const newBear = await getIdForObject(object.id);
          bearList = bearList + newBear + ','
        }
      }
      if (bearList) {
        bearList = bearList.substring(0,bearList.length-1);
      }
      console.log("bearCount", bearCount)
      console.log("bearList", bearList)

      // update images with bear count and list
      await updateImageInfo(item, bearCount, bearList)
    }
  } catch (error) {
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    };
  }

  return {
    statusCode,
    //body: JSON.stringify(body)
    body: body
  };
};