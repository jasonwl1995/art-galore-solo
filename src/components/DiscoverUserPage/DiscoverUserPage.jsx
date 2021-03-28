/* Import Libraries */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DropdownNav from '../Nav/DropdownNav';
import DropdownNavCategory from '../Nav/DropdownNavCategory';

import './GalleryPage.css';

function DiscoverUserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const disUserId = params;

  const artworkList = useSelector(store => store.artwork);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_ARTWORK',
      payload: { 
        userid: disUserId.id 
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

console.log('artworkList', artworkList);
console.log('artworkList', artworkList.length);
return(
  <div>
    <main>
      <h1>{artworkList && artworkList.length &&
      artworkList[0].username}'s Gallery!</h1>
      <h2>{artworkList && artworkList.length &&
      artworkList[0].intro}</h2>

      <>
      <div>
        <p>Search By Username:</p>
        <DropdownNav />
      </div>
      </>

      {/* <>
        <div>
          <p>Sort By Category:</p>
          <DropdownNavCategory discover_userId={disUserId.id}/>
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
                    <img src={artwork.image} height="350px" weight = "250px "alt={artwork.description} 
                    onClick={() => history.push(`/details/${artwork.id}`)}/>
                    
                  </div>
                  <br></br>
                  <div>
                    <h3>{artwork.title}</h3>
                  </div>
                  <br></br>
                  <div>

                  <button onClick={() => history.push(`/details/${artwork.id}`)}>
                    Details
                  </button>
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
