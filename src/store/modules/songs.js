//define action type
const PENDING_SONGS_FETCH = 'songs/PENDING_SONGS_FETCH';
const SUCCEED_SONGS_FETCH = 'songs/SUCCEED_SONGS_FETCH';
const FAIL_SONGS_FETCH = 'songs/FAIL_SONGS_FETCH';

const PENDING_SEARCH_SONGS_FETCH = 'songs/PENDING_SEARCH_SONGS_FETCH';
const SUCCEED_SEARCH_SONGS_FETCH = 'songs/SUCCEED_SEARCH_SONGS_FETCH';
const FAIL_SEARCH_SONGS_FETCH = 'songs/FAIL_SEARCH_SONGS_FETCH';

const PLAY_SONG = 'songs/PLAY_SONG';
const PAUSE_SONG = 'songs/PAUSE_SONG';
const STOP_SONG = 'songs/STOP_SONG';


//make action generate function
export const pendingSongsFetch = () => ({
  type: PENDING_SONGS_FETCH
});

export const succeedSongsFetch = (songs) => ({
  type: SUCCEED_SONGS_FETCH,
  data: songs
});

export const failSongsFetch = (error) => ({
  type: FAIL_SONGS_FETCH,
  error: error
});

export const pendingSearchSongsFetch = () => ({
  type: PENDING_SEARCH_SONGS_FETCH
});

export const succeedSearchSongsFetch = (songs, search_term) => ({
  type: SUCCEED_SEARCH_SONGS_FETCH,
  data: songs,
  search_term: search_term
});

export const failSearchSongsFetch = (error) => ({
  type: FAIL_SEARCH_SONGS_FETCH,
  error: error
});

export const playSong = (song) => ({
  type: PLAY_SONG,
  play: true,
  stop: false,
  current_song : song
});

export const pauseSong = (song) => ({
  type: PAUSE_SONG,
  play: false,
  stop: false,
  current_song : song
})

export const stopSong = () => ({
  type: STOP_SONG,
  play: false,
  stop: true,
})

//initial state of module
const initialState = {
  pending: false,
  data: {},
  search_term: '',
  current_song: {},
  play: false,
  stop: false,
  error: null
}

//make a reducer and export
export default function reducer (state = initialState, action) {
  console.log(action)
  switch(action.type) {
    case PENDING_SONGS_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_SONGS_FETCH:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case FAIL_SONGS_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case PENDING_SEARCH_SONGS_FETCH:
      return {
        ...state,
        pending: true
      };
    case SUCCEED_SEARCH_SONGS_FETCH:
      return {
        ...state,
        pending: false,
        data: action.data,
        search_term: action.search_term
      };
    case FAIL_SEARCH_SONGS_FETCH:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case PLAY_SONG:
      return {
        ...state,
        play: action.play,
        stop: action.stop,
        current_song : action.current_song
      };
    case PAUSE_SONG:
      return {
        ...state,
        play: action.play,
        stop: action.stop,
        current_song : action.current_song
      };
    case STOP_SONG:
      return {
        ...state,
        play: action.play,
        stop: action.stop
      };
    default:
      return state;
  }
}