import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function ArtworkDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // data from redux
  const artwork = useSelector(store => store.artwork);

  // on load, get(fetch)
  // Display details on the page
  console.log("params", params);
  useEffect(() => {
    dispatch({
      type: 'GET_ARTWORK',
      payload: params,
    });
  }, []);

  // const likeArtwork = ({artwork.id}) => {
  //   dispatch({
  //     type: 'ADD_LIKE',
  //     payload: { artwork.id }
  //   });
  // };

  console.log("artwork", artwork);
  return (
    <div>
      <img src={artwork.image} alt={artwork.title} />

      <section>
        <h2>{artwork.title}</h2>
      </section>

      <section>
        <Link>
          <h3>{artwork.user}</h3>
        </Link>
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

      {/* <button onClick = {() => likeArtwork{artwork.id}}>
        Like
      </button> */}

      <button onClick = {() => history.push('/gallery')}>
        Back to Gallery
      </button>
    </div>
  );
}

export default ArtworkDetail;