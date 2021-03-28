/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DropdownNav from '../Nav/DropdownNav';
import DropdownNavCategory from '../Nav/DropdownNavCategory';

import './GalleryPage.css';

// Function fetches all artworks besides the logged in user
// and displays it on the Discover Gallery Page
function DiscoverGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Grabs information from Global Redex Store
  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  // Loads all artwork
  useEffect(() => {
    dispatch({
      type: 'DISCOVER_GALLERY_ARTWORK',
      payload: {userid: user.id},
    });
  }, []);

  return(
    <div>
      <main>
        <h1>Art Galore</h1>
        <h2>Browse through some artworks from other artists!</h2>

        {/* Displays a dropdown list of all other users 
            with at least 1 artwork in their gallery */}
        {user.id && (
          <>
          <div>
            <p>Search By Username:</p>
            <DropdownNav />
          </div>
          </>
        )}

        {/* Displays a dropdown list of all categories 
            with at least 1 artwork in that category */}
        <>
        <div>
          <p>Sort By Category:</p>
          <DropdownNavCategory discover_userId="all"/>
        </div>
        </>

        {/* Displays artworks from all users 
            onto the discover gallery page */}
        <section className="artwork">
            {
              // Makes sure artworkList is populated
              artworkList && artworkList.length && 
              artworkList.map((artwork, i) => {
                  return (
                    <>
                    <div className="artworkdiv" key = {i}>
                      <img src={artwork.image} height="350px" weight = "250px " alt={artwork.username} 
                      onClick={() => history.push(`/details/${artwork.id}`)}/>
                    </div>


                    {/* Displays artwork title */}
                    <div>
                      <h3>{artwork.title}</h3>
                    </div>

                    {/* Button that takes user to the artwork details page */}
                    <div>
                      <button onClick={() => history.push(`/details/${artwork.id}`)}>
                        Details
                      </button>
                    </div>

                  </>
                  );
              })              
            }
        </section>
      </main>
    </div>
    );
}

export default DiscoverGalleryPage;
