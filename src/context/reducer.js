export const initialState = {
  token:
    "BQDj8k59zdVQ-Y3UYVsexufMoBTeNv54cfH64ELTsIHfEpEEGh3Jt1PFWWAQgtiR9PwAE98gIOg-w1FUQIUzpc7tNG4kkunHLlvzmy-dwT3Qx3r_NqeRKHxBLiwUmsoKlqhWflG1isbJkVTS74ZasBJM2JouWlpg",
  user: null,
  playlists: [],
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
    default:
      return state;
  }
};

export default reducer;
