import './FrameView.css';
import { Button } from "@aws-amplify/ui-react";
import React from 'react'
import { Amplify, API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export function GetLatestImage () {
  async function buttonOnClick () {
    console.log("Get latest image from Explore");
    const apiName = 'bcExploreApi';
    const path = '/explore/latest';
    const myInit = { // OPTIONAL
        body: {"feed": "brown-bear-salmon-cam-brooks-falls"}, // replace this with attributes you need
        headers: {
          'Content-Type': 'application/json'
        } // OPTIONAL
    };

    await API.post(apiName, path, myInit);
    console.log("Posted new image");
  }

  return(
    <Button
    children="Get Latest from Explore"
    onClick={() => {
      buttonOnClick();
    }}
    ></Button>
  )
}

export default GetLatestImage;
