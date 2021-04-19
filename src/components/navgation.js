import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { updateViewType } from "../store/modules/mainView";
import { fetchAlbums, fetchLikedSongs, fetchNewReleases, fetchPlaylists, fetchPlaylistTracks, fetchRecentlyPlayed } from '../api';
import { setCurrentPlaylist } from '../store/modules/playlists';
import '../styles/navgation.scss';


const Navigation = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);
  const playlists = useSelector(state => state.playlists.data, shallowEqual);

  useEffect(() => {
    dispatch(fetchPlaylists(accessToken))
  }, [accessToken, dispatch]);


  const handleClickNavi = (e) => {
    switch(e.target.innerHTML){
      case "Browse":
        dispatch(updateViewType('browse'));
        dispatch(fetchNewReleases(accessToken));
        break;
      case "Recently Played":
        dispatch(updateViewType('recentlyPlayed'));
        dispatch(fetchRecentlyPlayed(accessToken));
        break;
      case "Liked Songs":
        dispatch(updateViewType('likedSongs'));
        dispatch(fetchLikedSongs(accessToken));
        break;
      case "Albums":
        dispatch(updateViewType('albums'));
        dispatch(fetchAlbums(accessToken));
        break;
      case "Artists":
        dispatch(updateViewType('artists'));
        break;
      default:
    }
  }


  const handleClickPlaylist = (playlist) => {
    //update view type
    dispatch(updateViewType('playlist'));
    //keep the current playlist
    dispatch(setCurrentPlaylist(playlist));
    //fetch playlist's tracks
    dispatch(fetchPlaylistTracks(accessToken, playlist.id));
  }


  return (
    <nav>
      <ul>
        <li onClick={(e) => handleClickNavi(e)}>Browse</li>
      </ul>
      <h1>YOUR LIBRARY</h1>
      <ul>
        <li onClick={(e) => handleClickNavi(e)}>Recently Played</li>
        <li onClick={(e) => handleClickNavi(e)}>Liked Songs</li>
        <li onClick={(e) => handleClickNavi(e)}>Albums</li>
        <li onClick={(e) => handleClickNavi(e)}>Artists</li>
      </ul>
      <h1>PLAYLISTS</h1>
      <ul>
        {playlists.items ? playlists.items.map(item => (
          <li key={item.name} onClick={() => handleClickPlaylist(item)} >{item.name}</li>
        )) : null}
      </ul>
    </nav>
  );
}

export default Navigation;