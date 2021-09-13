import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchPlaylist } from '../api.js';
import AlbumInfo from '../components/albumInfo.jsx';
import SongList from '../components/songList.jsx';

const Playlist = ({accessToken}) => {
  const { id } = useParams();
  const [songs, setSongs] = useState();
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    fetchPlaylist(accessToken, id)
      .then(data => {
        setPlaylist(data);
        setSongs(data.tracks.items);
      })
  }, [accessToken, id]);

  if(!songs) return null;
  return (
    <div className='view playlist'>
      <AlbumInfo data={playlist} />
      <SongList data={songs} />
    </div>
  )
}

export default Playlist;