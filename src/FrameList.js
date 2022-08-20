import { Collection, Card, Image, View, Divider, Text } from "@aws-amplify/ui-react";
import React from 'react'
import { Link } from 'react-router-dom';

export function FrameList (images) {
  return(
    <div>
    <Collection
      items={images.images}
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
        <Link
            to={`/image/${image.id}`}
          >
            <Image
              src={image.url}
              alt={image.id}
            />
          </Link>
          <View padding="xs">
            <Divider padding="xs" />
            <Text fontSize="0.75em">{image.date}</Text>
          </View>
        </Card>
      )}
    </Collection>
    </div>
  )
}

export default FrameList;