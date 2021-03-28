/* Import Libraries */
import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import AddArtworkForm from '../AddArtworkForm/AddArtworkForm';

// Function fetches user details from the database
// and add artwork form to displays it on the Artwork Details page
function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Grabs information from Global Redex Store
  const user = useSelector((store) => store.user);

  // Takes user to edit user detail page upon 'Edit' button click
  const editUser = (userId) => {
      dispatch({
        type: 'FETCH_USER_DETAIL',
        payload: {
          userId: user.id
        }
    });
    // Navigate to `/editUser` page
    history.push(`/edituser/${userId}`);
  };

  console.log( "user", user);

  return (
    <div className="container">
      {/* Displays user profile picture */}
      <div>
        <img src={user.pfp} alt={user.title} />
        <h2>Welcome, {user.username}!</h2>
        <h3>Gallery Intro: </h3>
        <h4>(Displays on your Gallery Page)</h4>
        {/* Displays user introduction */}
        <p>{user.intro}</p>

        {/* Button that calls editUser function */}
        <button className="edit-button" onClick={editUser}>
          Edit
        </button>
      </div>

      {/* Imports Logout Button */}
      <LogOutButton className="btn" />

      {/* Imports add artwork form */}
      <AddArtworkForm />

    </div>
  );
}

export default ProfilePage;
