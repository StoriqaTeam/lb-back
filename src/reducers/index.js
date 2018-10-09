import {combineReducers}  from 'redux';
import userReducer        from './User'


const initialState = {}

const rootReducer = combineReducers({userReducer, initialState});

export {rootReducer, initialState};
