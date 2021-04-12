import { useSelector, shallowEqual } from 'react-redux';
import AlbumInfo from '../albumInfo';
import SongList from '../songList';

const AlbumTracks = () => {
  const album = useSelector(state => state.albums.data, shallowEqual);

  if(!album || !album.currentAlbum || !album.tracks) return null;
  return (
    <div className='albumTrack'>
      <AlbumInfo data={album.currentAlbum} />
      <SongList data={album.tracks.tracks} album_name={album.currentAlbum.name}/>
    </div>
  )
}

export default AlbumTracks;