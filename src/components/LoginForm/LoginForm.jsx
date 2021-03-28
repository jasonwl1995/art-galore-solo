/* Import Libraries */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

// Function that allows user to input username and 
// password in order to log in to the app
function LoginForm() {
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  // Local state variables used for capturing form input 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function called upon 'Login' button click
  const login = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      {/* Input field to input username */}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>

      {/* Input field to input password */}
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>

      {/* Button that calls login function */}
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
