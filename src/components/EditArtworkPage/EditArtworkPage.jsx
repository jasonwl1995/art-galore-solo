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

// Function renders passed artwork details to be edited
function EditArtworkPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Grabs information from Global Redex Store
  const detail = useSelector((store) => store.detail);
  const user = useSelector((store) => store.user);

  // Local state variables used for capturing form input
  const [editTitle, setEditTitle] = useState(detail.title);
  const [editDescription, setEditDescription] = useState(detail.description);

    // Ping saga to fetch artwork details
    useEffect(() => {
    dispatch({
      type: 'FETCH_ARTWORK_DETAIL',
      payload: {
        userId: user.id,
        artworkId: artworkId.id}
    });
  }, []);

  // Function handle of on click edit button
  const editArtwork = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Ping saga to update movie object in database
    dispatch({
      type: 'EDIT_ARTWORK',
      payload: {
        id: detail.id,
        title: editTitle,
        description: editDescription,
      },
    });
    // Navigate back to My Artwork Details page
    history.push(`/mydetails/${artworkId.id}`);
  };

  return (
    <main>
      <Box align="center" >
      <Box width="60%" border={2} borderRadius={16} className="profileCard">
      <Typography variant="h5">
        <Box lineHeight={2} fontWeight="fontWeightBold">
          Edit Artwork
        </Box>
      </Typography>

      <Box align="center">
      <img src={detail.image} alt={detail.description} className={classes.img}/>
      </Box>

      <form onSubmit={editArtwork}>
        <table>
      {/* Input field to edit artwork title */}
      <tr>
        <td>
          <label htmlFor="artworkTitle">Artwork Title: </label>
        </td>
        <td>
          <input
          name="artworkTitle"
          type="text"
          placeholder="Artwork Title"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
          required
          />
        </td>
      </tr>



      {/* Input field to edit artwork description */}
      <tr>
        <td>
          <label htmlFor="artworkDescription">Artwork Description: </label>
        </td>
        <td>
          <textarea
          name="artworkDescription"
          placeholder="Artwork Description:"
          value={editDescription}
          onChange={(event) => setEditDescription(event.target.value)}
          required
          />
        </td>
      </tr>
      </table>

        <Box className={classes.root}>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          value='Edit Artwork'
          align="center"
        >
          <Typography variant="body1">
          Save
          </Typography>
        </Button>
        
        <Button variant="contained" color="secondary" onClick = {() => history.push(`/mydetails/${artworkId.id}`)}
          type="submit"
          value='Cancel'
          align="center"
        >
          <Typography variant="body1">
          Cancel
          </Typography>
        </Button>
        </Box>
        
      </form>
      </Box>
      </Box>
    </main>
    


    // <section className="edit-page">
    //   <h2>Edit Artwork</h2>

    //   {/* Displays artwork image */}
    //   <img src={detail.image} alt={detail.description}/>

    //   <form onSubmit={editArtwork}>
    //     <table>

    //       {/* Input field to edit artwork title */}
    //       <tr>
    //         <td>
    //           <label htmlFor="artworkTitle">Artwork Title: </label>
    //         </td>
    //         <td>
    //           <input
    //           name="artworkTitle"
    //           type="text"
    //           placeholder="Artwork Title"
    //           value={editTitle}
    //           onChange={(event) => setEditTitle(event.target.value)}
    //           required
    //           />
    //         </td>
    //       </tr>

    //       {/* Input field to edit artwork description */}
    //       <tr>
    //         <td>
    //           <label htmlFor="artworkDescription">Artwork Description: </label>
    //         </td>
    //         <td>
    //           <textarea
    //           name="artworkDescription"
    //           placeholder="Artwork Description:"
    //           value={editDescription}
    //           onChange={(event) => setEditDescription(event.target.value)}
    //           required
    //           />
    //         </td>
    //       </tr>

    //       <tr>
    //         {/* Calls editArtwork function */}
    //         <td>
    //           <button className="save-button">
    //             Save
    //           </button>
    //         </td>

    //         {/* Cancels edits and takes user back to the artwork detail page */}
    //         <td>
    //           <button onClick = {() => history.push(`/mydetails/${artworkId.id}`)}>
    //             Cancel
    //           </button>
    //         </td>
    //       </tr>
        
    //     </table>
    //   </form>
    // </section>
  );
}

export default EditArtworkPage;

