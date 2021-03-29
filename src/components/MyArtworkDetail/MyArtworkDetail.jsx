/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

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

// Function fetches artwork details from the database
// and displays it on the Artwork Details page
function MyArtworkDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Grabs information from Global Redex Store
  const detail = useSelector(store => store.detail);
  const user = useSelector((store) => store.user);

  // Load artwork details on page load
  useEffect(() => {
    dispatch({
      type: 'FETCH_ARTWORK_DETAIL',
      payload: {
        userId: user.id,
        artworkId: artworkId.id
        }
    });
  }, []);

  // Takes user to edit artwork detail page upon 'Edit' button click
  const editArtwork = (artworkid) => {
    history.push(`/edit/${artworkid}`);
  };

  // Function called once delete button is clicked
  // Deletes artwork from database and removes it from page
  const deleteArtwork = (artworkid) => {
    dispatch({
      type: 'DELETE_ARTWORK',
      payload: {
        artworkid: artworkid,
        userid: user.id,
      }
    });
    history.push('/mygallery');
 };

  return (
    <main>
      <Box align="center">
        <Box width="60%" border={1} borderRadius={16} className="detailsCard">
          <Typography variant="h3">
            <Box lineHeight={2} fontWeight="fontWeightBold">
              {detail.title}
            </Box>
          </Typography>

          <Box align="center">
            <img src={detail.image} alt={detail.title} className={classes.img}/>
          </Box>

          <br></br>

          <Typography variant="h6">
            <Box align="center" lineHeight={2}>
              Date created: {detail.date}
            </Box>
          </Typography>

          <Typography variant="h6">
            <Box align="center" lineHeight={2}>
              Category: {detail.theme}
            </Box>
          </Typography>

          <Box align="center">
          <Typography variant="h6">
            <Box lineHeight={2} >
              Description: 
            </Box>
            <Typography variant="body1">
              {detail.description}
            </Typography>
          </Typography>
          </Box>

      <br></br>

      <Box className={classes.root}>
        <Button variant="contained" color="secondary" onClick = { (evt) => {editArtwork(detail.id)}}>
        <Typography variant="body1">
          Edit
        </Typography>
        </Button>

        <Button variant="contained" color="secondary" onClick = { (evt) => {deleteArtwork(detail.id)}}>
          <Typography variant="body1">
            Delete
          </Typography>
        </Button>
      </Box>

      <Box align="center">
        <Button variant="contained" color="secondary" onClick = {() => history.push('/mygallery')}>
          <Typography variant="body1">
            Back to Gallery
          </Typography>
        </Button>
      </Box>

      <br></br>
      <br></br>

        </Box>
      </Box>
    </main>

    // <div>
    //   {/* Displays artwork image */}
    //   <img src={detail.image} alt={detail.title} />

    //   {/* Displays artwork title */}
    //   <section>
    //     <h2>{detail.title}</h2>
    //   </section>

    //   {/* Displays artwork date created */}
    //   <section>
    //     <h3>Date created: {detail.date}</h3>
    //   </section>

    //   {/* Displays artwork theme */}
    //   <section>
    //     <p>Category: {detail.theme}</p>
    //   </section>

    //   {/* Displays artwork description */}
    //   <section>
    //     <p>Description:</p>
    //     <p>{detail.description}</p>
    //   </section>

      
    //   <div>
    //     {/* Button that calls editArtwork function */}
    //     <button onClick = { (evt) => {editArtwork(detail.id)}}>
    //       Edit
    //     </button>
    //     {/* Button that calls deleteArtwork function */}
    //     <button onClick = { (evt) => {deleteArtwork(detail.id)}}>
    //       Delete
    //     </button>
    //   </div>

    //   {/* Button that brings user back to My Gallery Page */}
    //   <button onClick = {() => history.push('/mygallery')}>
    //     Back to Gallery
    //   </button>

    // </div>
  );
}

export default MyArtworkDetail;
