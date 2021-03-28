/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DropdownNav from '../Nav/DropdownNav';
import DropdownNavCategory from '../Nav/DropdownNavCategory';

import './GalleryPage.css';

// 
function DiscoverGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

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

        {user.id && (
          <>
          <div>
            <p>Search By Username:</p>
            <DropdownNav />
          </div>
          </>
        )}

        {/* <>
        <div>
          <p>Sort By Category:</p>
          <DropdownNavCategory discover_userId="all"/>
        </div>
        </> */}

        <section className="artwork">
            {
              //making sure artworkList is populated before rendering
              artworkList && artworkList.length && 
              artworkList.map((artwork, i) => {
                  return (
                    <>
                    <div className="artworkdiv" key = {i}>
                      <img src={artwork.image} height="350px" weight = "250px " alt={artwork.username} 
                      onClick={() => history.push(`/details/${artwork.id}`)}/>
                      
                    </div>

                    <br></br>

                    <div>
                      <h3>{artwork.title}</h3>
                    </div>

                    <br></br>

                    <button onClick={() => history.push(`/details/${artwork.id}`)}>
                      Details
                    </button>

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
