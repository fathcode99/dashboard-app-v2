import {combineReducers} from 'redux';
import tutorsReducer from './tutorsReducer';
import usersReducer from './usersReducer';

export default combineReducers ({
    tutorsReducer, usersReducer
})