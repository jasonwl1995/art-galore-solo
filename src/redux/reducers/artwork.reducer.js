const artworkReducer = (state = {}, action) => {
  console.log('inside artworkReducer, payload is:', action.payload);
  switch (action.type) {
    case 'SET_ARTWORK':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default artworkReducer;
