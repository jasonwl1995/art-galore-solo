const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'SET_USER_DETAIL':
      return action.payload;
    case 'UNSET_USER':
      return {};
    // case 'EDIT_FAILED':
    //   return "Oops! That didn't work. The username might already be taken. Try again!";
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
