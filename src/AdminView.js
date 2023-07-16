import './FrameView.css';
import GetLatestImage from './GetLatestImage';
import GetImageList from './GetImageList';
import React from 'react'

export function AdminView ({ user }) {
  function isAdmin() {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    if (groups && groups.includes('admin')) {
      return true;
    }
    return false;
  }

    return(
      <div>
        {isAdmin()
          ?
            <div>
              <GetImageList/>
              <GetLatestImage feed={"BF"}/>
              <GetLatestImage feed={"RF"}/>
            </div>
          : <div>No Access</div>
        }
      </div>
    )
}

export default AdminView;
