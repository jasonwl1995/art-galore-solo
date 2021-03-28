/* Import Libraries */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';
import img from '../images/logo.png';
import img1 from '../images/gallery.jpeg';

function LandingPage() {
  // Local state variables used to set header
  const [heading, setHeading] = useState('Welcome to Art Galore!');
  const history = useHistory();

  // Function to bring user to registration page on button click
  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <img className="logo" src={img1} width="360px" height="200px"/>
        <div className="grid-col grid-col_4">

          {/* Imports and displays login form */}
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

export default LandingPage;
