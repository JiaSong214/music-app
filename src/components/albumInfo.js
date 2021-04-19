import '../styles/albumInfo.scss';
import PlayButton from './playButton';
import likeEmptyIcon from '../assets/like-empty.png';
import likeFullIcon from '../assets/like-full.png';
import { putMyAlbum } from '../api';
import { shallowEqual, useSelector } from 'react-redux';

const AlbumInfo = (data) => {
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);

  const clickLikeBtn = (event, data) => {
    putMyAlbum(accessToken, data.data.id);
    event.target.src = likeFullIcon;
  }

  return (
    <div className='albumInfo'>
      <img src={data.data.images ? data.data.images[0].url : data.data.icons[0].url} alt='album cover' />
      <div className='albumInfo__innerbox'>
        <h1>ALBUM</h1>
        <h2>{data.data.name}</h2>
        <p>
          By <span>{data.data.artists ? data.data.artists[0].name : data.data.owner ? data.data.owner.display_name : ''}</span>, {data.data.total_tracks ? data.data.total_tracks : data.data.tracks ? data.data.tracks.total : ''} song
        </p>
        <div className='albumInfo__btnBox'>
          <PlayButton />
          <div className='likeBtn'>
            <img 
              src={likeEmptyIcon} 
              alt='like button'
              onClick={(event) => clickLikeBtn(event, data)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;