import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchAlbumTracks, fetchPlaylist } from '../api.js';
import AlbumInfo from '../components/albumInfo.jsx';
import SongList from '../components/songList.jsx';

const AlbumTracks = ({accessToken}) => {
  const { id } = useParams();
  const [album, setAlbum] = useState();

  useEffect(() => {
    const getData = async () => {
      const albumData = await fetchAlbumTracks(accessToken, id)
        .then(data => data);

      if(albumData.id) {
        setAlbum(albumData);
      }else {
        fetchPlaylist(accessToken, id)
          .then(data => setAlbum(data));
      }
    }

    getData()
  }, [accessToken, id]);

  return (!album || album.length === 0) ? "" : (
    <div className='albumTrack'>
      <AlbumInfo data={album} />
      <SongList data={album.tracks.items} />
    </div>
  )
}

export default AlbumTracks;