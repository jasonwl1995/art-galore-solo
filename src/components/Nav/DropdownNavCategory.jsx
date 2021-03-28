/* Import Libraries */
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function DropdownNavCategory(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // Grabs information from Global Redex Store
  const user = useSelector(store => store.user);
  const userList = useSelector(store => store.userList);
  const activecategory = useSelector(store => store.activeCategory);

  // (STRETCH TO ADD DROP DOWN CATEGORY LIST)
  // Get user list to populate drop-down list
   useEffect(() => {
     dispatch({
       type: 'FETCH_ACTIVE_CATEGORY',
       payload: {userId: user.id},
     });
   }, []);

   // Upon select a user from drop down list, then go to the discover page
   const handleCategoryChange = (evt) => {
    let newCategory = evt.target.value;
    categoryChange(newCategory);
    //history.push(`/discoveruser/${newUser}`);

  };

  const categoryChange = (newCategory) => {
    if (props.discover_userId === "all")  //fetch artworks by category 
    {
        dispatch({
            type: 'FETCH_ACTIVE_ARTWORK',
            payload: {
              categoryId: newCategory,
              userId: user.id,
            }
          });

        // Save this action in store
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
    else {  // Fetch artworks by category and by userId
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

  return (
    <>
      {

        <select 
        name="categorySelect" 
        placeholder="--- Select A Category ---"
        onChange={handleCategoryChange}
        >

        {/* Dropdown list of categories */}
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