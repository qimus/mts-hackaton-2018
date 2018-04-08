import { GOOGLE_API_KEY } from '../constants/app'
import axios from 'axios'

const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

const defaultParams = {
    language: 'ru',
    key: GOOGLE_API_KEY
};

const defaultAddress = {
    street: '',
    house: '',
    city: '',
    area: '',
    coordinates: {},
    country: '',
    postal_code: '',
    formatted_address: '',
    sublocality: ''
};

const geocoder = {
    async geocode(params) {
        try {
            params = {...defaultParams, ...params};
            let response = await axios.get(`${apiUrl}`, {params});
            if (response.status !== 200) {
                throw new Error('Bad status: ' + response.status);
            }

            let result = {
                ...defaultAddress,
                ...(response.data.results[1] && this.format(response.data.results[1]) || {}),
                ...(response.data.results[0] && this.format(response.data.results[0]) || {}),
            };
            result['full_address'] = this._formatFullAddress(result);

            return result;
        } catch (e) {
            console.log(e);
        }

        return null;
    },

    _hasType(addressPart, type) {
        return addressPart.types && addressPart.types.indexOf(type) > -1;
    },

    _formatFullAddress(result) {
        let parts = [];
        if (result['city']) {
            parts.push(result['city']);
        }

        if (result['street'] && result['street'] !== 'Unnamed Road') {
            parts.push(result['street']);
        }

        if (result['house']) {
            parts.push(result['house']);
        }

        return parts.join(', ');
    },

    format(addressParts) {
        let result = {};

        (addressParts['address_components'] || []).forEach(addressPart => {
            if (this._hasType(addressPart, 'street_number')) {
                result['house'] = addressPart['short_name'];
            } else if (this._hasType(addressPart, 'route')) {
                result['street'] = addressPart['short_name'];
            } else if (this._hasType(addressPart, 'locality')) {
                result['city'] = addressPart['short_name'];
            } else if (this._hasType(addressPart, 'administrative_area_level_1')) {
                result['area'] = addressPart['short_name'];
            } else if (this._hasType(addressPart, 'country')) {
                result['country'] = addressPart['long_name'];
            } else if (this._hasType(addressPart, 'postal_code')) {
                result['postal_code'] = addressPart['short_name'];
            } else if (this._hasType(addressPart, 'sublocality')) {
                result['sublocality'] = addressPart['short_name'];
            } else if (this._hasType(addressPart, 'administrative_area_level_2')) {
                result['city'] = addressPart['short_name'];
            }
        });
        result['formatted_address'] = addressParts.formatted_address;
        result['coordinates'] = {
            longitude: addressParts.geometry.location.lng,
            latitude: addressParts.geometry.location.lat,
        };

        return result;
    }
};

export default geocoder;