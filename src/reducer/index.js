import {combineReducers} from 'redux';
import tutorsReducer from './tutorsReducer';
import usersReducer from './usersReducer';
import studentsReducer from './studentsReducer'
import applyReducer from './applyReducer';
import biayaReducer from './biayaReducer';
import notifyAdminReducer from './notifyAdminReducer';

export default combineReducers ({
    tutorsReducer, usersReducer, studentsReducer, applyReducer, biayaReducer, notifyAdminReducer
})