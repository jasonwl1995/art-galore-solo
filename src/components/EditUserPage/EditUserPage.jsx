/* Import Libraries */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';


function EditUserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  /* Grab data from Redux store */
  const user = useSelector((store) => store.user);
  // const category = useSelector((store) => store.category);

  /* Local state variables used for capturing form input */
  // const [editTitle, setEditTitle] = useState(artwork.title);
  // const [editImage, setEditImage] = useState(artwork.image);
  // const [editDate, setEditDate] = useState(artwork.date);
  // const [editDescription, setEditDescription] = useState(artwork.description);
  // const [editCategory, setEditCategory] = useState(artwork.category);

  const [editUsername, setEditUsername] = useState('');
  const [editPFP, setEditPFP] = useState('');
  const [editIntro, setEditIntro] = useState('');
  // const [editAddress, setEditAddress] = useState('');



  const editUser = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Ping saga to update movie object in database
    dispatch({
      type: 'EDIT_USER',
      payload: {
        id: user.id,
        username: editUsername,
        // image: artworkImage,
        pfp: editPFP,
        intro: editIntro,
        // category_id: artworkCategory,
      },
    });

    // Navigate to detail page
    // history.push('/details');
  };

  return (
    <section className="edit-page">
      <h2>Edit User</h2>
      {/* <img
        src={movie.poster}
        alt={movie.title}
        className="details-poster-size"
      /> */}
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
              onChange={(event) => setEditUsername(evt.target.value)}
              />
            </td>
          </tr>

          {/* // ADD s3 IMAGE CALL */}
          {/* <tr>
            <td>
              <label htmlFor="moviePoster">Movie Poster URL: </label>
            </td>
            <td>
              <input
              name="moviePoster"
              type="text"
              placeholder="Movie Poster URL"
              value={moviePoster}
              onChange={(evt) => setMoviePoster(evt.target.value)}
              />
            </td>
          </tr> */}


          <tr>
            <td>
              <label htmlFor="userIntro">Gallery Introduction: </label>
            </td>
            <td>
              <textarea
              name="userIntro"
              placeholder="Introduce yourself and your work!"
              value={editIntro}
              onChange={(event) => setEditIntro(evt.target.value)}
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

export default EditUserPage;

