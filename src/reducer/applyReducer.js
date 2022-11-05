const initial_state = {
    data : []
}

const applyReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'GET_DATA_APPLY' :
            return {
                ...state,
                data : action.payload
            }
        default :
        return state
    }
}

export default applyReducer