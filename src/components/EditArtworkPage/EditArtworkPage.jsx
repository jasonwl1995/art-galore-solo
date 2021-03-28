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
  const [editDescription, setEditDescription] = useState(detail.description);

console.log('log preset', detail.title);
console.log('log preset', detail.description);
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
        // date: editDate,
        // image: editImage,
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
      <img src={detail.image} alt={detail.description}/>

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
              required
              />
            </td>
          </tr>

          {/* Input box for new artwork description */}
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
              required
              />
            </td>
          </tr>

          {/* calls editArtwork function */}
          <tr>
            <td>
              <button className="save-button">
                Save
              </button>
            </td>

            {/* Cancels edits and takes user back to the artwork detail page */}
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

