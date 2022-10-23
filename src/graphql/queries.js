/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIdentifications = /* GraphQL */ `
  query GetIdentifications($id: ID!) {
    getIdentifications(id: $id) {
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
export const listIdentifications = /* GraphQL */ `
  query ListIdentifications(
    $filter: ModelIdentificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIdentifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncIdentifications = /* GraphQL */ `
  query SyncIdentifications(
    $filter: ModelIdentificationsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIdentifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getObjects = /* GraphQL */ `
  query GetObjects($id: ID!) {
    getObjects(id: $id) {
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
export const listObjects = /* GraphQL */ `
  query ListObjects(
    $filter: ModelObjectsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        confidence
        width
        height
        left
        top
        imagesID
        Identifications {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncObjects = /* GraphQL */ `
  query SyncObjects(
    $filter: ModelObjectsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncObjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        label
        confidence
        width
        height
        left
        top
        imagesID
        Identifications {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getImages = /* GraphQL */ `
  query GetImages($id: ID!) {
    getImages(id: $id) {
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
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        url
        date
        Objects {
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
      nextToken
      startedAt
    }
  }
`;
export const syncImages = /* GraphQL */ `
  query SyncImages(
    $filter: ModelImagesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncImages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        url
        date
        Objects {
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
      nextToken
      startedAt
    }
  }
`;
