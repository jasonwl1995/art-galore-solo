import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

import './ImageUpload.css';

const dropzoneStyle = {
  border: '1px solid black',
  height: '50px',
  width: '200px',
  "background-color": "#dddddd",
}

class ImageUpload extends Component {

    handleFinishedUpload = info => {
      console.log('info', info);
      // console.log('File uploaded with filename', info.filename)
      console.log('Access it on s3 at', info.fileUrl)

      this.props.dispatch({
        type: 'SET_IMAGE_URL',
        payload: info.fileUrl
      });
    }

  render() {

    const uploadOptions = {
      server: 'http://localhost:5000',
      // Works with or without, used to assign url query params, can look up later
      // signingUrlQueryParams: {uploadType: 'avatar'},
    }

    const s3Url = 'https://art-gallery-primesolo.s3.amazonaws.com'

    const innerDropElement = (
      <div class="inner-drop">
        <p>Click or Drop File Here!</p>
      </div>
    )

    return (
      <DropzoneS3Uploader
        children={innerDropElement}
        onFinish={this.handleFinishedUpload}
        style={dropzoneStyle}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    )
  }
}

export default connect()(ImageUpload);
