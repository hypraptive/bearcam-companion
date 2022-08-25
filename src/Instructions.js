import './FrameView.css';
import React from 'react'
import { Card, View, Text, Heading, Link, Image } from "@aws-amplify/ui-react";
import { FiExternalLink } from "react-icons/fi";

export function Instructions ({ user }) {
  return(
    <div>
    <View
      padding="1rem"
      maxWidth="100%"
    >
    <Card
      key="about-card"
      borderRadius="medium"
      variation="outlined"
    >
    <Heading level={6}>Instructions</Heading>
    <View
      padding="1rem"
      maxWidth="100%"
      style={{
        textAlign: 'left',
        alignItems: 'center'
      }}
    >
    <Text fontSize="1em"
    >
    Bearcam Companion is meant to help us share identifications of which bears we
    see on the bear cams. Here's what the application does:
    <ul>
      <li>Images are selected from the Explore.org Snapshots
      of the <Link href="https://explore.org/snapshots/brown-bear-salmon-cam-brooks-falls/"
      isExternal={true}>Brooks Falls Brown Bears <FiExternalLink/></Link>.</li>
      <ul>
        <li>Since new images are added semi-manually, they do not update all the time.</li>
        <li>More camera feeds may be added later.</li>
        <li>Manual upload may be added later.</li>
      </ul>
      <li>The application finds the bears and draws boxes around them.</li>
      <ul>
        <li>Since the automatic bear detection misses some bears, or mislabels them as
        something other than bears, you may not see boxes on all the bears until they are
        manually updated.</li>
        <li>Currently this is done by administrators, but we may ask for volunteers.</li>
      </ul>
    </ul>
    Here's what you can do:
    <ul>
      <li>Look at the images and learn the bear identifications from others.</li>
      <ul>
        <li>Each box shows the mose selected identification and the number of times
        that identification was selected out of the total number of identifications,
        for example "480 Otis (7/8)"</li>
        <li>A label of "???" means no one has identified the bear.</li>
      </ul>
      <li>Add your identification for a bear.
      The more people that identify each bear, the better!
      When enough people identify a bear, and there is a clear majority,
      the image will be used to train an automatic identification algorithm.</li>
      <ul>
        <li>Put your mouse over the box, and you will see a list of all the
        identifications that have been made for this bear and how many times.</li>
        <li>The "Selcected:" section shows your selection ("none" if you have not made one).</li>
        <li>Make your selection in the dropdown box that says "Pick a bear":</li>
        <ul>
          <li>Select "Not a bear" if the box is highlighting something other than a bear.</li>
          <li>If you are sure the bear is not one of the known bears, select "Unknown",
          "Unknown Adult" or "Unknown Subadult".</li>
          <li>If the bear is known but not yet numbered, select
          "Known Adult" or "Known Subadult".</li>
          <li>If the bear is a cub, select the appropriate age of "COY" (for spring cubs),
          "1.5 year old" or "2.5 year old".</li>
          <li>The rest of the bear identifications are in numerical order. Two-digit
          numbers have a leading zero (as in "032 Chunk").</li>
          <li>When the dropdown is visible, you can start typing the number to get there
          faster. Start with zero for two-digit numbers.</li>
          <li>Bears without assinged numbers are not yet listed.</li>
        </ul>
      </ul>
      <li>Anyone logged in to the website will see the collective identifications.</li>
      <ul>
        <li>You can share a link to the image to share with the community by
        copying the URL.</li>
        <li>To share an image with the boxes and labels, you have to use screen capture.</li>
      </ul>
    </ul>

    Example:
    <br/>
    <br/>
    Link: <Link href="/image/37d7e1cd-a8c0-401e-af75-a8f3cb6d3dac">https://app.bearid.org/image/37d7e1cd-a8c0-401e-af75-a8f3cb6d3dac</Link>
    <br/>
    <Image width="50%" align="center" src="https://uploads.disquscdn.com/images/a79cb644cf6a1772a39fffa274635bde9c9603c2a00d5ff24eadef6c56acd8f1.png" />
    <br/>
    <br/>
    </Text>
    </View>
    <Heading level={6}>Known issues</Heading>
    <View
      padding="1rem"
      maxWidth="100%"
      style={{
        textAlign: 'left',
        alignItems: 'center'
      }}
    >
    <Text fontSize="1em"
    >
    This is a work in progress and there are problems!
    <ul>
      <li>If you log out and log back in, the image list may be empty. Please refresh.</li>
      <li>There may be other issues where you need to refresh the page once in a while to get the latest images.</li>
      <li>There is no way to delete an id</li>
    </ul>
    You can send email to bcc@hypraptive.com with questions, problems and suggestions.
    </Text>
    </View>
    </Card>
    </View>
    </div>
  )
}

export default Instructions;
