const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
const cors = require('cors');
const path = require("path");
const fs = require("fs");

const app = express();
const directoryPath = path.join(__dirname, 'images');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(directoryPath));

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
        }
    })
});

app.post('/images/upload', upload.any(),
    (req, res) => {
        res.status(200).send("Image uploaded successfully");
    });

app.get('/images', (req, res) => {

    let fileNames = fs.readdirSync(directoryPath);

    res.status(200).json(fileNames);
});

app.listen(8088, () => console.log('Server started on port 8088'));
