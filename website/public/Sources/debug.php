<head>
    <link href="Themes/CSS/font-awesome.css" rel="stylesheet" type="text/css">
</head>
<body onload="parseTranslations()">
    <script src="Sources/js/essentials.js"></script>
    <script src="Sources/js/DebugPage/Addresses.js"></script>
    <script src="Sources/js/DebugPage/Miscellaneous.js"></script>
    <script src="Sources/js/DebugPage/Users.js"></script>
    <script>
        function parseTranslations() {
            Array.from(document.getElementsByClassName('translate')).forEach((element) => element.innerHTML = element.getAttribute('key')); 
        }
    </script>

    <style>
        select {
            width: 100%;
        }

        button {
            width: 100%;
        }

        input {
            width: 100%;
        }

        .row {
            display: flex;
        }

        .column {
            flex: 50%;
            padding: 5px;
        }

        .icon-remove {
            font-size: larger;
        }

        .icon-ok {
            font-size: larger;
        }

        .testcases table, .testcases th, .testcases td {
            border: 1px solid;
        }

        .testcases td {
            text-align: center;
        }
    </style>

    <div class="row">
        <div class="column">
            <table>
                <tr>
                    <td><input type="text" id="register-username" placeholder="Username"/></td>
                    <td><input type="text" id="register-name" placeholder="Name"/></td>
                    <td><input type="password" id="register-passwd" placeholder="Password"/></td>
                    <td><input type="email" id="register-email" placeholder="Email"/></td>
                    <td colspan="2"><button onclick="doUserRegister()">Register User</button></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <select onchange="doUpdateCities()" id="provinces-select">
                            <option value="" disabled selected>Select Province</option>
                        </select>
                    </td>
                    <td colspan="2">
                        <select id="cities-select">
                            <option value="" disabled selected>Select City</option>
                        </select>
                    </td>
                    <td><input type="number" id="zip-code" placeholder="Zip Code"/></td>
                    <td><button onclick="doCheckZipCode()">Verify Zipcode</button></td>
                </tr>
                <tr>
                    <td><input type="text" id="new-category" placeholder="Category"/></td>
                    <td><button onclick="doNewCategory()">New Category</button></td>
                    <td><button onclick="doModifyCategory()">Modify Category</button></td>
                    <td><button onclick="doDeleteCategory()">Delete Category</button></td>
                    <td colspan="2">
                        <select onchange="getSubCategories();" id="category-select">
                            <option value="" disabled selected>Select Category for Sub-Category</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    
                    <td><input type="text" id="new-subcategory" placeholder="Sub-Category"/></td>
                    <td><button onclick="doNewSubCategory()">New Sub-Category</button></td>
                    <td><button onclick="doDeleteSubCategory()">Delete Sub-Category</button></td>
                    <td><button onclick="doModifySubCategory()">Modify Sub-Category</button></td>
                    <td colspan="2">
                        <select id="subcategory-select">
                            <option value="" disabled selected>Select Subcategory</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><button onclick="getUsers()">Get Users</button></td>
                    <td colspan="2"><button onclick="getCategories()">Get Categories</button></td>
                    <td colspan="2"><button onclick="getSubCategories()">Get Subcategories</button></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <select id="users-select">
                            <option value="" disabled selected>Select User</option>
                        </select>
                    </td>
                    <td><span class="translate" key="potato">dasd</span></td>
                    <td><span class="translate" key="potato">dasd</span></td>
                    <td><span class="translate" key="potato">dasd</span></td>
                    <td><span class="translate" key="potato">dasd</span></td>
                </tr>
            </table>
        </div>
        <div class="column">
            <table class="testcases" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td></td>
                    <td><button>Begin tests</button></td>
                    <td>Expected</td>
                    <td>Received</td>
                    <td></td>
                </tr>
                <tr>
                    <td><span><i class="icon-remove"></i></span></td>
                    <td><span>Test 4-0: Users - Register invalid data</span></td>
                    <td>200</td>
                    <td>400</td>
                    <td><button>Retry</button>
                </tr>
            </table>
        </div>
    </div>
    <div style="bottom: 0; position: fixed; width: 100%">
        <table style="margin-left: auto;margin-right: auto;">
            <tr>
                <td><input type="text" id="login-email" placeholder="E-Mail"/></td>
                <td><input type="password" id="login-passwd" placeholder="Password"/></td>
                <td><button onclick="doUserLogin()">Login</button></td>
                <td><button onclick="doUserLogout()">Logout</button></td>
                <td id="status-bar">Status: ---</td>
            </tr>
            <tr style="text-align: center;">
                <td colspan="5">
                    <span style="max-height: 128px; display: inline-block; overflow: scroll; text-align: justify;" id="response-bar"> - response - </span>
                </td>
            </tr>
        </table>
    </div>


    <script>
        getUsername();
        doUpdateProvinces();
        getCategories();
    </script>
</body>