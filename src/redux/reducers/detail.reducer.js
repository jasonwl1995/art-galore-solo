// Used to store a single artworks details including category
const detailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAIL':
      return action.payload;
    case 'UNSET_ARTWORK_DETAIL':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default detailReducer;
