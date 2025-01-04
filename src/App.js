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

  useEffect(() => {
    async function getImages() {
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
      var images
      if (groups && groups.includes('admin')) {
        images = await DataStore.query(Images, 
          Predicates.ALL,
          //(c) => c.date('gt', "2024-09-01T00:00:00-07:00"),
          {sort: s => s.date(SortDirection.DESCENDING)}
         );
      } else {
        images = await DataStore.query(Images, 
          (c) => c.bearCount('gt', 0),
          {sort: s => s.date(SortDirection.DESCENDING)}
         );
      }
      //console.log("Images", images)
      setImageList(images);
    }

    DataStore.configure({
      maxRecordsToSync: 100000,
      //maxRecordsToSync: 100,
      //syncExpressions: [
      //  syncExpression(Images, () => {
      //    return images => images.date('gt', "2020-01-01T00:00:00-07:00");
      //    //return images => images.date('gt', "2024-10-01T00:00:00-07:00");
      //  })
      //]    
    });
    
    // Create listener that will stop observing the model once the sync process is done
    const removeListener = Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event, data },
      } = capsule;

      console.log("DataStore event", event, data);

      if (event === "ready") {
        getImages();
        DataStore.observe(Images).subscribe(getImages);
      }
    });

    // Listen to auth events to sync the datastore
    Hub.listen('auth', ({ payload }) => {
      console.log("Auth event", payload)
      if (payload.event === 'signOut') {
        console.log("Stop DataStore")
        DataStore.stop();
      }
    });

    // Start the DataStore, this kicks-off the sync process.
    //console.log("Start stop")
    //DataStore.stop();
    //console.log("Start clear")
    //DataStore.clear();
    
    console.log("Start DataStore")
    DataStore.start();

    return () => {
      removeListener();
    };
  }, [user]);

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout signOut={signOut} user={user} images={imageList} />} >
          <Route index element={<FrameList images={imageList} />} />
          <Route path="list" element={<FrameList images={imageList} />} />
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
