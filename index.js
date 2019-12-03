const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path =require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


// use body-parser middleware
app.use(bodyParser.urlencoded({extended: false }));


// API KEY @api = StockQuote::Stock.new(api_key: 'pk_d26d923c6b6e41648be7487d7f41b027')
// create a call to API function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_d26d923c6b6e41648be7487d7f41b027', { json: true }, (err, res, body) => { 
 if (err) {return console.log(err);}
  if (res.statusCode === 200){
 	// console.log(body); 
 	finishedAPI(body);
 		};
 	});
}

// Set HaandleBars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const otherstuff = "Hello there, this is the other STuff, that I was telling you about"

// Set Main Page HaandleBar index GET Routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home', { stock: doneAPI 
		});
	}, "fb" );
});


// =>  call_api(function, req.body.stock_ticker)
// Set Main Page HaandleBar index POST Routes
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		 // posted_stuff = req.body.stock_ticker;
		res.render('home', { 
			stock: doneAPI, 
			// posted_stuff: posted_stuff
		 });
	}, req.body.stock_ticker);
});

// Set About Page HaandleBar Routes
app.get('/about.html', function (req, res) {
    res.render('about', { stuff: otherstuff });
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => console.log ('Server Listenig on port ' + PORT));

