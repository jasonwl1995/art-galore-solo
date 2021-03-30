/* Import Libraries */
import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Import Default components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import './App.css';

// Import created components
import DiscoverGalleryPage from '../DiscoverGalleryPage/DiscoverGalleryPage';
import MyGalleryPage from '../MyGalleryPage/MyGalleryPage';
import EditArtworkPage from '../EditArtworkPage/EditArtworkPage';
import MyArtworkDetail from '../MyArtworkDetail/MyArtworkDetail';
import ArtworkDetail from '../ArtworkDetail/ArtworkDetail';
import DiscoverUserPage from '../DiscoverUserPage/DiscoverUserPage';
import EditUser from '../EditUser/EditUser';
import LikesGalleryPage from '../LikesGalleryPage/LikesGalleryPage';

// MATERIAL-UI IMPORTS
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import  { CssBaseline } from '@material-ui/core/CssBaseline';

const appTheme = createMuiTheme({
  palette: {
    background: {
      default: "#212121",
    }
  }
});


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });

    //fetch categories and save them in store
    //console.log('fetch categories and save them in store');
    // --move this to AddArtworkForm ???
    dispatch({ type: 'FETCH_CATEGORY_LIST' });
    
  }, [dispatch]);

  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline />
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            //path="/home"
            authRedirect="/user"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/user"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/user"
          >
            <LandingPage />
          </ProtectedRoute>

          {/* Added routes */}

          <ProtectedRoute exact path="/discover">
            <DiscoverGalleryPage />
          </ProtectedRoute>
          
          <ProtectedRoute exact path="/discoveruser/:id">
            <DiscoverUserPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/mygallery">
            <MyGalleryPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/likes">
            <LikesGalleryPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/edit/:id">
            <EditArtworkPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/mydetails/:id">
            <MyArtworkDetail />
          </ProtectedRoute>

          <ProtectedRoute exact path="/details/:id">
            <ArtworkDetail />
          </ProtectedRoute>

          <ProtectedRoute exact path="/edituser/:id">
            <EditUser />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ ThemeProvider>
  );
}

export default App;
