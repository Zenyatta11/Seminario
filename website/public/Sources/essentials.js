
async function doPost(endpoint, data) {
    return fetch('api/' + endpoint, {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

function getValueById(id) {
  return document.getElementById(id).value;
}

function setResponse(data) {
  document.getElementById("response-bar").innerHTML = data;
}

function doUserRegister() {
  doPost('users/register',
      {
          'username': getValueById('register-username'),
          'email': getValueById('register-email'),
          'name': getValueById('register-name'),
          'passwd': getValueById('register-passwd')
      }
  ).then((response) => response.json())
  .then((json) => setResponse(JSON.stringify(json)));
}


function doUserLogin() {
  doPost('users/login',
      {
          'email': getValueById('login-email'),
          'passwd': getValueById('login-passwd')
      }
  ).then((response) => response.json())
  .then((json) => setResponse(JSON.stringify(json)));
}

function doUserLogout() {
  doPost('users/logout',
      { }
  ).then((response) => response.json())
  .then((json) => setResponse(JSON.stringify(json)));
}