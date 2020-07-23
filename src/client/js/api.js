//Import api Keys
import {geonamesKey, worldweatherKey, pixabayKey} from './keys.js';

//get destination info(coordinates, name, countery) from geonames api
export const getDestinfo = async (cityName) => {
	let url = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${geonamesKey}`;
	let response = await (fetch(url)).catch(err=>console.log(err));

	let data = await response.json();
	//handle 404 & 500 response
	if(!response.ok){
		alert(data.message);
	}
	return([data.geonames[0].lat , data.geonames[0].lng, data.geonames[0].toponymName, data.geonames[0].countryName]);
}


//get destination weather from worldweather api
export const getDestWeather = async (lat, lng, monthNumber) => {
	let url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${worldweatherKey}&q=${lat},${lng}&tp=3&format=json`
	let response = await (fetch(url)).catch(err=>console.log(err));

	let data = await response.json();
	//handle 404 & 500 response
	if(!response.ok){
		alert(data.message);
	}

	let absMaxTemp = parseFloat(data.data.ClimateAverages[0].month[monthNumber].absMaxTemp).toFixed(1);
	let avgMinTemp = parseFloat(data.data.ClimateAverages[0].month[monthNumber].avgMinTemp).toFixed(1);
	return([absMaxTemp, avgMinTemp]);

	//returns 14 day weather forcast 
	//console.log(data.data.weather);
	//return(data.data.weather)
}

// //get destination image
export const getDestImage = async (cityName) => {

	let url = `https://pixabay.com/api?key=${pixabayKey}&q=${cityName}`
	let response = await (fetch(url)).catch(err=>console.log(err));

	let data = await response.json();
	//handle 404 & 500 response
	if(!response.ok){
		alert(data.message);
	}

	//return image url
	return([data.hits[0].webformatURL, data.hits[0].tags]);
}



