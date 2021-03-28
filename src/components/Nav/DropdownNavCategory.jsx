import { useDispatch, useSelector } from 'react-redux';
//import { generatePath, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function DropdownNavCategory(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(store => store.user);
  const userList = useSelector(store => store.userList);

  const activecategory = useSelector(store => store.activeCategory);

  console.log("from nav category, params is", props);


  // (STRETCH TO ADD DROP DOWN USER LIST)
  //get user list to populate drop-down list
   useEffect(() => {
     dispatch({
       type: 'FETCH_ACTIVE_CATEGORY',
       payload: {userId: user.id},
     });
   }, []);

   ///try to put theme drop down list here
   //upon select a user from drop down list, then go to the discover page
   const handleCategoryChange = (evt) => {
    //go to discover user page
    //console.log('which user to discover:', uid);

    let newCategory = evt.target.value;
    categoryChange(newCategory);
    //history.push(`/discoveruser/${newUser}`);

  };

  const categoryChange = (newCategory) => {

    console.log("props=", props);
    console.log("newCategory=", newCategory);

    if (props.discover_userId === "all")  //fetch artworks by category 
    {
        dispatch({
            type: 'FETCH_ACTIVE_ARTWORK',
            payload: {
              categoryId: newCategory,
              userId: user.id,
            }
          });

        //save this action in store
        dispatch({
          type: 'SET_PREVIOUS_ACTION',
          payload: {
            actionType: 'FETCH_ACTIVE_ARTWORK',
            categoryId: newCategory,
            userId: user.id,
            discover_userId: props.discover_userId
          }
        });

    }
    else {  ////fetch artworks by category and by userId
      dispatch({
          type: 'FETCH_ACTIVE_ARTWORK_BY_USER',
          payload: {
            categoryId: newCategory,
            userId: user.id,
            discover_userId: props.discover_userId
          }
        });
    }

  }

     //testing
     console.log("active cat=", activecategory);

  return (
    <>
      {

        <select 
        name="categorySelect" 
        placeholder="--- Select A Category ---"
        onChange={handleCategoryChange}
        >
        {/* <option key="-1" value="">--- Select A Category ---</option>
        {
            activecategory && activecategory.length && activecategory.map((cat, i) => {
                return (
                // only display category that are active
                (Number(cat.active_count) > 0)? 
                <>
                <option key={i} value={cat.id}>{cat.theme} - {cat.id}</option>
                </>
                :
                <></>
                )
            })
            
        } */}
        <option key="-1" value="">--- Select A Category ---</option>
        {
            activecategory && activecategory.length && activecategory.map((cat, i) => {
                return (
                (Number(cat.category_count) > 0)?
                <> 
                <option key={i} value={cat.id}>{cat.theme} - {cat.id}</option>
                </>
                :
                <></>
                )

        })
        }

        </select>

        }
    </>
  );
}

export default DropdownNavCategory;