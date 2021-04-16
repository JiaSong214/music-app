import '../styles/songList.scss';
import likeEmptyIcon from '../assets/like-empty.png';
import likeFullIcon from '../assets/like-full.png';
import playBtn from '../assets/play-btn.png';
import pauseBtn from '../assets/pause-btn.png';
import { pauseSong, playSong, stopSong } from '../store/modules/songs';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useEffect } from 'react';


const SongList = (data) => {
  const dispatch = useDispatch();
  const audioPlay = useSelector(state => state.songs.play, shallowEqual);
  const currentSong = useSelector(state => state.songs.current_song, shallowEqual);

  const convertTime = (ms) => {
    const date = new Date(ms).toISOString().slice(14, -1);
    return date.slice(0, 5)
  }

  const clickPlaySong = (song) => {
    const dataFormat = dataClean(song)
    //if there is no music, return
    if(dataFormat.preview_url === null) return;

    //if song is playing and you click same song's play button again, pause the song
    if(audioPlay && dataFormat.name === currentSong.name){
      dispatch(pauseSong(dataFormat));
    }else{
      //if you click diffrent song's play button,
      dispatch(stopSong());
      dispatch(playSong(dataFormat));
    }
  }

  //함수 이름좀 바꾸기;;
  const dataClean = (item) => {
    let dataFormat;
    if(item.preview_url !== undefined){
      dataFormat = item;
    }else if(item.track.preview_url !== undefined){
      dataFormat = item.track;
    }else {
      return;
    }
    return dataFormat;
  }


  if(!data || !data.data || !data.data.items) return null;
  return (
    <table className='songTable'>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data.data.items.map(item => {
          const dataFormat = dataClean(item);
          return <tr 
            key={dataFormat.name+dataFormat.duration_ms} 
            className={audioPlay && currentSong.name !== undefined && currentSong.name === dataFormat.name && currentSong.duration_ms === dataFormat.duration_ms ? 'songTable__item active' : 'songTable__item'}
            >
            <td className='songTable__playBtn' onClick={() => clickPlaySong(item)}>
              <img 
                src={audioPlay && currentSong.name !== undefined && currentSong.name === dataFormat.name && currentSong.duration_ms === dataFormat.duration_ms ? pauseBtn : playBtn} 
                alt='song play button'
              />
            </td>
            <td className='songTable__likeBtn'>
               <img src={data.type === 'likedSongs' ? likeFullIcon :likeEmptyIcon} alt='song like button' />
            </td>
            <td className='songTable__songName'>{dataFormat.name}</td>
            <td>{dataFormat.artists[0].name}</td>
            <td>{dataFormat.album ? dataFormat.album.name : data.album_name}</td>
            <td>{convertTime(dataFormat.duration_ms)}</td>
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default SongList;
