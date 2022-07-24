import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class S3Object {
  readonly bucket?: string | null;
  readonly region?: string | null;
  readonly key?: string | null;
  constructor(init: ModelInit<S3Object>);
}

type IdentificationsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ObjectsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Identifications {
  readonly id: string;
  readonly name?: string | null;
  readonly user?: string | null;
  readonly objectsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Identifications, IdentificationsMetaData>);
  static copyOf(source: Identifications, mutator: (draft: MutableModel<Identifications, IdentificationsMetaData>) => MutableModel<Identifications, IdentificationsMetaData> | void): Identifications;
}

export declare class Objects {
  readonly id: string;
  readonly label?: string | null;
  readonly confidence?: number | null;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly left?: number | null;
  readonly top?: number | null;
  readonly imagesID: string;
  readonly Identifications?: (Identifications | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Objects, ObjectsMetaData>);
  static copyOf(source: Objects, mutator: (draft: MutableModel<Objects, ObjectsMetaData>) => MutableModel<Objects, ObjectsMetaData> | void): Objects;
}

export declare class Images {
  readonly id: string;
  readonly url?: string | null;
  readonly date?: string | null;
  readonly Objects?: (Objects | null)[] | null;
  readonly file?: S3Object | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Images, ImagesMetaData>);
  static copyOf(source: Images, mutator: (draft: MutableModel<Images, ImagesMetaData>) => MutableModel<Images, ImagesMetaData> | void): Images;
}