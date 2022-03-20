require('dotenv').config();
const fetch = require('node-fetch');
const watch = require('node-watch');
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const FormData = require('form-data')
const fs = require('fs');
const app = express()

const syncOutDir = process.env.SYNC_OUT_DIR;
watch(syncOutDir, {recursive: false}, (evt, name)=>{
    console.log("name", name);
    const stats = fs.statSync(name);
    const fileSizeInBytes = stats.size;
    const readStream = fs.createReadStream(name);
    
    console.log("stats", stats)
    fetch('http://httpbin.org/post', {
        method: 'POST',
        headers: {
            "Content-length": fileSizeInBytes
        },
        body: readStream // Here, stringContent or bufferContent would also work
    })
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
    });
});



app.post('/files', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
