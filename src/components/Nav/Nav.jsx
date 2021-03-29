import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import img from '../images/logo.png';
import {useSelector} from 'react-redux';
import DropdownNav from './DropdownNav';
import DropdownNavCategory from './DropdownNavCategory';

import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Profile';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <img className="logo" src={img}/>
        {/* <h2 className="nav-title">Prime Solo Project</h2> */}
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/discover">
              Discover
            </Link>

            {/* <Link className="navLink" to="/user">
              Profile
            </Link> */}

            <Link className="navLink" to="/mygallery">
              My Gallery
            </Link>

            <Link className="navLink" to="/likes">
              Likes
            </Link>

            <LogOutButton className="navLink" to="/home"/>
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>

        {user.id && (
          <>
          <Box align="center" >
            <Typography variant="body1">
              <Box lineHeight={2} border={1} borderRadius={16} className="userCard">
                Sort By User: 
                <DropdownNav/>
              </Box>
            </Typography>
          </Box>
          {/* <div>
            <p>Select By User:</p>
            <DropdownNav />
          </div> */}
          </>
        )}
        {/* {user.id && (
          <>
          <div>
            <DropdownNavCategory />
          </div>
          </>
        )} */}
        
      </div>
    </div>
  );
}

export default Nav;
