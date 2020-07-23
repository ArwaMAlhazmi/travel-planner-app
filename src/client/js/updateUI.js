import{date_diff_indays, iconPicker} from './helper.js';

// add trip card to UI
export const addTripCard = (tripInfo) => {
	const tripStartIn = date_diff_indays(new Date(), tripInfo.DepartDate);
	const tripsDiv = document.querySelector('.trips');
	const tripDiv = document.createElement('div');
	tripDiv.id = tripInfo.id;
	tripDiv.classList.add('trip', 'col-xs-12', 'col-sm-6', 'col-md-4', 'p-3');
	tripDiv.innerHTML = `
		<div class="card h-100">
		    <img class="card-img-top" src="${tripInfo.img}" alt="${tripInfo.destCity} ${tripInfo.imgDesc}">
		    <div class="card-body">
		      <h5 class="card-title">${tripInfo.destCity}, ${tripInfo.destContry}</h5>
		      <p class="card-text">

		      	<div class="tripDates"> 
		      		<div class="dates">${tripInfo.DepartDate} - ${tripInfo.ReturnDate}</div>
		      		<div class="duration">Trip Duration: <b>${tripInfo.duration}</b> day/s</div>
		      	</div>
		      	<br>

		      	<div class="tripWeather">
		      		<h6>Weather forecast:</h6>
		      		<div class="weatherData row justify-content-center align-items-center">
		      			<div class="weatherIcon col-3 text-center">
	      				<i class="${iconPicker(tripInfo.maxTemp, tripInfo.minTemp)}"></i>
		      			</div>
		      			<div class="weatherForcast col-9 pl-0">
		      				<div class="maxTemp">Average  high-temperature: <b>${tripInfo.maxTemp}</b> °C</div>
		      				<div class="minTemp">Average low-temperature: <b>${tripInfo.minTemp}</b> °C</div>
		      			</div>
		      		</div>
		      			
		      	</div>

		      </p>
		    </div>
		    <div class="card-footer d-flex align-items-center">
		      	<small class="text-muted">Your trip will start in <b>${tripStartIn}</b> days</small>
		      	<button id="${tripInfo.id}" title="Delete Trip" class="btn btn-secondary rounded-circle text-white ml-auto" type="button">
  					<i class="fas fa-trash-alt"></i>
  				</button>
		    </div>
		</div>
		`;

	tripsDiv.appendChild(tripDiv);
};

// remove trip card from UI
export const removeTripCard = (id) => {

	const targetTrip = document.getElementById(id);
	targetTrip.remove();
};