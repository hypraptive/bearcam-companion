/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { SortDirection } from "@aws-amplify/datastore";
import { Images } from "../models";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import StandardCard from "./StandardCard";
import { Collection } from "@aws-amplify/ui-react";
export default function FrameCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const itemsPagination = { sort: (s) => s.date(SortDirection.DESCENDING) };
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Images,
    pagination: itemsPagination,
  }).items;
  const items = itemsProp !== undefined ? itemsProp : itemsDataStore;
  return (
    <Collection
      type="list"
      isPaginated={true}
      searchPlaceholder="Search..."
      itemsPerPage={4}
      direction="column"
      justifyContent="left"
      items={items || []}
      {...rest}
      {...getOverrideProps(overrides, "FrameCollection")}
    >
      {(item, index) => (
        <StandardCard
          images={item}
          margin="0px 0px 0 0px"
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></StandardCard>
      )}
    </Collection>
  );
}
