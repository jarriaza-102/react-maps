import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import firebase from '../../utils/firebase';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        const {lat, lng} = this.props;
        this.state = {
            showingInfoWindow: false,
            currentLocation: {lat: lat, lng: lng},
            places: [],
            activeMarker: null,
            selectedPlace: {},
            countries: []
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onCountryChanged = this.onCountryChanged.bind(this);
    }

    async componentDidMount() {
        this.setGeolocalization();
        await this.updateData();
    }

    async updateData() {
        const db = firebase.firestore();
        const querySnapshot = await db.collection('data').get();
        const catastrohpes = [];
        const countries = [];

        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            catastrohpes.push({
                country: data.country,
                catastrophes: await this.filterCatastrophes(db, data.country)
            });

            countries.push(
                data.country
            );

            this.setState({
                places: catastrohpes,
                countries: countries
            });
        });
    }

    async filterCatastrophes(db, country) {
        const catRef = db.collection("catastrophes");
        const catas = await catRef.where("country", "==",country).get();
        const catasToAdd = [];
        catas.forEach(cata => {
            catasToAdd.push(cata.data());
        });
        return catasToAdd;
    }

    setGeolocalization() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                });
            });
        }
    }

    getMarkerList() {
        const markers = [];
        this.state.places.map( place => {
            place.catastrophes.map( catastrophe => {
                markers.push(
                    <Marker
                        key={catastrophe.id}
                        name={catastrophe.name}
                        description={catastrophe.description}
                        position={{lat: catastrophe.lat, lng: catastrophe.lng}}
                        onClick={this.onMarkerClick}/>
                );
            });
        });
        return markers;
    }

    onMarkerClick(props, marker, e) {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
    }

    onMapClicked(props) {
        if (this.state && this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
    }

    getCountrySelect() {
        const options = [
            <option value="0">All</option>
        ];
        if (this.state.countries.length > 0) {
            this.state.countries.map( country => {
                options.push(
                    <option value={country}>{country}</option>
                );

            });
        }
        return options;
    }

    async onCountryChanged(e) {
        if (e.target.value != 0) {
            const db = firebase.firestore();
            const country = e.target.value;
            const catas = await this.filterCatastrophes(db, country);
            this.setState({
                places: [
                    {
                        country: country,
                        catastrophes: catas
                    }
                ]
            });
        } else {
            await this.updateData();
        }
    }

    render() {
        const style = {
          width: '70%',
          height: '100%'
        };
        return (
            <div>
                <div style={{paddingBottom: '25px', paddingTop: '25px'}}>
                    <select name="my-super-select" style={{width: '20%', marginLeft: '130px'}} 
                        onChange={this.onCountryChanged}>
                        {this.getCountrySelect()}
                    </select>
                </div>
                <Map google={this.props.google}
                     onClick={this.onMapClicked}
                     style={style}
                     zoom={7}
                     initialCenter={{
                         lat: this.state.currentLocation.lat,
                         lng: this.state.currentLocation.lng
                     }}
                >

                    {this.getMarkerList()}

                      <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h2>{this.state.selectedPlace.name}</h2>
                            <p>{this.state.selectedPlace.description}</p>
                        </div>
                    </InfoWindow>

                </Map>
            </div>
        );
    }
}

MapContainer.defaultProps = {lat: 14.6070862, lng: -90.509798};

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAEbB6vii-fRG16LIlPZwBwMinJPO53sIU')
})(MapContainer)