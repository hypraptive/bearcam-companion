import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Card, Image, View, Divider, Text, Flex } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import { Objects } from "./models";
import Boxes from './Boxes';

export function ImageView({images, user}) {
  let params = useParams();
  //console.log("Images", images)
  const curIndex = images.findIndex(obj => obj.id === params.imageId)
  const curImage = images[curIndex]
  const prvIndex = (curIndex === 0) ? (images.length-1) : (curIndex - 1);
  const nxtIndex = (curIndex === (images.length-1)) ? 0 : curIndex + 1;
  console.log("Indexes", prvIndex, curIndex, nxtIndex);
  console.log("Image", curImage.id)
  //console.log("user", user)
  const curUser = user;
  //console.log("user", curUser)
  const [boxList, setBoxList] = useState([]);

  useEffect(() => {
    async function getBoxes() {
      if (curImage.id) {
        var boxes = await DataStore.query(Objects, c => c.imagesID("eq", curImage.id));
        console.log("Got boxes for", curImage.id)
        setBoxList(boxes.filter(box => box.label === "Bear"));
      }
    }
    console.log("Get boxes for", curImage.id)
    getBoxes();
    //DataStore.observe(Objects).subscribe(getBoxes);
    DataStore.observe(Objects).subscribe(getBoxes);
  }, [curImage]);

  return (
    <div>
    <Link to={`/`}>Back to List</Link>
    <Flex
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      alignContent="flex-start"
      wrap="nowrap"
      gap="1rem"
    >
      <Card
        key="prev-icon"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Link to={`/image/${images[prvIndex].id}`}>
          <AiFillCaretLeft
            color='black'
            preserveAspectRatio="none"
            style={{
              width: '50px',
              height: '100px'
            }}
         />
        </Link>
      </Card>
      <Card
        key={params.imageId}
        borderRadius="medium"
        variation="outlined"
      >
        <View >
        <div style={{position:'relative', margin:'auto', display: 'block'}}>
          <Image
            src={curImage.url}
            alt={curImage.id}
          />
          {
            boxList.map( (box) =>
            <Boxes  key={box.id} box={box} username={curUser.username} />
            )
          }
        </div>
        <View padding="xs">
          <Divider padding="xs" />
          <Text fontSize="0.75em">{curImage.date}</Text>
        </View>
        </View>
      </Card>
      <Card
        key="next-icon"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Link to={`/image/${images[nxtIndex].id}`}>
          <AiFillCaretRight
            color='black'
            preserveAspectRatio="none"
            style={{
              width: '50px',
              height: '100px'
            }}
         />
        </Link>
      </Card>
    </Flex>
    <Link to={`/edit/${curImage.id}`}>
     Edit
    </Link>
    </div>
  )
}


export default ImageView;
