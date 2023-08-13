import './FrameView.css';
import React from 'react'
import { Card, View, Text, Heading, Link, Image } from "@aws-amplify/ui-react";
import { FiExternalLink } from "react-icons/fi";

export function About ({ user }) {
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
    <Heading level={6}>About This Project</Heading>
    <View
      padding="1rem"
      maxWidth="100%"
    >
    <Text fontSize="1em"
    style={{
      textAlign: 'left'
    }}
    >
    Bearcam Companion is an experiment related to
    the <Link href="http://bearid.org/" isExternal={true}>BearID Project <FiExternalLink/></Link>.
    BearID Project got its start many years ago when 2 engineers were watching
    the <Link href="https://explore.org/livecams/brown-bears/brown-bear-salmon-cam-brooks-falls" isExternal={true}>Explore.org bear cams <FiExternalLink/></Link> and
    decided to try to build a machine learning application to identify bears. Those engineers
    got together with a conservation scientist in British Columbia. Together, we are working on
    methods to non-invasively identify brown bears in the wild using camera traps and the machine
    learning algorithms we are developing. You can read the back
    story <Link href="https://bearresearch.org/2018/04/bearid-backstory/" isExternal={true}>here <FiExternalLink/></Link>.
    <br/>
    <br/>
    The team has always wanted to bring the project back to the bear cams. However, the machine
    learning models we have developed are very dependent on high quality photos, like those
    from a digital camera. The bear cam quality is getting better, but it's not quite good
    enough in general. The BearID model also identifies bears by their faces, which are not always
    visible on the cams. For these reasons, we have not been able to reliable apply the models
    to the bearcam feeds.
    <br/>
    <br/>
    <Image width="50%" align="center"
    src="https://res.cloudinary.com/practicaldev/image/fetch/s--rw0NSRqJ--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ng4b8srovsm4aqscrck1.png" />
    <br/>
    In March of 2022, one of those original engineers
    , <Link href="https://dev.to/bluevalhalla" isExternal={true}>Ed Miller <FiExternalLink/></Link>,
    was accepted into
    the <Link href="https://aws.amazon.com/developer/community/community-builders/"
    isExternal={true}>AWS Community Builders <FiExternalLink/></Link> program. As part
    of this experience, Ed has started developing a web application using Amazon Web
    Services and credits provided by the AWS Community Builder program. The application
    is called the Bearcam Companion, and has the following goals:
    <ul>
    <li>Utilize AWS services and machine learning to enhance the bear viewing experience</li>
    <li>Help newer members of the bear cam community identify bears</li>
    <li>Enable experienced members of the community to share their knowledge of the bears</li>
    <li>Leverage community knowledge to teach the application to identify the bears</li>
    </ul>
    <Image width="200px" align="center"
    src="https://d1.awsstatic.com/getting-started-guides/new-heros-nov-2022/aws%20machine%20learning.8f879fced36fd24a30b5f9dd439bb2eb81b290a6.png" />
    <br/>
    In November of 2022, Ed was invited to join 
    the <Link href="https://aws.amazon.com/developer/community/heroes/" isExternal={true}>AWS 
    Heroes <FiExternalLink/></Link> program as
    an <Link href="https://aws.amazon.com/developer/community/heroes/ed-miller/" isExternal={true}>AWS Machine
    Learning Hero <FiExternalLink/></Link>. AWS credits through this program make the Bearcam Application 
    possible! Ed's blog posts about developing the Bearcam Companion can be
    found <Link href="https://dev.to/bluevalhalla" isExternal={true}>
    here <FiExternalLink/></Link>.
    <br/>
    <br/>
    We hope you find this project beneficial. Please help us continue to improve by
    identifying bears! For information on how to contribute, see
    the <Link href="/instructions">instructions</Link> page. Happy ID-ing!
    </Text>
    </View>
    </Card>
    </View>
    </div>
  )
}

export default About;
