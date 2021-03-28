// Used to store category themes
const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CATEGORY_LIST':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default categoryReducer;
