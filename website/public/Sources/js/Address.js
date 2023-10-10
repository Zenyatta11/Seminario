function Address_Manager_Load(main) {
    document.getElementById("mini-cart")?.remove();

    main.innerHTML = `
    <style>
        .table-totals td {
            padding: 5px 5px;
        }

        .table-totals {
            border-bottom: none !important;
        }

        .standalone-list {
            background-color: initial;
        }

        .standalone-list a span {
            color: initial;
        }

        .standalone-list > li .delimiter::before {
            content: "/ ";
            position: relative;
            right: -2px;
        }
    </style>
<article class="post-11798 page type-page status-publish hentry">
			<div class="page-content">
				<div class="woocommerce">
					<div class="col-lg-10 mx-auto mb-4">
    <div class="align-left">
  <div class="box-content">
								<div class="woocommerce-notices-wrapper"></div>
								<div class="u-columns col2-set" id="customer_login">
									<div class="u-column1 col-1" style="width: 75%;">
										<form class="woocommerce-form woocommerce-form-login login pr-lg-4 pe-0" id="login-form" onsubmit="event.preventDefault(); doLogin();" method="post">
											<h3 class="account-sub-title mb-2 font-weight-bold text-capitalize text-v-dark translate" key="register.login">Acceder</h3>
											<p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                                        <label class="mb-1" for="account_first_name">Nombre&nbsp;<span class="required">*</span></label>
                                        <input type="text" class="woocommerce-Input woocommerce-Input--text line-height-xl input-text" name="account_first_name" id="account_first_name" autocomplete="given-name" value="">
                                    </p>
											<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-2">
												<label class="mb-1 font-weight-medium" for="password"><span class="translate" key="register.passwd">Contraseña</span><span class="required">*</span></label>
												<span class="password-input"><input class="woocommerce-Input woocommerce-Input--text input-text line-height-xl" type="password" name="password" id="login-passwd" autocomplete="login-passwd"><span class="show-password-input"></span></span>
											</p>

											<p id="status-bar" class="status">&nbsp;</p>

											<div class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
												<div class="porto-checkbox my-2 my-sm-0" style="margin-left: auto; margin-right: 0px;">
												<a href="/reset-password" onclick="event.preventDefault(); navigateToPage('/reset-password', 'register.resetpassword', Login_ResetPasswd_Load);" class="text-v-dark font-weight-semibold translate" key="register.reset">¿Olvidó su contraseña?</a>
												</div>
											</div>
											<p class="form-row mb-3 mb-lg-0 pb-1 pb-lg-0">
												<button type="submit" id="login-submit-button" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" name="login" key="register.login" value="login">Acceder</button>
											</p>
											<div class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
												<div class="porto-checkbox my-2 my-sm-0" style="margin-top: 2.5% !important; margin-left: auto; margin-right: 0px;">
												<a href="/register" onclick="event.preventDefault(); navigateToPage('/register', 'register.register', Login_Register_Load);" class="text-v-dark font-weight-semibold translate" key="register.newuser">¿No tiene cuenta? Registrese aquí</a>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
                            					</div>
				</div>
			</div>
		</article>
`;
}

Address_Manager_Load(document.getElementById("content"))
