import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongList from "./components/SongList/SongList";
import Song from "./components/Song/Song"
import Album from "./components/Album/Album";
import AlbumList from "./components/AlbumList/AlbumList";
import SongForm from "./components/SongNewForm/SongForm";

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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs/new">
          { user ? <SongForm isEditForm={false} /> :<p>403: Forbidden</p>}
          </Route>
          <Route path="/songs/:songId">
            <Song />
          </Route>
          <Route path="/songs">
            <SongList />
          </Route>
          <Route path='/albums/:albumId'>
            <Album />
          </Route>
          <Route path='/albums'>
            <AlbumList />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
