import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { playSong, pauseSong } from '../store/modules/songs';

import playBtn from '../assets/play-btn.png';
import pauseBtn from '../assets/pause-btn.png';
import nextSongBtn from '../assets/next-song-btn.png';
import lastSongBtn from '../assets/last-song-btn.png';
import volumeIcon from '../assets/volume.png';

import '../styles/playBar.scss';


const PlayBar = () => {
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


  const findSongIndex = () => {
    let refinedSongList = currentSongList.tracks ? currentSongList.tracks : currentSongList;
    let currentSongIndex;

    //if there is only one song in the list, return
    if(refinedSongList.items.length === 1) return;

    //find a current playing song index in the list
    refinedSongList.items.forEach((item, index) => {
      //first api data type check
      if(item.name !== undefined){
        if(item.name === currentSong.name && item.artists[0].name === currentSong.artists[0].name) currentSongIndex = index;
      }else if(item.track !== undefined){
        //second api data type check
        if(item.track.name === currentSong.name && item.track.artists[0].name === currentSong.artists[0].name) currentSongIndex = index;
      }
    });

    return { refinedSongList, currentSongIndex} ;
  }


  const clickNextSong = () => {
    //if there isn't currentSong, return
    if(!currentSong.name) return;

    const { refinedSongList, currentSongIndex } = findSongIndex();
    const nextSong = refinedSongList.items[currentSongIndex + 1];

    audioState.play ? 
      dispatch(playSong(nextSong.track ? nextSong.track : nextSong)) : dispatch(pauseSong(nextSong.track ? nextSong.track : nextSong));
  }


  const clickReverseSong = () => {
    //if there isn't currentSong, return
    if(!currentSong.name) return;

    const { refinedSongList, currentSongIndex } = findSongIndex();
    const reverseSong = refinedSongList.items[currentSongIndex - 1];

    audioState.play ? 
      dispatch(playSong(reverseSong.track ? reverseSong.track : reverseSong)) : dispatch(pauseSong(reverseSong.track ? reverseSong.track : reverseSong));
  }


  const changeVolume = (e) => {
    audioRef.current.volume = e.target.value;
  }


  //song processing bar
  useEffect(() => {
    let intervalId;

    //if audio state is play, 
    if(audioState.play){
      if(playingTime >= 30) {
        //and playing time is over than 30sec, stop the song
        setPlayingTime(0);
        dispatch(pauseSong(currentSong));
      }else{
        //if not, keep counting the playing time
        intervalId = setInterval(() => {
          setPlayingTime(playingTime + 1);
        }, 1000);
      }
    }

    //clean
    return () => clearInterval(intervalId);
  }, [audioState.play, playingTime, dispatch]);


  //if current song is changed, reset playing time
  useEffect(() => {
    setPlayingTime(0);
  }, [currentSong]);
  

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
        <div className='progressBar'>
          <div className='progressBar__progress' style={{width: playingTime / 30 * 100 +'%'}} />
        </div>
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