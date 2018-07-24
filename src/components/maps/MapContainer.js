import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
    	activeMarker: {},
      selectedPlace: {}
    };
  }
  
   componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        console.log(coords);
        this.setState({
        	currentLocation: {
          	lat: coords.latitude,
            lng: coords.longitude
          }
        });
      });
    }
  }
  
  onMarkerClick(props, marker, e) {
    console.log('marker');
  }

  onMapClicked(props) {
    console.log('Clicked');
  }
  
  render() {
    return (
      <Map google={this.props.google} zoom={14}
        	initialCenter={{
            lat: 14.6070862,
            lng: -90.509798
          }}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAEbB6vii-fRG16LIlPZwBwMinJPO53sIU')
})(MapContainer)