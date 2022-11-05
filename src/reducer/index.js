import {combineReducers} from 'redux';
import tutorsReducer from './tutorsReducer';
import usersReducer from './usersReducer';
import studentsReducer from './studentsReducer'
import applyReducer from './applyReducer';

export default combineReducers ({
    tutorsReducer, usersReducer, studentsReducer, applyReducer
})