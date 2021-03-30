/* Import Libraries */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import { useParams } from 'react-router-dom';
// import './ImageUpload.css';

// Styling for dropbox
const dropzoneStyle = {
  border: '1px solid black',
  height: '200px',
  width: '200px',
  "background-color": "#dddddd",
}

// Calls function to set user uploaded image url onto database
class ImageUpload extends Component {

    handleFinishedUpload = info => {
      if( this.props.page === "AddArtworkImage" )
      {
      this.props.dispatch({
        type: 'SET_IMAGE_URL',
        payload: info.fileUrl
      });
      } else if (this.props.page === "AddProfilePicture")
      {
        this.props.dispatch({
          type: 'SET_PFP_URL',
          payload: info.fileUrl
        });
      };
      return(
      <div>
        <p>File Uploaded!</p>
      </div>
      );
    }

  render() {

    const uploadOptions = {
      server: 'http://localhost:5000',
      // Works with or without, used to assign url query params, can look up later
      // signingUrlQueryParams: {uploadType: 'avatar'},
    }

    const s3Url = process.env.REACT_APP_S3_URL;

    // Displays text inside the dropbox
    // const innerDropElement = (
    //   <div class="inner-drop">
    //     <p>Click or Drop File Here!</p>
    //   </div>
    // )

    // const completedDropElement = (
    //   <div class="completed-drop">
    //     <p>File Uploaded!</p>
    //   </div>
    // )

    return (
      <DropzoneS3Uploader
        // children={innerDropElement}
        onFinish={this.handleFinishedUpload}
        style={dropzoneStyle}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={{}}
      />
    )
  }
}

export default connect()(ImageUpload);
