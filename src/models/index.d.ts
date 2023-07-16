import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

type EagerS3Object = {
  readonly bucket?: string | null;
  readonly region?: string | null;
  readonly key?: string | null;
}

type LazyS3Object = {
  readonly bucket?: string | null;
  readonly region?: string | null;
  readonly key?: string | null;
}

export declare type S3Object = LazyLoading extends LazyLoadingDisabled ? EagerS3Object : LazyS3Object

export declare const S3Object: (new (init: ModelInit<S3Object>) => S3Object)

type IdentificationsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ObjectsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerIdentifications = {
  readonly id: string;
  readonly name?: string | null;
  readonly user?: string | null;
  readonly objectsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyIdentifications = {
  readonly id: string;
  readonly name?: string | null;
  readonly user?: string | null;
  readonly objectsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Identifications = LazyLoading extends LazyLoadingDisabled ? EagerIdentifications : LazyIdentifications

export declare const Identifications: (new (init: ModelInit<Identifications, IdentificationsMetaData>) => Identifications) & {
  copyOf(source: Identifications, mutator: (draft: MutableModel<Identifications, IdentificationsMetaData>) => MutableModel<Identifications, IdentificationsMetaData> | void): Identifications;
}

type EagerObjects = {
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
}

type LazyObjects = {
  readonly id: string;
  readonly label?: string | null;
  readonly confidence?: number | null;
  readonly width?: number | null;
  readonly height?: number | null;
  readonly left?: number | null;
  readonly top?: number | null;
  readonly imagesID: string;
  readonly Identifications: AsyncCollection<Identifications>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Objects = LazyLoading extends LazyLoadingDisabled ? EagerObjects : LazyObjects

export declare const Objects: (new (init: ModelInit<Objects, ObjectsMetaData>) => Objects) & {
  copyOf(source: Objects, mutator: (draft: MutableModel<Objects, ObjectsMetaData>) => MutableModel<Objects, ObjectsMetaData> | void): Objects;
}

type EagerImages = {
  readonly id: string;
  readonly url?: string | null;
  readonly date?: string | null;
  readonly Objects?: (Objects | null)[] | null;
  readonly file?: S3Object | null;
  readonly bearCount?: number | null;
  readonly bearList?: string | null;
  readonly camFeed?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyImages = {
  readonly id: string;
  readonly url?: string | null;
  readonly date?: string | null;
  readonly Objects: AsyncCollection<Objects>;
  readonly file?: S3Object | null;
  readonly bearCount?: number | null;
  readonly bearList?: string | null;
  readonly camFeed?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Images = LazyLoading extends LazyLoadingDisabled ? EagerImages : LazyImages

export declare const Images: (new (init: ModelInit<Images, ImagesMetaData>) => Images) & {
  copyOf(source: Images, mutator: (draft: MutableModel<Images, ImagesMetaData>) => MutableModel<Images, ImagesMetaData> | void): Images;
}