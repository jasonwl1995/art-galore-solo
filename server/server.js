const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const artworkRouter = require('./routes/artwork.router');
const categoryRouter = require('./routes/category.router');
const discoveruserRouter = require('./routes/discoveruser.router');

// TODO AWS const
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router')

// AWS Configuration //
app.use('/s3', UploaderS3Router ({
  bucket: 'art-gallery-primesolo',                // required
  region: 'us-east-2',                            // optional
  // bucket: process.env.AWS_S3_BUCKET,           // required
  // region: process.env.AWS_S3_REGION,           // optional
  headers: {'Access-Control-Allow-Origin': '*'},  // optional
  // ACL: 'private',                                 // this is the default - set to `public-read` to let anyone view uploads
  ACL: 'public-read',
  signatureVersion: 'v4',
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
//app.use('/api/user', userRouter);
app.use('/api/user', userRouter);
app.use('/api/artwork', artworkRouter);
app.use('/api/category', categoryRouter);
app.use('/api/discoveruser', discoveruserRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
