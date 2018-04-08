import {
    ACTIVITY_ERROR,
    ACTIVITY_REQUEST,
    ACTIVITY_SUCCESS
} from 'constants/actions'

const initState = {
    isFetching: false,
    event: null,
    error: null
};

export default function event(state = initState, action) {
    switch (action.type) {
        case ACTIVITY_REQUEST:
            return {...state, isFetching: true};

        case ACTIVITY_SUCCESS:
            return {...state, isFetching: false, event: action.payload, error: ''};

        case ACTIVITY_ERROR:
            return {...state, isFetching: false, error: action.error};

        default:
            return state;
    }
}
