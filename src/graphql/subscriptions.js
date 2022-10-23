/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateIdentifications = /* GraphQL */ `
  subscription OnCreateIdentifications(
    $filter: ModelSubscriptionIdentificationsFilterInput
  ) {
    onCreateIdentifications(filter: $filter) {
      id
      name
      user
      objectsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateIdentifications = /* GraphQL */ `
  subscription OnUpdateIdentifications(
    $filter: ModelSubscriptionIdentificationsFilterInput
  ) {
    onUpdateIdentifications(filter: $filter) {
      id
      name
      user
      objectsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteIdentifications = /* GraphQL */ `
  subscription OnDeleteIdentifications(
    $filter: ModelSubscriptionIdentificationsFilterInput
  ) {
    onDeleteIdentifications(filter: $filter) {
      id
      name
      user
      objectsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateObjects = /* GraphQL */ `
  subscription OnCreateObjects($filter: ModelSubscriptionObjectsFilterInput) {
    onCreateObjects(filter: $filter) {
      id
      label
      confidence
      width
      height
      left
      top
      imagesID
      Identifications {
        items {
          id
          name
          user
          objectsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateObjects = /* GraphQL */ `
  subscription OnUpdateObjects($filter: ModelSubscriptionObjectsFilterInput) {
    onUpdateObjects(filter: $filter) {
      id
      label
      confidence
      width
      height
      left
      top
      imagesID
      Identifications {
        items {
          id
          name
          user
          objectsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteObjects = /* GraphQL */ `
  subscription OnDeleteObjects($filter: ModelSubscriptionObjectsFilterInput) {
    onDeleteObjects(filter: $filter) {
      id
      label
      confidence
      width
      height
      left
      top
      imagesID
      Identifications {
        items {
          id
          name
          user
          objectsID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateImages = /* GraphQL */ `
  subscription OnCreateImages($filter: ModelSubscriptionImagesFilterInput) {
    onCreateImages(filter: $filter) {
      id
      url
      date
      Objects {
        items {
          id
          label
          confidence
          width
          height
          left
          top
          imagesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateImages = /* GraphQL */ `
  subscription OnUpdateImages($filter: ModelSubscriptionImagesFilterInput) {
    onUpdateImages(filter: $filter) {
      id
      url
      date
      Objects {
        items {
          id
          label
          confidence
          width
          height
          left
          top
          imagesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteImages = /* GraphQL */ `
  subscription OnDeleteImages($filter: ModelSubscriptionImagesFilterInput) {
    onDeleteImages(filter: $filter) {
      id
      url
      date
      Objects {
        items {
          id
          label
          confidence
          width
          height
          left
          top
          imagesID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
