import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './GalleryPage.css';

function MyGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ARTWORK',
      payload: { userid: user.id }
    });
  }, []);

  const editArtwork = (artworkid) => {
    history.push(`/edit/${artworkid}`);
  };

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
        <h2>{user.intro}</h2>
        <section className="artwork">
            {
              //test
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
                        <br></br>
                        <div>
                          <h3>{artwork.title}</h3>
                        </div>
                        <br></br>
                        <div>
                          <button onClick = { (evt) => {editArtwork(artwork.id)}}>
                            Edit
                          </button>
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
