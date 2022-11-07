const initial_state = {
    data : []
}

const biayaReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'GET_DATA_BIAYA' :
            return {
                ...state,
                data : action.payload
            }
        default :
        return state
    }
}

export default biayaReducer