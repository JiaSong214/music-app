import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { playSong, pauseSong, setPlaylist, setCurrentSong } from '../store/modules/play';
import '../styles/playButton.scss';

const PlayButton = ({playlist}) => {
  const dispatch = useDispatch();
  const audioState = useSelector(state => state.play.play, shallowEqual);

  const clickPlay = () => {
    if(audioState){
      dispatch(pauseSong());
    }else {
      let songData = playlist[0].track || playlist[0];

      // if there is no current_music, return
      if(songData.preview_url === null) return;

      dispatch(setPlaylist(playlist));
      dispatch(setCurrentSong(songData));
      dispatch(playSong());
    }
  }

  return (
    <div className='playBtn' onClick={clickPlay}>
      {audioState ? 'PAUSE' : 'PLAY' }
    </div>
  );
}

export default PlayButton;