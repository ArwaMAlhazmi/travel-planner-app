import {getDestinfo, getDestWeather, getDestImage} from './api.js';
import {addTripCard, removeTripCard} from './updateUI.js';
import{date_diff_indays, scrollToTripCard} from './helper.js';
import {validateForm, setDatesConstraints} from './formValidation.js';
import $ from 'jquery';
import 'bootstrap/js/dist/modal.js';

let d = new Date();
let todaysDate =  d.getFullYear()+'-'+ (d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+ d.getDate();
const departureDateInput = document.getElementById('departureDate');
const returnDateInput = document.getElementById('returnDate');

let trips;

//create trip data object with user form data
const getTripInfo = async () => {
	let lat, lng;
	let imgHits;
	let apiResult;
	let trip = {};

	trip.id = (Date.now()).toString();
	trip.DepartDate = document.getElementById('departureDate').value;
	trip.ReturnDate = document.getElementById('returnDate').value;

	//(If) to make sure there is no location error before assigning data
	apiResult = await getDestinfo(document.getElementById('destination').value);
	if (apiResult.error){
		document.querySelector('.modal-text').innerHTML = apiResult.error;
		$('#errorModal').modal('show');
		return null;
	} else {
		[lat, lng, trip.destCity, trip.destContry] = apiResult;
	};

	//(If) to make sure there is no weather error before assigning data
	apiResult = await getDestWeather(lat, lng, new Date(trip.DepartDate).getMonth());
	if(apiResult.error){
		document.querySelector('.modal-text').innerHTML = apiResult.error;
		$('#errorModal').modal('show');
		return null;
	} else {
		[trip.maxTemp, trip.minTemp] = apiResult;
	};

	
	[imgHits, trip.img, trip.imgDesc] = await getDestImage(trip.destCity);
	//handle no imges hits for destination city try for destination country
	if(!imgHits){
		[imgHits, trip.img, trip.imgDesc] = await getDestImage(trip.destContry);
	};

	trip.duration = date_diff_indays(trip.DepartDate, trip.ReturnDate);
	return trip;
};

//  Handle a new trip addition
const saveTrip = async (evt) => {

	if (validateForm(evt)){
		evt.preventDefault();

		const trip = await getTripInfo();
		if(trip){

			addTripCard(trip);
			scrollToTripCard(trip.id);
			document.querySelector('form').reset();
			trips.push(trip);
			localStorage.setItem('savedTrips', JSON.stringify(trips));
			document.querySelector('.needs-validation').classList.remove('was-validated');
		};
	};
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

	// etting min dates values for the departure and return dates pickers 
	setDatesConstraints();

	// check for exisiting localStorage & Build UI from localStorage name 'Saved trips'
	trips = localStorage.getItem('savedTrips');
	//add stored local storage data to the trips object
	trips = trips ? JSON.parse(trips) : [];
	//Build UI cards for saved trips
	trips.forEach( trip => {
		addTripCard(trip);
	});

	// form validation on submit
	const tripForm = document.querySelector('.needs-validation');
	tripForm.addEventListener('submit', saveTrip);

	// event listener for the form "add trip" button click
	// const addTripBtn = document.querySelector('#addTripBtn');
	// addTripBtn.addEventListener('click', saveTrip);

	//event listener for the "delete trip" button click
	const tripsDiv = document.querySelector('#trips');
	tripsDiv.addEventListener('click', (evt) => {

		if (evt.target.tagName === 'BUTTON'){
			deleteTrip(evt);
		};
	});

});
