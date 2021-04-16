
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { playSong, pauseSong, stopSong } from '../store/modules/songs';

import playBtn from '../assets/play-btn.png';
import pauseBtn from '../assets/pause-btn.png';
import nextSongBtn from '../assets/next-song-btn.png';
import lastSongBtn from '../assets/last-song-btn.png';
import volumeIcon from '../assets/volume.png';

import '../styles/playBar.scss';


function PlayBar() {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const audioState = useSelector(state => state.songs, shallowEqual);
  const currentSong = useSelector(state => state.songs.current_song, shallowEqual);
  const currentSongList = useSelector(state => state.songs.data, shallowEqual);
  const [ playingTime, setPlayingTime ] = useState(0);



  //audio control
  useEffect(() => {
    //stop
    if(audioState.stop){
      if(audioRef.current === null || audioRef.current.src === undefined) return;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      return;
    }

    //pause
    if(!audioState.play){
      if(audioRef.current === null || audioRef.current.src === undefined) return;
      audioRef.current.pause();
    }

    //play
    if(audioState.play){
      audioRef.current.play();
    }
  
  }, [audioState]);


  const clickPlaySong = () => {
    if(!currentSong.name) return;

    audioState.play ? dispatch(pauseSong(currentSong)) : dispatch(playSong(currentSong));
  }


  const clickNextSong = () => {
    if(!currentSong.name) return;

    let dataFormat = currentSongList.tracks ? currentSongList.tracks : currentSongList;
    let indexNum;

    dataFormat.items.forEach((item, index) => {
      if(item.name !== undefined){
        if(item.name === currentSong.name) indexNum = index;
      }else if(item.track !== undefined){
        if(item.track.name === currentSong.name) indexNum = index;
      }
    });

    const nextSong = dataFormat.items[indexNum + 1];
    console.log(nextSong)
    dispatch(stopSong());
    dispatch(playSong(nextSong.track? nextSong.track : nextSong));
  }


  const clickReverseSong = () => {
    if(!currentSong.name) return;

    let dataFormat = currentSongList.tracks ? currentSongList.tracks : currentSongList;
    let indexNum;

    dataFormat.items.forEach((item, index) => {
      if(item.name !== undefined){
        if(item.name === currentSong.name) indexNum = index;
      }else if(item.track !== undefined){
        if(item.track.name === currentSong.name) indexNum = index;
      }
    });

    const reverseSong = dataFormat.items[indexNum - 1];
    dispatch(stopSong());
    dispatch(playSong(reverseSong.track));
  }


  const changeVolume = (e) => {
    audioRef.current.volume = e.target.value;
  }

  //useEffect가 일어날때마다 중복실행되는 문제점
  const countTime = () => {
    console.log(`count time: ${playingTime}`);

    let intervalId;

    if(playingTime >= 30) {
      clearInterval(intervalId);
      setPlayingTime(0);
      stopSong();

    }else{
      intervalId = setInterval(() => {
        setPlayingTime(playingTime + 1);
      }, 1000);
    }
  }

  // song processing bar
  useEffect(() => {
    console.log(`play: ${audioState.play}, stop: ${audioState.stop}`)
    console.log(`count time: ${playingTime}`);
    let intervalId;

    let sec = 0;

    if(audioState.stop) {
      setPlayingTime(0);
      sec = 0;

    }else{
      if(audioState.play){


        if(sec >= 30) {
          clearInterval(intervalId);
          setPlayingTime(0);
          stopSong();
    
        }else{
          intervalId = setInterval(() => {
            setPlayingTime(playingTime + 1);
            sec = sec + 1;
            console.log(sec)
  
          }, 1000);
        }
      }
    }

    return () => clearInterval(intervalId);

  }, [audioState.stop, audioState.play])
  


  return (
    <aside className="playBar">
      <div className='currentPlaySong'>
        {currentSong.album ?
          <img src={currentSong.album.images[0].url} alt='current playing album cover' /> : ''
        }
        <div>
          <p className='currentPlaySong__title'>{currentSong.name ? currentSong.name : ''}</p>
          <p className='currentPlaySong__artist'>{currentSong.artists ? currentSong.artists[0].name : ''}</p>
        </div>
      </div>
      <audio ref={audioRef} src={currentSong.preview_url}></audio>
      <div className='songControl'>
        <div className='reverseSong' onClick={() => clickReverseSong()}>
          <img src={lastSongBtn} alt='reverse button' />
        </div>
        <div className='playSong' onClick={() => clickPlaySong()}>
          <img src={audioState.play ? pauseBtn : playBtn} alt='play button' />
        </div>
        <div className='nextSong' onClick={() => clickNextSong()}>
          <img src={nextSongBtn} alt='next button' />
        </div>
      </div>
      <div className='songProgress'>
        <div className='currentProgress'>
          0:{playingTime < 10 ? '0'+playingTime : playingTime}
        </div>
        <div className='progressBar'></div>
        <div className='expiredProgress'>
          0:{ -(playingTime - 30) < 10 ? '0'+- (playingTime - 30) : -(playingTime - 30) }
        </div>
      </div>
      <div className='volumeControl'>
        <img src={volumeIcon} alt='volume control' />
        <input type='range' max='1' min='0' step='0.01' onChange={(e) => changeVolume(e)} />
      </div>
    </aside>
  );
}

export default PlayBar;