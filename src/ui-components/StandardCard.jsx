/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import {
  getOverrideProps,
  useStateMutationAction,
} from "@aws-amplify/ui-react/internal";
import { Flex, Image, Text } from "@aws-amplify/ui-react";
export default function StandardCard(props) {
  const { images, overrides, ...rest } = props;
  const [imageOpacity, setImageOpacity] = useStateMutationAction(undefined);
  const standardCardOnMouseEnter = () => {
    setImageOpacity("50%");
  };
  const standardCardOnMouseLeave = () => {
    setImageOpacity("100%");
  };
  return (
    <Flex
      gap="0"
      direction="column"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      onMouseEnter={() => {
        standardCardOnMouseEnter();
      }}
      onMouseLeave={() => {
        standardCardOnMouseLeave();
      }}
      {...rest}
      {...getOverrideProps(overrides, "StandardCard")}
    >
      <Image
        width="320px"
        height="180px"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        src={images?.url}
        opacity={imageOpacity}
        {...getOverrideProps(overrides, "image")}
      ></Image>
      <Flex
        gap="16px"
        direction="column"
        width="320px"
        height="20px"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Card Area")}
      >
        <Flex
          gap="0"
          direction="column"
          width="160px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          {...getOverrideProps(overrides, "Text Group")}
        >
          <Text
            fontFamily="Inter"
            fontSize="10px"
            fontWeight="700"
            color="rgba(13,26,38,1)"
            lineHeight="20px"
            textAlign="center"
            display="flex"
            direction="column"
            justifyContent="flex-start"
            width="160px"
            shrink="0"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={images?.date}
            {...getOverrideProps(overrides, "2021-11-14T17:28:00.000Z")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
