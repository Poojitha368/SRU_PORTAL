// Set today's date for date_from
const today = new Date().toISOString().split('T')[0];
const dateFromInput = document.getElementById('date_from');
const dateToInput = document.getElementById('date_to');

// Set default value and minimum for date_from
dateFromInput.value = today;
dateFromInput.setAttribute('min', today);

// Update date_to based on date_from (even on page load)
function updateDateToMin() {
  const dateFrom = new Date(dateFromInput.value);
  dateFrom.setDate(dateFrom.getDate() + 1); // Set date_to to be 1 day after date_from
  const minDateTo = dateFrom.toISOString().split('T')[0];
  dateToInput.setAttribute('min', minDateTo); // Ensure date_to cannot be before minDateTo
  if (!dateToInput.value || new Date(dateToInput.value) < dateFrom) {
    dateToInput.value = minDateTo; // Default date_to to the next day if not set
  }
}

// Update date_to's min on page load
updateDateToMin();

// Add event listener for when date_from is changed
dateFromInput.addEventListener('input', updateDateToMin);
