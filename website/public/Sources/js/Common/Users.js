var isLoggedIn = false;

function getUsername(success, fail) {
    doPost('users/get',
    { 
        'fields': 'username'
    }
    ).then((response) => response.json())
    .then((json) => {
            if(json.status_code === 200) {
                isLoggedIn = true;
                success(json.data.username);
            } else {
                isLoggedIn = false;
                fail(json.data);
            }
        }
    );
}

function getUsersName(success, fail) {
    doPost('users/get',
    { 
        'fields': 'name'
    }
    ).then((response) => response.json())
    .then((json) => {
            if(json.status_code === 200) {
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
            showUserPage(name);
            pageLoader();
            refreshPage()
        }, () => {
            showGuestPage();
            refreshPage()
        });
    });
}
