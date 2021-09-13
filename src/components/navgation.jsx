import { useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlaylists } from '../api';
import '../styles/navgation.scss';

const Navigation = () => {
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    fetchPlaylists(accessToken)
      .then(data => setPlaylists(data.items));
  }, [accessToken]);

  return (
    <nav>
      <div>
        <Link to="/">Browse</Link>
      </div>
      <h1>YOUR LIBRARY</h1>
      <div>
        <Link to="/recently-played">Recently Played</Link>
        <Link to="/liked-songs">Liked Songs</Link>
        <Link to="/albums">Albums</Link>
        <Link to="/artists">Artists</Link>
      </div>
      <h1>PLAYLISTS</h1>
      <div>
        {playlists?.map((item, index) => (
          <Link 
            key={index} 
            to={`/playlist/${item.id}`}
          >
            {item.name}
          </Link>
        )) || null}
      </div>
    </nav>
  );
}

export default Navigation;