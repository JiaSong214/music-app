import { useSelector, shallowEqual } from 'react-redux';
import AlbumInfo from '../albumInfo';
import SongList from '../songList';

const Playlist = () => {
  const currentPlaylist = useSelector(state => state.playlists.current_playlist, shallowEqual);
  const songs = useSelector(state => state.songs.data, shallowEqual);

  if(!currentPlaylist) return null;
  return (
    <div className='view playlist'>
      <AlbumInfo data={currentPlaylist} />
      <SongList data={songs} />
    </div>
  )
}

export default Playlist;