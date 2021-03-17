import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
          <p>
            Ever pick up a hobby and create pieces of artwork that you just want to organize 
            and display your creations but not sure how to? Whether its pictures you took, or 
            paintings/drawings you made, or even just cute photos of your pets, you can use 
            the Art Galore app to display them to your friends and family, or even the whole 
            world to see. Users can log in to post their own pictures or artworks, or they can 
            view, like, and comment on each other's pieces that have been uploaded to the server. 
            Any user may add, edit or remove any project they posted at any time. This is a great 
            app to use, especially when you have many items to share, you can categorize your 
            work for users to find exactly what they are interested in and create an easier 
            viewing media for your audience.
          </p>
      </div>
    </div>
  );
}

export default AboutPage;
