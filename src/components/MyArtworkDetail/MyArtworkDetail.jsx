/* Import Libraries */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// Function fetches artwork details from the database
// and displays it on the Artwork Details page
function MyArtworkDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;

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
    <div>
      {/* Displays artwork image */}
      <img src={detail.image} alt={detail.title} />

      {/* Displays artwork title */}
      <section>
        <h2>{detail.title}</h2>
      </section>

      {/* Displays artwork date created */}
      <section>
        <h3>Date created: {detail.date}</h3>
      </section>

      {/* Displays artwork theme */}
      <section>
        <p>Category: {detail.theme}</p>
      </section>

      {/* Displays artwork description */}
      <section>
        <p>Description:</p>
        <p>{detail.description}</p>
      </section>

      
      <div>
        {/* Button that calls editArtwork function */}
        <button onClick = { (evt) => {editArtwork(detail.id)}}>
          Edit
        </button>
        {/* Button that calls deleteArtwork function */}
        <button onClick = { (evt) => {deleteArtwork(detail.id)}}>
          Delete
        </button>
      </div>

      {/* Button that brings user back to My Gallery Page */}
      <button onClick = {() => history.push('/mygallery')}>
        Back to Gallery
      </button>

    </div>
  );
}

export default MyArtworkDetail;
