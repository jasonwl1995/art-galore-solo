/* Import Libraries */
import React, { useState } from 'react';
import img1 from '../images/gallery.jpeg';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css';

// Function that displays register page for users to create and account
function RegisterPage() {
  const [heading, setHeading] = useState('Welcome to Art Galore!');
  const history = useHistory();

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <img className="logo" src={img1} width="360px" height="200px"/>

        <div className="grid-col grid-col_4">

          {/* Imports register form */}
          <RegisterForm />

          <center>
            <h4>Existing User?</h4>

            {/* Button that brings user to the login page */}
            <button
              type="button"
              className="btn btn_sizeSm"
              onClick={() => {
                history.push('/home');
              }}
            >
              Log In
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
