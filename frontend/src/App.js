import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Songs from "./components/SongComponents/Index";

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
          <Route exact path="/songs/new">
          {/* { user ? <SongForm isEditForm={false} /> :<p>403: Forbidden</p>} */}
          </Route>
          <Route path="/songs/:songId">
            {/* <SongComplex /> */}
          </Route>
          <Route path="/songs">
            <Songs />
          </Route>
          <Route path="/" exact>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
