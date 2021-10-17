const { dir } = require('console');
const express = require('express');
const { v4: uuid } = require("uuid");
uuid();
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const PORT = 3000;

var tweets = [
  {
    id: uuid(),
    username: "kaytee",
    comment: "lol this is crazy",
  },
  {
    id: uuid(),
    username: "todie",
    comment: "i dont like this",
  },
  {
    id: uuid(),
    username: "ebo",
    comment: "what is happening here",
  },
  {
    id: uuid(),
    username: "lodi",
    comment: "this is against laews",
  },
];

app.use(express.static(path.join(__dirname,'/public')))
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended : true}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/tweet',(req, res)=>{
  res.render('post/timeline', {tweets})
 
})

app.post('/tweet',(req, res)=>{
    let {username, comment} = req.body;
    tweets.push({ id: uuid(), comment, username });
    res.redirect('/tweet')
})

app.get("/tweet/new", (req, res) => {
  res.render("post/newtweet", { tweets });
});

app.get('/tweet/:id',(req, res)=>{
    const { id } = req.params;
    post = tweets.filter(tweet => tweet.id == id); 
    res.render('post/viewTweet', {post})
})

app.patch("/tweet/:id", (req, res) => {
    const {id} = req.params;
    const editComment = req.body.comment;
    let post = tweets.find(tweet => tweet.id === id);
    console.log(post)
    console.log(editComment)
    post.comment = editComment;
    res.redirect('/tweet')
});

app.delete("/tweet/:id", (req, res) => {
  const {id} = req.params;
  tweets = tweets.filter(tweet => tweet.id !== id);
  res.redirect('/tweet')
})

app.get("/tweet/:id/edit", (req, res) => {
  const { id } = req.params;
  post = tweets.filter((tweet) => tweet.id === id);
  res.render("post/editTweet", { post , id});
});

app.listen(PORT,()=>{
    console.log('SERVER IS UP 😁')
})