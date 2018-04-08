import {
    ACTIVITIES_ERROR,
    ACTIVITIES_REQUEST,
    ACTIVITIES_SUCCESS
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

export default function events(state = initState, action) {
    switch (action.type) {
        case ACTIVITIES_REQUEST:
            return {...state, isFetching: true};

        case ACTIVITIES_SUCCESS:
            return {...state, isFetching: false, ...action.payload, error: ''};

        case ACTIVITIES_ERROR:
            return {...state, isFetching: false, error: action.error};

        default:
            return state;
    }
}
