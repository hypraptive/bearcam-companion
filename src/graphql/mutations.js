/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createIdentifications = /* GraphQL */ `
  mutation CreateIdentifications(
    $input: CreateIdentificationsInput!
    $condition: ModelIdentificationsConditionInput
  ) {
    createIdentifications(input: $input, condition: $condition) {
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
export const updateIdentifications = /* GraphQL */ `
  mutation UpdateIdentifications(
    $input: UpdateIdentificationsInput!
    $condition: ModelIdentificationsConditionInput
  ) {
    updateIdentifications(input: $input, condition: $condition) {
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
export const deleteIdentifications = /* GraphQL */ `
  mutation DeleteIdentifications(
    $input: DeleteIdentificationsInput!
    $condition: ModelIdentificationsConditionInput
  ) {
    deleteIdentifications(input: $input, condition: $condition) {
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
export const createObjects = /* GraphQL */ `
  mutation CreateObjects(
    $input: CreateObjectsInput!
    $condition: ModelObjectsConditionInput
  ) {
    createObjects(input: $input, condition: $condition) {
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
export const updateObjects = /* GraphQL */ `
  mutation UpdateObjects(
    $input: UpdateObjectsInput!
    $condition: ModelObjectsConditionInput
  ) {
    updateObjects(input: $input, condition: $condition) {
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
export const deleteObjects = /* GraphQL */ `
  mutation DeleteObjects(
    $input: DeleteObjectsInput!
    $condition: ModelObjectsConditionInput
  ) {
    deleteObjects(input: $input, condition: $condition) {
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
export const createImages = /* GraphQL */ `
  mutation CreateImages(
    $input: CreateImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    createImages(input: $input, condition: $condition) {
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
export const updateImages = /* GraphQL */ `
  mutation UpdateImages(
    $input: UpdateImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    updateImages(input: $input, condition: $condition) {
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
export const deleteImages = /* GraphQL */ `
  mutation DeleteImages(
    $input: DeleteImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    deleteImages(input: $input, condition: $condition) {
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
