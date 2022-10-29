const initial_state = {
    data : []
}

const tutorsReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'GET_DATA_TUTORS' :
            return {
                ...state,
                data : action.payload
            }
        default :
        return state
    }
}

export default tutorsReducer