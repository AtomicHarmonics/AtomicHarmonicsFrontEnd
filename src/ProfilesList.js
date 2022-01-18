import React from 'react';
export class ProfilesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {nameInputValue: '', listOfProfiles:[]};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
    }
    componentDidMount() {
      window.setInterval(() => {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://192.168.86.31:4996/effectsProfiles', requestOptions)
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
    handleChangeCheckBox(event) {
      var tempData = {};
      tempData.title = event.target.name;
      console.log(event.target.name);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempData)
      };
      fetch('http://192.168.86.31:4996/effectsProfile/selectedProfile/', requestOptions)
        .then(response => console.log(response));
    }
    handleSubmit(event) {
      console.log(this.state.listOfProfiles);
      event.preventDefault();
    }
  
    render() {
      const listItems = this.state.listOfProfiles.map((profile) =>
        <li key={profile.title}>
          <input name={profile.title} type="button" value="Select Profile" identifyingKey={profile.title} onClick={this.handleChangeCheckBox}/>
          <p>{profile.title}</p>
          <p>{profile.author}</p>
          <p>Tremolo enabled: {profile.tremoloEnabled.toString()}</p>
          <p>Tremolo Freq: {profile.tremoloFreq}</p>
          <p>Tremolo Depth: {profile.tremoloDepth}</p>
          <p>Tremolo Order Number: {profile.tremoloOrderNumber}</p>
          <p>overDriveThresh: {profile.overDriveThresh}</p>
          <p>OverDrive Enabled: {profile.overDriveEnabled.toString()}</p>
          <p>overDriveOrderNumber: {profile.overDriveOrderNumber}</p>
          <p>isSelected: {profile.isSelected.toString()}</p>  
          <br></br>     
        </li>
      );
      return (
        <ul>{listItems}</ul>
      );
    }
  }