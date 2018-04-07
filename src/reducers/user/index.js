import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,

    USER_SUCCESS
} from 'constants/actions'
import {USER_ERROR} from "../../constants/actions";

const initState = {
    isFetching: false,
    id: null
};

export default function user(state = initState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {...state, isFetching: true};
        case USER_LOGIN_SUCCESS:
        case USER_SUCCESS:
            return {...state, isFetching: false, ...action.payload, error: ''};
        case USER_LOGIN_ERROR:
        case USER_ERROR:
            return {...state, isFetching: false, error: action.error};
        default:
            return state;
    }
}
