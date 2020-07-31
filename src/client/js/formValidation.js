const departureDateInput = document.getElementById('departureDate');
const returnDateInput = document.getElementById('returnDate');

// setting min dates values for the departure and return dates pickers
export const setDatesConstraints = () => {

	let d = new Date();
	let todaysDate =  d.getFullYear()+'-'+ (d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+ d.getDate();

	//form date pickers restrictions
	departureDateInput.setAttribute("min", `${todaysDate}`);
	returnDateInput.setAttribute("min", `${todaysDate}`);

};

//handle form inputs validation
export const validateForm = (evt) => {

	const tripForm = document.querySelector('.needs-validation');
	
	//handle date wrong input
	if(departureDateInput !== ''){
		returnDateInput.setAttribute('min', departureDateInput.value);
		if(departureDateInput.value > returnDateInput.value && returnDateInput.value !== ""){
			returnDateInput.nextElementSibling.innerHTML = 'Return date should be equal or greater than departure date';
		};
	};

	// handle city wrong input
	const currentLocation = document.getElementById('currentLoc');
	const destination = document.getElementById('destination');

	if(currentLocation.validity.patternMismatch){
		currentLocation.nextElementSibling.innerHTML = 'Enter a vaild city name';
	};

	if(destination.validity.patternMismatch){
		destination.nextElementSibling.innerHTML = 'Enter a vaild city name';
	};

	if (tripForm.checkValidity() === false){

			evt.preventDefault();
			evt.stopPropagation();
			tripForm.classList.add('was-validated');

			return false;
	} else {

		return true;
	};

};