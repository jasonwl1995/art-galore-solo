/* Import Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';

import ImageUpload from '../ImageUpload/ImageUpload';

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { borders, spacing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *':{
      margin: theme.spacing(1),
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  img: {
    maxWidth: '80%',
    maxHeight: '80%',
  },
}));

// Function renders passed user details to be edited
function EditUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const userId = params;

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Grabs information from Global Redex Store
  const user = useSelector((store) => store.user);
  const pfpUrl = useSelector ((store) => store.awsPFP);

  // Local state variables used for capturing form input 
  const [editUsername, setEditUsername] = useState(user.username);
  const [editIntro, setEditIntro] = useState(user.intro);

  // Function handle of on click edit button
  const editUser = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Ping saga to update user object in database
    dispatch({
      type: 'EDIT_USER',
      payload: {
        id: user.id,
        username: editUsername,
        pfp: pfpUrl,
        intro: editIntro,
      },
    });
    // Navigate to profile page
    history.push('/user');
  };

  // Function to set PFP on cancel
  const onCancel = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SET_PFP_URL',
      payload: user.pfp
    });
    history.push('/user')
  }

  return (
    <main>
      <Box align="center" >
      <Box width="60%" border={2} borderRadius={16} className="profileCard">
      <Typography variant="h5">
        <Box lineHeight={2} fontWeight="fontWeightBold">
          Edit User
        </Box>
      </Typography>

      <form onSubmit={editUser}>
        <table>

          {/* Input field to edit artist username */}
          <tr>
            <td>
              <label htmlFor="username">Username: </label>
            </td>
            <td>
              <input
              name="username"
              type="text"
              placeholder="New Username"
              value={editUsername}
              onChange={(event) => setEditUsername(event.target.value)}
              />
            </td>
          </tr>

          {/* Input field to edit artist profile picture */}
          <tr>
            <td>
            <label htmlFor="pfpImage">Edit Profile Picture: </label>
            </td>
            <td>
              <ImageUpload page="AddProfilePicture"/>
            </td>
          </tr>

          {/* Input field to edit artist introduction */}
          <tr>
            <td>
              <label htmlFor="userIntro">Gallery Introduction: </label>
            </td>
            <td>
              <textarea
              name="userIntro"
              placeholder="Introduce yourself and your work!"
              value={editIntro}
              onChange={(event) => setEditIntro(event.target.value)}
              />
            </td>
          </tr>

        <br></br>
        </table>

        <Box className={classes.root}>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          value='Edit User'
          align="center"
        >
          <Typography variant="body1">
          Save
          </Typography>
        </Button>
        
        <Button variant="contained" color="secondary" onClick = {onCancel}>
          <Typography variant="body1">
          Cancel
          </Typography>
        </Button>
        </Box>

        <br></br>
      </form>

      </Box>
      </Box>
    </main>

    // <section className="edit-user">
    //   <h2>Edit User</h2>

    //   <form onSubmit={editUser}>
    //     <table>

          // {/* Input field to edit artist username */}
          // <tr>
          //   <td>
          //     <label htmlFor="username">Username: </label>
          //   </td>
          //   <td>
          //     <input
          //     name="username"
          //     type="text"
          //     placeholder="New Username"
          //     value={editUsername}
          //     onChange={(event) => setEditUsername(event.target.value)}
          //     />
          //   </td>
          // </tr>

          // {/* Input field to edit artist profile picture */}
          // <tr>
          //   <td>
          //   <label htmlFor="pfpImage">Edit Profile Picture: </label>
          //   </td>
          //   <td>
          //     <ImageUpload page="AddProfilePicture"/>
          //   </td>
          // </tr>

          // {/* Input field to edit artist introduction */}
          // <tr>
          //   <td>
          //     <label htmlFor="userIntro">Gallery Introduction: </label>
          //   </td>
          //   <td>
          //     <textarea
          //     name="userIntro"
          //     placeholder="Introduce yourself and your work!"
          //     value={editIntro}
          //     onChange={(event) => setEditIntro(event.target.value)}
          //     />
          //   </td>
          // </tr>

          // <tr>
          //   {/* Calls editUser function */}
          //   <td>
          //     <button className="save-button">Save</button>
          //   </td>

          //   {/* Cancels edits and takes user back to the user Profile Page */}
          //   <td>
          //     <button onClick = {onCancel}>
          //       Cancel
          //     </button>
          //   </td>
          // </tr>
        
    //     </table>
    //   </form>
    // </section>
  );
}

export default EditUser;

