import api from 'constants/urls'
import _ from 'lodash'
import {
    ORGANIZATIONS_ERROR,
    ORGANIZATIONS_REQUEST,
    ORGANIZATIONS_SUCCESS
} from 'constants/actions'
import request, { checkResponse } from 'utils/request'

export function getOrganizations({ cityId, isSponsor, page = 1 } = {}) {
    return async (dispatch) => {
        dispatch({
            type: ORGANIZATIONS_REQUEST
        });

        try {
            const params = {
                city_id: cityId,
                page,
                is_sponsor: isSponsor
            };
            let response = await request.get(api.organizations, params);
            let result = checkResponse(response);

            dispatch({
                type: ORGANIZATIONS_SUCCESS,
                payload: result
            });

        } catch (e) {
            console.log(e);
            dispatch({
                type: ORGANIZATIONS_ERROR,
                error: _.get(e, 'response.data.message')
            });

            //throw e;
        }
    }
}