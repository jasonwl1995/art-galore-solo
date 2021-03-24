import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link} from 'react-router-dom';

function ArtworkDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;

  // data from redux
  const detail = useSelector(store => store.detail);
  const user = useSelector((store) => store.user);
  const userList = useSelector(store => store.userList);
  // const userList = useSelector(store => store.userList);

  // on load, get(fetch)
  // Display details on the page
  console.log("params", params);
  useEffect(() => {
    dispatch({
      type: 'FETCH_ARTWORK_DETAIL',
      payload: {
        userId: user.id,
        artworkId: artworkId.id
        }
    });
  }, []);

  const clickHandler = (evt) => {
    //go to discover user page

    let newUser = evt.target.value;
    userChange(newUser);

  };
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
  
  // const likeArtwork = ({artwork.id}) => {
  //   dispatch({
  //     type: 'ADD_LIKE',
  //     payload: { artwork.id }
  //   });
  // };

  console.log("detail", detail);
  return (
    <div>
      <img src={detail.image} alt={detail.title} />

      <section>
        <h2>{detail.title}</h2>
      </section>

      <section>
        {/* <Link onClick={clickHandler}> */}
        
        <h3>Artist: 
          {/* <Link>
            {detail.username}
          </Link> */}
        {/* <button onClick = {() => history.push(`/discover/${detail.user_id}`)}> */}
        <button onClick = {clickHandler}>
          {detail.username}
        </button>
        </h3>
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

      <button onClick = {() => history.push('/discover')}>
        Back to Discover
      </button>
    </div>
  );
}

export default ArtworkDetail;