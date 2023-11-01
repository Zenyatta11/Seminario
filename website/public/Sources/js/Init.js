var contextData = {};

async function getContextData(context = null) {
    doPost('context',
        { 
            'context': context
        }
    ).then((response) => response.json())
    .then((json) => {
        contextData = json.data;
		parseFromJSON(json.data, { }, "context");
	});
}

function loadPageByURL() {

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
        setPage('pages.catalog.title', Catalog_Load);
        return;
    } else if(url.includes('/product')) {
        setPage('pages.product.title', Product_Load);
        return;
    } else if(url.includes('/search')) {
        setPage('pages.catalog.title', Catalog_Load);
        return;
    } else if(url.includes('/profile')) {
        setPage('pages.profile.titles.profile', Profile_Index_Load);
        return;
    }

    switch(url) {
        case '/login': setPage('register.login', Login_Login_Load); break;
        case '/register': setPage('register.register', Login_Register_Load); break;
        case '/reset-password': setPage('register.resetpassword', Login_ResetPasswd_Load); break;
        case '/checkout': setPage('checkout.title', Checkout_Cart_Load); break;
        default: setPage('pages.home', Index_Load); break;
    }
}