import { useSelector, shallowEqual } from 'react-redux';
import AlbumList from "../albumList"

const Albums = () => {
  const albums = useSelector(state => state.albums.data, shallowEqual);

  return (
    <div className='view albums'>
      <h1 className='view__title'>Albums</h1>
      <AlbumList data={albums}/>
    </div>
  );
}

export default Albums;