/* Import Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
// import ImageUpload from '../ImageUpload/ImageUpload';

function EditUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const userId = params;

  /* Grab data from Redux store */
  const user = useSelector((store) => store.user);
  // const category = useSelector((store) => store.category);

  /* Local state variables used for capturing form input */
  const [editUsername, setEditUsername] = useState(user.username);
  const [editPFP, setEditPFP] = useState(user.pfp);
  const [editIntro, setEditIntro] = useState(user.intro);
  // const [editAddress, setEditAddress] = useState(user.address);

  // const [editUsername, setEditUsername] = useState('');
  // const [editPFP, setEditPFP] = useState('');
  // const [editIntro, setEditIntro] = useState('');
  // const [editAddress, setEditAddress] = useState('');
  
  //   useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_USER_DETAIL',
  //     payload: {
  //       userId: user.id
  //       }
  //   });
  // }, []);



  const editUser = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Ping saga to update user object in database
    dispatch({
      type: 'EDIT_USER',
      payload: {
        id: user.id,
        username: editUsername,
        pfp: editPFP,
        intro: editIntro,
        // address: editAddress
      },
    });

    // Navigate to profile page
    history.push('/user');
  };

  return (
    <section className="edit-user">
      <h2>Edit User</h2>

      <form onSubmit={editUser}>
        <table>
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

          <tr>
            <td>
              <label htmlFor="userPFP">Profile Picture URL: </label>
            </td>
            <td>
              <input
              name="userPFP"
              type="text"
              placeholder="Profile Picture"
              value={editPFP}
              onChange={(event) => setEditPFP(event.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
            <label htmlFor="editPFP">Profile Picture: </label>
            </td>
            <td>
              {/* <ImageUpload /> */}
            </td>
          </tr>

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
            <td>
              <button className="save-button">Save</button>
              {/* <input type="submit" value="Save" /> */}
            </td>
            <td>
              <button onClick = {() => history.push('/user')}>
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

