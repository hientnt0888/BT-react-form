import { combineReducers, createStore } from 'redux'
import { formReducer } from './redux-form/reducer'

const rootReducers = combineReducers({
    formReducer,
})

export const store = createStore(
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()

)