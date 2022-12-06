import '@aws-amplify/ui-react/styles.css'
import './App.css'
import { Authenticator } from '@aws-amplify/ui-react';
import { useEffect } from  'react'
import { Auth } from 'aws-amplify'
import ObjectList from './components/ObjectList'

async function getAuth () {
  try {
    console.log("getAuth")
    const cred = await Auth.currentCredentials();
    console.log(cred.authenticated)    // true
    console.log(cred.accessKeyId)      // P4TAUTOAEOY5ASIAVTXA
    console.log(cred.secretAccessKey)  // b3jXGfXXfI7toiiH6WAVXqRyeFdfnvFC58Lo+6iD
  } catch (e) {
    console.error(e)
  }
}

function App() {
  useEffect (() => {
    getAuth()
  }, []);

  return (
    <Authenticator>
      {({signOut, user}) => (
        <>
          <div className="App">
            <header className="App-header">
              <h2>{user.username}</h2>
            </header>
            <button className="App-button" onClick={signOut}>Sign Out</button>
            <ObjectList />
          </div>
        </>
      )}
    </Authenticator>
  );
}

export default App;
