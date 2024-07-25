const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./database.db',function(err){
  if(err){
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  }else{
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));


const userRoutes = require('./routes/user');
const readerRoutes = require('./routes/reader');
const authorRoutes = require('./routes/author');

//set the app to use ejs for rendering
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect("/reader/home");
});

//this adds all the userRoutes to the app under the path /user
app.use('/user', userRoutes);

// this adds all the readerRoutes to the app under the path /reader
app.use('/reader', readerRoutes);

// this adds all the authorRoutes to the app under the path /author
app.use('/author', authorRoutes);

// this adds all the css files to the app
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})