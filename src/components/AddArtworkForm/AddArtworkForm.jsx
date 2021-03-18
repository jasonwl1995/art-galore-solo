import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, useHistory, Link } from 'react-router-dom';

function AddArtworkForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  //Global Store
  // (STRETCH TO ADD CATEGORIES)
  // const genres = useSelector(store => store.genres);

  //Local Store
  const [artworkTitle, setArtworkTitle] = useState('');
  const [artworkImage, setArtworkImage] = useState('');
  const [artworkDate, setArtworkDate] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');

  // (STRETCH TO ADD CATEGORIES)
  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_CATEGORY'
  //   });
  // }, []);


  const addArtwork = (evt) => {
    evt.preventDefault();
    // console.log('addArtwork log', movieGenre);
    dispatch({
      type: 'ADD_ARTWORK',
      payload: {
        title: artworkTitle,
        date: artworkDate,
        image: artworkImage,
        description: artworkDescription,
        // category_id: artworkCategory,
      }
    })
    setArtworkTitle('');
    setArtworkDate('');
    setArtworkImage('');
    setArtworkDescription('');
//    history.push('/');
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
              <textarea
              name="artworkDate"
              placeholder="Date Created"
              value={artworkDate}
              onChange={(evt) => setArtworkDate(evt.target.value)}
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
              />
            </td>
          </tr>

          {/* STRETCH ARTWORK CATEGORY */}
          {/* <tr>
            <td>
              <label htmlFor="movieGenre">Select Genre: </label>
            </td>
            <td>
              <select 
                name="movieGenre" 
                placeholder="--- Genres ---"
                value={movieGenre}
                onChange={(evt) => setMovieGenre(evt.target.value)}
              >
                {genres.map((genre, i) => {
                  return (
                    <option key={i} value={genre.id}>{genre.name}</option>
                  )
                })};
              </select>
            </td>
          </tr> */}

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