/* Import Libraries */
import React, { useState } from 'react';
import img1 from '../images/gallery.jpeg';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css';

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

// Function that displays register page for users to create and account
function RegisterPage() {
  const [heading, setHeading] = useState('Welcome to Art Galore!');
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  return (
    <main>

      <Box align="center" >
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
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <img className="logo" src={img1} width="360px" height="200px"/>

        <div className="grid-col grid-col_4"> */}

          {/* Imports register form */}
          <Box align="center">
          <Box className="logCard" width="60%" border={1} borderRadius={16}>
          <br></br>
          <RegisterForm />

          <center>
            <h4>Existing User?</h4>

            {/* Button that brings user to the login page */}
            <Button
              variant="contained" 
              color="secondary"
              type="button"
              className="btn btn_sizeSm"
              onClick={() => {
                history.push('/home');
              }}
            >
              Log In
            </Button>
          </center>
          <br></br>
          </Box>
          </Box>
        </main>

  );
}

export default RegisterPage;
