import { useSelector, shallowEqual } from 'react-redux';
import AlbumInfo from '../albumInfo';
import SongList from '../songList';

const Playlist = () => {
  const playlist = useSelector(state => state.playlists.data, shallowEqual);

  if(!playlist) return null;
  return (
    <div className='view playlist'>
      <AlbumInfo data={playlist.currentPlaylist} />
      <SongList data={playlist.tracks} />
    </div>
  )
}

export default Playlist;