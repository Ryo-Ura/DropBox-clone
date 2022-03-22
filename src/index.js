require('dotenv').config();
const fetch = require('node-fetch');
const watch = require('node-watch');
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const FormData = require('form-data')
const fs = require('fs');
const nodePath = require('path');
const app = express()

const SYNC_OUT_DIR = process.env.SYNC_OUT_DIR;
const SYNC_IN_DIR = process.env.SYNC_IN_DIR;
watch(SYNC_OUT_DIR, {recursive: false}, async(evt, name)=>{
    console.log("updated: ", name);
    const file = fs.createReadStream(name);
    
    const form = new FormData();
    form.append('file', file);
    
    const response = await fetch(`${precess.env.REMOTE_URL}files`,{
      method: 'POST', 
      body: form,
    });
    fs.unlinkSync(name);
});


app.post('/files', upload.single("file"), function (req, res, next) {
  const file = fs.readFileSync(path);
  fs.writeFileSync(nodePath.join(SYNC_IN_DIR, originalname), file);
  fs.unlinkSync(path);
  res.status(200);
  res.send("success");
});
app.listen(process.env.PORT);
