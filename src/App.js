import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ParticlesBg from 'particles-bg'

const initialState = {
  input: '',
  imageUrl: '',
  boundingBoxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }


  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (result) => {
    console.log("RESULT",result)
    const regionsArray = result.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const boxDataArray = regionsArray.map(item => {
      const dimensionsObj = item.region_info.bounding_box;
      return {
        leftCol: dimensionsObj.left_col * width,
        topRow: dimensionsObj.top_row * height,
        rightCol: width - (dimensionsObj.right_col * width),
        bottomRow: height - (dimensionsObj.bottom_row * height)
      };
    });
    return boxDataArray;
  }

  displayFaceDetectionBox = (box) => {
    this.setState({ boundingBoxes: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    // const PAT = 'ffe67f6f20cd4de5aef921dfd72cc5fa';
    // // Specify the correct user_id/app_id pairings
    // // Since you're making inferences outside your app's scope
    // const USER_ID = 'tjpaulino89';       
    // const APP_ID = 'Face-Detection';
    // // Change these to whatever model and image URL you want to use
    // const MODEL_ID = 'face-detection';
    // const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    // const IMAGE_URL = this.state.input;
    // // 'https://samples.clarifai.com/metro-north.jpg';

    // ///////////////////////////////////////////////////////////////////////////////////
    // // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    // ///////////////////////////////////////////////////////////////////////////////////

    // const raw = JSON.stringify({
    //     "user_app_id": {
    //         "user_id": USER_ID,
    //         "app_id": APP_ID
    //     },
    //     "inputs": [
    //         {
    //             "data": {
    //                 "image": {
    //                     "url": IMAGE_URL
    //                 }
    //             }
    //         }
    //     ]
    // });

    // const requestOptions = {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization': 'Key ' + PAT
    //     },
    //     body: raw
    // };

    // // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // // this will default to the latest version_id

    // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    //     .then(response => response.json())
        
    fetch('https://smartbrainbackend.onrender.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log('result', result)
      if(result) {
        fetch('https://smartbrainbackend.onrender.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log) 
      }
      this.displayFaceDetectionBox(this.calculateFaceLocation(result))})
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'home'){
      this.setState({isSignedIn: true});
    } else {
      this.setState(initialState);
    }
    this.setState({route: route});
  }
  
  render() {
    const { isSignedIn, imageUrl, boundingBoxes, route } = this.state;
    return (
      <div className="App">
        <div id='particles-js'>
          <ParticlesBg color="#d9ecff" num={200} type="cobweb" bg={true} />
        </div>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {(route === 'home') 
          ? <div>
              <Logo />
              <Rank userName={this.state.user.name} userEntries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
              <FaceRecognition imageUrl={imageUrl} boundingBoxes={boundingBoxes}/>
            </div>
          : (route) === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        }
      </div>
  );
  }

}

export default App;
