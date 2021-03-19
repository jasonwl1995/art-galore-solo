// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useHistory } from 'react-router-dom';

// function UserDetail() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const params = useParams();

//   // data from redux
//   const user = useSelector(store => store.user);

//   // on load, get(fetch)
//   // Display details on the page
//   useEffect(() => {
//     dispatch({
//       type: 'GET_USER_DETAILS',
//       payload: params,
//     });
//   }, []);

//   console.log( "user", user);
//   return (
//     <div>
//       <img src={user.pfp} alt={user.title} />
//       <h2>{user.username}</h2>
//       <p>{user.user_intro}</p>

//       <button onClick = {() => history.push('/')}>Back to Gallery</button>
//     </div>
//   );
// }

// export default MovieDetailPage;