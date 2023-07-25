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

<table>
    <tr>
        <td><input type="text" id="register-username" placeholder="Username"/></td>
        <td><input type="text" id="register-name" placeholder="Name"/></td>
        <td><input type="password" id="register-passwd" placeholder="Password"/></td>
        <td><input type="email" id="register-email" placeholder="Email"/></td>
        <td><button onclick="doUserRegister()">Register User</button></td>
    </tr>
</table>

<div style="bottom: 0; position: fixed; width: 100%">
    <table style="margin-left: auto;margin-right: auto;">
        <tr>
            <td><input type="text" id="login-username" placeholder="Username"/></td>
            <td><input type="password" id="login-passwd" placeholder="Password"/></td>
            <td><button onclick="doUserLogin()">Login</button></td>
            <td><button onclick="doUserLogout()">Logout</button></td>
            <td id="status-bar">Status: Logged out (Guest)</td>
        </tr>
        <tr style="text-align: center;">
            <td colspan="5" id="response-bar"> - response - </td>
        </tr>
    </table>
</div>

<script>
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

</script>
