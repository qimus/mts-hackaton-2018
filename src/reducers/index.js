import { combineReducers } from 'redux'

//reducers
import user from './user'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    user,
    form: formReducer
})