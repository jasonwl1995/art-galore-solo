import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './GalleryPage.css';

function DiscoverUserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({
      type: 'DISCOVER_USER_ARTWORK',
      payload: { 
        userid: user.id,
        discover_userid: params.id,
      }
    });
  }, []);

//   const likeArtwork = (artworkid) => {
//     dispatch({
//       type: 'ADD_LIKE_ON_USERPAGE',
//       payload: {
//         artworkid: artworkid,
//         userid: user.id,
//         //need to pass the selected user from the drop-down list
//         discover_userid: params.id,
//       }
//     });
//  };

//  const unlikeArtwork = (artworkid) => {
//    dispatch({
//      type: 'ADD_UNLIKE_ON_USERPAGE',
//      payload: {
//        artworkid: artworkid,
//        userid: user.id,
//         //need to pass the selected user from the drop-down list
//        discover_userid: params.id,
//      }
//    });
// };

return(
  <div>
    <main>
      <h1>Art Galore</h1>
      <h2>Browse through some artworks from other artists!</h2>
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
                    {/* <div>
                        Likes: {artwork.favorite}
                    </div>
                    {

                          (artwork.favorite > 0)? 
                          <>
                          <button onClick = { (evt) => {unlikeArtwork(artwork.id)}}>
                            UnLike
                          </button>
                          </> 
                          : 
                          <>
                          <button onClick = { (evt) => {likeArtwork(artwork.id)}}>
                            Like
                          </button>
                          </>
                    }     */}
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
