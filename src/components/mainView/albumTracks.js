import { useSelector, shallowEqual } from 'react-redux';
import AlbumInfo from '../albumInfo';
import SongList from '../songList';

const AlbumTracks = () => {
  const album = useSelector(state => state.albums.data, shallowEqual);
  const songs = useSelector(state => state.songs.data, shallowEqual);

  if(!album || !songs) return null;
  return (
    <div className='albumTrack'>
      <AlbumInfo data={album.currentAlbum} />
      <SongList data={songs.tracks} album_name={album.currentAlbum.name}/>
    </div>
  )
}

export default AlbumTracks;