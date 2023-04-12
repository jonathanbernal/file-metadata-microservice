const express = require('express');
const cors = require('cors');
const multer = require('multer'); //used for processing multipart/form-data
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// multer setup
// since we only want to extract the metadata from the file,
// we do not need to store it in local storage, but multer
// still requires us to define a destination directory for
// the uploads.
const upload = multer({ dest: '/uploads' });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
