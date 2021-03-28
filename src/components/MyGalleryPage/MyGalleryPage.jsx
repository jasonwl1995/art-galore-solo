/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './GalleryPage.css';

// Function fetches all artworks from a logged in user
// and displays it on the My Gallery Page
function MyGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Grabs information from Global Redex Store
  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  // Loads all artwork from user
  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ARTWORK',
      payload: { 
        userid: user.id 
        }
    });
  }, []);

  // Function called once details button is clicked
  // Brings user to My Artwork Details Page
  const artworkDetails = (artworkid) => {
    history.push(`/mydetails/${artworkid}`);
  };

  // Function called once delete button is clicked
  // Deletes artwork from database and removes it from page
  const deleteArtwork = (artworkid) => {
    dispatch({
      type: 'DELETE_ARTWORK',
      payload: {
        artworkid: artworkid,
        userid: user.id,
      }
    });
 };
  
  return(
    <div>
      <main>
        <h1>My Gallery</h1>

        {/* Displays artist intro */}
        <p>{user.intro}</p>

        {/* Displays artworks from signed in
            user onto the My Gallery page */}
        <section className="artwork">
            {
              // Displays either users artwork or if 
              // there are not artworks, a message
              (artworkList && artworkList.length)?
              <>
                {
                    artworkList.map((artwork) => {
                      return (
                        <>
                        <div className="artworkdiv">
                          <img src={artwork.image} height="350px" weight = "250px "alt={artwork.description} 
                          onClick={() => history.push(`/mydetails/${artwork.id}`)}/>
                        </div>
                        
                        {/* Displays artwork title */}
                        <div>
                          <h3>{artwork.title}</h3>
                        </div>

                        <div>
                          {/* Button that calls artworkDetails button brings user to the My Details Page */}
                          <button onClick = { (evt) => {artworkDetails(artwork.id)}}>
                            Details
                          </button>
                          {/* Button that calls function to delete artwork */}
                          <button onClick = { (evt) => {deleteArtwork(artwork.id)}}>
                            Delete
                          </button>
                        </div>
                      </>
                      );
                  })  
                }                  
              </>
              :
              // Display message if user has no artworks
              <>
                <h3>You Have Not Added Any Artworks Yet!</h3>
              </>
           }
        </section>
      </main>
    </div>
    );
}

export default MyGalleryPage;
