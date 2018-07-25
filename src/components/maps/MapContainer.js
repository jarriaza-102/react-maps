import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleSuggest from './GoogleSuggest';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
    	activeMarker: {},
      selectedPlace: {},
      placeToSearch: '',
      currentLocation: {
        lat: 14.6070862,
        lng: -90.509798
      },
      value: ''
    };
    this.onPlaceToSearchChanged = this.onPlaceToSearchChanged.bind(this);

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

 onMapClicked = (props) => {
   console.log(props);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

	onPlaceToSearchChanged(event) {
    this.setState({
      placeToSearch: event.target.value
    });
  }
  
  render() {    
    return (
      <div>
        <GoogleSuggest value={this.state.value}/>
        <br></br>
        <Map google={this.props.google} 
          zoom={14}
          initialCenter={{
             lat: this.state.currentLocation.lat,
             lng: this.state.currentLocation.lng
          }}
          onClick={this.onMapClicked}
          >

          <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'Universidad Francisco Marroquín'}
            position={{lat: 14.606868, lng: -90.507595}} />

          <Marker
            name={'Sixtino I'}
            position={{lat: 14.6070862, lng: -90.509798}} />
          <Marker />

        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAEbB6vii-fRG16LIlPZwBwMinJPO53sIU1')
})(MapContainer)