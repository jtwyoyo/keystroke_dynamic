// get the login form and add a submit event listener
var kdevents = [];
var kdstamps = [];
var kuevents = [];
var kustamps = [];

const loginForm = document.getElementById('login-form');
const usernameInput = loginForm.elements['username'];
const passwordInput = loginForm.elements['password'];
const submitButton = loginForm.elements['submit-button'];
const registerButton = loginForm.elements['register-button'];

// add keyup event listeners to the username and password inputs
usernameInput.addEventListener('keyup', handleInputChange);
passwordInput.addEventListener('keyup', handleInputChange);

function handleInputChange() {
  // enable the submit button if both fields have input, disable otherwise
  if (usernameInput.value && passwordInput.value) {
    submitButton.disabled = false;
    registerButton.disabled = false;
  } else {
    submitButton.disabled = true;
    registerButton.disabled = true;
  }
}

passwordInput.addEventListener('keydown', (event) => {
  var name = event.key;
  if(name != 'Backspace' && name != 'Enter' && name != 'Tab' && name != 'Shift') {
    kdevents.push(name);
    kdstamps.push(Date.now());
  }
});

passwordInput.addEventListener('keyup', (event) => {
  var name = event.key;
  if(name != 'Backspace' && name != 'Enter' && name != 'Tab' && name != 'Shift') {
    kuevents.push(name);
    kustamps.push(Date.now());
  }
});

registerButton.addEventListener('click', (event) => {
  event.preventDefault(); // prevent the form from submitting
  console.log("Register")

  // get the username and password from the form
  const username = usernameInput.value;
  const password = passwordInput.value;

  //keystroke per second
  const totalkeystroketime = (kdstamps[kdstamps.length - 1] - kdstamps[0])/1000
  const kps = kdevents.length/totalkeystroketime

  //average flight time
  var avgflight = 0;
  for(i = 0; i < kustamps.length-1; i++) {
    avgflight+=(kdstamps[i+1] - kustamps[i]);
    console.log(avgflight)
  }
  avgflight/=(kustamps.length-1);

  //average dwell time
  var avgdwell = 0;
  for(i = 0; i < kdstamps.length; i++) {
    avgdwell+=(kustamps[i] - kdstamps[i]);
  }
  avgdwell/=(kdstamps.length);
  
  // send the username and password to the server
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', '/register');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      const loginStatus = document.getElementById('login-status');
      loginStatus.textContent = 'Register successful.';
    }
  }

  const data = {
    username: username,
    password: password,
    kps: kps,
    avgflight: avgflight,
    avgdwell: avgdwell
  };
  
  xhr.send(JSON.stringify(data));

});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting

  // get the username and password from the form
  const username = usernameInput.value;
  const password = passwordInput.value;

  //keystroke per second
  const totalkeystroketime = (kdstamps[kdstamps.length - 1] - kdstamps[0])/1000
  const kps = kdevents.length/totalkeystroketime

  //average flight time
  var avgflight = 0;
  for(i = 0; i < kustamps.length-1; i++) {
    avgflight+=(kdstamps[i+1] - kustamps[i]);
  }
  avgflight/=(kustamps.length-1);

  //average dwell time
  var avgdwell = 0;
  for(i = 0; i < kdstamps.length; i++) {
    avgdwell+=(kustamps[i] - kdstamps[i]);
  }
  avgdwell/=(kdstamps.length);

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

  const data = {
    username: username,
    password: password,
    kps: kps,
    avgflight: avgflight,
    avgdwell: avgdwell
  };
  
  xhr.send(JSON.stringify(data));
  
  // xhr.send(JSON.stringify({ username, password }), kps, avgflight, avgdwell);
});
