/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// Function fetches all artworks that a user likes
// and displays it on the Likes Gallery Page
function LikesGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  
  // Grabs information from Global Redex Store
  const user = useSelector(store => store.user);
  const artworkList = useSelector(store => store.artwork);

  // Loads all artwork that the user likes
  useEffect(() => {
    dispatch({
      type: 'FETCH_LIKE_ARTWORK',
      payload: {
        userId: user.id
      },
    });
  }, []);

// Function to unlike an artwork once Unlike button is clicked
const unlikeArtwork = (artworkid) => {
  dispatch({
    type: 'UNLIKE_ARTWORK',
    payload: {
      artworkId: artworkid,
      userId: user.id,
    }
  });
};

  return(
    <div>
      <main>
      <h1>Likes Galore!</h1>
        <section className="artwork">
            {
              // Displays either users likes or if 
              // there are not likes, a message
              (artworkList && artworkList.length)?
              <> 
              <h2>Here are your liked Artworks!</h2>
              { 
              artworkList.map((artwork, i) => {
                  return (
                    <>
                    <div className="artworkdiv" key = {i}>
                      <img src={artwork.image} height="350px" weight = "250px "alt={artwork.description} 
                      onClick={() => history.push(`/details/${artwork.id}`)}/>
                    </div>

                    {/* Displays artwork title */}
                    <div>
                      <h3>{artwork.title}</h3>
                    </div>

                    
                    <div>
                      {/* Button that calls unlikeArtwork function to 
                          remove artwork from likes table in database */}
                      <button onClick = { (evt) => {unlikeArtwork(artwork.id)}}>
                        Unlike
                      </button>
                    </div>
                  </>
                  );
              })
              }
            </>
            :
            // Display message if user has no liked artworks
            <>
              <h3>You Have Not Liked Any Artworks Yet!</h3>
            </>
            }
        </section>
      </main>
    </div>
    );
}

export default LikesGalleryPage;