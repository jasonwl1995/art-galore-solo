/* Import Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';


function EditArtworkPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;
console.log('artworkID', artworkId);
  /* Grab data from Redux store */
  const detail = useSelector((store) => store.detail);
  const user = useSelector((store) => store.user);
  console.log('details', detail);
  // const category = useSelector((store) => store.category);

  /* Local state variables used for capturing form input */
  const [editTitle, setEditTitle] = useState(detail.title);
  const [editImage, setEditImage] = useState(detail.image);
  const [editDate, setEditDate] = useState(detail.date);
  const [editDescription, setEditDescription] = useState(detail.description);
  // const [editCategory, setEditCategory] = useState(artwork.category);

  // const [editTitle, setEditTitle] = useState('');
  // const [editImage, setEditImage] = useState('');
  // const [editDate, setEditDate] = useState('');
  // const [editDescription, setEditDescription] = useState('');
    useEffect(() => {
    dispatch({
      type: 'FETCH_ARTWORK_DETAIL',
      payload: {
        userId: user.id,
        artworkId: artworkId.id}
    });
  }, []);
  console.log('details', detail);

  const editArtwork = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Ping saga to update movie object in database
    dispatch({
      type: 'EDIT_ARTWORK',
      payload: {
        id: detail.id,
        title: editTitle,
        // image: artworkImage,
        date: editDate,
        image: editImage,
        description: editDescription,
        // category_id: editCategory,
      },
    });
    history.push(`/mydetails/${artworkId.id}`);
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
              onChange={(event) => setEditTitle(event.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>
            <label htmlFor="artworkImage">Artwork Image: </label>
            </td>
            <td>
              <ImageUpload />
            </td>
          </tr>

          <tr>
            <td>
              <label htmlFor="artworkImage">Artwork Thumbnail URL: </label>
            </td>
            <td>
              <input
              name="artworkImage"
              type="text"
              placeholder="Artwork Image URL"
              value={editImage}
              onChange={(event) => setEditImage(event.target.value)}
              />
            </td>
          </tr>

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
              onChange={(event) => setEditDate(event.target.value)}
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
              onChange={(event) => setEditDescription(event.target.value)}
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
              <button onClick = {() => history.push(`/mydetails/${artworkId.id}`)}>
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

