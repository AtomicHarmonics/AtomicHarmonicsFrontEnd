import React from 'react';
export class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {titleInputValue: '', authorInputValue:'', tremoloRateInputValue:'0', tremoloDepthInputValue:'0', tremoloEnableInputValue: false, tremoloOrderInputValue:'1',
        overdriveThreshInputValue:'0', overDriveEnableInputValue: false, overDriveOrderInputValue:'2', distortThreshInputValue:'0', distortEnableInputValue: false, distortOrderInputValue:'2'};
      
      this.handleChangeAny = this.handleChangeAny.bind(this);
      this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
      
      //this.handleChangeInt = this.handleChangeInt.bind(this);
      
      this.handleChangeFloatOnePoint = this.handleChangeFloatOnePoint.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeFloat(event) {
      //const re = /^[0-9\b]+$/;
      const re = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
      const name = event.target.name;
      if (event.target.value === '' || re.test(event.target.value)) {
        this.setState({[name]: event.target.value})
     }
      //const name = event.target.name;
      //this.setState({[name]: event.target.value});
    }
    handleChangeInt(event) {
      const re = /^[0-9\b]+$/;
      //const re = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
      const name = event.target.name;
      if (event.target.value === '' || re.test(event.target.value)) {
        this.setState({[name]: event.target.value})
     }
      //const name = event.target.name;
      //this.setState({[name]: event.target.value});
    }
    handleChangeAny(event) {
      const name = event.target.name;
      this.setState({[name]: event.target.value})
    }
    handleChangeCheckBox(event) {
      const name = event.target.name;
      console.log(event.target.checked);
      this.setState({[name]: event.target.checked})
    }
    
    handleChangeFloatOnePoint(event) {
      const name = event.target.name;
      this.setState({[name]: event.target.value.toFixed(1)})
    }
    
    handleSubmit(event) {
      //alert('A name was submitted: ' + this.state.value);
      
      var tempTitle = this.state.titleInputValue;
      var tempAuthor = this.state.authorInputValue;
      if(this.state.titleInputValue === "")
      {
        this.setState({["titleInputValue"]: "defaultTitle"});
        tempTitle = "defaultTitle";
      }
      if(this.state.authorInputValue === "")
      {
        this.setState({["authorInputValue"]: "defaultAuthor"});
        tempAuthor = "defaultAuthor";
      }

      console.log(this.state.titleInputValue)
      var resultingJson = { "title": tempTitle, "author": tempAuthor, "tremoloFreq": parseFloat(this.state.tremoloRateInputValue),
                            "tremoloDepth": parseInt(this.state.tremoloDepthInputValue), "tremoloEnabled": this.state.tremoloEnableInputValue, 
                            "tremoloOrderNumber": parseInt(this.state.tremoloOrderInputValue), "overDriveThresh": parseFloat(this.state.overdriveThreshInputValue), 
                            "overDriveEnabled": this.state.overDriveEnableInputValue, "overDriveOrderNumber": parseInt(this.state.overDriveOrderInputValue),
                            "distortThresh": parseFloat(this.state.distortThreshInputValue), 
                            "distortEnabled": this.state.distortEnableInputValue, "distortOrderNumber": parseInt(this.state.distortOrderInputValue)};
      resultingJson.isSelected = false;
      var strJson = JSON.stringify(resultingJson);
      console.log(strJson);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultingJson)
      };
      fetch('http://localhost:4996/effectsProfile/', requestOptions)
        .then(response => console.log(response));


      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input name="titleInputValue" type="text" value={this.state.titleInputValue} onChange={this.handleChangeAny} />
          </label>
          <label>
            Author:
            <input name="authorInputValue" type="text" value={this.state.authorInputValue} onChange={this.handleChangeAny} />
          </label>
          <br></br>
          <label>
            TremoloRate: {parseFloat(this.state.tremoloRateInputValue).toFixed(2).toString().padEnd(5,'0')}
            <input name="tremoloRateInputValue" type="range" min="0" max="10" step="0.1" value={this.state.tremoloRateInputValue} onChange={this.handleChangeAny}/>
          </label>
          <label>
            TremoloDepth: {this.state.tremoloDepthInputValue.padStart(3,'0')}
            <input name="tremoloDepthInputValue" type="range" min="0" max="200" step="1" value={this.state.tremoloDepthInputValue} onChange={this.handleChangeAny}/>
          </label>
          <label>
            TremoloEnable: {this.state.tremoloEnableInputValue}
            <input name="tremoloEnableInputValue" type="checkbox" checked={this.state.tremoloEnableInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          <label>
            TremoloOrder: {this.state.tremoloOrderInputValue.padStart(1,'0')}
            <input name="tremoloOrderInputValue" type="range" min="1" max="3" step="1" value={this.state.tremoloOrderInputValue} onChange={this.handleChangeAny}/>
          </label>
          <br></br>
          <label>
            overdriveThresh: {parseFloat(this.state.overdriveThreshInputValue).toFixed(2).toString().padEnd(4,'0')}
            <input name="overdriveThreshInputValue" type="range" min="0.0" max="4.0" step="0.01" value={this.state.overdriveThreshInputValue} onChange={this.handleChangeAny}/>
          </label>
          <label>
            overDriveEnable: {this.state.overDriveEnableInputValue}
            <input name="overDriveEnableInputValue" type="checkbox" checked={this.state.overDriveEnableInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          <label>
            overDriveOrder: {this.state.overDriveOrderInputValue.padStart(1,'0')}
            <input name="overDriveOrderInputValue" type="range" min="1" max="3" step="1" value={this.state.overDriveOrderInputValue} onChange={this.handleChangeAny}/>
          </label>
          <br></br>
          <label>
            distortThresh: {parseFloat(this.state.distortThreshInputValue).toFixed(2).toString().padEnd(4,'0')}
            <input name="distortThreshInputValue" type="range" min="0.0" max="0.50" step="0.01" value={this.state.distortThreshInputValue} onChange={this.handleChangeAny}/>
          </label>
          <label>
            distortEnable: {this.state.distortEnableInputValue}
            <input name="distortEnableInputValue" type="checkbox" checked={this.state.distortEnableInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          <label>
            distortOrder: {this.state.distortOrderInputValue.padStart(1,'0')}
            <input name="distortOrderInputValue" type="range" min="1" max="3" step="1" value={this.state.distortOrderInputValue} onChange={this.handleChangeAny}/>
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }