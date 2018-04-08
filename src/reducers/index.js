import { combineReducers } from 'redux'

//reducers
import user from './user'
import events from './events'
import event from './event'
import organizations from './organizations'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    user,
    events,
    event,
    organizations,
    form: formReducer
})