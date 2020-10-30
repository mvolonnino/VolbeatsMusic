export const initialState = {
  token: null,
  user: null,
  playlists: [],
  choosenPlaylist: null,
  playing: false,
  song: null,
  offset: 0,
  limit: 50,
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
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_CHOOSEN_PLAYLIST":
      return {
        ...state,
        choosenPlaylist: action.choosenPlaylist,
      };
    case "SET_SONG":
      return {
        ...state,
        song: action.song,
      };
    case "SET_USER_TRACKS":
      return {
        ...state,
        userTracks: action.userTracks,
      };
    case "SET_OFFSET":
      return {
        ...state,
        offset: action.offset,
      };
    case "LOGOUT":
      return {
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
