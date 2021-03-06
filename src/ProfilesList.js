import React from 'react';
//TODO: change overdrive parameter label to overdrive 'drive' 
export class ProfilesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {nameInputValue: '', listOfProfiles:[], passwordInputValue: '', passwordStatus: ''};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
      this.handleChangeDeleteButton = this.handleChangeDeleteButton.bind(this);
      
      this.handleChangeAny = this.handleChangeAny.bind(this);
      
    }
    componentDidMount() {
      window.setInterval(() => {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:4996/effectsProfiles', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({["listOfProfiles"]: data}));
      }, 2000)
      
    }
    handleChange(event) {
      //const re = /^[0-9\b]+$/;
      const re = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
      
      //const name = event.target.name;
      //this.setState({[name]: event.target.value});
    }
    handleChangeAny(event) {
      const name = event.target.name;
      this.setState({[name]: event.target.value})
    }
    handleChangeCheckBox(event) {
      var tempData = {};
      tempData.password = this.state.passwordInputValue;
      tempData.title = event.target.name;
      if(this.state.passwordInputValue === "")
      {
        this.setState({["passwordInputValue"]: "defaultPass"});
        tempData.password = "defaultPass";
      }

      
      console.log(event.target.name);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempData)
      };
      fetch('http://localhost:4996/effectsProfile/selectedProfile/', requestOptions)
        .then(response => {
          console.log(response)
          console.log(response.status)
          if(response.status == 401)
          {
            console.log(this.state.passwordInputValue);
            console.log("didn't work");
            this.setState({["passwordStatus"]: "Incorrect Password!"})
          }
          else
          {
            this.setState({["passwordStatus"]: "Correct Password!"})
          }
        });
    }
    handleChangeDeleteButton(event) {
      var tempData = {};
      tempData.title = event.target.name;
      console.log(event.target.name);
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempData)
      };
      fetch('http://localhost:4996/effectsProfile/', requestOptions)
        .then(response => console.log(response));
    }
    handleSubmit(event) {
      console.log(this.state.listOfProfiles);
      event.preventDefault();
    }
  
    render() {
      const listItems = this.state.listOfProfiles.map((profile) =>
        <li key={profile.title}>
          <input name={profile.title} type="button" value="Select Profile" onClick={this.handleChangeCheckBox}/>
          <input name={profile.title} type="button" value="Delete Profile"  onClick={this.handleChangeDeleteButton}/>
          
          <p>{profile.title}</p>
          <p>{profile.author}</p>

          <p>PreAmp Enabled: {profile.preAmpEnabled.toString()}</p>
          <p>PreAmp Gain: {profile.preAmpGain}</p>

          <p>Tremolo Enabled: {profile.tremoloEnabled.toString()}</p>
          <p>Tremolo Freq: {profile.tremoloFreq}</p>
          <p>Tremolo Depth: {profile.tremoloDepth}</p>
          <p>Tremolo Order Number: {profile.tremoloOrderNumber}</p>

          <p>overDrive Threshold: {profile.overDriveThresh}</p>
          <p>overDrive Enabled: {profile.overDriveEnabled.toString()}</p>
          <p>overDriveOrderNumber: {profile.overDriveOrderNumber}</p>

          <p>distort Threshold: {profile.distortThresh}</p>
          <p>distort Enabled: {profile.distortEnabled.toString()}</p>
          <p>distortOrderNumber: {profile.distortOrderNumber}</p>
          
          <p>Reverb Enabled: {profile.reverbEnabled.toString()}</p>
          <p>Reverb Room Size: {profile.reverbRoomSize}</p>
          <p>Reverb Dry Level: {profile.reverbDryLevel}</p>
          <p>Reverb Wet Level: {profile.reverbWetLevel}</p>
          <p>Reverb Damp Level: {profile.reverbDampLevel}</p>
          <p>Reverb Width: {profile.reverbWidth}</p>
          <p>Reverb Mode: {profile.reverbMode}</p>
          <p>reverbOrderNumber: {profile.reverbOrderNumber}</p>
    
          <p>bitcrusher DownSample: {profile.bitcrusherDownSample}</p>
          <p>bitcrusher Enabled: {profile.bitcrusherEnabled.toString()}</p>
          <p>bitcrusherOrderNumber: {profile.bitcrusherOrderNumber}</p>
    
          <p>isSelected: {profile.isSelected.toString()}</p>  
          <br></br>     
        </li>
      );
      return (
        <>
        <label>
            Password:
            <input name="passwordInputValue" type="text" value={this.state.passwordInputValue} onChange={this.handleChangeAny} />
        </label>
        <p>{this.state.passwordStatus.toString()}</p>
        <ul>{listItems}</ul>
        </>
      );
    }
  }
