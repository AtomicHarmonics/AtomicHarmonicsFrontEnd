import React from "react";
import Hls from "./hls.js";
export class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleStartButton = this.handleStartButton.bind(this);
        this.handleStopButton = this.handleStopButton.bind(this);
        
        
      }
      handleStartButton(event) {
        const video = this.player;
      const hls = new Hls();
      const url = "http://localhost:4996/staticContent/static/videos/index.m3u8";
 
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        console.log("playing now");  
        video.play(); });
    
   
    }
    handleStopButton(event) {
        const video = this.player;

      video.pause(); 
    
   
    }

  componentDidMount() {

  }
  render() {
    return (
        <div className="App">
          <input name="startVideoButton" type="button" value="StartVideo"  onClick={this.handleStartButton}/>
          <input name="stopVideoButton" type="button" value="StopVideo"  onClick={this.handleStopButton}/>
          
          <video
            className="videoCanvas"
            ref={player => (this.player = player)}
            autoPlay={true}
            controls={true}
          />
        </div>
    );
  }
}
