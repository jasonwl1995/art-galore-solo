/* Import Libraries */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link} from 'react-router-dom';

// Function fetches artwork details from the database
// and displays it on the Artwork Details page
function ArtworkDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;

  // Grabs information from Global Redex Store
  const detail = useSelector(store => store.detail);
  const artwork = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);
  const userList = useSelector(store => store.userList);

  // Load artwork details
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
    <div>
      {/* Displays artwork image */}
      <img src={detail.image} alt={detail.title} />

      {/* Displays artwork title */}
      <section>
        <h2>{detail.title}</h2>
      </section>

      {/* Displays artist name */}
      <section>
        <h3>Artist: 
          <button onClick = {clickHandler}>
            {detail.username}
          </button>
        </h3>
      </section>

      {/* Displays artwork date created */}
      <section>
        <h3>Date created: {detail.date}</h3>
      </section>

      <section>
        <p>Category: {detail.theme}</p>
      </section>

      {/* Displays artwork description */}
      <section>
        <p>Description:</p>
        <p>{detail.description}</p>
      </section>

      {/* button that toggles like and unlike and adds artworks to like_log joint table */}
      {
        (Number(detail.favorite) > 0)? 
        <>
          <button className="delete-button" onClick={unlikeDetails}>
            Unlike
          </button>
        </>
        :
        <>
          <button className="edit-button" onClick={likeDetails}>
            Like
          </button>
        </>
      }

      {/* Button that takes user back to discover gallery page */}
      <button onClick = {() => history.push('/discover')}>
        Back to Discover
      </button>
    </div>
  );
}

export default ArtworkDetail;