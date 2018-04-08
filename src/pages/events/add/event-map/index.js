import React, {Component} from 'react'
import {
    Grid,
    Form
} from 'semantic-ui-react'
import Search from 'components/search-standard'
import Map from '../map'
import geocoder from 'utils/geocoder'

class Eventmap extends Component {

    state = {
        address: '',
        marker: null
    };

    handleResultSelect = async (address) => {
        const { input } = this.props;

        let result = await geocoder.geocode({address: address});

        input.onChange({
            address: address,
            location: result.coordinates
        });

        this.setState({
            marker: {
                lat: result.coordinates.latitude,
                lng: result.coordinates.longitude
            }
        })
    };

    handleChangeAddress = async (value) => {
        let result = await geocoder.geocode({address: value});

        if (result) {
            this.setState({addresses: [{title: result.full_address}]});
        } else {
            this.setState({addresses: []});
        }
    };

    render() {

        return (
            <Grid>
                <Grid.Column width={16}>
                    <Form.Field>
                        <Search
                            handleSearch={this.handleChangeAddress}
                            handleResultSelect={this.handleResultSelect}
                            results={this.state.addresses}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Map
                        marker={this.state.marker}
                        city={this.props.city}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}



export default Eventmap