// for jest testing
require("regenerator-runtime/runtime");

var path = require('path')
//Require Express to run server and routes
const express = require('express');
//Require body-parser to Parse incoming request bodies 
const bodyParser = require('body-parser');
//Require node-fetch to make fetch request
const fetch = require('node-fetch');
//require api calls 
const apiCalls = require('./api.js');

// Start up an instance of app
const app = express();

// Initialize the main project folder
app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile('dist/index.html');
});

// Route to api calls -proxy api requests-
app.post('/tripDetails', async (req,res) => {

	let d = new Date();
	let todaysDate =  d.getFullYear()+'-'+ (d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+ d.getDate();

	try {

		let lat, lng;
		let imgHits;
		let apiResponse;
		let tripDetails = {};

		// Get destionation geo data
		apiResponse = await apiCalls.getDestinfo(req.body.destCity);
		[lat, lng, tripDetails.destCity, tripDetails.destContry] = apiResponse;

		// Get destionation weather forcasts for the trip month
		apiResponse = await apiCalls.getDestWeather(lat, lng, new Date(req.body.departureDate).getMonth());
		[tripDetails.maxTemp, tripDetails.minTemp] = apiResponse;

		//(If) trip whitin 16 days Get destnation Weather
		if(req.body.within16days === true){
			apiResponse = await apiCalls.getDest16daysWeather(lat, lng, req.body.departureDate);
			tripDetails.firstDayWeather = apiResponse;
		}

		//Get destionation image 
		apiResponse = await apiCalls.getDestImage(tripDetails.destCity);
		[imgHits, tripDetails.img, tripDetails.imgDesc] = apiResponse;
		//(If) Image not found for city use the country name
		if(!imgHits){
			[imgHits, tripDetails.img, tripDetails.imgDesc] = await apiCalls.getDestImage(tripDetails.destContry);
		};

		res.json(tripDetails);

	} catch (err) {
		res.status(500).send({error: err.message});
	}
})

module.exports = app;