import { useEffect, useState } from 'react';
import { fetchRecentlyPlayed } from '../api.js';
import PlayButton from '../components/playButton.jsx';
import SongList from "../components/songList.jsx"

const RecentlyPlayed = ({accessToken}) => {
  const [songs, setSongs] = useState();

  useEffect(() => {
    fetchRecentlyPlayed(accessToken)
      .then(data => setSongs(data))
  },[accessToken]);

  return (
    <div className='view'>
      <div className='view__titleBox'>
        <h1 className='view__title'>Recently Played</h1>
        <PlayButton playlist={songs} />
      </div>
      <SongList data={songs}/>
    </div>
  );
}

export default RecentlyPlayed;