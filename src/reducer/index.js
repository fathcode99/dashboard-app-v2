import {combineReducers} from 'redux';
import tutorsReducer from './tutorsReducer';
import usersReducer from './usersReducer';
import studentsReducer from './studentsReducer'
import applyReducer from './applyReducer';
import biayaReducer from './biayaReducer';

export default combineReducers ({
    tutorsReducer, usersReducer, studentsReducer, applyReducer, biayaReducer
})