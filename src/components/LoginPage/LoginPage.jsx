import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import img from '../images/logo.png';
import img1 from '../images/gallery.jpeg';
import './LoginPage.css';

function LoginPage() {
  const [heading, setHeading] = useState('Welcome to');
  const history = useHistory();

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>
      <img className="logo" src={img}/>

      <div className="grid">
        <img className="logo" src={img1} width="360px" height="200px"/>

        <div className="grid-col grid-col_4">

      <LoginForm />

      <center>
        <h4>New User?</h4>
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
