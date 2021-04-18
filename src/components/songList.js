import '../styles/songList.scss';
import likeEmptyIcon from '../assets/like-empty.png';
import likeFullIcon from '../assets/like-full.png';
import playBtn from '../assets/play-btn.png';
import pauseBtn from '../assets/pause-btn.png';
import { pauseSong, playSong  } from '../store/modules/songs';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';


const SongList = (data) => {
  const dispatch = useDispatch();
  const audioPlay = useSelector(state => state.songs.play, shallowEqual);
  const currentSong = useSelector(state => state.songs.current_song, shallowEqual);

  const convertTime = (ms) => {
    const date = new Date(ms).toISOString().slice(14, -1);
    return date.slice(0, 5)
  }

  const clickPlaySong = (song) => {
    const refinedData = refineData(song);
    //if there is no music, return
    if(refinedData.preview_url === null) return;

    //if song is playing and you click same song's play button again, pause the song
    if(audioPlay && refinedData.name === currentSong.name){
      dispatch(pauseSong(refinedData));
    }else{
      //if you click diffrent song's play button,
      dispatch(playSong(refinedData));
    }
  }


  const refineData = (item) => {
    let refinedData;
    if(item.preview_url !== undefined){
      refinedData = item;
    }else if(item.track.preview_url !== undefined){
      refinedData = item.track;
    }else {
      return;
    }
    return refinedData;
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
          const refinedData = refineData(item);
          return <tr 
            key={refinedData.name+refinedData.duration_ms} 
            className={currentSong.name !== undefined && currentSong.name === refinedData.name && currentSong.duration_ms === refinedData.duration_ms ? 'songTable__item active' : 'songTable__item'}
            >
            <td className='songTable__playBtn' onClick={() => clickPlaySong(item)}>
              <img 
                src={audioPlay && currentSong.name !== undefined && currentSong.name === refinedData.name && currentSong.duration_ms === refinedData.duration_ms ? pauseBtn : playBtn} 
                alt='song play button'
              />
            </td>
            <td className='songTable__likeBtn'>
               <img src={data.type === 'likedSongs' ? likeFullIcon :likeEmptyIcon} alt='song like button' />
            </td>
            <td className='songTable__songName'>{refinedData.name}</td>
            <td>{refinedData.artists[0].name}</td>
            <td>{refinedData.album ? refinedData.album.name : data.album_name}</td>
            <td>{convertTime(refinedData.duration_ms)}</td>
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default SongList;
