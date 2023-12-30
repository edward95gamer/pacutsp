<function viewURL() {
  const urlInput = document.getElementById('urlInput').value;
  const urlDisplay = document.getElementById('urlDisplay');

  if (urlInput.trim() !== '') {
    urlDisplay.textContent = 'Entered URL: ' + urlInput;
  } else {
    urlDisplay.textContent = 'Please enter a URL.';
  }
}
