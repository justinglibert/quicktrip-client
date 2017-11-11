import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ControlPanel from './components/control-panel';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
const MAPBOX_TOKEN = 'pk.eyJ1IjoianVzdGluZ2xpYmVydCIsImEiOiJjajl2ZG8wOWc2YjJoMnpxdDI4OHU2MGo0In0.GidynReYgjL2SOgqfnTLJw';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};



class App extends Component {
  constructor(props) {
    super(props);
    this._resize = this._resize.bind(this);
    this._updateViewport = this._updateViewport.bind(this);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
      popupInfo: null
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize(){
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _updateViewport(viewport){
    this.setState({viewport});
  }

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN} >

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

        <ControlPanel containerComponent={this.props.containerComponent} />

      </MapGL>
    );
  }
}

export default App;
