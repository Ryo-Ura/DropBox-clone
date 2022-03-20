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
    const file = fs.readFileSync(name);
    
    const form = new FormData();
    form.append('file', file);
    
    const response = await fetch('https://httpbin.org/post',{method: 'POST', body: form})
    const json = await response.json();
    console.log('json', json)
});



app.post('/files', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
