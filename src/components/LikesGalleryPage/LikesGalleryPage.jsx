import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function LikesGalleryPage() {
  console.log("starting of LikeGalleryPage");
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const likeUserId = params;

  const user = useSelector(store => store.user);
  const artworkList = useSelector(store => store.artwork);

  useEffect(() => {
    dispatch({
      type: 'FETCH_LIKE_ARTWORK',
      payload: {
        userid: likeUserId.id
      },
    });
  }, []);

const unlikeArtwork = (artworkid) => {
  dispatch({
    type: 'UNLIKE_ARTWORK',
    payload: {
      artworkid: artworkid,
      userid: user.id,
    }
  });
};

  return(
    <div>
      <main>
      <h1>Likes Galore!</h1>
        <h2>Here are your liked Artworks!</h2>
        <section className="artwork">
            {
              //making sure artworkList is populated before rendering
              artworkList && artworkList.length && 
              artworkList.map((artwork, i) => {
                  return (
                    <>
                    <div className="artworkdiv" key = {i}>
                      <img src={artwork.image} height="350px" weight = "250px "alt={artwork.description} 
                      onClick={() => history.push(`/details/${artwork.id}`)}/>
                      
                    </div>
                    <br></br>
                    <div>
                      <h3>{artwork.title}</h3>
                    </div>
                    <br></br>
                    <div>
                      <button onClick = { (evt) => {unlikeArtwork(artwork.id)}}>
                        UnLike
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

export default LikesGalleryPage;