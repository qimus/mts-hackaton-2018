import api from 'constants/urls'
import _ from 'lodash'
import {
    ACTIVITY_ERROR,
    ACTIVITY_REQUEST,
    ACTIVITY_SUCCESS
} from 'constants/actions'
import request, { checkResponse } from 'utils/request'

export function getActivity(id) {
    return async (dispatch) => {
        dispatch({
            type: ACTIVITY_REQUEST
        });

        try {
            let response = await request.get(`${api.activities}/${id}`);
            let result = checkResponse(response);

            dispatch({
                type: ACTIVITY_SUCCESS,
                payload: result.result[0]
            });

        } catch (e) {
            console.log(e);
            dispatch({
                type: ACTIVITY_ERROR,
                error: _.get(e, 'response.data.message')
            });

            //throw e;
        }
    }
}

export function createActivity(values) {
    return async (dispatch) => {

        try {
            let response = await request.post(`${api.activities}`, values);
            let result = checkResponse(response);

        } catch (e) {
            console.log(e);

            throw e;
        }
    }
}