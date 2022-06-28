import './FrameView.css';
import { useState, useEffect, useRef } from 'react'
import { Flex } from '@aws-amplify/ui-react';
import Boxes from './Boxes';
import BoxDetection from './BoxDetection';
import React from 'react'
import { FrameCollection, AddImage } from './ui-components'
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Images, Objects } from "./models";

const imagePath = ""
const imageDate = "LOADING..."

export function FrameView ({ user }) {
  const [curImage, setCurImage] = useState([]);
  const [boxList, setBoxList] = useState([]);
  const inputEl = useRef(null);

  function updateFrame(item) {
    if (item){
      setCurImage(item);
      document.getElementById("refImage").src = item.url
      document.getElementById("refImageDate").innerHTML = "<h2>" + item.date + "</h2>"
    }
  }

  function isAdmin() {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    if (groups && groups.includes('admin')) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    async function getBoxes() {
      const boxes = await DataStore.query(Objects, c => c.imagesID("eq", curImage.id));
      setBoxList(boxes);
    }
    getBoxes();
    DataStore.observe(Objects).subscribe(getBoxes);
  }, [curImage]);

  useEffect(() => {
    async function getStartImage() {
      const images = await DataStore.query(Images, Predicates.ALL, {sort: s => s.date(SortDirection.DESCENDING)});
      updateFrame(images[0]);
    }
    if (curImage.length === 0)
      getStartImage();
  });

    return(
      <div>
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
              <Boxes  key={box.id} box={box} username={user.username} />
              )
            }
            </div>
            <div id="refImageDate" className="imageDate" ><h2>{imageDate}</h2></div>
            <div>
            {isAdmin()
              ? <BoxDetection image={curImage} />
              : <div/>
            }
            </div>
          </div>
        </Flex>
        <div>
          {isAdmin()
            ? <AddImage/>
            : <div/>
          }
        </div>
      </div>
    )
}

export default FrameView;
