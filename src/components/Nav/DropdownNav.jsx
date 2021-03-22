import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function DropdownNav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(store => store.user);
  const userList = useSelector(store => store.userList);
  console.log('userlist', userList);

  //get user list to populate drop-down list
   useEffect(() => {
     dispatch({
       type: 'FETCH_USER_LIST'
     });
   }, []);

   //upon select a user from drop down list, then go to the discover page
  const handleChange = (evt) => {
    //go to discover user page

    let newUser = evt.target.value;
    userChange(newUser);

  };

  //dispatch a message is better, not call history
  const userChange = (newUser) => {

    dispatch({
      type: 'DISCOVER_USER_ARTWORK',
      payload: {
        userid: user.id,
        discover_userid: newUser,
      }
    });

    //history.push(`/discoveruser/${newUser}`);

  }

  return (
    <>
      {

            <select 
            name="userListSelect" 
            placeholder="--- Select A User ---"
            onChange={handleChange}
            >
            <option key="-1" value="">--- Select A User ---</option>
            {
                userList && userList.length && userList.map((usr, i) => {
                    return (
                    // only display other users on the list? 
                    (usr.id !== user.id)? 
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