var contextData = {};

async function getContextData(context = null) {
    doPost('context',
        { 
            'context': context
        }
    ).then((response) => response.json())
    .then((json) => {
        console.log(json);
		parseFromJSON(json.data, { }, "context");
	});
}

function loadPageByURL() {
    console.log(window.location.pathname);
    switch(window.location.pathname) {
        case '/login': setPage('register.login', Login_Login_Load); break;
        case '/register': setPage('register.register', Login_Register_Load); break;
        case '/reset-password': setPage('register.resetpassword', Login_ResetPasswd_Load); break;
        default: setPage('register.login', Login_Login_Load); break;
    }
}

function updateUserData(json) {
    console.log(json);
}