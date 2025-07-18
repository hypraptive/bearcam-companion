import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Hub } from "@aws-amplify/core";
import { useState, useEffect } from 'react'
import { DataStore, Predicates, SortDirection } from "aws-amplify";
//import { DataStore, SortDirection } from "aws-amplify";
import { Images } from "./models";
import '@aws-amplify/ui-react/styles.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Layout from './Layout';
import FrameList from './FrameList';
import FrameView from './FrameView';
import ImageView from './ImageView';
import AdminView from './AdminView';
import EditView from './EditView';
import Instructions from './Instructions';
import About from './About';
import Leader from './Leader';

function App({ signOut, user }) {
  const [imageList, setImageList] = useState([]);
  const [syncData, setSyncData] = useState(false);

  async function startDataListener () {
    console.log("Start Data Listener");
    Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event, data },
      } = capsule;

      console.log("DataStore event", event, data);

      if (event === "ready") {
        setSyncData(true);
      }
    });
  }

  useEffect(() => {
    console.log(user);

    Hub.listen('auth', ({payload}) => {
      console.log("AUTH:", payload.event, payload.data);
    });    

    DataStore.configure({
      maxRecordsToSync: 100000,
      syncPageSize: 10000
    });

    console.log("Querying DataStore");
    console.log("Sync data", syncData)
    const subs = DataStore.observeQuery(
      Images,
      Predicates.ALL,
      {
        sort: s => s.date(SortDirection.DESCENDING)
      }
    ).subscribe(snapshot => {
      const { items } = snapshot;
      if (items) setImageList(items);
    });

    startDataListener();

    return () => {
      console.log("Unsubscribing from DataStore");
      subs.unsubscribe();
      console.log("Stop DataStore");
      DataStore.stop();
    };
  }, []);

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout signOut={signOut} user={user} images={imageList} />} >
          <Route index element={<FrameList images={imageList} user={user} syncData={syncData} />} />
          <Route path="list" element={<FrameList images={imageList} user={user} syncData={syncData} />} />
          <Route path="view" element={<FrameView user={user} />} />
          <Route path="image/:imageId" element={<ImageView images={imageList} user={user} />} />
          <Route path="edit/:imageId" element={<EditView images={imageList} user={user} />} />
          <Route path="admin" element={<AdminView user={user} />} />
          <Route path="instructions" element={<Instructions />} />
          <Route path="about" element={<About />} />
          <Route path="leader" element={<Leader user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
