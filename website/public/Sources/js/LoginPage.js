function showLoginForm() {
	document.getElementById("login-form").hidden = false;
	document.getElementById("register-form").hidden = true;
	document.getElementById("password-reset-form").hidden = true;
}

function showRegisterForm() {
	document.getElementById("login-form").hidden = true;
	document.getElementById("register-form").hidden = false;
	document.getElementById("password-reset-form").hidden = true;
}

function showPasswordResetForm() {
	document.getElementById("login-form").hidden = true;
	document.getElementById("register-form").hidden = true;
	document.getElementById("password-reset-form").hidden = false;
}

