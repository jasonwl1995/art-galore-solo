/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './GalleryPage.css';

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { borders } from '@material-ui/system';

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
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));
// Function fetches all artworks from a logged in user
// and displays it on the My Gallery Page
function MyGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Grabs information from Global Redex Store
  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  // Loads all artwork from user
  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ARTWORK',
      payload: { 
        userid: user.id 
        }
    });
  }, []);

  // Function called once details button is clicked
  // Brings user to My Artwork Details Page
  const artworkDetails = (artworkid) => {
    history.push(`/mydetails/${artworkid}`);
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
 };
  
  return(
    <div>
      <main>
      <Box align="center">
        <Box width="60%" border={1} borderRadius={16} className="profileCard">
          <Typography variant="h3">
            <Box align="center" lineHeight={2} fontWeight="fontWeightBold">
              My Gallery
            </Box>
          </Typography>

          <Typography variant="body1">
            <Box align="center" lineHeight={2}>
              {user.intro}
            </Box>
          </Typography>
        </Box>
      </Box>

        {/* <h1>My Gallery</h1> */}

        {/* Displays artist intro */}
        {/* <p>{user.intro}</p> */}

        {/* Displays artworks from signed in
            user onto the My Gallery page */}

        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
        {/* <section className="artwork"> */}
            {
              // Displays either users artwork or if 
              // there are not artworks, a message
              (artworkList && artworkList.length)?
              <>
                {
                    artworkList.map((artwork) => {
                      return (
                      <Grid
                      className="artworkCard"
                      >
                      <br></br>
                      <Typography align="center" variant="h5">{artwork.title}</Typography>
                      <br></br>
                        <img src={artwork.image} alt={artwork.title} className={classes.img}
                        onClick={() => history.push(`/mydetails/${artwork.id}`)}/>
                      <br></br>
                        <Box align="center" className={classes.root}>
                        <Button variant="contained" color="secondary" bottom={20} onClick={() => history.push(`/details/${artwork.id}`)}>
                        <Typography variant="body1">
                        Details
                        </Typography>
                        </Button>
                          <Button variant="contained" color="secondary" onClick = { (evt) => {deleteArtwork(artwork.id)}}>
                          <Typography variant="body1">
                            Delete
                          </Typography>
                          </Button>
                          </Box>
                          <br></br>
                      </Grid>

                      //   <>
                      //   <div className="artworkdiv">
                      //     <img src={artwork.image} height="350px" weight = "250px "alt={artwork.description} 
                      //     onClick={() => history.push(`/mydetails/${artwork.id}`)}/>
                      //   </div>
                        
                      //   {/* Displays artwork title */}
                      //   <div>
                      //     <h3>{artwork.title}</h3>
                      //   </div>

                      //   <div>
                      //     {/* Button that calls artworkDetails button brings user to the My Details Page */}
                      //     <button onClick = { (evt) => {artworkDetails(artwork.id)}}>
                      //       Details
                      //     </button>
                      //     {/* Button that calls function to delete artwork */}
                      //     <button onClick = { (evt) => {deleteArtwork(artwork.id)}}>
                      //       Delete
                      //     </button>
                      //   </div>
                      // </>
                      );
                  })  
                }                  
              </>
              :
              // Display message if user has no artworks
              <>
                <h3>You Have Not Added Any Artworks Yet!</h3>
              </>
           }
        {/* </section> */}
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
    );
}

export default MyGalleryPage;
