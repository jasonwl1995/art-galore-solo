const awsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_IMAGE_URL':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default awsReducer;
