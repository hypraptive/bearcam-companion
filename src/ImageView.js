import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Card, Image, View, Divider, Text, Flex, Button } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import { Objects } from "./models";
import { useNavigate } from "react-router-dom";
import Boxes from './Boxes';
import DeleteImage from './DeleteImage';
import dayjs from 'dayjs';

export function ImageView({images, user}) {
  let params = useParams();
  console.log("Param ID:", params.imageId);

  const [boxList, setBoxList] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [curImage, setCurImage] = useState();
  const [prvIndex, setPrvIndex] = useState();
  const [nxtIndex, setNxtIndex] = useState();

  const navigate = useNavigate();

  async function buttonOnClickEdit (url) {
    console.log("Go to", url);
    navigate(url);
  }
  useEffect(() => {
    if (images.length > 0) {
      console.log("Images Loaded");
      const idx = images.findIndex(obj => obj.id === params.imageId);
      setCurImage(images[idx]);
      setPrvIndex((idx === 0) ? (images.length-1) : (idx - 1));
      setNxtIndex((idx === (images.length-1)) ? 0 : idx + 1);
      setImagesLoaded(true);
    }
  }, [images, params.imageId])

  useEffect(() => {
    async function getBoxes() {
      if (curImage.id) {
        var boxes = await DataStore.query(Objects, c => c.imagesID("eq", curImage.id));
        console.log("Got boxes for", curImage.id)
        setBoxList(boxes.filter(box => box.label === "Bear"));
      }
    }
    if (imagesLoaded) {
      console.log("Get boxes for", curImage.id)
      getBoxes();
      //DataStore.observe(Objects).subscribe(getBoxes);
      //DataStore.observe(Objects).subscribe(getBoxes);
    }
  }, [imagesLoaded, curImage]);

  function isAdmin() {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    if (groups && groups.includes('admin')) {
      return true;
    }
    return false;
  }

  if (imagesLoaded) {
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
              <Boxes  key={box.id} box={box} username={user.username} />
              )
            }
          </div>
          <View padding="xs">
            <Divider padding="xs" />
            <Text fontSize="0.75em">{curImage.camFeed}: {dayjs(curImage.date).format("DD MMM YYYY [at] h:mm:ss a")}</Text>
            <Text fontSize="0.75em">{curImage.bearList}</Text>
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
      {isAdmin()
        ?
        <div>
        <Button
        children="Edit Image"
        onClick={() => {
          buttonOnClickEdit(`/edit/` + curImage.id);
        }}
        ></Button>
        <DeleteImage imageID={curImage.id} />
        </div>
        : <div/>
      }
      </div>
    )
  } else {
    return (
      <div>loading...</div>
    )
  }
}


export default ImageView;
