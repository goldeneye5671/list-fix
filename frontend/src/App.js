import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import Songs from "./components/SongComponents/Index";
import Home from "./components/HomeComponents/Index";
import {getSongUrl} from './store/songPlayer';
import User from "./components/UserComponent/Index";

// const Player = () => (
//   <AudioPlayer
//     autoPlay
//     src="http://example.com/audio.mp3"
//     onPlay={e => console.log("onPlay")}
//     // other props here
//   />
// );


function App() {
  let user = useSelector(state => state.session);
  const songState = useSelector(state => state.songPlayer);
  if (user.user) {
    user = true
  } else{
    user = false
  }
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/users/:userId">
            <User />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs">
            <Songs />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      )}
      {/* <AudioPlayer className={"AudioPlayer"} src={songState?.song} /> */}
      <audio className={"AudioPlayer"} src={songState?.song} controls></audio>
      {/* <audio src="https://audioforartists.s3.us-west-1.amazonaws.com/Luniz+I+Got+5+On+It+Clean+Radio+Edit.mp3" controls></audio> */}
    </>
  );
}

export default App;
