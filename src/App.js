import logo from './logo.svg';
import './App.css';
import {NameForm} from "./NameForm.js"
import {ProfilesList} from "./ProfilesList.js"
function App() {
  return (
    <div className="App">
      <header className="App-header2">
        <p1>ATOMIC HARMONICS APP</p1>
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
