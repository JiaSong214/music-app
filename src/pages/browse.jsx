import { useEffect, useState } from 'react';
import { fetchNewReleases, fetchFeatured, fetchCategories } from '../api';
import AlbumList from '../components/albumList.jsx';
import '../styles/browse.scss';

const Browse = ({accessToken}) => {
  const [albums, setAlbums] = useState();

  useEffect(() => {
    fetchNewReleases(accessToken)
      .then(data => setAlbums(data.albums.items))
      .catch(err => console.log(err));
  }, [accessToken])


  const handleTapClick = (e, index) => {
    //remove effect
    const allTapButtons = e.target.parentElement.querySelectorAll('.active');
    allTapButtons.forEach(item => item.classList.remove('active'));

    //add effect for current tap
    e.target.classList.add('active');

    switch(index){
      case 1:
      default:
        fetchNewReleases(accessToken)
          .then(data => setAlbums(data.albums.items));
        break;
      case 2:
        fetchFeatured(accessToken)
          .then(data => setAlbums(data.playlists.items));
        break;
      case 3:
        fetchCategories(accessToken)
          .then(data => setAlbums(data.categories.items));
        break;
    }
  }

  return !albums ? null : (
    <div className='view browse'>
      <div className='browse__titleBox'>
        <h1 className='view__title'>Browse</h1>
        <div className='tapButtons'>
          <div 
            className='active' 
            onClick={(e) => handleTapClick(e, 1)}
          >
            New Releases
          </div>
          <div onClick={(e) => handleTapClick(e, 2)}>
            Featured
          </div>
          <div onClick={(e) => handleTapClick(e, 3)}>
            Genres & Moods
          </div>
        </div>
      </div>
      <AlbumList data={albums}/>
    </div>
  )
}

export default Browse;