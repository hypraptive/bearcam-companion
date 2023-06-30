/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  useNavigateAction,
} from "@aws-amplify/ui-react/internal";
import { Button, Flex, Image, Text } from "@aws-amplify/ui-react";
export default function NavBar(props) {
  const { overrides, ...rest } = props;
  const bearIDProjectLogoPNGUnderScoreinverseOneOnClick = useNavigateAction({
    type: "url",
    url: "http://www.bearid.org",
  });
  const homeOnClick = useNavigateAction({ type: "url", url: "/" });
  const identifyOnClick = useNavigateAction({ type: "url", url: "/view" });
  const editOnClick = useNavigateAction({ type: "url", url: "/admin" });
  const instructionsOnClick = useNavigateAction({
    type: "url",
    url: "/instructions",
  });
  const aboutOnClick = useNavigateAction({ type: "url", url: "/about" });
  return (
    <Flex
      gap="20px"
      width="1440px"
      justifyContent="center"
      alignItems="center"
      position="relative"
      padding="6px 20px 6px 20px"
      backgroundColor="rgba(51,51,51,1)"
      {...getOverrideProps(overrides, "NavBar")}
      {...rest}
    >
      <Flex
        gap="2px"
        width="fit-content"
        justifyContent="center"
        alignItems="center"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Logo")}
      >
        <Image
          width="123.97px"
          height="40px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          src="/BearID-Project-Logo-PNG_inverse.png"
          onClick={() => {
            bearIDProjectLogoPNGUnderScoreinverseOneOnClick();
          }}
          {...getOverrideProps(overrides, "BearID-Project-Logo-PNG_inverse 1")}
        ></Image>
      </Flex>
      <Flex
        gap="40px"
        width="618.02px"
        alignItems="center"
        grow="1"
        basis="618.0165405273438px"
        height="24px"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 32129767076")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.01px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Home"
          onClick={() => {
            homeOnClick();
          }}
          {...getOverrideProps(overrides, "Home")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.01px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Identify"
          onClick={() => {
            identifyOnClick();
          }}
          {...getOverrideProps(overrides, "Identify")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.01px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Edit"
          onClick={() => {
            editOnClick();
          }}
          {...getOverrideProps(overrides, "Edit")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.01px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Instructions"
          onClick={() => {
            instructionsOnClick();
          }}
          {...getOverrideProps(overrides, "Instructions")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          letterSpacing="0.01px"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="About"
          onClick={() => {
            aboutOnClick();
          }}
          {...getOverrideProps(overrides, "About")}
        ></Text>
      </Flex>
      <Flex
        gap="32px"
        width="618.02px"
        justifyContent="flex-end"
        alignItems="center"
        grow="1"
        basis="618.0165405273438px"
        height="40px"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 32129767081")}
      >
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="flex"
          direction="column"
          justifyContent="flex-start"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="username"
          {...getOverrideProps(overrides, "username")}
        ></Text>
        <Button
          display="flex"
          gap="0"
          width="fit-content"
          justifyContent="center"
          alignItems="center"
          shrink="0"
          height="42px"
          position="relative"
          border="1px SOLID rgba(255,255,255,1)"
          borderRadius="5px"
          padding="8px 16px 8px 16px"
          size="default"
          isDisabled={false}
          variation="default"
          children="Sign out"
          {...getOverrideProps(overrides, "Button")}
        ></Button>
      </Flex>
    </Flex>
  );
}
