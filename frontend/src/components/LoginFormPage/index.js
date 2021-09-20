import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className={"signin-form"} onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className={"signin-form-specific"}>
      <label>
        Username or Email
      </label>
      <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      <label>
        Password
      </label>
      <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <button type="submit">Log In</button>
      </div>
    </form>
  );
}

export default LoginFormPage;

// import {useState, useEffect} from 'react'


// export default function LoginFormPage() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     return(
//         <form>
//             <h2>Login</h2>
//             <label value={username} onChange={e => setUsername(e.target.value)}>Username</label>
//             <input></input>
//             <label value={password} onChange={e => setPassword(e.target.value)}>Password</label>
//             <input></input>
//         </form>
//     )
// }
