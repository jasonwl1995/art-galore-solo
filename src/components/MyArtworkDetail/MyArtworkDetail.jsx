import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function MyArtworkDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // data from redux
  const artwork = useSelector(store => store.artwork);

  // on load, get(fetch)
  // Display details on the page
  useEffect(() => {
    dispatch({
      type: 'FETCH_DETAIL',
      payload: params,
    });
  }, []);

  const editArtwork = () => {

    // Store the movie to be edited in the <EditArtwork /> component in the Redux store
    dispatch({
      type: 'EDIT_ARTWORK',
      payload: {
      artworkId,
      userId,
      }
    });

    // Navigate to `/editArtwork` page
    history.push('/editArtwork');
  };

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_ARTWORK',
      payload: likeArtwork.id,
    });
  };

  console.log( "artwork", artwork);
  return (
    <div>
      <img src={artwork.image} alt={artwork.title} />

      <section>
        <h2>{artwork.title}</h2>
      </section>

      <section>
        <h3>{artwork.date}</h3>
      </section>

      <section>
        <p>{artwork.description}</p>
      </section>
      
      {/* {details.array_agg ? (
      <span>
        {details.array_agg.map((genre) => {
          return (
            <p>{genre}</p>
          );
        })}
      </span>
      ) : (
        <div></div>
      )} */}
      <button className="edit-button" onClick={editArtwork}>
        Edit
      </button>

      <button className="delete-button" onClick={deleteArtwork}>
        Delete
      </button>

      <button onClick = {() => history.push('/mygallery')}>
        Back to Gallery
      </button>

    </div>
  );
}

export default MyArtworkDetail;