const initial_state = {
    id : null,
    firstName : "",
}

const tutorsReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'GET_DATA_TUTORS' :
            return {
                ...state,
                id : action.payload.id,

            }
        default :
        return state
    }
}

export default tutorsReducer