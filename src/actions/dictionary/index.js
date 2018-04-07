import { CALL_API } from 'redux-api-middleware'

import {
    DICTIONARY_ERROR,
    DICTIONARY_REQUEST,
    DICTIONARY_SUCCESS
} from 'constants/actions'
import api from 'constants/urls'
import request from 'utils/request'

export const getDictionary = ({ name }) => {
    return async (dispatch) => {
        dispatch({
            type: DICTIONARY_REQUEST,
            name
        });

        //let response = await request.get()
    }
};