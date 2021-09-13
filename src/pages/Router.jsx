import { Switch, Route } from "react-router";
import { useSelector, shallowEqual } from "react-redux";

import Browse from './browse';
import LikedSongs from './likedSongs';
import RecentlyPlayed from './recentlyPlayed';
import Albums from './albums';
import Artists from './artists';
import Playlist from './playlist';
import Search from './search';
import AlbumTracks from './albumTracks';


const Router = () => {
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);
  
  return (
    <Switch>
      <Route 
        exact path="/"
        render={() => <Browse accessToken={accessToken}/>} 
      />
      <Route 
        exact path="/liked-songs"
        render={() => <LikedSongs accessToken={accessToken}/>} 
      />
      <Route 
        exact path="/recently-played"
        render={() => <RecentlyPlayed accessToken={accessToken}/>} 
      />
      <Route 
        exact path="/albums"
        render={() => <Albums accessToken={accessToken}/>} 
      />
      <Route 
        exact path="/album-tracks/:id"
        render={() => <AlbumTracks accessToken={accessToken}/>} 
      />
      <Route 
        exact path="/artists"
        render={() => <Artists accessToken={accessToken}/>} 
      />
      <Route 
        exact path="/playlist/:id"
        render={() => <Playlist accessToken={accessToken}/>} 
      />
      <Route 
        exact path="/search/:term"
        render={() => <Search accessToken={accessToken}/>} 
      />
    </Switch>
  )
}

export default Router;