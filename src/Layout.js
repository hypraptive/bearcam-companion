import './App.css';
//import FrameView from './FrameView';
import { Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import {
  Outlet
} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { NavBar } from './ui-components'

function Layout({ signOut, user }) {
  let navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    signOut();
  };
  
  function isAdmin() {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    if (groups && groups.includes('admin')) {
      return true;
    }
    return false;
  }

  return (
    <div className="Layout">
    <NavBar width={"100vw"} overrides={{
      "username": { children: "Hello, "+user.username },
      "Button": {color: "white", onClick: logoutUser},
      "Logo": {style: {cursor:'pointer'}},
      "Home": {style: {cursor:'pointer'}},
      "Identify": {children: "View", display:'none'},
      "Edit": {children: "Admin", style: {cursor:'pointer'}, display: isAdmin()?'block':'none'}
    }} />
      <Heading level={4}>Bearcam Companion</Heading>
      <Outlet />
      <footer className="App-footer">
        <h2>&copy;2022 BearID Project</h2>
      </footer>
    </div>
  );
}

export default Layout;
