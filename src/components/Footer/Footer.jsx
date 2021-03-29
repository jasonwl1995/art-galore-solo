import React from 'react';
import './Footer.css';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
      <footer>
        <Typography variant="caption">
          <Box align="center" lineHeight={3} fontWeight="fontWeightBold">
            &copy; RedRevolt Gaming Corporation
          </Box>
        </Typography>
      </footer>

  // <footer>&copy; Prime Digital Academy</footer>
  )
}

export default Footer;
