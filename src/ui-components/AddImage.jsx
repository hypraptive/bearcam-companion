/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  useDataStoreCreateAction,
  useStateMutationAction,
} from "@aws-amplify/ui-react/internal";
import { Images } from "../models";
import { schema } from "../models/schema";
import { Button, Divider, Flex, Text, TextField } from "@aws-amplify/ui-react";
export default function AddImage(props) {
  const { overrides, ...rest } = props;
  const [
    textFieldThreeTwoFourEightTwoSevenSevenTwoValue,
    setTextFieldThreeTwoFourEightTwoSevenSevenTwoValue,
  ] = useStateMutationAction("");
  const [
    textFieldThreeTwoFourEightTwoSevenSevenFourValue,
    setTextFieldThreeTwoFourEightTwoSevenSevenFourValue,
  ] = useStateMutationAction("");
  const buttonOnClick = useDataStoreCreateAction({
    model: Images,
    fields: {
      url: textFieldThreeTwoFourEightTwoSevenSevenTwoValue,
      date: textFieldThreeTwoFourEightTwoSevenSevenFourValue,
    },
    schema: schema,
  });
  return (
    <Flex
      gap="0"
      direction="column"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "AddImage")}
      {...rest}
    >
      <Flex
        gap="16px"
        direction="column"
        width="640px"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "AddImage32482761")}
      >
        <Flex
          gap="24px"
          direction="column"
          shrink="0"
          alignSelf="stretch"
          objectFit="cover"
          position="relative"
          padding="24px 24px 24px 24px"
          {...getOverrideProps(overrides, "Content")}
        >
          <Flex
            gap="16px"
            alignItems="center"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Edit Profile32482763")}
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
              {...getOverrideProps(overrides, "Edit Profile32482766")}
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
            {...getOverrideProps(overrides, "Divider32482767")}
          ></Divider>
          <Flex
            gap="16px"
            direction="column"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            {...getOverrideProps(overrides, "Forms")}
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
              value={textFieldThreeTwoFourEightTwoSevenSevenTwoValue}
              onChange={(event) => {
                setTextFieldThreeTwoFourEightTwoSevenSevenTwoValue(
                  event.target.value
                );
              }}
              {...getOverrideProps(overrides, "TextField32482772")}
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
              value={textFieldThreeTwoFourEightTwoSevenSevenFourValue}
              onChange={(event) => {
                setTextFieldThreeTwoFourEightTwoSevenSevenFourValue(
                  event.target.value
                );
              }}
              {...getOverrideProps(overrides, "TextField32482774")}
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
            {...getOverrideProps(overrides, "Divider32482775")}
          ></Divider>
          <Button
            display="flex"
            gap="0"
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
            {...getOverrideProps(overrides, "Button")}
          ></Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
