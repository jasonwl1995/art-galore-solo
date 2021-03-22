import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


class ImageUpload extends Component {

  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      // Works with or without, used to assign url query params, can look up later
      // signingUrlQueryParams: {uploadType: 'avatar'},
    }

    const s3Url = 'https://art-gallery-primesolo.s3.amazonaws.com'

    return (
      <DropzoneS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    )
  }
}

export default connect()(ImageUpload);

// function ImageUpload() {

// }