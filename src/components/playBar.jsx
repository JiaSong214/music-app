import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { pauseSong } from '../store/modules/play';
import useAudio from '../hooks/useAudio.jsx';
import playBtn from '../assets/play-btn.png';
import pauseBtn from '../assets/pause-btn.png';
import nextSongBtn from '../assets/next-song-btn.png';
import lastSongBtn from '../assets/last-song-btn.png';
import volumeIcon from '../assets/volume.png';
import '../styles/playBar.scss';

const PlayBar = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const audioState = useSelector(state => state.play.play, shallowEqual);
  const currentSong = useSelector(state => state.play.current_song, shallowEqual);
  const { play, putNextSong, putReverseSong } = useAudio();

  const [ playingTime, setPlayingTime ] = useState(0);

  //audio control
  useEffect(() => {
    if(audioState){
      audioRef.current.play();
    }else {
      audioRef.current.pause();
    }
  }, [audioState, currentSong]);

  //song processing bar
  useEffect(() => {
    let intervalId;

    //if audio state is play, 
    if(audioState){
      if(playingTime >= 30) {
        //and playing time is over than 30sec, stop the song
        setPlayingTime(0);
        dispatch(pauseSong());
      }else{
        //if not, keep counting the playing time
        intervalId = setInterval(() => {
          setPlayingTime(playingTime + 1);
        }, 1000);
      }
    }

    //clean
    return () => clearInterval(intervalId);
  }, [audioState, playingTime, dispatch]);
  
  
  //if current song is changed, reset playing time
  useEffect(() => {
    setPlayingTime(0);
  }, [currentSong]);


  const changeVolume = (e) => {
    audioRef.current.volume = e.target.value;
  }


  const clickPlay = () => play();
  const clickNextSong = () => putNextSong();
  const clickReverseSong = () => putReverseSong();

  return (
    <aside className="playBar">
      <div className='currentPlaySong'>
        {currentSong?.album &&
          <img 
            src={currentSong.album.images[0].url} 
            alt='current playing album cover' 
          />
        }
        <div>
          <p className='currentPlaySong__title'>
            {currentSong.name ?? ""}
          </p>
          <p className='currentPlaySong__artist'>
            {currentSong.artists ? currentSong.artists[0].name : ''}
          </p>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={currentSong.preview_url} 
      />
      <div className='songControl'>
        <div 
          className='reverseSong' 
          onClick={clickReverseSong}
        >
          <img 
            src={lastSongBtn} 
            alt='reverse button' 
          />
        </div>
        <div 
          className='playSong' 
          onClick={clickPlay}
        >
          <img 
            src={audioState ? pauseBtn : playBtn} 
            alt='play button' 
          />
        </div>
        <div 
          className='nextSong' 
          onClick={clickNextSong}>
          <img 
            src={nextSongBtn} 
            alt='next button' 
          />
        </div>
      </div>
      <div className='songProgress'>
        <div className='currentProgress'>
          0:{playingTime < 10 ? '0'+playingTime : playingTime}
        </div>
        <div className='progressBar'>
          <div 
            className='progressBar__progress' 
            style={{width: playingTime / 30 * 100 +'%'}} 
          />
        </div>
        <div className='expiredProgress'>
          0:{ -(playingTime - 30) < 10 ? '0'+- (playingTime - 30) : -(playingTime - 30) }
        </div>
      </div>
      <div className='volumeControl'>
        <img 
          src={volumeIcon} 
          alt='volume control' 
        />
        <input 
          type='range' 
          max='1' 
          min='0' 
          step='0.01' 
          onChange={changeVolume} 
        />
      </div>
    </aside>
  );
}

export default PlayBar;