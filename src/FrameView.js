import './FrameView.css';
import { useState, useEffect, useRef } from 'react'
import { Flex } from '@aws-amplify/ui-react';
import Boxes from './Boxes';
import React from 'react'
import { FrameCollection } from './ui-components'
import { DataStore } from "aws-amplify";
import { Objects } from "./models";
//import Boxes from './Boxes';

// async function updateImageWithSelected(item) {
//   imageID = item.id
//   document.getElementById("refImage").src = item.url
//   try {
//     const boxes = await DataStore.query(Objects, c => c.imagesID("eq", imageID));
//     console.log("Boxes retrieved successfully!", JSON.stringify(boxes, null, 2));
//     //console.log("BOX:", JSON.stringify(boxes[0], null, 2));
//     boxList = boxes;
//     // for (let i = 0; i < boxes.length; i++) {
//     //   //console.log("BOX:", JSON.stringify(boxes[i], null, 2));
//     //   ctx.strokeStyle = colors[i % colors.length]
//     //   ctx.lineWidth = 5
//     //   // x, y, width, height
//     //   ctx.strokeRect(960*boxes[i].left, 540*boxes[i].top, 960*boxes[i].width, 540*boxes[i].height);
//     //   ctx.fillStyle = colors[i % colors.length]
//     //   ctx.font = '24px sans-serif';
//     //   const labelText = boxes[i].confidence.toFixed(2)+'%'+' '+boxes[i].label
//     //   ctx.fillText(labelText, 960*boxes[i].left+10, 540*boxes[i].top+25);
//     // }
//     //return
//   } catch (error) {
//     console.log("Error retrieving boxes", error);
//   }
// }

const imagePath = "https://files.explore.org/sn/1970/8/25/20211115T012351_174005.ts.jpg"
const imageDate = "2021-11-14T17:24:00.000Z"

export function FrameView ({ username }) {
  const [imageID, setImageID] = useState("45915cb0-882a-4a6e-8cd9-654e6e9d2ab1");
  const [boxList, setBoxList] = useState([
        {
          "id": "2c8abc8a-926d-4c29-bded-6cbfd2ad1268",
          "label": "Bear",
          "confidence": 99.51992797851562,
          "width": 0.6640027165412903,
          "height": 0.7488520741462708,
          "left": 0.24145902693271637,
          "top": 0.11048909276723862,
          "imagesID": "45915cb0-882a-4a6e-8cd9-654e6e9d2ab1",
          "createdAt": "2022-05-22T00:01:04.165Z",
          "updatedAt": "2022-05-22T00:01:04.165Z",
          "_version": 1,
          "_lastChangedAt": 1653177664190,
          "_deleted": null
        }
      ]);
  const inputEl = useRef(null);

  function updateFrame(item) {
    setImageID(item.id);
    document.getElementById("refImage").src = item.url
    document.getElementById("refImageDate").innerHTML = "<h2>" + item.date + "</h2>"
  }

  useEffect(() => {
    async function getBoxes() {
      const boxes = await DataStore.query(Objects, c => c.imagesID("eq", imageID));
      //console.log("Boxes retrieved successfully!", JSON.stringify(boxes, null, 2));
      //console.log("Boxes retrieved successfully!");
      setBoxList(boxes);
    }
    getBoxes();
    DataStore.observe(Objects).subscribe(getBoxes);
  }, [imageID]);


  //console.log("Boxes:", JSON.stringify(boxList, null, 2));
  //console.log("Image ID:", imageID);

    return(
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        alignContent="flex-start"
        wrap="nowrap"
      >
        <div className="p-2" >
          <FrameCollection itemsPerPage={4} overrideItems={({ item, index }) => ({
            onClick: () => {updateFrame(item)}
          })} />
        </div>
        <div className="p-2" >
          <div style={{position:'relative', margin:'auto', display: 'block'}}>
          <img id="refImage" ref={inputEl} src={imagePath} alt="bearcam frame" />
          {
            boxList.map( (box) =>
            <Boxes  key={box.id} box={box} username={username} />
            )
          }
          </div>
          <div id="refImageDate" className="imageDate" ><h2>{imageDate}</h2></div>
        </div>
      </Flex>
    )
}

export default FrameView;
