import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import AddArtworkForm from '../AddArtworkForm/AddArtworkForm';
import EditArtworkPage from '../EditArtworkPage/EditArtworkPage';
import UserDetail from '../UserDetail/UserDetail';

function ProfilePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <UserDetail />
      <AddArtworkForm />
      <EditArtworkPage />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
