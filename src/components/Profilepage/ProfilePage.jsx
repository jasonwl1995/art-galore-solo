
import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import AddArtworkForm from '../AddArtworkForm/AddArtworkForm';
import EditArtworkPage from '../EditArtworkPage/EditArtworkPage';
// import UserDetail from '../UserDetail/UserDetail';

function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // // on load, get(fetch)
  // // Display details on the page
  // useEffect(() => {
  //   dispatch({
  //     type: 'GET_USER_DETAILS',
  //     payload: params,
  //   });
  // }, []);

  const editUser = (userId) => {
    // Navigate to `/editUser` page
    history.push(`/edituser/${user.id}`);
  };

  console.log( "user", user);

  return (
    <div className="container">
      {/* <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p> */}

      <div>
        <img src={user.pfp} alt={user.title} />
        <h2>Welcome, {user.username}!</h2>
        <h3>Gallery Intro: </h3>
        <h4>(Displays on your Gallery Page)</h4>
        <p>{user.intro}</p>

        <button className="edit-button" onClick={editUser}>
          Edit
        </button>
      </div>

      <LogOutButton className="btn" />
      {/* <UserDetail /> */}
      <AddArtworkForm />

    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
