/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DropdownNav from '../Nav/DropdownNav';
import DropdownNavCategory from '../Nav/DropdownNavCategory';

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

// Function fetches all artworks besides the logged in user
// and displays it on the Discover Gallery Page
function DiscoverGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  // Grabs information from Global Redex Store
  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  // Loads all artwork
  useEffect(() => {
    dispatch({
      type: 'DISCOVER_GALLERY_ARTWORK',
      payload: {userid: user.id},
    });
    dispatch({
      type: 'FETCH_ACTIVE_CATEGORY',
      payload: {userId: user.id},
    });
  }, []);


  return(
    <div>
      <main>
      <Box align="center">
      <Box width="60%" border={1} borderRadius={16} className="profileCard">
        <Typography variant="h3">
          <Box align="center" lineHeight={2} fontWeight="fontWeightBold">
            Art Galore
          </Box>
        </Typography>

        <Typography variant="h5">
          <Box align="center" lineHeight={3} fontWeight="fontWeightBold">
            Browse through some artworks from other artists!
          </Box>
        </Typography>
      </Box>
      </Box>

      <Box align="center" >
        <Typography variant="body1">
          <Box lineHeight={2} border={1} borderRadius={16} className="categoryCard">
            Sort By Category: 
            <DropdownNavCategory discover_userId="all"/>
          </Box>
        </Typography>
      </Box>
        

        {/* <h1>Art Galore</h1>
        <h2>Browse through some artworks from other artists!</h2> */}

        {/* Displays a dropdown list of all other users 
            with at least 1 artwork in their gallery 
        {user.id && (
          <>
          <div>
            <p>Search By Username:</p>
            <DropdownNav />
          </div>
          </>
        )}
         */}

        {/* Displays a dropdown list of all categories 
            with at least 1 artwork in that category */}

        {/* <>
        <div>
          <p>Sort By Category:</p>
          <DropdownNavCategory discover_userId="all"/>
        </div>
        </> */}


        {/* Displays artworks from all users 
            onto the discover gallery page */}
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
        
        {/* <section className="artwork"> */}
            {
              // Makes sure artworkList is populated
              artworkList && artworkList.length && 
              artworkList.map((artwork, i) => {
                  return (

                    <Grid
                    key = {i}
                    className="artworkCard"
                    >
                    <br></br>
                    <Typography align="center" variant="h5">{artwork.title}</Typography>
                    <br></br>
                      <img src={artwork.image} alt={artwork.title} className={classes.img}
                      onClick={() => history.push(`/details/${artwork.id}`)}/>
                    <br></br>
                        <Box align="center">
                        <Button variant="contained" color="secondary" onClick={() => history.push(`/details/${artwork.id}`)}>
                        <Typography variant="body1">
                        Details
                        </Typography>
                        </Button>
                        </Box>
                        <br></br>
                    </Grid>
                  
                  );
              })              
            }
        {/* </section> */}
            </Grid>
          </Grid>
        </Grid>

      </main>
    </div>
    );
}

export default DiscoverGalleryPage;
