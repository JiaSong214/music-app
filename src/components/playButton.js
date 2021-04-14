import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { playSong, pauseSong } from '../store/modules/songs';
import '../styles/playButton.scss';

const PlayButton = () => {
  const dispatch = useDispatch();
  const audioPlay = useSelector(state => state.songs.play, shallowEqual);
  const currentSong = useSelector(state => state.songs.current_song, shallowEqual);

  const clickPlaySong = () => {
    if(audioPlay === false){
      dispatch(playSong(currentSong));
    }else if(audioPlay === true){
      dispatch(pauseSong(currentSong));
    }
  }

  return (
    <div className='playBtn' onClick={() => clickPlaySong()}>
      {audioPlay ? 'PAUSE' : 'PLAY' }
    </div>
  );
}

export default PlayButton;