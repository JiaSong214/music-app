import { shallowEqual, useSelector } from 'react-redux';
import PlayButton from './playButton.jsx';
import likeEmptyIcon from '../assets/like-empty.png';
import likeFullIcon from '../assets/like-full.png';
import { putMyAlbum } from '../api';
import '../styles/albumInfo.scss';

const AlbumInfo = ({data}) => {
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);

  const clickLikeBtn = (event, data) => {
    putMyAlbum(accessToken, data.id);
    event.target.src = likeFullIcon;
  }

  return (
    <div className='albumInfo'>
      <img 
        src={data.images[0] ? data.images[0]?.url : data.icons[0].url || ""} 
        alt='album cover' 
      />
      <div className='albumInfo__innerbox'>
        <h1>ALBUM</h1>
        <h2>{data.name}</h2>
        <p>
          By &#160;
          <span>
            {data.owner?.display_name || data.artists[0]?.name || ''}
          </span>
          , {data.total_tracks || data.tracks?.total || ''} song
        </p>
        <div className='albumInfo__btnBox'>
          <PlayButton playlist={data.tracks.items} />
          <div className='likeBtn'>
            <img 
              src={likeEmptyIcon} 
              alt='like button'
              onClick={(event) => clickLikeBtn(event, data)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;