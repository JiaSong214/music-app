const SET_PLAYLIST = 'play/SET_PLAYLIST';
const REMOVE_PLAYLIST = 'play/REMOVE_PLAYLIST';
const SET_CURRENT_SONG = 'play/SET_CURRENT_SONG';
const REMOVE_CURRENT_SONG = 'play/REMOVE_CURRENT_SONG';
const PLAY_SONG = 'play/PLAY_SONG';
const PAUSE_SONG = 'play/PAUSE_SONG';

export const setPlaylist = (songs) => ({
  type: SET_PLAYLIST,
  playlist : songs
});

export const removePlaylist = () => ({
  type: REMOVE_PLAYLIST,
});

export const setCurrentSong = (song) => ({
  type: SET_CURRENT_SONG,
  current_song: song
});

export const removeCurrentSong = () => ({
  type: REMOVE_CURRENT_SONG,
});

export const playSong = () => ({
  type: PLAY_SONG,
});

export const pauseSong = () => ({
  type: PAUSE_SONG,
})

const initialState = {
  playlist: {},
  current_song: {},
  play: false,
}

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case SET_PLAYLIST: 
      return {
        ...state,
        playlist: action.playlist
      }
    case REMOVE_PLAYLIST: 
      return {
        ...state,
        playlist: {}
      }
    case SET_CURRENT_SONG: 
      return {
        ...state,
        current_song: action.current_song
      }
    case REMOVE_CURRENT_SONG: 
      return {
        ...state,
        current_song: {}
      }
    case PLAY_SONG:
      return {
        ...state,
        play: true,
      };
    case PAUSE_SONG:
      return {
        ...state,
        play: false,
      };
    default:
      return state;
  }
}