export const initialState = {
  user: null,
  playlist: [],
  playing: false,
  item: null,
};

// this takes state of DataLayer and action. Action is like 'setUser, setPlaylists, etc'
const reducer = (state, action) => {
  console.log({ action });
  // action -> type, [payload] payload is user
  // when we want to push a user into DataLayer, dispatch an action that has a type i.e 'SET_USER' and return the new state.
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
  }
};

export default reducer;
