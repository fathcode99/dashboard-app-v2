const initial_state = {
    id : null,
    username : "",
    password : ""
}

const usersReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'GET_DATA_ADMIN' :
            return {
                ...state,
                id : action.payload.id,
                username : action.payload.username,
                password : action.payload.password
            }
        default :
        return state
    }
}

export default usersReducer