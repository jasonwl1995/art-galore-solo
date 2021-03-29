/* Import Libraries */
import React, { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import img1 from '../images/gallery.jpeg';
import './LoginPage.css';

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

// Function that displays login page for users to log in
function LoginPage() {
  const [heading, setHeading] = useState('Welcome to Art Galore!');
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Function called upon 'Register' button click to 
  // bring the user to the registration page
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

export default LoginPage;
