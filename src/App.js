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

    // Start the DataStore, this kicks-off the sync process.
    console.log("Start datastore")
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
