import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className={"nav"}>
      <div className={"nav-links"}>
        <NavLink exact to="/">
          List Fix
        </NavLink>
      </div>
     
      <div className={"nav-links"}>
        <NavLink exact to="/songs">Discover</NavLink>
        {
          sessionUser ? (
            <ProfileButton user={sessionUser} />
          )
          :
          <>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        }
      </div>
    </nav>
  );
}

export default Navigation;
