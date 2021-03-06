import React, { Component } from 'react'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'

class Map extends Component {

    state = {

    };

    map = null;

    componentWillMount() {
        // // grab our googleMaps obj from whever she may lay
        var googleMaps = this.props.googleMaps ||
            (window.google && // eslint-disable-line no-extra-parens
                window.google.maps) ||
            this.googleMaps

        if (!googleMaps) {
            console.error(// eslint-disable-line no-console
                'Google map api was not found in the page.')
            return
        }
        // // now grab the services we need
        // this.googleMaps = googleMaps
        // this.autocompleteService = new googleMaps.places.AutocompleteService()
        this.geocoder = new googleMaps.Geocoder();

    }

    componentDidMount() {
        this.geocode('Новосибирск')
            .then(location => {
                console.log(location.lat(), location.lng);
                this.map.panTo(location);
            })
    }

    geocode = (address) => {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({ address }, (results, status) => {
                if (status == 'OK') {
                    resolve(results[0].geometry.location);
                } else {
                    reject('Geocode was not successful for the following reason: ' + status);
                }
            });
        })
    };

    render() {
        //const { input, meta: { touched, error } } = this.props;

        console.log(this.props);

        return (
            <GoogleMap
                ref={(ref) => {this.map = ref}}
                defaultZoom={12}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                {/*{props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}*/}
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(Map))