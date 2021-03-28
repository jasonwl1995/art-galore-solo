/* Import Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DropdownNav() {
  const dispatch = useDispatch();
  const history = useHistory();

  // Grabs information from Global Redex Store
  const user = useSelector(store => store.user);
  const userList = useSelector(store => store.userList);

  // Get user list to populate drop-down list
   useEffect(() => {
     dispatch({
       type: 'FETCH_USER_LIST'
     });
   }, []);

  const handleChange = (evt) => {
    let newUser = evt.target.value;
    userChange(newUser);
  };

  const userChange = (newUser) => {
    dispatch({
      type: 'DISCOVER_USER_ARTWORK',
      payload: {
        userid: user.id,
        discover_userid: newUser,
      }
    });
    // Goes to discover user page once selected a user
    history.push(`/discoveruser/${newUser}`);
  }

  return (
    <>
      {
        <select 
        name="userListSelect" 
        placeholder="--- Select A User ---"
        onChange={handleChange}
        >

        {/* Dropdown list of users */}
        <option key="-1" value="">--- Select A User ---</option>
        {
            userList && userList.length && userList.map((usr, i) => {
                return (
                ((usr.id !== user.id) && ((usr.artwork_count * 1) > 0))? 
                <>
                <option key={i} value={usr.id}>{usr.username} - {usr.id}</option>
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


export default DropdownNav;