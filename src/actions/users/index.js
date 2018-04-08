import api from 'constants/urls'
import _ from 'lodash'
import {
    USERS_ERROR,
    USERS_REQUEST,
    USERS_SUCCESS
} from 'constants/actions'
import request, { checkResponse } from 'utils/request'


export function getUsers({typeId, page}) {
    return async (dispatch) => {
        dispatch({
            type: USERS_REQUEST,
            typeId: typeId
        });

        try {
            let response = await request.get(api.users, {type_id: typeId, page});
            let result = checkResponse(response);

            dispatch({
                type: USERS_SUCCESS,
                payload: result
            })

        } catch (e) {
            dispatch({
                type: USERS_ERROR,
                error: _.get(e, 'response.data.message')
            });
        }
    }
}

export function getProfileUser({id}) {
    return async (dispatch) => {
        dispatch({
            type: USERS_REQUEST,
        });

        try {
            let response = await request.get(api.users + '/' + id);
            let result = checkResponse(response);

            dispatch({
                type: USERS_SUCCESS,
                payload: result
            })

        } catch (e) {
            dispatch({
                type: USERS_ERROR,
                error: _.get(e, 'response.data.message')
            });
        }
    }
}
