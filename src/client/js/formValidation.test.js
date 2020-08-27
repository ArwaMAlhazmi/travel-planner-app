//Dom Manuplation test 'validateForm'
test('Check validateForm able add class was-validated to .needs-validation form ', () => {

  document.body.innerHTML = `
    <form class="border border-light rounded p-3 m-3 needs-validation" novalidate>

      <div class="form-row">
        <div class="form-group col">
          <label class="font-weight-bold text-muted text-secondary" for="CurrentLoc">Current Location:</label>
          <input type="text" class="form-control" id="currentLoc" placeholder="Enter city name" pattern="[A-Za-z\s]{2,85}" required>
          <div class="invalid-feedback"> Enter your current Location.</div>
       </div>
       <div class="form-group col">
            <label class="font-weight-bold text-muted" for="destination">Destination:</label>
          <input type="text" class="form-control" id="destination" placeholder="Enter city name" pattern="[A-Za-z\s]{2,85}" required>
          <div class="invalid-feedback"> Enter a destination.</div>
       </div>
    </div>

    <div class="form-row">
      <div class="form-group col">
          <label class="font-weight-bold text-muted" for="departureDate">Departure date:</label>
          <input type="date" class="form-control" id="departureDate" required>
          <div class="invalid-feedback"> Pick a date for your departure.</div>
       </div>
       <div class="form-group col">
           <label class="font-weight-bold text-muted" for="returnDate">Return date:</label>
          <input type="date" class="form-control" id="returnDate" required>
          <div class="invalid-feedback"> Pick a date for your return.</div>
       </div>
    </div>

    <div class="form-row">
      <button id="addTripBtn" class="btn btn-secondary btn-block font-weight-bold" type="submit">Add Trip</button>
    </div>
  </form>
  `;

  const { validateForm } = require('./formValidation.js');

  const tripEntryForm = document.querySelector('.needs-validation');
  // const userUrlInput = document.getElementById('userUrl');
  const submitBtn = document.getElementById('addTripBtn');

  submitBtn.addEventListener('click', (event)=> {
    validateForm(event)
  });

  // userUrlInput.value = 'test';
  submitBtn.click();

  expect(tripEntryForm.classList.contains('was-validated')).toBeTruthy();
});