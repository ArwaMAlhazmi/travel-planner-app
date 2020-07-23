//Ref: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-8.php
// a JavaScript function to get difference between two dates in days.
export const date_diff_indays = (date1, date2) => {
	const dt1 = new Date(date1);
	const dt2 = new Date(date2);
	return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
};

// A function that scrolls to a card by it's id
export const scrollToTripCard = (id) => {

	window.scrollTo({
				top: document.getElementById(id).offsetTop,
				behavior: 'smooth'
			});

};

//A function that returns a bootstrap & fontawesome class for a fontawesome icon
export const iconPicker = (maxTemp, minTemp) => {

	const avgTemp = (parseFloat(maxTemp) + parseFloat(minTemp))/2;

	if (avgTemp >= 35){
		return ('fas fa-thermometer-full text-danger');
	} else if (avgTemp <= 10){
		return ('fas fa-thermometer-empty text-primary');
	}else{
		return('fas fa-thermometer-half text-warning');
	};
};

