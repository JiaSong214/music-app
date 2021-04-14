
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect, useState } from 'react';
import { playSong, pauseSong, stopSong } from '../store/modules/songs';

import playBtn from '../assets/play-btn.png';
import pauseBtn from '../assets/pause-btn.png';
import nextSongBtn from '../assets/next-song-btn.png';
import lastSongBtn from '../assets/last-song-btn.png';

import '../styles/playBar.scss';



function PlayBar() {
  const dispatch = useDispatch();
  const audioPlay = useSelector(state => state.songs.play, shallowEqual);
  const audioStop = useSelector(state => state.songs.stop, shallowEqual);
  const currentSong = useSelector(state => state.songs.current_song, shallowEqual);
  const currentSongList = useSelector(state => state.songs.data, shallowEqual);
  const [ playingTime, setPlayingTime ] = useState(0)


  const clickPlaySong = () => {
    if(!currentSong.name) return;

    audioPlay ? dispatch(pauseSong(currentSong)) : dispatch(playSong(currentSong));
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


  //song processing bar
  useEffect(() => {
    if(audioStop) {
      setPlayingTime(0);
      console.log(audioStop + 'audio Stop')
      return;
    }

    if(!audioStop && !audioPlay) {
      console.log(audioPlay + 'audio pause')
      return;
    }

      const interval = setInterval(() => {
        setPlayingTime(playingTime + 1)
      }, 1000)

      setTimeout(() => {
        dispatch(pauseSong(currentSong));
        setPlayingTime(0)
      }, 30000);
    

    console.log(audioPlay, playingTime)

    return () => {
      clearInterval(interval);
    };
  }, [audioPlay, audioStop, playingTime]);


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
      <div className='songControl'>
        <div className='reverseSong' onClick={() => clickReverseSong()}>
          <img src={lastSongBtn} alt='reverse button' />
        </div>
        <div className='playSong' onClick={() => clickPlaySong()}>
          <img src={audioPlay ? pauseBtn : playBtn} alt='play button' />
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
      <div className='volumControl'>

      </div>
    </aside>
  );
}

export default PlayBar;