const userListReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default userListReducer;