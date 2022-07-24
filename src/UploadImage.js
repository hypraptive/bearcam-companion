import './FrameView.css';
import { useState } from 'react'
import { Button, Divider, Flex, Text, TextField } from "@aws-amplify/ui-react";
import React from 'react'
import { DataStore, Storage } from "aws-amplify";
import { Images } from "./models";
import awsExports from "./aws-exports";
import { useStateMutationAction } from "@aws-amplify/ui-react/internal";

export function UploadImage () {
  const [uploadImage, setUploadImage] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const [
    textURLValue,
    setTextURLValue,
  ] = useStateMutationAction("");
  const [
    textDateValue,
    setTextDateValue,
  ] = useStateMutationAction("");

  async function uploadFromFile(e) {
    const file = e.target.files[0];
    // try {
    //   const result = await Storage.put(file.name, file);
    //   console.log("Stored", file.name, "to", result);
    // } catch (error) {
    //   console.log("Error uploading file: ", error);
    // }
    // const signedURL = await Storage.get(file.name);
    //setUploadImage(signedURL);
    setUploadFile(file);
    setUploadImage(URL.createObjectURL(file));
  }

  async function saveImage (url, date, key) {
    await DataStore.save(
      new Images({
        url: url,
        date: date,
        file: {
          bucket: awsExports.aws_user_files_s3_bucket,
          region: awsExports.aws_user_files_s3_bucket_region,
          key: key
        }
      })
    );
  }

  async function buttonOnClick () {
    console.log("Image:", uploadFile.name);
    console.log("URL:", textURLValue);
    console.log("Date:", textDateValue);

    console.log("Uploading Image to S3");
    try {
      const result = await Storage.put(uploadFile.name, uploadFile);
      console.log("Stored", uploadFile.name, "to", result);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    //const signedURL = await Storage.get(file.name);

    console.log("Updating Images Table");
    try {
      saveImage (textURLValue, textDateValue, uploadFile.name);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

    return(
      <Flex
        gap="0"
        direction="column"
        position="relative"
        padding="0px 0px 0px 0px"
      >
        <Flex
          gap="16px"
          direction="column"
          width="640px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          backgroundColor="rgba(255,255,255,1)"
        >
          <Flex
            gap="24px"
            direction="column"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="24px 24px 24px 24px"
          >
            <Flex
              gap="16px"
              direction="row"
              alignItems="center"
              shrink="0"
              alignSelf="stretch"
              objectFit="cover"
              position="relative"
              padding="0px 0px 0px 0px"
            >
              <Text
                fontFamily="Inter"
                fontSize="16px"
                fontWeight="700"
                color="rgba(13,26,38,1)"
                lineHeight="20px"
                textAlign="left"
                display="flex"
                direction="column"
                justifyContent="flex-start"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Add Image"
              ></Text>
            </Flex>
            <Divider
              height="1px"
              shrink="0"
              alignSelf="stretch"
              objectFit="cover"
              position="relative"
              padding="0px 0px 0px 0px"
              size="small"
              orientation="horizontal"
            ></Divider>
            <Flex
              gap="16px"
              direction="column"
              shrink="0"
              alignSelf="stretch"
              objectFit="cover"
              position="relative"
              padding="0px 0px 0px 0px"
            >
              <Text
                lineHeight="20px"
                textAlign="center"
                display="flex"
                direction="column"
                justifyContent="center"
                shrink="0"
                position="relative"
                padding="0px 0px 0px 0px"
                whiteSpace="pre-wrap"
                children="Select Image"
              ></Text>
              <Flex
                gap="16px"
                direction="row"
                alignItems="center"
                shrink="0"
                alignSelf="stretch"
                objectFit="cover"
                position="relative"
                padding="0px 0px 0px 0px"
              >
                <input type="file" align="center" onChange={uploadFromFile}></input>
                <img src={uploadImage} width={200} alt="Selected file" />
              </Flex>
            </Flex>
            <Divider
              height="1px"
              shrink="0"
              alignSelf="stretch"
              objectFit="cover"
              position="relative"
              padding="0px 0px 0px 0px"
              size="small"
              orientation="horizontal"
            ></Divider>
            <Flex
              gap="16px"
              direction="column"
              shrink="0"
              alignSelf="stretch"
              objectFit="cover"
              position="relative"
              padding="0px 0px 0px 0px"
            >
              <TextField
                display="flex"
                gap="8px"
                direction="column"
                justifyContent="center"
                shrink="0"
                alignSelf="stretch"
                objectFit="cover"
                position="relative"
                padding="0px 0px 0px 0px"
                label="URL"
                placeholder="http://www.url.com/"
                size="default"
                isDisabled={false}
                labelHidden={false}
                variation="default"
                value={textURLValue}
                onChange={(event) => {
                  setTextURLValue(
                    event.target.value
                  );
                }}
              ></TextField>
              <TextField
                display="flex"
                gap="8px"
                direction="column"
                justifyContent="center"
                shrink="0"
                alignSelf="stretch"
                objectFit="cover"
                position="relative"
                padding="0px 0px 0px 0px"
                label="Date"
                placeholder="2021-11-14T17:24:00.000Z"
                size="default"
                isDisabled={false}
                labelHidden={false}
                variation="default"
                value={textDateValue}
                onChange={(event) => {
                  setTextDateValue(
                    event.target.value
                  );
                }}
              ></TextField>
            </Flex>
            <Divider
              height="1px"
              shrink="0"
              alignSelf="stretch"
              objectFit="cover"
              position="relative"
              padding="0px 0px 0px 0px"
              size="small"
              orientation="horizontal"
            ></Divider>
            <Button
              display="flex"
              gap="0"
              direction="row"
              width="fit-content"
              justifyContent="center"
              alignItems="center"
              shrink="0"
              position="relative"
              size="default"
              isDisabled={false}
              variation="primary"
              children="Save"
              onClick={() => {
                buttonOnClick();
              }}
            ></Button>
          </Flex>
        </Flex>
      </Flex>
    )
}

export default UploadImage;
