/* Import Libraries */
import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import AddArtworkForm from '../AddArtworkForm/AddArtworkForm';

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
  img: {
    maxWidth: '75%',
    maxHeight: '75%',
  },
}));

// Function fetches user details from the database
// and add artwork form to displays it on the Artwork Details page
function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  // Grabs information from Global Redex Store
  const user = useSelector((store) => store.user);

  // Takes user to edit user detail page upon 'Edit' button click
  const editUser = (userId) => {
      dispatch({
        type: 'FETCH_USER_DETAIL',
        payload: {
          userId: user.id
        }
    });
    // Navigate to `/editUser` page
    history.push(`/edituser/${userId}`);
  };

  console.log( "user", user);

  return (
    <main>
    <Box align="center" >
    <Box width="60%" border={2} borderRadius={16} className="profileCard">
      <Typography variant="h4">
        <Box lineHeight={2} fontWeight="fontWeightBold">
          Welcome, {user.username}!
        </Box>
      </Typography>

      <Box align="center">
      <img src={user.pfp} alt={user.title} className={classes.img}/>
      </Box>

      <Typography variant="h6">
        <Box align="center" lineHeight={1.5} fontWeight="fontWeightBold">
          Gallery Intro (Displays on your Gallery Page): 
        </Box>
      </Typography>
      
      <Typography variant="body1">
        <Box align="center" lineHeight={1.5}>
          {user.intro}
        </Box>
      </Typography>

      <br></br>
      <Box variant="body1">
      <Button variant="contained" color="secondary" className="edit-button" onClick={editUser}>
        Edit
      </Button>
      </Box>
      <br></br>

    </Box>
    </Box>

      {/* Displays user profile picture */}
      {/* <div>
        <img src={user.pfp} alt={user.title} />
        <h2>Welcome, {user.username}!</h2>
        <h3>Gallery Intro: </h3>
        <h4>(Displays on your Gallery Page)</h4> */}
        {/* Displays user introduction */}
        {/* <p>{user.intro}</p> */}

        {/* Button that calls editUser function */}
        {/* <button className="edit-button" onClick={editUser}>
          Edit
        </button>
      </div> */}

      {/* Imports Logout Button */}
      {/* <LogOutButton className="btn" /> */}

      {/* Imports add artwork form */}
      <AddArtworkForm />

    </main>
  );
}

export default ProfilePage;
