//Require node-fetch to make fetch request
const fetch = require('node-fetch')
//Require environment variables
require('dotenv').config()

//Export appi calls fuctions
module.exports = {
	getDestinfo,
	getDestWeather,
	getDestImage,
	getDest16daysWeather
}

//get destination info(coordinates, name, countery) from geonames api
async function getDestinfo(cityName){
	const geonamesKey = process.env.GEONAMES_KEY;

	let url = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${geonamesKey}`;
	let response = await fetch(url);
	let data = await response.json();
	//handle 404 & 500 response
	if(!response.ok){
		throw new Error('Something went wrong');
	};

	//if to handle no match found for the city entry
	if(data.totalResultsCount === 0){
		throw new Error('City not found');
	} else {
		return [data.geonames[0].lat , data.geonames[0].lng, data.geonames[0].toponymName, data.geonames[0].countryName];
	};
};


//Get destination Monthly Average Weather Data from worldweather api 
async function getDestWeather(lat, lng, monthNumber){
	const worldweatherKey = process.env.WORLDWEATHER_KEY;

	let url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${worldweatherKey}&q=${lat},${lng}&tp=3&format=json`;
	let response = await fetch(url);
	let data = await response.json();
	//handle 404 & 500 response
	if(!response.ok){
		throw new Error('Something went wrong');
	};

	// if to handle no weather info match for the entered location
	if(data.error){
		throw new Error(data.error[0].msg);
	} else {
		let absMaxTemp = parseFloat(data.data.ClimateAverages[0].month[monthNumber].absMaxTemp).toFixed(1);
		let avgMinTemp = parseFloat(data.data.ClimateAverages[0].month[monthNumber].avgMinTemp).toFixed(1);
		return ([absMaxTemp, avgMinTemp]);
	}
}

async function getDest16daysWeather(lat, lng, date) {
	const weatherbitKey = process.env.WEATHERBIT_KEY;
	
	let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitKey}`;
	let response = await fetch(url);
	let data = await response.json();
	//handle 404 & 500 response
	if(!response.ok){
		throw new Error('Something went wrong');
	};

	if(!data.data){
		throw new Error('Weather data not found');
	} else {

		//Loop through data to find a matching date
		for (let i = 0; i <= ((data.data).length)-1; i++){

			if ((data.data[i]).valid_date === date){
				
				return ({tempreture: (data.data[i]).temp,
				 		icon: `https://www.weatherbit.io/static/img/icons/${(data.data[i]).weather.icon}.png`,
				  		description: (data.data[i]).weather.description});
			}
		}
	}

}

//Get destination image from pixabay
async function getDestImage(destination){
	const pixabayKey = process.env.PIXABAY_KEY

	let baseUrl = `https://pixabay.com/api?key=${pixabayKey}`;
	let response = await fetch(baseUrl+`&q=${destination}`);
	let data = await response.json();
	//handle 404 & 500 response
	if(!response.ok){
		//return total hits as 0 fallback image url and tags
		return [0, './assets/imgs/fallback-img.png', 'holder, airplane, sky'];
	};

	if(data.totalHits){
		//return image url and tags
		return [data.totalHits, data.hits[0].webformatURL, data.hits[0].tags];
	} else {
		// handle no imges hits for destination use fallback imge
		return [data.totalHits, './assets/imgs/fallback-img.png', 'holder, airplane, sky'];
	};	
};