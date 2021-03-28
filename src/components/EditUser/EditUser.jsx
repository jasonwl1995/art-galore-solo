/* Import Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';

import ImageUpload from '../ImageUpload/ImageUpload';

// Function renders passed user details to be edited
function EditUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const userId = params;

  // Grabs information from Global Redex Store
  const user = useSelector((store) => store.user);
  const pfpUrl = useSelector ((store) => store.awsPFP);

  // Local state variables used for capturing form input 
  const [editUsername, setEditUsername] = useState(user.username);
  const [editIntro, setEditIntro] = useState(user.intro);

  // Function handle of on click edit button
  const editUser = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Ping saga to update user object in database
    dispatch({
      type: 'EDIT_USER',
      payload: {
        id: user.id,
        username: editUsername,
        pfp: pfpUrl,
        intro: editIntro,
      },
    });
    // Navigate to profile page
    history.push('/user');
  };

  // Function to set PFP on cancel
  const onCancel = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SET_PFP_URL',
      payload: user.pfp
    });
    history.push('/user')
  }

  return (
    <section className="edit-user">
      <h2>Edit User</h2>

      <form onSubmit={editUser}>
        <table>

          {/* Input field to edit artist username */}
          <tr>
            <td>
              <label htmlFor="username">Username: </label>
            </td>
            <td>
              <input
              name="username"
              type="text"
              placeholder="New Username"
              value={editUsername}
              onChange={(event) => setEditUsername(event.target.value)}
              />
            </td>
          </tr>

          {/* Input field to edit artist profile picture */}
          <tr>
            <td>
            <label htmlFor="pfpImage">Edit Profile Picture: </label>
            </td>
            <td>
              <ImageUpload page="AddProfilePicture"/>
            </td>
          </tr>

          {/* Input field to edit artist introduction */}
          <tr>
            <td>
              <label htmlFor="userIntro">Gallery Introduction: </label>
            </td>
            <td>
              <textarea
              name="userIntro"
              placeholder="Introduce yourself and your work!"
              value={editIntro}
              onChange={(event) => setEditIntro(event.target.value)}
              />
            </td>
          </tr>

          <tr>
            {/* Calls editUser function */}
            <td>
              <button className="save-button">Save</button>
            </td>

            {/* Cancels edits and takes user back to the user Profile Page */}
            <td>
              <button onClick = {onCancel}>
                Cancel
              </button>
            </td>
          </tr>
        
        </table>
      </form>
    </section>
  );
}

export default EditUser;

