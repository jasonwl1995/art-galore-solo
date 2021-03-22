import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './GalleryPage.css';

function MyGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const artwork = useSelector(store => store.artwork);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ARTWORK'
    });
  }, []);

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_LIKE',
      payload: likeArtwork.id,
    });
  };

  return(
    <div>
      <main>
        <h1>MY GALLERY</h1>
        <section className="artwork">
            {artwork.map((artwork) => {
                return (
                  <div key={artwork.id} >
                    <img src={artwork.poster} alt={artwork.title} 
                    onClick={() => history.push(`/details/${artwork.id}`)}/>
                    <h3>{artwork.title}</h3>
                    <button id="deleteBtn" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                );
            })}
        </section>
      </main>
    </div>
    );
}

export default MyGalleryPage;
