const initial_state = {
    id : null,
    email : "",
    username : "",
    password : ""
}

const usersReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'GET_DATA_ADMIN' :
            return {
                ...state,
                id : action.payload.id,
                email : action.payload.email,
                username : action.payload.username,
                password : action.payload.password
            }
        default :
        return state
    }
}

export default usersReducer