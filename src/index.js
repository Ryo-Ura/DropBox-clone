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
watch(syncOutDir, {recursive: false}, async(evt, name)=>{
    console.log("name", name);
    const stats = fs.statSync(name);
    const fileSizeInBytes = stats.size;
    const file = fs.readFileSync(name);
    
    const form = new FormData();
    form.append('file', file);
    
    const response = await fetch('http://localhost:3333/files',{method: 'POST', body: form})
    const json = await response.json();
    console.log('json', json)
});



app.post('/files', upload.single("file"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  // const {originalname, path} = req.file;
  // const file = fs.readFileSync(path);
  // fs.writeFileSync(nodePath.json(SYNC_OUT_DIR, originalname), file);
  // fs.unlinkSync(path);
  // res.status(200);
  // res.send("success");
});
app.listen(3333);
