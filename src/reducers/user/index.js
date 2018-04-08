import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,

    USER_SUCCESS,
    USER_LOGOUT,
    USER_ERROR
} from 'constants/actions'

const initState = {
    isFetching: false,
    id: undefined
};

export default function user(state = initState, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {...state, isFetching: true};
        case USER_LOGIN_SUCCESS:
        case USER_SUCCESS:
            return {...state, id: null, isFetching: false, ...action.payload, error: ''};
        case USER_LOGIN_ERROR:
        case USER_ERROR:
            return {...state, isFetching: false, id: null, error: action.error};
        case USER_LOGOUT:
            return initState;
        default:
            return state;
    }
}
