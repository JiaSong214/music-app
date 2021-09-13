import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { pauseSong, playSong, setCurrentSong, setPlaylist  } from '../store/modules/play';
import { putLikedSong } from '../api';
import likeEmptyIcon from '../assets/like-empty.png';
import likeFullIcon from '../assets/like-full.png';
import playBtn from '../assets/play-btn.png';
import pauseBtn from '../assets/pause-btn.png';
import '../styles/songList.scss';

const SongList = ({data}) => {
  const dispatch = useDispatch();
  const access_token = useSelector(state => state.token.access_token, shallowEqual);

  const audioState = useSelector(state => state.play.play, shallowEqual);
  const currentSong = useSelector(state => state.play.current_song, shallowEqual);

  const convertTime = (ms) => {
    const date = new Date(ms).toISOString().slice(14, -1);
    return date.slice(0, 5)
  }

  const clickPlay = (song) => {
    // if song was playing, pause song
    if(audioState) return dispatch(pauseSong());

    let songData = song.track || song;

    // if there is no current_music, return
    if(songData.preview_url === null) return;

    dispatch(setCurrentSong(songData));
    dispatch(setPlaylist(data));
    dispatch(playSong());
  }

  const clickLike = (event, song) => {
    putLikedSong(access_token, song.id || song.track.id);
    event.target.src=likeFullIcon;
  }

  return (!data || data.length === 0) ? "" : (
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
        {data.map(item => (
          <tr
            key={item.track?.id || item.id}
            className={
              audioState && 
              currentSong?.id === (item.track?.id || item.id) 
              ? 'songTable__item active' : 'songTable__item'
            }
            >
            <td 
              className='songTable__playBtn' 
              onClick={() => clickPlay(item)}
            >
              <img 
                src={
                  audioState && 
                  currentSong?.id === (item.track?.id || item.id) 
                  ? pauseBtn : playBtn
                } 
                alt='song play button'
              />
            </td>
            <td className='songTable__likeBtn'>
              <img 
                src={likeEmptyIcon} 
                alt='song like button' 
                onClick={(event) => clickLike(event, item)}
              />
            </td>
            <td className='songTable__songName'>
              {item.track?.name || item.name}
            </td>
            <td>
              {item.track?.artists[0].name || item.artists[0].name}
            </td>
            <td>
              {item.track?.album?.name || item.album_name}
            </td>
            <td>
              {convertTime(item.track?.duration_ms || item.duration_ms)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SongList;
