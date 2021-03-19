import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './GalleryPage.css';

function DiscoverGalleryPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const artwork = useSelector(store => store.artwork);

  useEffect(() => {
    dispatch({
      type: 'FETCH_ARTWORK'
    });
  }, []);

  return(
    <div>

    </div>
  );
}

export default DiscoverGalleryPage;