const numberSlider = document.getElementById('numberSlider');
const currentNumberDisplay = document.getElementById('currentNumberDisplay');
const submitNumberButton = document.getElementById('submitNumber');

// Initial display
updateNumberDisplay();

// Slider change event
numberSlider.addEventListener('input', updateNumberDisplay);

// Submit button click event
submitNumberButton.addEventListener('click', submitNumber);

function updateNumberDisplay() {
  const currentNumber = padZeros(numberSlider.value, 4);
  currentNumberDisplay.textContent = currentNumber;
}

function submitNumber() {
  const selectedNumber = padZeros(numberSlider.value, 4);
  localStorage.setItem("last4", selectedNumber);
  // Send the selected number to the main page
  alert(`Selected Number: ${selectedNumber}`);
}

function padZeros(number, length) {
  return String(number).padStart(length, '0');
}
