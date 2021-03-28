// Used to store users profile picture from the Server
const awspfpReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PFP_URL':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default awspfpReducer;
