import './FrameView.css';
import { Button, Collection, Card, Image, View, Divider, Text } from "@aws-amplify/ui-react";
import React from 'react'
import { useState } from 'react'
import { Amplify, API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export function GetImageList () {
  const [imageList, setImageList] = useState("");
  async function buttonOnClick () {
    console.log("Get image list from Explore");
    const apiName = 'bcExploreApi';
    const path = '/explore/list';
    const myInit = { // OPTIONAL
        headers: {
          'Content-Type': 'application/json'
        },
        queryStringParameters: {
          "limit": "10",
          "feed": "brown-bear-salmon-cam-brooks-falls"
        }
    };

    const resp = await API.get(apiName, path, myInit);
    setImageList(resp.data);
    console.log("Got images:", resp.data.length);
    //console.log(resp.data);
  }

  async function buttonSaveImage (image) {
    console.log("Save image:", image.snapshot);
    const apiName = 'bcExploreApi';
    const path = '/explore/upload';
    const myInit = { // OPTIONAL
        body: {
          "url": image.snapshot,
          "date": image.created_at
        },
        headers: {
          'Content-Type': 'application/json'
        }
    };

    await API.post(apiName, path, myInit);
    console.log("Posted image");
  }

  return(
    <div>
    <Button
    children="Get Image List"
    onClick={() => {
      buttonOnClick();
    }}
    ></Button>

    <Collection
      items={imageList}
      type="grid"
      gap="20px"
      wrap="nowrap"
    >
      {(image, index) => (
        <Card
          key={index}
          borderRadius="medium"
          maxWidth="20rem"
          variation="outlined"
          row={index / 5 + 1}
          column={index % 5 + 1}
        >
          <Image
            src={image.thumbnail}
            alt={image.caption}
          />
          <View padding="xs">
            <Divider padding="xs" />
            <Text fontSize="0.75em">{image.created_at}</Text>
            <Button variation="primary" isFullWidth
            children="Save Image"
            onClick={() => {
              buttonSaveImage(image);
            }}
            ></Button>
          </View>
        </Card>
      )}
    </Collection>
    </div>
  )
}

// avatar_uri: "https://files.explore.org/avatars/1a8b6ecff625e825298db4491eb38ef3.jpeg"
// average_rating: null
// caption: ""
// created_at: "2022-08-12T20:36:15-07:00"
// display_name: "lminne30"
// livecam_id: 25
// local_time: "2022-08-12T19:35:46-08:00"
// num_favorites: 0
// snapshot: "https://files.explore.org/sn/1970/8/27/20220813T033546_324502.ts.jpg"
// thumbnail: "https://files.explore.org/sn/1970/8/27/20220813T033546_324502.ts_thumbnail.jpg"
// timestamp: 1660361746
// timezone: "America/Anchorage"
// title: "Brooks Falls Brown Bears"
// user_id: 332037
// username: "lminne30"
// uuid: "7d94700c-6861-4da7-b916-9c67a17caa82"
// youtube_delta: null
// youtube_id: null

export default GetImageList;
