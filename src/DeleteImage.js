import './FrameView.css';
import { Button } from "@aws-amplify/ui-react";
import React from 'react'
import { Amplify } from 'aws-amplify';
import { DataStore } from "aws-amplify";
import { Objects, Images } from "./models";
import { useNavigate } from "react-router-dom";
import awsconfig from './aws-exports';

//Amplify.configure(awsconfig);

export function DeleteImage ({imageID}) {
  const navigate = useNavigate();
  async function buttonOnClick () {
    console.log("Delete this Image and all it's Objects");
    console.log("Get boxes for image:", imageID)
    var boxes = await DataStore.query(Objects, c => c.imagesID("eq", imageID));
    if (boxes.length > 0) {
      console.log("Got", boxes.length, "boxes");
      for (let i in boxes) {
        console.log("Delete box:", boxes[i].id);
        const todelete = await DataStore.query(Objects, boxes[i].id);
        await DataStore.delete(todelete);
        console.log("Box deleted:", boxes[i].id)
      }
    } else {
      console.log("No boxes found")
    }
    console.log("Delete Image:", imageID)
    const todelete = await DataStore.query(Images, imageID);
    await DataStore.delete(todelete);
    console.log("Image Deleted:", imageID);
    console.log("Go back to /");
    //await DataStore.clear();
    //await DataStore.start();
    navigate(-1);
  }

  return(
    <Button
    children="Delete Image"
    onClick={() => {
      buttonOnClick();
    }}
    ></Button>
  )
}

export default DeleteImage;
