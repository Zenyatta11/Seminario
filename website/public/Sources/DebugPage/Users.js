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
    .then((json) => {
    setResponse(JSON.stringify(json))
    if(json.status_code === 200) {
        getUsername();
    }
    });
}

function getUsername() {
    doPost('users/get',
    { 
        'fields': 'username'
    }
    ).then((response) => response.json())
    .then((json) => {
    if(json.status_code === 200) {
        data = JSON.parse(json.data)
        document.getElementById('status-bar').innerHTML = "Status: Logged in (" + data.username + ")";
    }
    });
}

function doUserLogout() {
    doPost('users/logout',
        { }
    ).then((response) => response.json())
    .then((json) => {
    setResponse(JSON.stringify(json));
    
    if(json.status_code === 200) 
        document.getElementById('status-bar').innerHTML = "Status: Logged out (Guest)";
    });
}
