import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './GalleryPage.css';

function DiscoverUserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const artwork = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

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
        <h1>{user.username}'s Gallery</h1>
        <h2>{user.intro}</h2>
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

export default DiscoverUserPage;
