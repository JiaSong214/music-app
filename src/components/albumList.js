import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchAlbumTracks } from '../api';
import { setCurrentAlbum } from '../store/modules/albums';
import { updateViewType } from '../store/modules/mainView';
import '../styles/albumList.scss';

const AlbumList = (data) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);

  const handleAlbumClick = (item) => {
    if(data.data.type === 'categories') return;

    //update a view type
    dispatch(updateViewType('albumTrack'));
    //keep current target album
    dispatch(setCurrentAlbum(item.album? item.album : item));
    //get a target album's tracks from Api
    dispatch(fetchAlbumTracks(accessToken, item.href ? item.href : item.album.href));
  }


  if(!data.data || !data.data.albums || !data.data.albums.items) return null;
  return (
    <ul className='albumList'>

     {data.data.albums.items.map(item => (
        <li className='albumList__item' 
        key={item.album ? item.album.name : item.name} 
        onClick={() => handleAlbumClick(item)}
        >
          <img className='albumList__img' 
          src={ item.images ? item.images[0].url : item.icons? item.icons[0].url : item.album ? item.album.images[0].url : ''} 
          alt='album cover' />


          {data.data.type !== 'featured' && data.data.type !== 'categories' ? 
            <div>
              <h2 className='albumList__title'>
                {item.name ? item.name : item.album ? item.album.name : ''}
              </h2>
              <h3 className='albumList__artist'>
                {item.artists ? item.artists[0].name: item.album ? item.album.artists[0].name : ''}
              </h3>
            </div>
          : ''}

          {data.data.type === 'categories' ?
            <h2 className='albumList__title--categories'>
              {item.name ? item.name : ''}
            </h2>
          : ''}

        </li>
      ))}
      
    </ul>
  )
}

export default AlbumList;
