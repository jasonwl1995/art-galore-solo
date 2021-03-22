import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function MyArtworkDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;

  // data from redux
  const detail = useSelector(store => store.detail);
  const user = useSelector((store) => store.user);
  // on load, get(fetch)
  // Display details on the page
  useEffect(() => {
    dispatch({
      type: 'FETCH_ARTWORK_DETAIL',
      payload: {
        artworkId: artworkId.id
        }
    });
  }, []);

  const editArtwork = (artworkid) => {
    history.push(`/edit/${artworkid}`);
  };

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

  console.log( "detail", detail);
  return (
    <div>
      <img src={detail.image} alt={detail.title} />

      <section>
        <h2>{detail.title}</h2>
      </section>

      <section>
        <h3>Date created: {detail.date}</h3>
      </section>

      <section>
        <p>Category: {detail.theme}</p>
      </section>

      <section>
        <p>Description:</p>
        <p>{detail.description}</p>
      </section>

      
      <div>
        <button onClick = { (evt) => {editArtwork(detail.id)}}>
          Edit
        </button>
        <button onClick = { (evt) => {deleteArtwork(detail.id)}}>
          Delete
        </button>
      </div>

      <button onClick = {() => history.push('/mygallery')}>
        Back to Gallery
      </button>

    </div>
  );
}

export default MyArtworkDetail;
