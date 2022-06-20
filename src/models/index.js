// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Identifications, Objects, Images } = initSchema(schema);

export {
  Identifications,
  Objects,
  Images
};