// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Identifications, Objects, Images, S3Object } = initSchema(schema);

export {
  Identifications,
  Objects,
  Images,
  S3Object
};