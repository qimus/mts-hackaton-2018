import api from 'constants/urls'
import _ from 'lodash'
import {
    ACTIVITIES_ERROR,
    ACTIVITIES_REQUEST,
    ACTIVITIES_SUCCESS
} from 'constants/actions'
import request, { checkResponse } from 'utils/request'

export function getActivities({ cityId, status, organizationId, isSelf, page = 1 } = {}) {
    return async (dispatch) => {
        dispatch({
            type: ACTIVITIES_REQUEST
        });

        try {
            const params = {
                city_id: cityId,
                status,
                page,
                is_self: isSelf,
                organization_id: organizationId
            };
            let response = await request.get(api.activities, params);
            let result = checkResponse(response);

            dispatch({
                type: ACTIVITIES_SUCCESS,
                payload: result
            });

        } catch (e) {
            console.log(e);
            dispatch({
                type: ACTIVITIES_ERROR,
                error: _.get(e, 'response.data.message')
            });

            //throw e;
        }
    }
}