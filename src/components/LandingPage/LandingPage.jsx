/* Import Libraries */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';
import img from '../images/logo.png';
import img1 from '../images/gallery.jpeg';

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { borders } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  logo: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function LandingPage() {
  // Local state variables used to set header
  const [heading, setHeading] = useState('Welcome to Art Galore!');
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Function to bring user to registration page on button click
  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <main>
      <Box align="center">
        <Box className="logCard" width="60%" border={1} borderRadius={16}>
        <h2>{heading}</h2>
        <Box align="center"> 
          <img className={classes.logo} src={img1} width="60%"/>
        </Box>
        <br></br>
        </Box>
      </Box>
      <br></br>
      <br></br>
{/* 
      <h2>{heading}</h2>

      <div className="grid">
        <img className="logo" src={img1} width="360px" height="200px"/>
        <div className="grid-col grid-col_4"> */}

      {/* Imports log in form */}
      <Box align="center">
      <Box className="logCard" width="60%" border={1} borderRadius={16}>
        <br></br>
      <LoginForm />

      <center>
        <h4>New User?</h4>

        {/* Button that calls onRegister function */}
        <Button variant="contained" color="secondary" className="btn btn_sizeSm" onClick={onRegister}>
          Register
        </Button>
      </center>
      <br></br>
      </Box>
      </Box>
    </main>
  );
}

export default LandingPage;
