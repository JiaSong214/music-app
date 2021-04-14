import '../styles/albumInfo.scss';
import PlayButton from './playButton';

const AlbumInfo = (data) => {
  return (
    <div className='albumInfo'>
      <img src={data.data.images ? data.data.images[0].url : data.data.icons[0].url} alt='album cover' />
      <div className='albumInfo__innerbox'>
        <h1>ALBUM</h1>
        <h2>{data.data.name}</h2>
        <p>
          By <span>{data.data.artists ? data.data.artists[0].name : data.data.owner ? data.data.owner.display_name : ''}</span>, {data.data.total_tracks ? data.data.total_tracks : data.data.tracks ? data.data.tracks.total : ''} song
        </p>
        <PlayButton />
      </div>
    </div>
  );
}

export default AlbumInfo;