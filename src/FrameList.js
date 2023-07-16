import { Collection, Card, Image, View, Divider, Text } from "@aws-amplify/ui-react";
import React from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export function FrameList (images) {
  return(
    <div>
    <Collection
      items={Object.values(images.images).map(({ id, url, date, bearList, camFeed }) => ({
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
            <Text fontSize="0.75em">{image.camFeed}: {dayjs(image.date).format("DD MMM YYYY [at] h:mm:ss a")}</Text>
            <Text fontSize="0.75em" width="10rem" isTruncated={true}>{image.bearList}</Text>
          </View>
        </Card>
      )}
    </Collection>
    </div>
  )
}

export default FrameList;
