import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import SongList from "./components/SongComponents/SongList/SongList";
import Song from "./components/SongComponents/Song/SongBasic"
import SongForm from "./components/SongComponents/SongNewForm/SongForm";

import Album from "./components/AlbumComponents/Album/AlbumBasic";
import AlbumList from "./components/AlbumComponents/AlbumList/AlbumList";
import AlbumForm from "./components/AlbumComponents/AlbumForm/AlbumForm";

import Playlist from "./components/PlaylistComponents/Playlist/PlaylistBasic"
import PlaylistList from './components/PlaylistComponents/PlaylistList/PlaylistList'
import PlaylistForm from "./components/PlaylistComponents/PlaylistForm/PlaylistForm";

function App() {
  let user = useSelector(state => state.session);
  if (user.user) {
    user = true
  } else{
    user = false
  }
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    console.log()
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/albums/new">
          { user ? <AlbumForm /> :<p>403: Forbidden</p>}
          </Route>
          <Route path='/albums/:albumId'>
            <Album />
          </Route>
          <Route path='/albums'>
            <AlbumList location={"Home"}/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/playlists/new">
            {user ? <PlaylistForm/> : <p>403: Forbidden</p>}
          </Route>
          <Route path="/playlists/:playlistId">
            <Playlist />
          </Route>
          <Route path="/playlists">
            <PlaylistList/>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/songs/new">
          { user ? <SongForm isEditForm={false} /> :<p>403: Forbidden</p>}
          </Route>
          <Route path="/songs/:songId">
            <Song />
          </Route>
          <Route path="/songs">
            <SongList />
          </Route>
          <Route path="/" exact>
            <PlaylistList location={"Home"} isBasic={true} />
            <SongList location={"Home"} isBasic={true}/>
            <AlbumList location={"Home"} isBasic={true}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
