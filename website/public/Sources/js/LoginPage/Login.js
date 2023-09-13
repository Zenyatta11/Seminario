function Login_Login_Load(main) {
	if(isLoggedIn) {
		navigateToPage('/', 'context.common.page.title', Index_Load)
		return;
	}

	setPageSectionHeader('pages.home/pages.accounts/register.login', 'register.login');
	main.innerHTML = `
		<article class="post-11798 page type-page status-publish hentry">
			<div class="page-content">
				<div class="woocommerce">
					<div class="col-lg-10 mx-auto mb-4">
						<div class="align-left ">
							<div class="box-content">
								<div class="woocommerce-notices-wrapper"></div>
								<div class="u-columns col2-set" id="customer_login">
									<div class="u-column1 col-1" style="width: 75%;">
										<form 
											class="woocommerce-form woocommerce-form-login login pr-lg-4 pe-0"
											id="login-form" onsubmit="event.preventDefault(); doLogin();" method="post">
											<h3
												class="account-sub-title mb-2 font-weight-bold text-capitalize text-v-dark translate" key="register.login">
												Acceder</h3>
											<p
												class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
												<label class="mb-1 font-weight-medium"
													for="username"><span class="translate" key="register.email">placeholder</span><span
														class="required">*</span></label>
												<input type="text"
													class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
													name="email" id="login-email"
													autocomplete="email">
											</p>
											<p
												class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-2">
												<label class="mb-1 font-weight-medium"
													for="password"><span class="translate" key="register.passwd">placeholder</span><span
														class="required">*</span></label>
												<span class="password-input"><input
														class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
														type="password" name="password"
														id="login-passwd"
														autocomplete="login-passwd"><span
														class="show-password-input"></span></span>
											</p>

											<p id="status-bar" class="status">&nbsp;</p>

											<div
												class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
												<div class="porto-checkbox my-2 my-sm-0" style="margin-left: auto; margin-right: 0px;">
												<a href="/reset-password" onclick="event.preventDefault(); navigateToPage('/reset-password', 'register.resetpassword', Login_ResetPasswd_Load);"
													class="text-v-dark font-weight-semibold translate" key="register.reset">placeholder</a>
												</div>
											</div>
											<p class="form-row mb-3 mb-lg-0 pb-1 pb-lg-0">
												<button type="submit" id="login-submit-button"
													class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate"
													name="login" key="register.login" value="login">placeholder</button>
											</p>
											<div
												class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
												<div class="porto-checkbox my-2 my-sm-0" style="margin-top: 2.5% !important; margin-left: auto; margin-right: 0px;">
												<a href="/register" onclick="event.preventDefault(); navigateToPage('/register', 'register.register', Login_Register_Load);"
													class="text-v-dark font-weight-semibold translate" key="register.newuser">placeholder</a>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>`;
}

function doLogin() {
	document.getElementById("login-submit-button").disabled = true;

	doPost('users/login',
		{
			'email': getValueById('login-email'),
			'passwd': getValueById('login-passwd')
		}
	).then((response) => response.json())
	.then((json) => {
			if(json.status_code === 200) {
				updateUserData(json);
				setPage('', Index_Load);
			} else if(json.status_code === 403) {
				statusText = ""; 
				errors = json.data.split(';');

				errors.forEach((item) => {
					statusText = statusText + getKeyFromJson(language, fallbackLanguage, 'errors.login.' + item) + "<br>";
				});

				document.getElementById("status-bar").innerHTML = statusText;
				
				document.getElementById("login-submit-button").disabled = false;
			} else if(json.status_code === 400) {
				statusText = ""; 
				errors = json.data.split(';');

				errors.forEach((item) => {
					statusText = statusText + getKeyFromJson(language, fallbackLanguage, 'errors.login.' + item) + "<br>";
				});

				document.getElementById("status-bar").innerHTML = statusText;

				setTimeout(() => navigateToPage('/', 'context.common.page.title', Index_Load), 5000);
			}
		}
	);
}