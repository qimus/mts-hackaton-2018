import {
    ORGANIZATION_ERROR,
    ORGANIZATION_REQUEST,
    ORGANIZATION_SUCCESS
} from 'constants/actions'

const initState = {
    isFetching: false,
    organization: null,
    error: null
};

export default function organization(state = initState, action) {
    switch (action.type) {
        case ORGANIZATION_REQUEST:
            return {...state, isFetching: true};

        case ORGANIZATION_SUCCESS:
            return {...state, isFetching: false, organization: action.payload, error: ''};

        case ORGANIZATION_ERROR:
            return {...state, isFetching: false, error: action.error};

        default:
            return state;
    }
}
