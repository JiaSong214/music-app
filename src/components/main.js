import { useSelector, shallowEqual } from 'react-redux';
import '../styles/main.scss';

import Browse from './mainView/browse';
import LikedSongs from './mainView/likedSongs';
import RecentlyPlayed from './mainView/recentlyPlayed';
import Albums from './mainView/albums';
import Artists from './mainView/artists';
import Playlist from './mainView/playlist';
import SearchResults from './mainView/searchResults';
import AlbumTracks from './mainView/albumTracks';

const Main = () => {
  const viewType = useSelector(state => state.mainView.viewType, shallowEqual);

  return (
    <main className="main">
      {
        viewType === 'browse' || viewType === '' ? <Browse />
        : viewType === 'likedSongs' ? <LikedSongs />
        : viewType === 'recentlyPlayed' ? <RecentlyPlayed />
        : viewType === 'albums' ? <Albums />
        : viewType === 'artists' ? <Artists />
        : viewType === 'playlist' ? <Playlist />
        : viewType === 'search' ? <SearchResults />
        : <AlbumTracks />
      }
    </main>
  );
}

export default Main;