/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DropdownNav from '../Nav/DropdownNav';
import DropdownNavCategory from '../Nav/DropdownNavCategory';

import './GalleryPage.css';

// Function fetches all artworks from a certain user
// and displays it on the Discover Gallery Page
function DiscoverUserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const disUserId = params;

  // Grabs information from Global Redex Store
  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  // Loads all artwork from selected user
  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ARTWORK',
      payload: { 
        userid: disUserId.id 
        }
    });
  }, []);

return(
  <div>
    <main>
      
      {/* Displays artist name */}
      <h1>{artworkList && artworkList.length &&
      artworkList[0].username}'s Gallery!</h1>

      {/* Display artist introduction */}
      <h2>{artworkList && artworkList.length &&
      artworkList[0].intro}</h2>

      {/* Displays a dropdown list of all other users 
          with at least 1 artwork in their gallery
      <div>
        <p>Search By Username:</p>
        <DropdownNav />
      </div>
       */}

        {/* Displays a dropdown list of all categories 
            with at least 1 artwork in that category */}
        <div>
          <p>Sort By Category:</p>
          <DropdownNavCategory discover_userId={disUserId.id}/>
        </div>

        {/* Displays artworks from selected
            users onto the discover users page */}
        <section className="artwork">
            {
              // Makes sure artworkList is populated
              artworkList && artworkList.length && 
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

export default DiscoverUserPage;
