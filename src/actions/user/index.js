import api from 'constants/urls'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS,

    USER_ERROR,
    USER_REQUEST,
    USER_SUCCESS
} from 'constants/actions'
import request, { checkResponse } from 'utils/request'
import authUtils from 'utils/auth'

export function getUser(userId) {
    return async (dispatch) => {
        dispatch({
            type: USER_REQUEST
        });

        try {

            let response = await request.get(api.users + '/' + userId);
            let result = checkResponse(response);

            dispatch({
                type: USER_SUCCESS,
                payload: result.result[0]
            });

        } catch (e) {
            console.log(e);
            dispatch({
                type: USER_ERROR,
                error: e.response.data.message
            });

            throw e;
        }
    }
}

export function auth({ login, password }) {
    return async (dispatch) => {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        try {
            let response = await request.post(api.auth, { login, password });
            let result = checkResponse(response);

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: result.result[0]
            });

            authUtils.setToken(result.result[0].auth_key);

            dispatch(getUser(result.result[0].user_id));

        } catch (e) {
            console.log(e);
            dispatch({
                type: USER_LOGIN_ERROR,
                error: e.response.data.message
            });

            throw e;
        }
    }
}

export function register(values) {
    return async (dispatch) => {

        try {
            let response = await request.post(api.users, values);
            let result = checkResponse(response);

            authUtils.setToken(result.token);



        } catch (e) {
            console.log(e);

            throw e;
        }
    }
}