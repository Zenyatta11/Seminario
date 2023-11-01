var isLoggedIn = false;
var userData = {};

function getUsersName(success, fail) {
    doPost('users/get',
        { 
            'fields': 'name;address;dni'
        }
    ).then((response) => response.json())
    .then((json) => {
            if(json.status_code === 200) {
                userData = json.data;
                isLoggedIn = true;
                success(json.data.name);
            } else {
                isLoggedIn = false;
                fail(json.data);
            }
        }
    );
}

function doUserLogout() {
    doPost('users/logout',
        { }
    ).then((response) => response.json())
    .then(() => {
        getUsersName((name) => {
            userData = {};
            showUserPage(name);
            pageLoader();
            getShoppingCart();
            refreshPage();
        }, () => {
            showGuestPage();
            getShoppingCart();
            refreshPage();
        });
    });
}
