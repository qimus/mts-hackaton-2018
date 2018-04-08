import {
    ORGANIZATIONS_SUCCESS,
    ORGANIZATIONS_REQUEST,
    ORGANIZATIONS_ERROR
} from 'constants/actions'

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

export default function organizations(state = initState, action) {
    switch (action.type) {
        case ORGANIZATIONS_REQUEST:
            return {...state, isFetching: true};

        case ORGANIZATIONS_SUCCESS:
            return {...state, isFetching: false, ...action.payload, error: ''};

        case ORGANIZATIONS_ERROR:
            return {...state, isFetching: false, error: action.error};

        default:
            return state;
    }
}
