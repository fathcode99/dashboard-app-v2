const initial_state = {
    data : []
}

const studentsReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'GET_DATA_STUDENTS' :
            return {
                ...state,
                data : action.payload
            }
        default :
        return state
    }
}

export default studentsReducer