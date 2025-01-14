import './FrameView.css';
import { Button } from "@aws-amplify/ui-react";
import React from 'react'
import { API } from 'aws-amplify';
//import awsconfig from './aws-exports';

//Amplify.configure(awsconfig);

/**********************
 * Feeds:
 * BF = brown-bear-salmon-cam-brooks-falls
 * RF = brown-bear-salmon-cam-the-riffles
 * BFL = brooks-falls-brown-bears-low
 * KRV = brown-bear-salmon-cam-lower-river
 * RW = river-watch-brown-bear-salmon-cams
 **********************/
function decodeFeed (feedCode) {
  var feed = "brown-bear-salmon-cam-brooks-falls";
  switch (feedCode) {
    case "RF":
      feed = 'brown-bear-salmon-cam-the-riffles';
      break;
    case "BFL":
      feed = 'brooks-falls-brown-bears-low';
      break;
    case "KRV":
      feed = 'brown-bear-salmon-cam-lower-river';
      break;
    case "RW":
      feed = 'river-watch-brown-bear-salmon-cams';
      break;
    default:
      feed = "brown-bear-salmon-cam-brooks-falls";
  }
  return (feed);
}

export function GetLatestImage ({feed}) {
  async function buttonOnClick () {
    console.log("Get latest" + feed + "image");
    const apiName = 'bcExploreApi';
    const path = '/explore/latest';
    const myInit = { // OPTIONAL
        body: {"feed": decodeFeed(feed)}, // replace this with attributes you need
        headers: {
          'Content-Type': 'application/json'
        } // OPTIONAL
    };

    await API.post(apiName, path, myInit);
    console.log("Posted new image");
  }

  return(
    <Button
    children={"Get latest " + feed + " image"}
    onClick={() => {
      buttonOnClick();
    }}
    ></Button>
  )
}

export default GetLatestImage;
