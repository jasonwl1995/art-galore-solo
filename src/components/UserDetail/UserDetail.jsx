import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function UserDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  // data from redux
  const user = useSelector(store => store.user);

  // on load, get(fetch)
  // Display details on the page
  useEffect(() => {
    dispatch({
      type: 'GET_USER_DETAILS',
      payload: params,
    });
  }, []);

  const editUser = () => {

    // Store the movie to be edited in the <EditUser /> component in the Redux store
    dispatch({
      type: 'EDIT_USER',
      payload: userId,
    });

    // Navigate to `/editUser` page
    history.push('/editUser');
  };

  console.log( "user", user);
  return (
    <div>
      <img src={user.pfp} alt={user.title} />
      <h2>{user.username}</h2>
      <h3>Gallery Intro: </h3>
      <h4>(Displays on your Gallery Page)</h4>
      <p>{user.intro}</p>

      <button className="edit-button" onClick={editUser}>
        Edit
      </button>

    </div>
  );
}

export default UserDetail;