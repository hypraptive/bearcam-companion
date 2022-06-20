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
        width="160px"
        height="90px"
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
        width="160px"
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
          <Text
            fontFamily="Inter"
            fontSize="10px"
            fontWeight="400"
            color="rgba(13,26,38,1)"
            lineHeight="24px"
            textAlign="center"
            display="none"
            direction="column"
            justifyContent="flex-start"
            letterSpacing="0px"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="4bds 3 ba 2,530 sqft - Active"
            {...getOverrideProps(overrides, "4bds 3 ba 2,530 sqft - Active")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="10px"
            fontWeight="400"
            color="rgba(48,64,80,1)"
            lineHeight="24px"
            textAlign="center"
            display="none"
            direction="column"
            justifyContent="flex-start"
            shrink="0"
            alignSelf="stretch"
            objectFit="cover"
            position="relative"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children="832 34th Ave, Seattle, WA 98122"
            {...getOverrideProps(overrides, "832 34th Ave, Seattle, WA 98122")}
          ></Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
