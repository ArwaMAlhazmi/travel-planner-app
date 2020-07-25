let d = new Date();
let todaysDate =  d.getFullYear()+'-'+ (d.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+'-'+ d.getDate();
const departureDateInput = document.getElementById('departureDate');
const returnDateInput = document.getElementById('returnDate');

//handle form inputs validation
export const validateForm = (evt) => {

	const tripForm = document.querySelector('.needs-validation');
	
	//handle date
	if(departureDateInput !== ''){
		returnDateInput.setAttribute('min', departureDateInput.value);
		if(departureDateInput.value > returnDateInput.value && returnDateInput.value !== ""){
			returnDateInput.nextElementSibling.innerHTML = 'Return date should be equal or greater than departure date';
		};
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

// setting min dates values for the departure and return dates pickers
export const setDatesConstraints = () => {

	//form date pickers restrictions
	departureDateInput.setAttribute("min", `${todaysDate}`);
	returnDateInput.setAttribute("min", `${todaysDate}`);

}