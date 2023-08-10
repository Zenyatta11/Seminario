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
    switch(window.location.pathname) {
        case 'login': setPage('login', 'register.login', Login_Login_Load); break;
        case 'register': setPage('register', 'register.register', Login_Register_Load); break;
        case 'reset-password': setPage('reset-password', 'register.resetpassword', Login_ResetPasswd_Load); break;
        default: setPage('login', 'register.login', Login_Login_Load); break;
    }
}
