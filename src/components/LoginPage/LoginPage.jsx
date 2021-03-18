import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import img from '../images/logo.png';
import img1 from '../images/gallery.jpeg';
import './LoginPage.css';

function LoginPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  return (
    <div className="container">
      <h2>{heading}</h2>
      <img className="logo" src={img}/>

      <div className="grid">
        <img className="logo" src={img1} width="360px" height="200px"/>

        <div className="grid-col grid-col_4">

      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
