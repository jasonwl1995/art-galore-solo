/* Import Libraries */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';


function EditArtworkPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  /* Grab data from Redux store */
  const artwork = useSelector((store) => store.artwork);
  // const category = useSelector((store) => store.category);

  /* Local state variables used for capturing form input */
  // const [editTitle, setEditTitle] = useState(artwork.title);
  // const [editImage, setEditImage] = useState(artwork.image);
  // const [editDate, setEditDate] = useState(artwork.date);
  // const [editDescription, setEditDescription] = useState(artwork.description);
  // const [editCategory, setEditCategory] = useState(artwork.category);

  const [editTitle, setEditTitle] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editDescription, setEditDescription] = useState('');



  const editArtwork = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Ping saga to update movie object in database
    dispatch({
      type: 'EDIT_ARTWORK',
      payload: {
        id: artwork.id,
        title: artworkTitle,
        // image: artworkImage,
        date: artworkDate,
        image: artworkImage,
        description: artworkDescription,
        // category_id: artworkCategory,
      },
    });

    // Navigate to detail page
    // history.push('/details');
  };

  return (
    <section className="edit-page">
      <h2>Edit Artwork</h2>
      {/* <img
        src={movie.poster}
        alt={movie.title}
        className="details-poster-size"
      /> */}
      <form onSubmit={editArtwork}>
        <table>
          <tr>
            <td>
              <label htmlFor="artworkTitle">Artwork Title: </label>
            </td>
            <td>
              <input
              name="artworkTitle"
              type="text"
              placeholder="Artwork Title"
              value={editTitle}
              onChange={(event) => setEditTitle(evt.target.value)}
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
              <label htmlFor="artworkDate">Artwork Date: </label>
            </td>
            <td>
              <input
              name="artworkDate"
              type="text"
              placeholder="Artwork Date"
              value={editDate}
              onChange={(event) => setEditDate(evt.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="artworkDescription">Artwork Description: </label>
            </td>
            <td>
              <textarea
              name="artworkDescription"
              placeholder="Artwork Description:"
              value={editDescription}
              onChange={(event) => setEditDescription(evt.target.value)}
              />
            </td>
          </tr>

        {/* Movie Genre */}
        {/* <div>
          <label htmlFor="movieGenre">Genre:</label>
          <select
            name="movieGenre"
            id="movieGenre"
            value={editGenre}
            onChange={(event) => setEditGenre(event.target.value)}
          >
            <option value="">Select a Genre</option>
            {genres.map((genre, i) => {
              return (
                <option key={i} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
        </div> */}
          <tr>
            <td>
              <button className="save-button">Save</button>
              {/* <input type="submit" value="Save" /> */}
            </td>
            <td>
              <button onClick = {() => history.push('/details')}>
                Cancel
              </button>
            </td>
          </tr>
        
        </table>
      </form>
    </section>
  );
}

export default EditArtworkPage;

