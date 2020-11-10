export const initialState = {
  token: null,
  user: null,
  myDevices: null,
  playlists: [],
  choosenPlaylist: null,
  userTracks: null,
  playing: false,
  song: null,
  offset: 0,
  limit: 50,
  restart: null,
  fullSong: 0,
  volumeLvl: null,
  alertMessage: null,
  handlePlayPause: null,
  shuffleState: false,
  setShuffleSong: null,
};

const reducer = (state, action) => {
  console.log({ action });

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
    case "SET_MY_DEVICES":
      return {
        ...state,
        myDevices: action.myDevices,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
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
    case "SET_FULL_SONG":
      return {
        ...state,
        fullSong: action.fullSong,
      };
    case "SET_RESTART":
      return {
        ...state,
        restart: action.restart,
      };
    case "SET_VOLUME_LEVEL":
      return {
        ...state,
        volumeLvl: action.volumeLvl,
      };
    case "SET_HANDLE_PLAY_PAUSE":
      return {
        ...state,
        handlePlayPause: action.handlePlayPause,
      };
    case "SET_SHUFFLE_STATE":
      return {
        ...state,
        shuffleState: action.shuffleState,
      };
    case "SET_SHUFFLE_SONG":
      return {
        ...state,
        setShuffleSong: action.setShuffleSong,
      };
    case "SET_ALERT_MESSAGE":
      return {
        ...state,
        alertMessage: action.alertMessage,
      };
    case "LOGOUT":
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default reducer;
