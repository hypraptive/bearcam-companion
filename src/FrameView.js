import './FrameView.css';
import { useState, useEffect, useRef } from 'react'
import { Flex } from '@aws-amplify/ui-react';
import Boxes from './Boxes';
import React from 'react'
import { FrameCollection } from './ui-components'
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Images, Objects } from "./models";

const imagePath = ""
const imageDate = "LOADING..."

export function FrameView ({ username }) {
  const [imageID, setImageID] = useState("");
  const [boxList, setBoxList] = useState([]);
  const inputEl = useRef(null);

  function updateFrame(item) {
    setImageID(item.id);
    document.getElementById("refImage").src = item.url
    document.getElementById("refImageDate").innerHTML = "<h2>" + item.date + "</h2>"
  }

  useEffect(() => {
    async function getBoxes() {
      const boxes = await DataStore.query(Objects, c => c.imagesID("eq", imageID));
      setBoxList(boxes);
    }
    getBoxes();
    DataStore.observe(Objects).subscribe(getBoxes);
  }, [imageID]);

  useEffect(() => {
    async function getStartImage() {
      const images = await DataStore.query(Images, Predicates.ALL, {sort: s => s.date(SortDirection.DESCENDING)});
      updateFrame(images[0]);
    }
    getStartImage();
  }, []);

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
