// get the login form and add a submit event listener
const loginForm = document.getElementById('login-form');
const usernameInput = loginForm.elements['username'];
const passwordInput = loginForm.elements['password'];
const submitButton = loginForm.elements['submit-button'];

// add keyup event listeners to the username and password inputs
usernameInput.addEventListener('keyup', handleInputChange);
passwordInput.addEventListener('keyup', handleInputChange);

function handleInputChange() {
  // enable the submit button if both fields have input, disable otherwise
  if (usernameInput.value && passwordInput.value) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting

  // get the username and password from the form
  const username = usernameInput.value;
  const password = passwordInput.value;

  // send the username and password to the server
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // display a success message
        const loginStatus = document.getElementById('login-status');
        loginStatus.textContent = 'Login successful.';
      } else {
        // display an error message
        const loginStatus = document.getElementById('login-status');
        loginStatus.textContent = 'Login failed.';
      }
    }
  };
  xhr.send(JSON.stringify({ username, password }));
});
