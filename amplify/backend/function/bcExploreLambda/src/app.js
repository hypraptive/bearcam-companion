/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_BEARCAMCOMPANION_GRAPHQLAPIENDPOINTOUTPUT
	API_BEARCAMCOMPANION_GRAPHQLAPIIDOUTPUT
	API_BEARCAMCOMPANION_GRAPHQLAPIKEYOUTPUT
	API_BEARCAMCOMPANION_IMAGESTABLE_ARN
	API_BEARCAMCOMPANION_IMAGESTABLE_NAME
	ENV
	REGION
	STORAGE_S3BEARCAMCOMPANIONSTORAGECB0D4917_BUCKETNAME
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3();
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const axios = require('axios');
const path = require('path');

const bucketName = process.env.STORAGE_S3BEARCAMCOMPANIONSTORAGECB0D4917_BUCKETNAME;
const GRAPHQL_ENDPOINT = process.env.API_BEARCAMCOMPANION_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_BEARCAMCOMPANION_GRAPHQLAPIKEYOUTPUT;

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// Explore API
//https://omega.explore.org/api/snapshots/query?created_before=2022-07-30T02%3A27%3A26.308Z&feed=brown-bear-salmon-cam-brooks-falls&order=desc&orderBy=created_at&page=1&page_size=32

  // https://omega.explore.org/api/snapshots/query?
  //   created_before=2022-07-30T02%3A27%3A26.308Z
  //   &feed=brown-bear-salmon-cam-brooks-falls
  //   &order=desc
  //   &orderBy=created_at
  //   &page=1
  //   &page_size=32

// Brooks Falls Feeds:
// brown-bear-salmon-cam-brooks-falls
// brooks-falls-brown-bears-low
// brown-bear-salmon-cam-the-riffles
// brown-bear-salmon-cam-lower-river
// river-watch-brown-bear-salmon-cams

// title: 'Brooks Falls Brown Bears',
// caption: 'BF',
// thumbnail: 'https://files.explore.org/sn/1970/8/23/20220730T042629_26892.ts_thumbnail.jpg',
// snapshot: 'https://files.explore.org/sn/1970/8/23/20220730T042629_26892.ts.jpg',
// num_favorites: 0,
// username: 'Owl_and_Osprey_Lover_CA2017',
// user_id: 179023,
// uuid: 'b07250d9-66cb-4eef-bd2f-2653f8174cfd',
// display_name: 'Owl&Osprey<3🏳️‍🌈',
// avatar_uri: 'https://files.explore.org/avatars/c7c25c45e9ce979fecd9b44987cf2383.jpeg',
// timezone: 'America/Anchorage',
// timestamp: 1659155189,
// local_time: '2022-07-29T20:26:29-08:00',
// created_at: '2022-07-29T21:27:16-07:00',
// livecam_id: 25,
// youtube_id: null,
// youtube_delta: null,
// average_rating: null

const exploreURL = 'https://omega.explore.org/api/snapshots/';
const exploreOption = '&order=desc&orderBy=created_at&page=1';

// Helper Functions

// Download an image fror URL
async function downloadImage (fileUrl) {
  var imageData = [];
  try {
    const resp = await axios.get(fileUrl, {
      decompress: false,
      responseType: 'arraybuffer',
    })
    imageData = resp.data;
  } catch (err) {
    throw new Error(err);
  }
  return (imageData);
}

async function uploadImageS3Public (fileName, imageData) {
  const params = {
    Bucket: bucketName,
    Key: "public/" + fileName,
    Body: imageData,
  };

  try {
    const stored = await s3.upload(params).promise()
    console.log("Stored", stored);
  } catch (err) {
    console.log(err)
  }
}

async function createImageEntry (fileUrl, createdDate, feedCode) {
  const fileName = path.basename(fileUrl);
  try {
    const resp = await axios.post(GRAPHQL_ENDPOINT,
      {
        query: `
          mutation CREATE_IMAGES($input: CreateImagesInput!) {
            createImages(input: $input) {
              id
              url
              date
              camFeed
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
          }
        `,
        variables: {
          input: {
            url: fileUrl,
            date: createdDate,
            camFeed: feedCode,
            file: {
              bucket: bucketName,
              region: process.env.AWS_REGION,
              key: fileName
            }
          }
        }
      },
      {
        headers: {
          'x-api-key': GRAPHQL_API_KEY
        }
      }
    )
  } catch (err) {
    throw new Error(err);
  }
}

/**********************
 * Feeds:
 * BF = brown-bear-salmon-cam-brooks-falls
 * RF = brown-bear-salmon-cam-the-riffles
 * BFL = brooks-falls-brown-bears-low
 * KRV = brown-bear-salmon-cam-lower-river
 * RW = river-watch-brown-bear-salmon-cams
 **********************/
function codeFeed (feed) {
  var feedCode = "BF";
  switch (feed) {
    case 'brown-bear-salmon-cam-the-riffles':
      feedCode = "RF";
      break;
    case 'brooks-falls-brown-bears-low':
      feedCode = "BFL";
      break;
    case 'brown-bear-salmon-cam-lower-river':
      feedCode = "KRV";
      break;
    case 'river-watch-brown-bear-salmon-cams':
      feedCode = "RW";
      break;
    default:
      feedCode = "BF";
  }
  return (feedCode);
}

/**********************
 * GET /explore/list?limit=<limit>&feed=<feed>
 *
 * Get a list of <limit> images from <feed>
 * Example URL: /explore/list?limit=4&feed=brown-bear-salmon-cam-brooks-falls
 **********************/
app.get('/explore/list', async (request, response) => {
  console.log("Request URL:", request.url)
  console.log("Request Query:", request.query)
  var respData = {};
  var limit = 1;
  if ("limit" in request.query) {
    limit = request.query.limit;
  }
  var feed = 'brown-bear-salmon-cam-brooks-falls';
  if ("feed" in request.query) {
    feed = request.query.feed;
  }
  const exUrl = exploreURL + 'query?feed=' + feed + exploreOption + '&page_size=' + limit;
  console.log("URL:", exUrl)
  try {
    const axRes = await axios(exUrl);
    console.log("Result count", axRes.data.data.length)
    respData = axRes.data;
    console.log("thumbnail:", respData.data[0].thumbnail)
    console.log("snapshot:", respData.data[0].snapshot)
    console.log("created_at:", respData.data[0].created_at)
  } catch (err) {
    console.log(err);
    throw err;
  }

  //response.json({success: 'get call succeed!', url: request.url});
  response.json(respData);
});

/**********************
 * POST /explore/latest
 *
 * Get a the latest image from <feed>, store it to S3 bucket and
 * add details to Images table.
 * 
 * Feeds:
 * BF = brown-bear-salmon-cam-brooks-falls
 * RF = brown-bear-salmon-cam-the-riffles
 * BFL = brooks-falls-brown-bears-low
 * KRV = brown-bear-salmon-cam-lower-river
 * RW = river-watch-brown-bear-salmon-cams
 * 
 * BF =Brooks Falls, BFL = Brooks Falls Low, RF = Riffles, RW = River Watch, KRV = Kat’s River View
 **********************/
 app.post('/explore/latest', async (request, response) => {
   console.log("Request URL:", request.url)
   console.log("Request Body:", request.body)
   var respData = {};

   // Get latest image from <feed>
   var limit = 1;
   var feed = 'brown-bear-salmon-cam-brooks-falls';
   if ("feed" in request.body) {
     feed = request.body.feed;
   }
   const exUrl = exploreURL + 'query?feed=' + feed + exploreOption + '&page_size=' + limit;
   console.log("URL:", exUrl)
   try {
     const axRes = await axios(exUrl);
     console.log("Result count", axRes.data.data.length)
     respData = axRes.data;
     console.log("thumbnail:", respData.data[0].thumbnail)
     fileUrl = respData.data[0].snapshot
     console.log("snapshot:", fileUrl)
     createdDate = respData.data[0].created_at
     console.log("created_at:", createdDate)
   } catch (err) {
     console.log(err);
     throw err;
   }

   var date = new Date();
   //data from database
   console.log("current date: " + date)

   const TEN_MIN = 10 * 60 * 1000;

   if ((date - new Date(createdDate)) < TEN_MIN) {
     console.log('Image is less than 10 mins old');

     // Download image
     const imageData = await downloadImage(fileUrl);
     console.log('Successfully downloaded file of size', imageData.length);

     // Upload image to S3
     const fileName = path.basename(fileUrl);
     await uploadImageS3Public(fileName, imageData);
     console.log("Uploaded file to S3:", fileName);

     // Add image to Images table
     await createImageEntry(fileUrl, createdDate, codeFeed(feed));
     console.log('Created Image Entry for', fileName);
    } else {
      console.log('No new images');
  }
  response.json({success: 'post call succeed!', url: request.url, body: request.body})
});

 /**********************
  * POST /explore/upload
  *
  * Get an image from <url>, store it to S3 bucket and
  * add <url>, <date> and S3 file object to Images table.
  **********************/
  app.post('/explore/upload', async (request, response) => {
    console.log("Request URL:", request.url)
    console.log("Request Body:", request.body)
    var respData = {};

    var fileUrl = '';
    var createdDate = '';

    if ("url" in request.body) {
      fileUrl = request.body.url;
      console.log("url:", fileUrl);
    }
    if ("date" in request.body) {
      createdDate = request.body.date;
      console.log("date:", createdDate);
    }

    // Download image
    const imageData = await downloadImage(fileUrl);
    console.log('Successfully downloaded file of size', imageData.length);

    // Upload image to S3
    const fileName = path.basename(fileUrl);
    await uploadImageS3Public (fileName, imageData);
    console.log("Uploaded file to S3:", fileName);

    // Add image to Images table
    await createImageEntry (fileUrl, createdDate, "BF");
    console.log('Created Image Entry for', fileName);

    response.json({success: 'post call succeed!', url: request.url, body: request.body})
    //response.json(respData);
  });


/**********************
 * Example get method *
 **********************/

 app.get('/*', function(req, res) {
   // Add your code here
   res.json({success: 'get call succeed!', url: req.url});
 });

 app.get('/explore', function(req, res) {
   // Add your code here
   res.json({success: 'get call succeed!', url: req.url});
 });

 app.get('/explore/*', function(req, res) {
   // Add your code here
   res.json({success: 'get call succeed!', url: req.url});
 });

/****************************
* Example post method *
****************************/

app.post('/explore', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/explore/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/explore', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/explore/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/explore', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/explore/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
