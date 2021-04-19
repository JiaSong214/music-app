import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchNewReleases, fetchFeatured, fetchCategories } from '../../api';
import AlbumList from '../albumList';
import '../../styles/browse.scss';

const Browse = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);
  const data = useSelector(state => state.browse.data, shallowEqual);


  useEffect(() => {
    //fetch default data
    dispatch(fetchNewReleases(accessToken));
  }, [accessToken, dispatch])


  const handleTapClick = (e) => {
    //remove effect
    const allTapButtons = e.target.parentElement.querySelectorAll('.active');
    allTapButtons.forEach(item => item.classList.remove('active'));

    //add effect for current tap
    e.target.classList.add('active');

    switch(e.target.innerHTML){
      case 'New Releases':
        dispatch(fetchNewReleases(accessToken));
        break;
      case 'Genres &amp; Moods':
        dispatch(fetchCategories(accessToken));
        break;
      case 'Featured':
        dispatch(fetchFeatured(accessToken));
        break;
      default:
    }
  }


  let modifiedData;

  //change data format
  if(data.albums){
    modifiedData = {
      type: 'newReleases',
      albums: data.albums
    }
  }else if(data.playlists){
    modifiedData = {
      type: 'featured',
      albums: data.playlists
    }
  }else if(data.categories){
    modifiedData = {
      type: 'categories',
      albums: data.categories
    }
  }


  if(!data) return null;
  return (
    <div className='view browse'>
      <div className='browse__titleBox'>
        <h1 className='view__title'>Browse</h1>
        <div className='tapButtons'>
          <div className='active' onClick={(e) => handleTapClick(e)}>New Releases</div>
          <div onClick={(e) => handleTapClick(e)}>Featured</div>
          <div onClick={(e) => handleTapClick(e)}>Genres & Moods</div>
        </div>
      </div>
      <AlbumList data={modifiedData} />
    </div>
  )
}

export default Browse;