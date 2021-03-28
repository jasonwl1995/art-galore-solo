/* Import Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';

// Function renders passed artwork details to be edited
function EditArtworkPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const artworkId = params;

  // Grabs information from Global Redex Store
  const detail = useSelector((store) => store.detail);
  const user = useSelector((store) => store.user);

  // Local state variables used for capturing form input
  const [editTitle, setEditTitle] = useState(detail.title);
  const [editDescription, setEditDescription] = useState(detail.description);

    // Ping saga to fetch artwork details
    useEffect(() => {
    dispatch({
      type: 'FETCH_ARTWORK_DETAIL',
      payload: {
        userId: user.id,
        artworkId: artworkId.id}
    });
  }, []);

  // Function handle of on click edit button
  const editArtwork = (event) => {
    // Keep page from refreshing on form submission
    event.preventDefault();

    // Ping saga to update movie object in database
    dispatch({
      type: 'EDIT_ARTWORK',
      payload: {
        id: detail.id,
        title: editTitle,
        description: editDescription,
      },
    });
    // Navigate back to My Artwork Details page
    history.push(`/mydetails/${artworkId.id}`);
  };

  return (
    <section className="edit-page">
      <h2>Edit Artwork</h2>

      {/* Displays artwork image */}
      <img src={detail.image} alt={detail.description}/>

      <form onSubmit={editArtwork}>
        <table>

          {/* Input field to edit artwork title */}
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

          {/* Input field to edit artwork description */}
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

          <tr>
            {/* Calls editArtwork function */}
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

