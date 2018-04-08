import { combineReducers } from 'redux'

//reducers
import user from './user'
import events from './events'
import event from './event'
import organizations from './organizations'
import organization from './organization'
import users from './users'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    user,
    events,
    event,
    organizations,
    organization,
    users,
    form: formReducer
})