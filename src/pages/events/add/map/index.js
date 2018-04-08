import React, {Component} from 'react'
import {withGoogleMap, withScriptjs, Marker, GoogleMap} from "react-google-maps";

class Map extends Component {

    map = null;

    state = {
        marker: null
    }

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

    geocode = async (address) => {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({ address }, (results, status) => {
                if (status == 'OK') {
                    resolve(results[0].geometry.location, results[0]);
                } else {
                    reject('Geocode was not successful for the following reason:{ ' + status);
                }
            });
        })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.marker) {
            this.map.panTo(nextProps.marker);
        }
    }

    setCenter = (address) => {
        this.geocode(address)
            .then(location => {
                this.map.panTo(location);
            })
    };

    componentDidMount() {
        this.setCenter(this.props.city);
    }

    render() {
        return (
            <GoogleMap
                ref={(ref) => {
                    this.map = ref
                }}
                defaultZoom={12}
            >
                {this.props.marker && <Marker position={this.props.marker}/>}
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(Map));