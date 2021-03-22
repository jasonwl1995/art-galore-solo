import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';

function AddArtworkForm() {
  const dispatch = useDispatch();

  //Global Store
  // (STRETCH TO ADD CATEGORIES)
  const category = useSelector(store => store.category);
  const user = useSelector(store => store.user);
  //Local Store
  const [artworkTitle, setArtworkTitle] = useState('');
  const [artworkImage, setArtworkImage] = useState('');
  const [artworkDate, setArtworkDate] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');
  const [artworkCategory, setArtworkCategory] = useState('');
  
  // (STRETCH TO ADD CATEGORIES)
  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_CATEGORY_LIST'
  //   });
  // }, []);


  const addArtwork = (evt) => {
    evt.preventDefault();
    // console.log('addArtwork log', movieGenre);
    dispatch({
      type: 'ADD_ARTWORK',
      payload: {
        id: user.id,
        title: artworkTitle,
        date: artworkDate,
        image: artworkImage,
        description: artworkDescription,
        category_id: artworkCategory,
      }
    })
    setArtworkTitle('');
    setArtworkDate('');
    setArtworkImage('');
    setArtworkDescription('');
    setArtworkCategory('');
  };

  return (
    <div>
      <h3>Add an Artwork</h3>
      <form onSubmit={addArtwork}>
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
              value={artworkTitle}
              onChange={(evt) => setArtworkTitle(evt.target.value)}
              required
              />
            </td>
          </tr>

          {/* <tr>
            <td>
            <label htmlFor="artworkImage">Artwork Image: </label>
            </td>
            <td>
              <ImageUpload />
            </td>
          </tr> */}

          <tr>
            <td>
              <label htmlFor="artworkImage">Artwork Thumbnail URL: </label>
            </td>
            <td>
              <input
              name="artworkImage"
              type="text"
              placeholder="Artwork Image URL"
              value={artworkImage}
              onChange={(evt) => setArtworkImage(evt.target.value)}
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
              placeholder="Date Created"
              value={artworkDate}
              onChange={(evt) => setArtworkDate(evt.target.value)}
              required
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
              value={artworkDescription}
              onChange={(evt) => setArtworkDescription(evt.target.value)}
              required
              />
            </td>
          </tr>

          {/* STRETCH ARTWORK CATEGORY */}
          <tr>
            <td>
              <label htmlFor="artworkCategory">Select Category: </label>
            </td>
            <td>
              <select 
                name="artworkCategory" 
                placeholder="--- Categories ---"
                value={artworkCategory}
                onChange={(evt) => setArtworkCategory(evt.target.value)}
                required
                >
                <option key="-1" value="">--- Select A Category ---</option>
                {
                  category && category.length && category.map((cat, i) => {
                    return (
                        <option key={i} value={cat.id}>{cat.theme}</option>
                      )
                    })
                }
              </select>
            </td>
          </tr>

          <tr>
            <td>
              <button
                type="submit"
                value='Add Artwork'
              >
                Add Artwork
              </button>
            </td>
            {/* <td>
              <input type="submit" value="Save" />
            </td>
            
            //Used on ARTWORK EDIT page
            <td>
              <Link to="/">Cancel</Link>
            </td> */}
          </tr>

        </table>
      </form>

    </div>
  );
}

export default AddArtworkForm;