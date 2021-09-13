import { useEffect, useState } from 'react';
import { fetchAlbums } from '../api';
import AlbumList from "../components/albumList.jsx"

const Albums = ({accessToken}) => {
  const [albums, setAlbums] = useState();

  useEffect(() => {
    fetchAlbums(accessToken)
      .then(data => data.items && setAlbums(data.items))
      .catch(err => console.log(err));
  }, [accessToken]);

  return (
    <div className='view albums'>
      <h1 className='view__title'>Albums</h1>
      <AlbumList data={albums}/>
    </div>
  );
}

export default Albums;