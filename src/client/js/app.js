import {getDestinfo, getDestWeather, getDestImage} from './api.js';
import {addTripCard, removeTripCard} from './updateUI.js';
import{date_diff_indays, scrollToTripCard} from './helper.js';

let trips;

//create trip data object with user form data
const getTripInfo = async () => {
	let lat, lng;
	let trip = {};

	trip.id = (Date.now()).toString();
	trip.DepartDate = document.getElementById('departureDate').value;
	trip.ReturnDate = document.getElementById('returnDate').value;
	[lat, lng, trip.destCity, trip.destContry] = await getDestinfo(document.getElementById('destination').value);
	[trip.maxTemp, trip.minTemp] = await getDestWeather(lat, lng, new Date(trip.DepartDate).getMonth());
	[trip.img, trip.imgDesc] = await getDestImage(trip.destCity);
	trip.duration = date_diff_indays(trip.DepartDate, trip.ReturnDate);
	return trip;
};

//  Handle a new trip addition
const saveTrip = async () => {

	const trip = await getTripInfo();
	addTripCard(trip);

	scrollToTripCard(trip.id);
	document.querySelector('form').reset();

	trips.push(trip);
	localStorage.setItem('savedTrips', JSON.stringify(trips));

};

// handle removal of a trip
const deleteTrip = (evt) => {

	trips = trips.filter(trip => trip.id !== evt.target.id);
	removeTripCard(evt.target.id);
	localStorage.setItem('savedTrips', JSON.stringify(trips));
};

/* execution starts here */
// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', () => {

	// check for exisiting localStorage & Build UI from localStorage name 'Saved trips'
	trips = localStorage.getItem('savedTrips');
	//add stored local storage data to the trips object
	trips = trips ? JSON.parse(trips) : [];
	//Build UI cards for saved trips
	trips.forEach( trip => {
		addTripCard(trip);
	});

	// event listener for the form "add trip" button
	const addTripBtn = document.querySelector('#addTripBtn');
	addTripBtn.addEventListener('click', saveTrip);

	//event listener for the "delete trip" button
	const tripsDiv = document.querySelector('#trips');
	tripsDiv.addEventListener('click', (evt) => {

		if (evt.target.tagName === 'BUTTON'){
			deleteTrip(evt);
		};
	});
});