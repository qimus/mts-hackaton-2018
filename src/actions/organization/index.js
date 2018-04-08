import api from 'constants/urls'
import _ from 'lodash'
import {
    ORGANIZATION_ERROR,
    ORGANIZATION_REQUEST,
    ORGANIZATION_SUCCESS
} from 'constants/actions'
import request, { checkResponse } from 'utils/request'

export function getOrganization(id) {
    return async (dispatch) => {
        dispatch({
            type: ORGANIZATION_REQUEST
        });

        try {
            let response = await request.get(`${api.organizations}/${id}`);
            let result = checkResponse(response);

            dispatch({
                type: ORGANIZATION_SUCCESS,
                payload: result.result[0]
            });

        } catch (e) {
            console.log(e);
            dispatch({
                type: ORGANIZATION_ERROR,
                error: _.get(e, 'response.data.message')
            });

            //throw e;
        }
    }
}