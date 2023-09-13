var contextData = {};

async function getContextData(context = null) {
    doPost('context',
        { 
            'context': context
        }
    ).then((response) => response.json())
    .then((json) => {
        console.log(json);
        contextData = json.data;
		parseFromJSON(json.data, { }, "context");
	});
}

function loadPageByURL() {
    console.log(window.location.pathname);

    getUsersName((name) => {
        showUserPage(name);
        pageLoader();
    }, () => {
        showGuestPage();
        pageLoader();
    });
    
    parseTranslations();
}

function updateUserData(json) {
    console.log(json);
    getUsersName((name) => {
        showUserPage(name);
        pageLoader();
    }, () => {
        showGuestPage();
        pageLoader();
    });
}

function pageLoader() {
    getShoppingCart();
    const url = window.location.pathname;

    if(url.includes('/catalog')) {
        setPage('pages.catalog', Catalog_Load);
        return;
    } else if(url.includes('/product')) {
        setPage('pages.product', Index_Load);
        return;
    }

    switch(url) {
        case '/login': setPage('register.login', Login_Login_Load); break;
        case '/register': setPage('register.register', Login_Register_Load); break;
        case '/reset-password': setPage('register.resetpassword', Login_ResetPasswd_Load); break;
        default: setPage('pages.home', Index_Load); break;
    }
}