import { shallowEqual } from "@babel/types";
import { useDispatch, useSelector } from "react-redux";
import { pauseSong, playSong, setCurrentSong } from "../store/modules/play";

const useAudio = () => {
  const dispatch = useDispatch();
  const audioState = useSelector(state => state.play.play, shallowEqual);
  const playlist = useSelector(state => state.play.playlist, shallowEqual);
  const currentSong = useSelector(state => state.play.current_song, shallowEqual);

  const play = () => {
    if(!currentSong.name) return;

    audioState ? dispatch(pauseSong()) : dispatch(playSong());
  }


  const findSongIndex = () => {
    let current_playlist = playlist.tracks || playlist;
    let currentSongIndex;

    //if there is only one song in the list, return
    if(current_playlist.length === 1) return;

    //find a current playing song index in the list
    current_playlist.forEach((item, index) => {
      if((item.track?.id || item.id) === currentSong.id){
        currentSongIndex = index;
      }
    });

    return { current_playlist, currentSongIndex } ;
  }


  const putNextSong = () => {
    //if there isn't currentSong, return
    if(!currentSong.name) return;
    //if there isn't more than one song in current song list, return
    if(findSongIndex() === undefined) return;

    const { current_playlist, currentSongIndex } = findSongIndex();
    const nextSong = current_playlist[currentSongIndex + 1];

    const nextSongData = nextSong.track ?? nextSong;

    if((nextSongData.preview_url) === null) {
      return dispatch(pauseSong());
    }

    dispatch(setCurrentSong(nextSongData));
    audioState ? dispatch(playSong()) : dispatch(pauseSong());
  }


  const putReverseSong = () => {
    //if there isn't currentSong, return
    if(!currentSong.name) return;
    //if there isn't more than one song in current song list, return
    if(findSongIndex() === undefined) return;

    const { current_playlist, currentSongIndex } = findSongIndex();
    if(currentSongIndex <= 1) return;

    const reverseSong = current_playlist[currentSongIndex - 1];

    const reverseSongData = reverseSong.track ?? reverseSong;

    if((reverseSongData.preview_url) === null) {
      return dispatch(pauseSong());
    }

    dispatch(setCurrentSong(reverseSong.track || reverseSong));
    audioState ? dispatch(playSong()) : dispatch(pauseSong());
  }

  return { play, putNextSong, putReverseSong }
}

export default useAudio;