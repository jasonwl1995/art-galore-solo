/* Import Libraries */
import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import img1 from '../images/gallery.jpeg';
import './LoginPage.css';

// Function that displays login page for users to log in
function LoginPage() {
  const [heading, setHeading] = useState('Welcome to Art Galore!');
  const history = useHistory();

  // Function called upon 'Register' button click to 
  // bring the user to the registration page
  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <img className="logo" src={img1} width="360px" height="200px"/>

        <div className="grid-col grid-col_4">

      {/* Imports log in form */}
      <LoginForm />

      <center>
        <h4>New User?</h4>

        {/* Button that calls onRegister function */}
        <button className="btn btn_sizeSm" onClick={onRegister}>
          Register
        </button>
      </center>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
