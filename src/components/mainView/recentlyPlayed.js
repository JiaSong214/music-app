import { useSelector, shallowEqual } from 'react-redux';
import SongList from "../songList"

const RecentlyPlayed = () => {
  const songs = useSelector(state => state.songs.data, shallowEqual);

  return (
    <div className='view'>
      <div className='view__titleBox'>
        <h1 className='view__title'>Recently Played</h1>
        <div className='playBtn'>Play</div>
      </div>
      <SongList data={songs}/>
    </div>
  );
}

export default RecentlyPlayed;