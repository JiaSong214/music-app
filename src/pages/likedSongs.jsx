import { useEffect, useState } from 'react';
import { fetchLikedSongs } from '../api.js';
import PlayButton from '../components/playButton.jsx';
import SongList from "../components/songList.jsx";

const LikedSongs = ({accessToken}) => {
  const [songs, setSongs] = useState();

  useEffect(() => {
    fetchLikedSongs(accessToken)
      .then(data => setSongs(data.items));
  },[accessToken]);

  return (
    <div className='view'>
      <div className='view__titleBox'>
        <h1 className='view__title'>Liked Songs</h1>
        <PlayButton playlist={songs} />
      </div>
      <SongList data={songs} type='likedSongs'/>
    </div>
  );
}

export default LikedSongs;