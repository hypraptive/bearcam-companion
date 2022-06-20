import './App.css';
import FrameView from './FrameView';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  return (
    <div className="App">
      <header className="App-header">
        <div className="headerImage">
          <img width={200} height={65} src="/BearID-Project-Logo-PNG_inverse.png" alt="BearID Logo" />
          </div>
        <Heading level={5} color="white">Hello, {user.username} &nbsp;</Heading>
        <Button onClick={signOut} color="gray">Sign out</Button>
     </header>
      <Heading level={4}>Bearcam Companion</Heading>
      <FrameView username={user.username} />
      <footer className="App-footer">
        <h2>&copy;2022 BearID Project</h2>
      </footer>
    </div>
  );
}

export default withAuthenticator(App);
