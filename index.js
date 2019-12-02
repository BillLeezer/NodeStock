const express = require('express');
const app = express();

const exphbs  = require('express-handlebars');
const path =require('path');

const PORT = process.env.PORT || 5000;

// Set HaandleBars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const otherstuff = "Hello there, this is the other STuff, that I was telling you about"

// Set HaandleBar Routes
app.get('/', function (req, res) {
    res.render('home', {stuff: otherstuff});
});




// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => console.log ('Server Listenig on port ' + PORT));

