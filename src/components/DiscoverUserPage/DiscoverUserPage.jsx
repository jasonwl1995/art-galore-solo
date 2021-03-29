/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DropdownNav from '../Nav/DropdownNav';
import DropdownNavCategory from '../Nav/DropdownNavCategory';

import './GalleryPage.css';

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
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

// Function fetches all artworks from a certain user
// and displays it on the Discover Gallery Page
function DiscoverUserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const disUserId = params;
  
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Grabs information from Global Redex Store
  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  // Loads all artwork from selected user
  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ARTWORK',
      payload: { 
        userid: disUserId.id 
        }
    });
  }, []);

return(
  <div>
    <main>
    <Box align="center">
    <Box width="60%" border={1} borderRadius={16} className="profileCard">
      <Typography variant="h3">
        <Box lineHeight={2} fontWeight="fontWeightBold">
          {artworkList && artworkList.length &&
          artworkList[0].username}'s Gallery!
        </Box>
      </Typography>
      <Typography variant="body1">
          <Box align="center" lineHeight={2}>
            {artworkList && artworkList.length &&
            artworkList[0].intro}
          </Box>
      </Typography>
      
        
        <Typography variant="body1">
          <Box align="center" lineHeight={2}>
            {artworkList && artworkList.length &&
            artworkList[0].intro}
          </Box>
        </Typography>
      </Box>
      </Box>

      <Box align="center" >
        <Typography variant="body1">
          <Box lineHeight={2} border={1} borderRadius={16} className="categoryCard">
            Sort By Category: 
            <DropdownNavCategory discover_userId={disUserId.id}/>
          </Box>
        </Typography>
      </Box>
        
      {/* Displays artist name */}
      {/* <h1>{artworkList && artworkList.length &&
      artworkList[0].username}'s Gallery!</h1> */}

      {/* Display artist introduction */}
      {/* <h2>{artworkList && artworkList.length &&
      artworkList[0].intro}</h2> */}

      {/* Displays a dropdown list of all other users 
          with at least 1 artwork in their gallery
      <div>
        <p>Search By Username:</p>
        <DropdownNav />
      </div>
       */}

        {/* Displays a dropdown list of all categories 
            with at least 1 artwork in that category */}
        {/* <div>
          <p>Sort By Category:</p>
          <DropdownNavCategory discover_userId={disUserId.id}/>
        </div> */}

        {/* Displays artworks from selected
            users onto the discover users page */}
        
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
                        <Button variant="contained" color="secondary" className="btn btn_sizeSm" bottom={20} onClick={() => history.push(`/details/${artwork.id}`)}>
                        <Typography variant="body1">
                        Details
                        </Typography>
                        </Button>
                        </Box>
                        <br></br>
                    </Grid>

                    // <div className="artworkdiv" key = {i}>
                    //   <img src={artwork.image} height="350px" weight = "250px "alt={artwork.description} 
                    //   onClick={() => history.push(`/details/${artwork.id}`)}/>
                    // </div>

                    // {/* Displays artwork title */}
                    // <div>
                    //   <h3>{artwork.title}</h3>
                    // </div>

                    // {/* Button that takes user to the artwork details page */}
                    // <div>
                    //   <button onClick={() => history.push(`/details/${artwork.id}`)}>
                    //     Details
                    //   </button>
                    // </div>
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

export default DiscoverUserPage;
