const initial_state = {
  data: [], 
};

const notifyAdminReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "GET_DATA_NOTIFY":
      return {
        ...state,
        data: action.payload,
      }; 
    default:
      return state;
  }
};

export default notifyAdminReducer;
