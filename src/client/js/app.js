import "regenerator-runtime/runtime";
import {addTripCard, removeTripCard, toggleLoadingBtn} from './updateUI.js';
import{date_diff_indays, scrollToTripCard} from './helper.js';
import {validateForm, setDatesConstraints, setReturnDateConstraint} from './formValidation.js';
import $ from 'jquery';
import 'bootstrap/js/dist/modal.js';

// let d = new Date();
// let todaysDate =  d.getFullYear()+'-'+ (d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+ d.getDate();
const departureDateInput = document.getElementById('departureDate');
const returnDateInput = document.getElementById('returnDate');

let trips;

//Create trip data object using user form data
const getTripDetails = async (url='', tripData={}) => {

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(tripData),
		headers:{
			"Content-type": "application/json; charset=UTF-8"
		}
	});
	const data = await response.json();

	//handle not 200 response
	if(!response.ok){
		throw new Error(data.error);
	}

	let trip = {};
	trip = data;
	trip.id = (Date.now()).toString();
	trip.DepartDate = tripData.departureDate;
	trip.ReturnDate = tripData.returnDate;
	trip.duration = date_diff_indays(trip.DepartDate, trip.ReturnDate);

	return trip;
}

//Retrieve form user entered data
const getTripData = (event) => {


let d = new Date();
let todaysDate =  d.getFullYear()+'-'+ (d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+ d.getDate();

const tripData = {};
tripData.destCity = document.getElementById('destination').value;
tripData.departureDate = document.getElementById('departureDate').value;
tripData.returnDate = document.getElementById('returnDate').value;

const tripWithin = date_diff_indays(todaysDate, tripData.departureDate);
if(tripWithin <= 16){
	tripData.within16days = true;
} 

return tripData;
}

//Handle a new trip storing
const saveTrip = (trip) => {
	if(trip){
		trips.push(trip);
		localStorage.setItem('savedTrips', JSON.stringify(trips));
	}
};
	
//Handle removal of a trip
const deleteTrip = (evt) => {

	trips = trips.filter(trip => trip.id !== evt.target.id);
	removeTripCard(evt.target.id);
	localStorage.setItem('savedTrips', JSON.stringify(trips));
};

/* execution starts here */
// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded', () => {

	//Setting min dates values for the departure and return dates pickers 
	setDatesConstraints();
	document.getElementById('departureDate').addEventListener('change', setReturnDateConstraint);

	//Check for exisiting localStorage & Build UI from localStorage name 'Saved trips'
	trips = localStorage.getItem('savedTrips');
	//Add stored local storage data to the trips object
	trips = trips ? JSON.parse(trips) : [];
	//Build UI cards for saved trips
	trips.forEach( trip => {
		addTripCard(trip);
	});

	//Handle form submission  
	const tripForm = document.querySelector('.needs-validation');
	tripForm.addEventListener('submit', async (event) => {

		try {

			// Form validation on submit
			if (validateForm(event)){
				//Stop page reload
				event.preventDefault();
				//Show loading
				toggleLoadingBtn();
				//Get trip info with user enered data
				const formData = getTripData(event);
				const trip = await getTripDetails('/tripDetails', formData);

				//Save trip to storage
				saveTrip(trip);

				//Update UI with trip & handle UI
				addTripCard(trip);
				scrollToTripCard(trip.id);
				tripForm.reset();
				toggleLoadingBtn();
			}

		} catch(err) {
			document.querySelector('.modal-text').innerHTML = err.message;
			toggleLoadingBtn();
			$('#errorModal').modal('show');
		}
		
	});

	//event listener for the "delete trip" button click
	const tripsDiv = document.querySelector('#trips');
	tripsDiv.addEventListener('click', (evt) => {

		if (evt.target.tagName === 'BUTTON'){
			deleteTrip(evt);
		};
	});

});
