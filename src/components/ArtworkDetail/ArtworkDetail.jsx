/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link} from 'react-router-dom';

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
function ArtworkDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Grabs information from Global Redex Store
  const detail = useSelector(store => store.detail);
  const artwork = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);
  const userList = useSelector(store => store.userList);

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

  // Function to send images user liked to the Likes page
  const likeDetails = () => {
    dispatch({
      type: 'LIKE_ARTWORK_DETAIL',
      payload: {
        artworkId: artworkId.id,
        userId: user.id,
      }
    });
 };

  // Function to remove the liked image from the Likes page
  const unlikeDetails = () => {
    dispatch({
      type: 'UNLIKE_ARTWORK_DETAIL',
      payload: {
        artworkId: artworkId.id,
        userId: user.id,
      }
    });
 };

  // Handler when user clicks on artist name to go their gallery
  const clickHandler = (evt) => {
    let newUser = evt.target.value;
    userChange(newUser);
  };

  // Gets user id and goes to their gallery page
  const userChange = (newUser) => {
    dispatch({
      type: 'DISCOVER_USER_ARTWORK',
      payload: {
        userid: user.id,
        discover_userid: newUser,
      }
    });
    history.push(`/discoveruser/${detail.user_id}`);
  }
  
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
            <Box lineHeight={2} >
              Artist: 
            <Button variant="text" color="secondary" size="large" align="center" className={classes.root} onClick = {clickHandler}>
            <Typography variant="h6">
              {detail.username}
            </Typography>
            </Button>
            </Box>
          </Typography>

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
      {
        (Number(detail.favorite) > 0)? 
        
        <>
          <Button variant="contained" color="secondary" onClick={unlikeDetails}>
          <Typography variant="body1">
            Unlike
          </Typography>
          </Button>
        </>
        :
        <>
          <Button variant="contained" color="secondary" onClick={likeDetails}>
          <Typography variant="body1">
            Like
          </Typography>
          </Button>
        </>
      }
        <Button variant="contained" color="secondary" onClick = {() => history.push('/discover')}>
          <Typography variant="body1">
            Back to Discover
          </Typography>
        </Button>
      </Box>
        </Box>
      </Box>
    </main>

//     <div>
//       {/* Displays artwork image */}
//       <img src={detail.image} alt={detail.title} />

//       {/* Displays artwork title */}
//       <section>
//         <h2>{detail.title}</h2>
//       </section>

//       {/* Displays artist name */}
//       <section>
//         <h3>Artist: 
//           <button onClick = {clickHandler}>
//             {detail.username}
//           </button>
//         </h3>
//       </section>

//       {/* Displays artwork date created */}
//       <section>
//         <h3>Date created: {detail.date}</h3>
//       </section>

//       {/* Displays artwork theme */}
//       <section>
//         <p>Category: {detail.theme}</p>
//       </section>

//       {/* Displays artwork description */}
//       <section>
//         <p>Description:</p>
//         <p>{detail.description}</p>
//       </section>

//       {/* Button that toggles like and unlike and adds artworks to like_log joint table */}
//       {
//         (Number(detail.favorite) > 0)? 
//         <>
//           <button className="delete-button" onClick={unlikeDetails}>
//             Unlike
//           </button>
//         </>
//         :
//         <>
//           <button className="edit-button" onClick={likeDetails}>
//             Like
//           </button>
//         </>
//       }

//       {/* Button that takes user back to discover gallery page */}
//       <button onClick = {() => history.push('/discover')}>
//         Back to Discover
//       </button>
//     </div>
  );
}

export default ArtworkDetail;