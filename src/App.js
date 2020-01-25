import React, {Component} from 'react';
import Header from './components/Header';
import chameleon_icon from './images/chameleon.jpg';
import Routes from './routes';

//npm i node-sass
import styles from './component-styles/App.scss';
//npm i react-router-dom
import {BrowserRouter as Router, Route} from 'react-router-dom';

//Reminder: add react-router-dom + a page to use Axios to call in images using Google's API.

class App extends Component { 
    constructor(props) {
        super(props)

        this.state = {
            canvas: null,
            x: 0,
            y: 0
        }
    }

componentDidMount() {
    //on mounting of component, create a variable = to DOM's canvas element
    var canvas = document.getElementById('canvas');
    //update state
    this.setState({canvas}) 
}

drawToCanvas = async (e) => {
    //On change of 'input' value, create a new image element
    var image = new Image()

    //Set src = to input's value
    image.alt = "pic";
    image.src = e.target.value;
    await image.onload;

    //draw loaded image onto the canvas
    const {canvas} = this.state;
    canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height)

    //Display next-step UI instructions
    document.getElementById('click_instructions').innerText = "Now, click somewhere on the image for color values please"
}

getColor = (e) => {
    document.getElementById('click_instructions').innerText = "Thank you!";
    // Updating state w/ user's 'click' coordinates
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

    //Destructuring for simplified access 
    const {canvas, x, y} = this.state;

    // getting image data and RGB values
    var img_data = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    var R = img_data[0]; var G = img_data[1]; var B = img_data[2]; 
    
    //Display data to UI
    document.getElementById("rgb").value = "RGB value is: " + R + ',' + G + ',' + B;
    
    //Convert RGB values to Hex code
    function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
    function toHex(n) {
    n = parseInt(n,10);
    if (isNaN(n)) return "00";
    n = Math.max(0,Math.min(n,255));
    return "0123456789ABCDEF".charAt((n-n%16)/16)  + "0123456789ABCDEF".charAt(n%16);
    }
    var hex = rgbToHex(R, G, B);

    //Display data to UI & "Camouflage" background
    document.getElementById("hex").value = "Hex value is: " + "#" + hex;
    document.getElementById("app_wrap").style.backgroundColor = "#" + hex;
}


render() {
   return(
       <Router>
       <div>
        <Header />
        <div id="app_wrap">
            <h1 id="click_instructions">Google a color and paste it's image address below</h1>
            <div id="canvas_wrap">
                <canvas id="canvas" onClick={e => this.getColor(e)}/>
            </div>
            <input onChange={e => this.drawToCanvas(e)} placeholder="paste image address here:"></input>
            <div id="data_wrap">
                <input id="rgb" placeholder="rbg value:"/>
                <input id="hex" placeholder="hex value:"/>
            </div>

            <h4>Or, feel free to right click on one of our supplied colors:</h4>
            <div id="color_wrap">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAACgCAMAAADw11iiAAAAA1BMVEX/tsFHHvIvAAAAKUlEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAIAbS6AAATWHI3cAAAAASUVORK5CYII=" alt="color"/>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAACgCAMAAADw11iiAAAAA1BMVEWQ7pBqm8gMAAAAKUlEQVR4nO3BMQEAAADCoPVP7WULoAAAAAAAAAAAAAAAAAAAAAAAAIAbS6AAATWHI3cAAAAASUVORK5CYII=" alt="color"/>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAADICAMAAAA9W+hXAAAAA1BMVEX9/ZaiGHTYAAAANElEQVR4nO3BMQEAAADCoPVP7WsIoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAN1+AABVhDU2QAAAABJRU5ErkJggg==" alt="color"/>
            </div>  
        </div>
       </div>
       </Router>
      )
    } 
}

export default App;