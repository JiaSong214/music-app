import '../styles/playBar.scss';
import playBtn from '../assets/play-btn.png';
import nextSongBtn from '../assets/next-song-btn.png';
import lastSongBtn from '../assets/last-song-btn.png';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect, useRef } from 'react';
import { fetchCurrentPlaying } from '../api';
import { playSong, pauseSong } from '../store/modules/songs';


function PlayBar() {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.token.token, shallowEqual);
  const audioPlay = useSelector(state => state.songs.play);
  const currentSong = useSelector(state => state.songs.current_song);


  const clickPlaySong = () => {
    if(audioPlay === false){
      dispatch(playSong());
    }else if(audioPlay === true){
      dispatch(pauseSong());
    }
  }


  useEffect(() => {
    //fetch default data
    dispatch(fetchCurrentPlaying(accessToken));
  }, [accessToken, dispatch])


  const inputRef = useRef();

  useEffect(() => {
    //if play state is true,
    if(audioPlay){
      //check if current song is set
      if (currentSong) {
        //and set the song in audio, play
        inputRef.current.src = currentSong.preview_url;
        inputRef.current.play();

        console.log(`start ${currentSong.name}`)
      }
    }else{
      //if play state is false, stop the song
      inputRef.current.pause();

      console.log(`pause ${currentSong.name}`)

    }
  }, [audioPlay, currentSong])



  return (
    <aside className="playBar">
      <audio ref={inputRef}/>

      <div className='currentPlaySong'>
        {currentSong.album ?
          <img src={currentSong.album.images[0].url} alt='current playing album cover' /> : ''
        }
        <div>
          <p className='currentPlaySong__title'>{currentSong.name ? currentSong.name : ''}</p>
          <p className='currentPlaySong__artist'>{currentSong.artists ? currentSong.artists[0].name : ''}</p>
        </div>
      </div>
      <div className='songControl'>
        <div className='reverseSong'>
          <img src={lastSongBtn} alt='reverse button' />
        </div>
        <div className='playSong' onClick={() => clickPlaySong()}>
          <img src={playBtn} alt='play button' />
        </div>
        <div className='nextSong'>
          <img src={nextSongBtn} alt='next button' />
        </div>
      </div>
      <div className='songProgress'>
        <div className='currentProgress'>0:00</div>
        <div className='progressBar'></div>
        <div className='expiredProgress'>0:30</div>
      </div>
      <div className='volumControl'>

      </div>
    </aside>
  );
}

export default PlayBar;