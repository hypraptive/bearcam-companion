import './FrameList.css';
import { Collection, Card, Image, View, Divider, Text, SelectField, Flex, Loader } from "@aws-amplify/ui-react";
import React from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export function FrameList ({images, user, syncData}) {
  const [year, setYear] = React.useState('2025');
  const [feed, setFeed] = React.useState('All');
  const [bears, setBears] = React.useState('Bears');

  function isAdmin() {
    if (user) {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    if (groups && groups.includes('admin')) {
      return true;
    }}
    return false;
  }

  let filteredImages = images.filter(image => ((image.date != null) && (image.date.substring(0,4) === year)) && 
    ((image.camFeed === feed) || ((feed === 'BF') && (image.camFeed === null)) || (feed === 'All')) &&
    (((bears === 'Empty') && (image.bearCount === 0)) || ((bears === 'Bears') && (image.bearCount > 0)))
  );
  //let filteredImages = images.images.filter(image => (image.date.substring(0,4) == year));
  return(
    <div>
      {syncData
        ? <div></div>
        : <div>
          <p>Loading...</p>
          <Loader variation="linear" />
        </div>
      }
      <div>
      <Flex
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        alignContent="flex-start"
        wrap="nowrap"
        gap="1rem"
      >
      <SelectField
        label="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        labelHidden={true}
        >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </SelectField>
      <SelectField
        label="Feed"
        value={feed}
        onChange={(e) => setFeed(e.target.value)}
        labelHidden={true}
        >
        <option value="BF">Brooks Falls (main)</option>
        <option value="RF">Riffles</option>
        <option value="All">All</option>
      </SelectField>
      {isAdmin() ? (
        <SelectField
          label="Bears"
          value={bears}
          onChange={(e) => setBears(e.target.value)}
          labelHidden={true}
        >
          <option value="Bears">Images with bears</option>
          <option value="Empty">Images with no bears</option>
        </SelectField>
      ) : (
        <div></div>
      ) }
      </Flex>
    <Collection
      //items={Object.values(images.images).map(({ id, url, date, bearList, camFeed }) => ({
      items={Object.values(filteredImages).map(({ id, url, date, bearList, camFeed }) => ({
          id,
        url,
        date,
        bearList,
        camFeed
      }))}
//      items={images.images}
      type="grid"
      gap="20px"
      wrap="nowrap"
      isPaginated
      itemsPerPage={100}
      isSearchable
      searchPlaceholder="Type bear name or number..."
      searchFilter={(image, keyword) => {
          if (image.bearList && image.bearList.toLowerCase().includes(keyword.toLowerCase())) {return(true)}
        }
      }
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
        <Link
            to={`/image/${image.id}`}
          >
            <Image
              src={image.url.replace(".ts.jpg",".ts_thumbnail.jpg")}
              alt={image.id}
            />
          </Link>
          <View padding="xs">
            <Divider padding="xs" />
            <Text fontSize="0.75em">{(image.camFeed === null) ? "BF" : image.camFeed}: {dayjs(image.date).format("DD MMM YYYY [at] h:mm:ss a")}</Text>
            <Text fontSize="0.75em" width="10rem" isTruncated={true}>{image.bearList}</Text>
          </View>
        </Card>
      )}
    </Collection>
    </div>
    </div>
  )
}

export default FrameList;
