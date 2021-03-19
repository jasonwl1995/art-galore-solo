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

  // const likeArtwork = ({artwork.id}) => {
  //   dispatch({
  //     type: 'ADD_LIKE',
  //     payload: { artwork.id }
  //   });
  // };

  return(
    <div>
      <main>
        <h1>ART GALORE</h1>
        <section className="artwork">
            {artwork.map((artwork) => {
                return (
                  <div key={artwork.id} >
                    <img src={artwork.poster} alt={artwork.title} 
                    onClick={() => history.push(`/details/${artwork.id}`)}/>
                    <h3>{artwork.title}</h3>
                    {/* <button onClick = {() => likeArtwork{artwork.id}}>
                      Like
                    </button> */}
                  </div>
                );
            })}
        </section>
      </main>
    </div>
    );
}

export default MyGalleryPage;
