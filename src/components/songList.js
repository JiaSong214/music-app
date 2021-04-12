import '../styles/songList.scss';
import likeEmptyIcon from '../assets/like-empty.png';
import likeFullIcon from '../assets/like-full.png';
import playBtn from '../assets/play-btn.png';
import { pauseSong, playSong } from '../store/modules/songs';
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
    //if you click same song's play button again,
    if(song.track.name === currentSong.name){
      // check if that song is playing now, and pause the song
      if(audioPlay) {
        dispatch(pauseSong());
        // console.log('same song pause')
      }else{
        dispatch(playSong(song.track))
        // console.log('same song play')
      }
    }else{
      //if you click diffrent song's play button,
      dispatch(playSong(song.track))
      // console.log('different song play')
    }
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
        {data.data.items.map(item => (
          <tr key={item.track ? item.track.name+item.track.duration_ms : item.name+item.duration_ms}>
            <td className='songTable__playBtn' onClick={() => clickPlaySong(item)}>
              <img src={playBtn} alt='song play button'/>
            </td>
            <td className='songTable__likeBtn'>
               <img src={data.type === 'likedSongs' ? likeFullIcon :likeEmptyIcon} alt='song like button' />
            </td>
            <td>{item.track ? item.track.name : item.name}</td>
            <td>{item.track ? item.track.artists[0].name : item.artists[0].name}</td>
            <td>{item.track ? item.track.album.name : item.album ? item.album.name : data.album_name}</td>
            <td>{convertTime(item.track? item.track.duration_ms : item.duration_ms)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SongList;
