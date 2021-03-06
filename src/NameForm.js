import React from 'react';
export class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {titleInputValue: '', authorInputValue:'', tremoloRateInputValue:'0', tremoloDepthInputValue:'0', tremoloEnableInputValue: false, tremoloOrderInputValue:'1',
        overdriveThreshInputValue:'0', overDriveEnableInputValue: false, overDriveOrderInputValue:'2', distortThreshInputValue:'0', distortEnableInputValue: false, distortOrderInputValue:'3', 
        reverbRoomSizeInputValue:'0.5', reverbDryLevelInputValue:'0.0', reverbDampLevelInputValue:'0.25', reverbWetLevelInputValue:'0.30', reverbWidthInputValue:'1.0', 
        reverbModeInputValue:'0.0', reverbEnabledInputValue: false, reverbOrderNumberInputValue:'4', preAmpEnabledInputValue: false, preAmpGainInputValue:'0',
        bitcrusherDownSampleInputValue:'1', bitcrusherEnabledInputValue: false, bitcrusherOrderNumberInputValue:'5', byPassInputValue: false};

      this.handleChangeAny = this.handleChangeAny.bind(this);
      this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
      
      //this.handleChangeInt = this.handleChangeInt.bind(this);
      
      this.handleChangeFloatOnePoint = this.handleChangeFloatOnePoint.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
      window.setInterval(() => {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:4996/byPass/', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({["byPassInputValue"]: data.bypassEnabled}));
      }, 2000)
      
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
                            "distortEnabled": this.state.distortEnableInputValue, "distortOrderNumber": parseInt(this.state.distortOrderInputValue),
                            "reverbWetLevel": parseFloat(this.state.reverbWetLevelInputValue), "reverbRoomSize": parseFloat(this.state.reverbRoomSizeInputValue),
                            "reverbDryLevel": parseFloat(this.state.reverbDryLevelInputValue), "reverbDampLevel": parseFloat(this.state.reverbDampLevelInputValue),
                            "reverbWidth": parseFloat(this.state.reverbWidthInputValue), "reverbEnabled": this.state.reverbEnabledInputValue,
                            "reverbMode": parseInt(this.state.reverbModeInputValue), "reverbOrderNumber": parseInt(this.state.reverbOrderNumberInputValue),
                            "preAmpEnabled": this.state.preAmpEnabledInputValue, "preAmpGain": parseFloat(this.state.preAmpGainInputValue), "bitcrusherEnabled": this.state.bitcrusherEnabledInputValue,
                            "bitcrusherDownSample": parseInt(this.state.bitcrusherDownSampleInputValue), "bitcrusherOrderNumber": parseInt(this.state.bitcrusherOrderNumberInputValue)
                            
                          };
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
      const mystyle = {
        backgroundColor: "lightgrey",
  //width: "100px",
  border: "15px solid green",
  padding: "10px",
  margin: "10px",
  display: "inline-block"

      }
      const mystyle2 = {
        display: "inline-block",
        padding: "10px"
      }
      const vertSlider = {
        WebkitAppearance: "slider-vertical",
        width: "8px",
        height: "175px",
        padding: "0 5px"
      }
      return (
        <form onSubmit={this.handleSubmit}>
          <p>Bypass Enabled: {this.state.byPassInputValue.toString()}</p>
          <br></br>
          <label>
            Title:
            <input name="titleInputValue" type="text" value={this.state.titleInputValue} onChange={this.handleChangeAny} />
          </label>
          <label>
            Author:
            <input name="authorInputValue" type="text" value={this.state.authorInputValue} onChange={this.handleChangeAny} />
          </label>
          <br></br>
          <div style={mystyle}>
          <label>
            PreAmpGain: {parseFloat(this.state.preAmpGainInputValue).toFixed(2).toString().padEnd(5,'0')}
            </label>
            <br></br>
            <input name="preAmpGainInputValue" style={vertSlider} orient="vertical" type="range"  min="0" max="5" step="0.1" value={this.state.preAmpGainInputValue} onChange={this.handleChangeAny}/>
            <br></br>
          <label>
            PreAmpEnable: {this.state.preAmpEnabledInputValue}
            <input name="preAmpEnabledInputValue" type="checkbox" checked={this.state.preAmpEnabledInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          </div>
          <div style={mystyle}>
          <div style={mystyle2}>
          <label>
            TremoloRate: {parseFloat(this.state.tremoloRateInputValue).toFixed(2).toString().padEnd(5,'0')}
            <br></br>
            </label>
            <input name="tremoloRateInputValue" style={vertSlider} type="range" orient="vertical" min="0" max="10" step="0.1" value={this.state.tremoloRateInputValue} onChange={this.handleChangeAny}/>

          </div>
          <div style={mystyle2}>
          <label>
            TremoloDepth: {this.state.tremoloDepthInputValue.padStart(3,'0')}
            </label>
            <br></br>
            <input name="tremoloDepthInputValue" style={vertSlider} type="range" orient="vertical" min="0" max="200" step="1" value={this.state.tremoloDepthInputValue} onChange={this.handleChangeAny}/>
          
          </div>
          <div style={mystyle2}>
          <label>
            TremoloOrder: {this.state.tremoloOrderInputValue.padStart(1,'0')}
            </label>
            <br></br>
            <input name="tremoloOrderInputValue" style={vertSlider} type="range" orient="vertical" min="1" max="5" step="1" value={this.state.tremoloOrderInputValue} onChange={this.handleChangeAny}/>
          
          </div>
          <br></br>
          <div style={mystyle2}>
          <label>
            TremoloEnable: {this.state.tremoloEnableInputValue}
            <input name="tremoloEnableInputValue" type="checkbox" checked={this.state.tremoloEnableInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          </div>
          
          </div>
          <div style={mystyle}>
          <div style={mystyle2}>
          <label>
            overdriveThresh: {parseFloat(this.state.overdriveThreshInputValue).toFixed(2).toString().padEnd(4,'0')}
          </label>
          <br></br>
            <input name="overdriveThreshInputValue" style={vertSlider} type="range" orient="vertical" min="0.0" max="4.0" step="0.01" value={this.state.overdriveThreshInputValue} onChange={this.handleChangeAny}/>
          </div>
          <div style={mystyle2}>
          <label>
            overDriveOrder: {this.state.overDriveOrderInputValue.padStart(1,'0')}
            </label>
            <br></br>
            <input name="overDriveOrderInputValue" style={vertSlider} type="range" orient="vertical" min="1" max="5" step="1" value={this.state.overDriveOrderInputValue} onChange={this.handleChangeAny}/>
          
          </div>
          <br></br>
          <label>
            overDriveEnable: {this.state.overDriveEnableInputValue}
            <input name="overDriveEnableInputValue" type="checkbox" checked={this.state.overDriveEnableInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          
          </div>
          <div style={mystyle}>
          <div style={mystyle2}>
          <label>
            distortThresh: {parseFloat(this.state.distortThreshInputValue).toFixed(2).toString().padEnd(4,'0')}
            </label>
            <br></br>
            <input name="distortThreshInputValue" style={vertSlider} type="range" orient="vertical" min="0.0" max="0.50" step="0.01" value={this.state.distortThreshInputValue} onChange={this.handleChangeAny}/>
          </div>
          <div style={mystyle2}>
          <label>
            distortOrder: {this.state.distortOrderInputValue.padStart(1,'0')}
            </label>
            <br></br>
            <input name="distortOrderInputValue" style={vertSlider} type="range" orient="vertical" min="1" max="5" step="1" value={this.state.distortOrderInputValue} onChange={this.handleChangeAny}/>
          
          </div>
          <br></br>
          <label>
            distortEnable: {this.state.distortEnableInputValue}
            <input name="distortEnableInputValue" type="checkbox" checked={this.state.distortEnableInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          
          </div>
          <div style={mystyle}>
          <div style={mystyle2}>
          <label>
            reverbRoomSize: {parseFloat(this.state.reverbRoomSizeInputValue).toFixed(2).toString().padEnd(4,'0')}
            </label>
            <br></br>
            <input name="reverbRoomSizeInputValue" style={vertSlider} type="range" orient="vertical" min="0.0" max="1.0" step="0.01" value={this.state.reverbRoomSizeInputValue} onChange={this.handleChangeAny}/>
          </div>
          <div style={mystyle2}>
          <label>
            reverbDryLevel: {parseFloat(this.state.reverbDryLevelInputValue).toFixed(2).toString().padEnd(4,'0')}
            </label>
            <br></br>
            <input name="reverbDryLevelInputValue" style={vertSlider} type="range" orient="vertical" min="0.0" max="1.0" step="0.01"  value={this.state.reverbDryLevelInputValue} onChange={this.handleChangeAny}/>
          </div>
          <div style={mystyle2}>
          <label>
            reverbDampLevel: {parseFloat(this.state.reverbDampLevelInputValue).toFixed(2).toString().padEnd(4,'0')}
            </label>
            <br></br>
            <input name="reverbDampLevelInputValue" style={vertSlider} type="range" orient="vertical" min="0.0" max="1.0" step="0.01"  value={this.state.reverbDampLevelInputValue} onChange={this.handleChangeAny}/>
          </div>
          <div style={mystyle2}>
          <label>
            reverbWetLevel: {parseFloat(this.state.reverbWetLevelInputValue).toFixed(2).toString().padEnd(4,'0')}
            </label>
            <br></br>
            <input name="reverbWetLevelInputValue" style={vertSlider} type="range" orient="vertical" min="0.0" max="1.0" step="0.01"  value={this.state.reverbWetLevelInputValue} onChange={this.handleChangeAny}/>
          </div>
          <div style={mystyle2}>
          <label>
            reverbWidth: {parseFloat(this.state.reverbWidthInputValue).toFixed(2).toString().padEnd(4,'0')}
            </label>
            <br></br>
            <input name="reverbWidthInputValue" style={vertSlider} type="range" orient="vertical" min="0.0" max="1.0" step="0.01" value={this.state.reverbWidthInputValue} onChange={this.handleChangeAny}/>
          </div>
          <div style={mystyle2}>
          
          <label>
            reverbMode: {this.state.reverbModeInputValue.padStart(1,'0')}
            </label>
            <br></br>
            <input name="reverbModeInputValue" style={vertSlider} type="range" orient="vertical" min="0" max="1" step="1" value={this.state.reverbModeInputValue} onChange={this.handleChangeAny}/>
          </div>
          
          <div style={mystyle2}>
          <label>
            reverbOrder: {this.state.reverbOrderNumberInputValue.padStart(1,'0')}
            </label>
            <br></br>
            <input name="reverbOrderNumberInputValue" style={vertSlider} type="range" orient="vertical" min="1" max="5" step="1" value={this.state.reverbOrderNumberInputValue} onChange={this.handleChangeAny}/>
          </div>
          <br></br>
          <label>
            reverbEnable: {this.state.reverbEnabledInputValue}
            <input name="reverbEnabledInputValue" type="checkbox" checked={this.state.reverbEnabledInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          </div>
          <div style={mystyle}>
          <div style={mystyle2}>
          <label>
            bitcrusherDownSample: {this.state.bitcrusherDownSampleInputValue.padStart(1,'0')}
            </label>
            <br></br>
            <input name="bitcrusherDownSampleInputValue" style={vertSlider} type="range" orient="vertical" min="1" max="10" step="1" value={this.state.bitcrusherDownSampleInputValue} onChange={this.handleChangeAny}/>
          
          </div>
          <div style={mystyle2}>
          <label>
            bitcrusherOrder: {this.state.bitcrusherOrderNumberInputValue.padStart(1,'0')}
            </label>
            <br></br>
            <input name="bitcrusherOrderNumberInputValue" style={vertSlider} type="range" orient="vertical" min="1" max="5" step="1" value={this.state.bitcrusherOrderNumberInputValue} onChange={this.handleChangeAny}/>
          
          </div>
          <br></br>
          <label>
            bitcrusherzEnabled: {this.state.bitcrusherEnabledInputValue}
            <input name="bitcrusherEnabledInputValue" type="checkbox" checked={this.state.bitcrusherEnabledInputValue} onChange={this.handleChangeCheckBox}/>
          </label>
          
          </div>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

