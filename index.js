const { dir } = require('console');
const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(__dirname,'public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/tweet',(req, res)=>{
  res.render('post/timeline')
})

app.listen(PORT,()=>{
    console.log('SERVER IS UP 😁')
})