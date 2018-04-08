import {
    USERS_SUCCESS,
    USERS_REQUEST,
    USERS_ERROR
} from "../../constants/actions";

const initState = {
    isFetching: false,
    result: [],
    error: null,
    metadata: {
        totalCount: 0,
        pageCount: 1,
        currentPage: 1,
        perPage: 20
    }
};

export default function users(state = initState, action) {
    switch (action.type) {
        case USERS_REQUEST:
            return {...state, isFetching: true};

        case USERS_SUCCESS:
            return {...state, isFetching: false, ...action.payload, error: ''};

        case USERS_ERROR:
            return {...state, isFetching: false, error: action.error};

        default:
            return state;
    }
}