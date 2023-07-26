<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(isset($_GET['process'])) {
    if(strcmp($_GET['process'], "api") == 0) {
        include("../private/index.php");
    } else {
        echo("dasdsa");
    }
}
?>

<script src="Sources/essentials.js"></script>
<script src="Sources/DebugPage/Addresses.js"></script>
<script src="Sources/DebugPage/Miscellaneous.js"></script>
<script src="Sources/DebugPage/Users.js"></script>

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
</style>

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
        <td colspan="2"><button onclick="doNewCategory()">New Category</button></td>
        <td>
            <select id="newsubcategory-category-select">
                <option value="" disabled selected>Select Category for Sub-Category</option>
            </select>
        </td>
        <td><input type="text" id="new-subcategory" placeholder="Sub-Category"/></td>
        <td colspan="2"><button onclick="doNewSubCategory()">New Sub-Category</button></td>
    </tr>
    <tr>
        <td colspan="2"><button onclick="getUsers()">Get Users</button></td>
        <td colspan="2"><button onclick="getCategories()">Get Categories</button></td>
        <td colspan="2"><button onclick="getSubcategories()">Get Subcategories</button></td>
    </tr>
    <tr>
        <td colspan="2">
            <select id="user-select">
                <option value="" disabled selected>Select User</option>
            </select>
        </td>
        <td colspan="2">
            <select id="category-select">
                <option value="" disabled selected>Select Category</option>
            </select>
        </td>
        <td colspan="2">
            <select id="subcategory-select">
                <option value="" disabled selected>Select Subcategory</option>
            </select>
        </td>
    </tr>
</table>

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
</script>