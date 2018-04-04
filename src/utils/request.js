import axios from 'axios'
import auth from './auth'
import _ from 'lodash'

function getHeaders() {
    let headers = {
        'Content-Type': 'application/json'
    };

    if (auth.isLoggedIn()) {
        let token = String(auth.getToken());
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (window.sessionId) {
        headers['X-Session-Id'] = window.sessionId;
    }

    return headers;
}

function applyFetch(url, options, method) {
    options = {...options};
    options['headers'] = {...getHeaders(), ...options.headers};
    options['mode'] = 'cors';

    return axios({
        ...options,
        url,
        method
    });
}

export function checkResponse(response) {

    if (response.status >= 200 && response.status < 400) {
        return response.data;
    }

    const error = _.get(response, 'data.error');
    if (error !== null && error !== undefined) {
        throw new Error(_.set({}, 'response.data.message', error));
    }

    throw new Error(_.set({}, 'response.data.message', response.status));
}

export function getCsrfToken() {
    let meta = document.getElementsByName('csrf-token')[0];
    if (!meta) {
        return null;
    }

    return meta.getAttribute('content');
}

const request = {
    get(url, params, options = {}) {
        if (params) {
            options['params'] = params;
        }

        return applyFetch(url, options, 'GET');
    },
    post(url, params, options = {}) {
        options['data'] = params;

        return applyFetch(url, options, 'POST');
    },
    put(url, data, options = {}) {
        options['data'] = data;
        return applyFetch(url, options, 'PUT');
    },
    del(url, options = {}) {
        return applyFetch(url, options, 'DELETE');
    },
    patch(url, options = {}) {
        return applyFetch(url, options, 'PATCH');
    },
    options(url, options = {}) {
        return applyFetch(url, options, 'OPTIONS');
    },
};

export default request;