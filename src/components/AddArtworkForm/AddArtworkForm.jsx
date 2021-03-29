/* Import Libraries */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import ImageUpload from '../ImageUpload/ImageUpload';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { borders } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

// Function allows the user to add their own artwork to the database
function AddArtworkForm() {
  const dispatch = useDispatch();
 
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  // Grabs information from Global Redex Store
  const category = useSelector(store => store.category);
  const user = useSelector(store => store.user);
  const artworkImage = useSelector(store => store.aws);

  //Local store variables that captures from inputs
  const [artworkTitle, setArtworkTitle] = useState('');
  const [artworkDate, setArtworkDate] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');
  const [artworkCategory, setArtworkCategory] = useState('');
  
  /* Function captures form input values and sends data to
     the database to be stored in the "artwork" table */
  const addArtwork = (evt) => {
    // Keeps page from refreshing on form submission
    evt.preventDefault();

    // Ping saga to add artwork to database
    dispatch({
      type: 'ADD_ARTWORK',
      payload: {
        id: user.id,
        title: artworkTitle,
        date: artworkDate,
        image: artworkImage,
        description: artworkDescription,
        category_id: artworkCategory,
      }
    })
    // Clears input fields upon adding the artwork to database
    setArtworkTitle('');
    setArtworkDate('');
    setArtworkDescription('');
    setArtworkCategory('');
  };

  return (
    <main>
      <Box align="center" >
      <Box width="60%" border={2} borderRadius={16} className="profileCard">
      <Typography variant="h5">
        <Box lineHeight={2} fontWeight="fontWeightBold">
          Add an Artwork
        </Box>
      </Typography>

      <form onSubmit={addArtwork}>
        <table>

        {/* Input field to add artwork title */}
          <tr>
            <td>
              <label htmlFor="artworkTitle">Artwork Title: </label>
            </td>
            <td>
              <input
              name="artworkTitle"
              type="text"
              placeholder="Artwork Title"
              value={artworkTitle}
              onChange={(evt) => setArtworkTitle(evt.target.value)}
              required
              />
            </td>
          </tr>

        {/* Input field for users to drag & drop the artwork image, stores using AWS API */}
          <tr>
            <td>
            <label htmlFor="artworkImage">Artwork Image: </label>
            <p>(Click or Drag'n'Drop)</p>
            </td>
            <td>
              <ImageUpload page="AddArtworkImage" />
            </td>
          </tr>

          {/* Input field for users to add the date the artwork was created */}
          <tr>
            <td>
              <label htmlFor="artworkDate">Date Created: </label>
            </td>
            <td>
              <DatePicker selected={artworkDate} placeholderText="Select a Date" onChange={date => setArtworkDate(date)} />
            </td>
          </tr>

          {/* Input field to add Artwork description */}
          <tr>
            <td>
              <label htmlFor="artworkDescription">Artwork Description: </label>
            </td>
            <td>
              <textarea
              name="artworkDescription"
              placeholder="Artwork Description:"
              value={artworkDescription}
              onChange={(evt) => setArtworkDescription(evt.target.value)}
              required
              />
            </td>
          </tr>

          {/* Dropdown List for users to chose a artwork category */}
          <tr>
            <td>
              <label htmlFor="artworkCategory">Select Category: </label>
            </td>
            <td>
              <select 
                name="artworkCategory" 
                placeholder="--- Categories ---"
                value={artworkCategory}
                onChange={(evt) => setArtworkCategory(evt.target.value)}
                required
                >
                <option key="-1" value="">--- Select A Category ---</option>
                {
                  category && category.length && category.map((cat, i) => {
                    return (
                        <option key={i} value={cat.id}>{cat.theme}</option>
                      )
                    })
                }
              </select>
            </td>
          </tr>
        <br></br>
        </table>
        <Box>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          value='Add Artwork'
          align="center"
        >
        <Typography variant="body1">
          Add Artwork
        </Typography>
        </Button>
        </Box>

        <br></br>
      </form>

      </Box>
      </Box>
    </main>

    // <div>
    //   <h3>Add an Artwork</h3>
    //   <form onSubmit={addArtwork}>
    //     <table>

    //     {/* Input field to add artwork title */}
    //       <tr>
    //         <td>
    //           <label htmlFor="artworkTitle">Artwork Title: </label>
    //         </td>
    //         <td>
    //           <input
    //           name="artworkTitle"
    //           type="text"
    //           placeholder="Artwork Title"
    //           value={artworkTitle}
    //           onChange={(evt) => setArtworkTitle(evt.target.value)}
    //           required
    //           />
    //         </td>
    //       </tr>

    //     {/* Input field for users to drag & drop the artwork image, stores using AWS API */}
    //       <tr>
    //         <td>
    //         <label htmlFor="artworkImage">Artwork Image: </label>
    //         <p>(Click or Drag'n'Drop)</p>
    //         </td>
    //         <td>
    //           <ImageUpload page="AddArtworkImage" />
    //         </td>
    //       </tr>

    //       {/* Input field for users to add the date the artwork was created */}
    //       <tr>
    //         <td>
    //           <label htmlFor="artworkDate">Date Created: </label>
    //         </td>
    //         <td>
    //           <DatePicker selected={artworkDate} placeholderText="Select a Date" onChange={date => setArtworkDate(date)} />
    //         </td>
    //       </tr>

    //       {/* Input field to add Artwork description */}
    //       <tr>
    //         <td>
    //           <label htmlFor="artworkDescription">Artwork Description: </label>
    //         </td>
    //         <td>
    //           <textarea
    //           name="artworkDescription"
    //           placeholder="Artwork Description:"
    //           value={artworkDescription}
    //           onChange={(evt) => setArtworkDescription(evt.target.value)}
    //           required
    //           />
    //         </td>
    //       </tr>

    //       {/* Dropdown List for users to chose a artwork category */}
    //       <tr>
    //         <td>
    //           <label htmlFor="artworkCategory">Select Category: </label>
    //         </td>
    //         <td>
    //           <select 
    //             name="artworkCategory" 
    //             placeholder="--- Categories ---"
    //             value={artworkCategory}
    //             onChange={(evt) => setArtworkCategory(evt.target.value)}
    //             required
    //             >
    //             <option key="-1" value="">--- Select A Category ---</option>
    //             {
    //               category && category.length && category.map((cat, i) => {
    //                 return (
    //                     <option key={i} value={cat.id}>{cat.theme}</option>
    //                   )
    //                 })
    //             }
    //           </select>
    //         </td>
    //       </tr>

    //       {/* Button to submit user inputs as a new artwork onto the database
    //       and clearing fields to be ready to add the next artwork */}
    //       <tr>
    //         <td>
    //           <button
    //             type="submit"
    //             value='Add Artwork'
    //           >
    //             Add Artwork
    //           </button>
    //         </td>
    //       </tr>

    //     </table>
    //   </form>

    // </div>
  );
}

export default AddArtworkForm;