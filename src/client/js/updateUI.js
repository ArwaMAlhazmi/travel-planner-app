import{date_diff_indays, iconPicker} from './helper.js';

// Create first trip day forcast div
const createFirstDaysWeather = (tripInfo) => {

	if(tripInfo.firstDayWeather) {
		const weatherDiv = `
			<div class="fisrtDayWeather">
				<h6>Weather forcast for ${tripInfo.destCity} on ${tripInfo.DepartDate} is:</h6>

					<div class="weatherData row justify-content-center align-items-center">
				      	<div class="weatherIcon col-4 text-center">
			      			<img src="${tripInfo.firstDayWeather.icon}">
				      	</div>
		      			<div class="weatherForcast col-8 pl-0">
		      				<div class="temprature"><b>${tripInfo.firstDayWeather.tempreture}</b> °C</div>
		      				<div class="description"><b>${tripInfo.firstDayWeather.description}</b> </div>
		      			</div>
				    </div>	
			</div>
	`;
		return weatherDiv;
	} else {
		return `<div class="fisrtDayWeather text-danger pb-2">
					 ! First trip day weather forcast is only available for trips 16 days away or sooner
				</div>`;
	}

}

// Updated addcard
export const addTripCard = (tripInfo) => {
	var d = new Date();
	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";

	const tripStartIn = date_diff_indays(new Date(), tripInfo.DepartDate);
	const tripsDiv = document.querySelector('.trips');
	const tripDiv = document.createElement('div');
	tripDiv.id = tripInfo.id;
	tripDiv.classList.add('trip', 'co-12', 'my-md-2');
	tripDiv.innerHTML =`
		<div class="card mb-3">
		  <div class="row no-gutters">

		    <div class="col-md-4 destImage">
		      <img src="${tripInfo.img}" class="card-img" alt="${tripInfo.destCity} ${tripInfo.imgDesc}">
		    </div>

		    <div class="col-md-8">
		      	<div class="card-body">

			        <h5 class="card-title">${tripInfo.destCity}, ${tripInfo.destContry}</h5>
			      	<p class="card-text">

				      	<div class="tripDates"> 
				      		<div class="dates">${tripInfo.DepartDate} - ${tripInfo.ReturnDate}</div>
				      		<div class="duration">Trip Duration: <b>${tripInfo.duration}</b> day/s</div>
				      	</div>
				      	<br>

				      	<div class="tripWeather">
				      		${createFirstDaysWeather(tripInfo)}
				      		<div class="monthWeather">
					      		<h6>Typical weather for ${tripInfo.destCity} in ${month[new Date(tripInfo.DepartDate).getMonth()]} is:</h6>
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
				      	</div>

			      	</p>
		      	</div>
		    </div>

		    <div class="card-footer d-flex align-items-center" style="">
		      	<small class="text-muted">Your trip will start in <b>${tripStartIn}</b> days</small>
		      	<button id="${tripInfo.id}" title="Delete Trip" class="btn btn-secondary rounded-circle text-white ml-auto" type="button">
  					<i class="fas fa-trash-alt"></i>
  				</button>
  			</div>

		  </div>
		</div>`;

tripsDiv.appendChild(tripDiv);

}

// remove trip card from UI
export const removeTripCard = (id) => {

	const targetTrip = document.getElementById(id);
	targetTrip.remove();
};