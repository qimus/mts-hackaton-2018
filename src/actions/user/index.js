import api from 'constants/urls'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS
} from 'constants/actions'
import request, { checkResponse } from 'utils/request'
import authUtils from 'utils/auth'

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
                payload: result
            });

            authUtils.setToken(result.token);

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
