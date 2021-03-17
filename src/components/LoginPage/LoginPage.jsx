import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import img from '../images/logo.png';
import './LoginPage.css';

function LoginPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  return (
    <div>
      <h1>{heading}</h1>
      <img className="logo" src={img}/>

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
  );
}

export default LoginPage;
