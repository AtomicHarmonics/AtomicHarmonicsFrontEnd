import logo from './logo.svg';
import './App.css';
import {NameForm} from "./NameForm.js"
import {ProfilesList} from "./ProfilesList.js"
import {VideoPlayer} from "./VideoPlayer.js"
//import ReactHlsPlayer from 'react-hls-player';

function App() {
  return (
    <div className="App">
      <header className="App-header2">
        <p>ATOMIC HARMONICS APP</p>

        <br></br>
        <VideoPlayer/>
        <br></br>
      </header>
      <div className="inputForm-class">
      <br></br>
        <NameForm/>
      </div>
      <div className="profilesList-class">
      <br></br>
        <ProfilesList/>
      </div>
      
    </div>
  );
}

export default App;
