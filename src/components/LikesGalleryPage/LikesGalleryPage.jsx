/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

// Function fetches all artworks that a user likes
// and displays it on the Likes Gallery Page
function LikesGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  // Grabs information from Global Redex Store
  const user = useSelector(store => store.user);
  const artworkList = useSelector(store => store.artwork);

  // Loads all artwork that the user likes
  useEffect(() => {
    dispatch({
      type: 'FETCH_LIKE_ARTWORK',
      payload: {
        userId: user.id
      },
    });
  }, []);

// // Function called once details button is clicked
// // Brings user to My Artwork Details Page
// const artworkDetails = (artworkid) => {
//   history.push(`/mydetails/${artworkid}`);
// };

// Function to unlike an artwork once Unlike button is clicked
const unlikeArtwork = (artworkid) => {
  dispatch({
    type: 'UNLIKE_ARTWORK',
    payload: {
      artworkId: artworkid,
      userId: user.id,
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
              Likes Galore!
            </Box>
          </Typography>

          <Typography variant="body1">
            <Box align="center" lineHeight={2} fontWeight="fontWeightBold">
              Here are your liked Artworks!
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* <h1>Likes Galore!</h1>
        <section className="artwork"> */}

        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
            {
              // Displays either users likes or if 
              // there are not likes, a message
              (artworkList && artworkList.length)?
              <> 
              {/* <h2>Here are your liked Artworks!</h2> */}
              { 
              artworkList.map((artwork, i) => {
                  return (
                    <Grid
                    className="artworkCard"
                    >
                    <br></br>
                      <Typography align="center" variant="h5">{artwork.title}</Typography>
                    <br></br>
                      <img src={artwork.image} alt={artwork.title} className={classes.img}
                      onClick={() => history.push(`/details/${artwork.id}`)}/>
                    <br></br>
                        <Box align="center">
                        <Button variant="contained" color="secondary" onClick = { (evt) => {unlikeArtwork(artwork.id)}}>
                        <Typography variant="body1">
                          Unlike
                        </Typography>
                        </Button>
                        </Box>
                        <br></br>
                    </Grid>

                  //   <>
                  //   <div className="artworkdiv" key = {i}>
                  //     <img src={artwork.image} height="350px" weight = "250px "alt={artwork.description} 
                  //     onClick={() => history.push(`/details/${artwork.id}`)}/>
                  //   </div>

                  //   {/* Displays artwork title */}
                  //   <div>
                  //     <h3>{artwork.title}</h3>
                  //   </div>

                    
                  //   <div>
                  //     {/* Button that calls unlikeArtwork function to 
                  //         remove artwork from likes table in database */}
                  //     <button onClick = { (evt) => {unlikeArtwork(artwork.id)}}>
                  //       Unlike
                  //     </button>
                  //   </div>
                  // </>
                  );
              })
              }
            </>
            :
            // Display message if user has no liked artworks
            <>
              <h3>You Have Not Liked Any Artworks Yet!</h3>
            </>
            }
            </Grid>
          </Grid>
        </Grid>
        {/* </section> */}
      </main>
    </div>
    );
}

export default LikesGalleryPage;