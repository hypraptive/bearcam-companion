import './App.css';
//import FrameView from './FrameView';
import { withAuthenticator, Heading } from '@aws-amplify/ui-react';
import { Hub } from "@aws-amplify/core";
import { useState, useEffect } from 'react'
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Images } from "./models";
import '@aws-amplify/ui-react/styles.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { NavBar } from './ui-components'
import FrameList from './FrameList';
import FrameView from './FrameView';
import ImageView from './ImageView';
import AdminView from './AdminView';
import EditView from './EditView';

function App({ signOut, user }) {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    // Create listener that will stop observing the model once the sync process is done
    const removeListener = Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event, data },
      } = capsule;

      console.log("DataStore event", event, data);

      if (event === "ready") {
        const images = await DataStore.query(Images, Predicates.ALL, {sort: s => s.date(SortDirection.DESCENDING)});
        //console.log("Images", images)
        setImageList(images);
      }
    });

    // Start the DataStore, this kicks-off the sync process.
    DataStore.start();

    return () => {
      removeListener();
    };
  }, []);

  function isAdmin() {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    if (groups && groups.includes('admin')) {
      return true;
    }
    return false;
  }

  return (
    <div className="App">
    <Router>
    <NavBar width={"100vw"} overrides={{
      "username": { children: "Hello, "+user.username },
      "Button": {color: "white", onClick: signOut},
      "Logo": {style: {cursor:'pointer'}},
      "Home": {style: {cursor:'pointer'}},
      "Identify": {children: "View", display:'none'},
      "Edit": {children: "Admin", style: {cursor:'pointer'}, display: isAdmin()?'block':'none'}
    }} />
      <Heading level={4}>Bearcam Companion</Heading>

      <Routes>
        <Route path="/view" element={<FrameView user={user} />} />
        <Route path="/" element={<FrameList images={imageList} />} />
        <Route path="/image/:imageId" element={<ImageView images={imageList} user={user} />} />
        <Route path="/edit/:imageId" element={<EditView images={imageList} user={user} />} />
        <Route path="/admin" element={<AdminView user={user} />} />
        <Route path="*" element={<FrameList images={imageList} />} />
      </Routes>
    </Router>
      <footer className="App-footer">
        <h2>&copy;2022 BearID Project</h2>
      </footer>
    </div>
  );
}

export default withAuthenticator(App);
