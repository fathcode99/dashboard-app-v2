import {combineReducers} from 'redux';
import tutorsReducer from './tutorsReducer';
import usersReducer from './usersReducer';
import studentsReducer from './studentsReducer'

export default combineReducers ({
    tutorsReducer, usersReducer, studentsReducer
})