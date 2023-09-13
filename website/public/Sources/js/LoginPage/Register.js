function Login_Register_Load(main) {
	if(isLoggedIn) {
		navigateToPage('/', 'context.common.page.title', Index_Load)
		return;
	}

	setPageSectionHeader('pages.home/pages.accounts/register.register', 'register.register');
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
											id="register-form" onsubmit="event.preventDefault(); doRegister();" method="post">
											<h3
												class="account-sub-title mb-2 font-weight-bold text-capitalize text-v-dark translate" key="register.register">
												Acceder</h3>
											<p
												class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
												<label class="mb-1 font-weight-medium"
													for="register-name"><span class="translate" key="register.name">placeholder</span><span
														class="required">*</span></label>
												<input type="text"
													class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
													name="register-name" id="register-name"
													autocomplete="register-name">
											</p>
											<p
												class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
												<label class="mb-1 font-weight-medium"
													for="register-username"><span class="translate" key="register.username">placeholder</span><span
														class="required">*</span></label>
												<input type="text"
													class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
													name="register-username" id="register-username"
													autocomplete="register-username">
											</p>
											<p
												class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
												<label class="mb-1 font-weight-medium"
													for="register-email"><span class="translate" key="register.email">placeholder</span><span
														class="required">*</span></label>
												<input type="text"
													class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
													name="register-email" id="register-email"
													autocomplete="register-email">
											</p>
											<p
												class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-2">
												<label class="mb-1 font-weight-medium"
													for="register-password"><span class="translate" key="register.passwd">placeholder</span><span
														class="required">*</span></label>
												<span class="password-input"><input
														class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
														type="password" name="register-password"
														id="register-password"
														autocomplete="register-password"><span
														class="show-password-input"></span></span>
											</p>
											<p
												class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-2">
												<label class="mb-1 font-weight-medium"
													for="register-password-confirm"><span class="translate" key="register.confirmpasswd">placeholder</span><span
														class="required">*</span></label>
												<span class="password-input"><input
														class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
														type="password" name="register-password-confirm"
														id="register-password-confirm"
														autocomplete="register-password-confirm"><span
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
												<button type="submit"
													class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate"
													key="register.register">placeholder</button>
											</p>
											<div
												class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
												<div class="porto-checkbox my-2 my-sm-0" style="margin-top: 2.5% !important; margin-left: auto; margin-right: 0px;">
												<a href="/login" onclick="event.preventDefault(); navigateToPage('/login', 'register.login', Login_Login_Load);"
													class="text-v-dark font-weight-semibold translate" key="register.haveaccount">placeholder</a>
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

function doRegister() {
    doPost('users/register',
        {
            'username': getValueById('register-username'),
            'email': getValueById('register-email'),
            'name': getValueById('register-name'),
            'passwd': getValueById('register-password'),
			'passwdConfirm': getValueById('register-password-confirm')
        }
    ).then((response) => response.json())
    .then((json) => {
			if(json.status_code === 200) {
				updateUserData(json);
			} else if(json.status_code === 400 | 403) {
				statusText = ""; 
				errors = json.data.split(';');

				errors.forEach((item) => {
					statusText = statusText + getKeyFromJson(language, fallbackLanguage, 'errors.register.' + item) + "<br>";
				});

				document.getElementById("status-bar").innerHTML = statusText;
			}
		}
	);
}