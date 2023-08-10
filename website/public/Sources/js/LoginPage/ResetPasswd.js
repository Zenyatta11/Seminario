function Login_ResetPasswd_Load(main) {
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
											id="password-reset-form">
											<h3
												class="account-sub-title mb-2 font-weight-bold text-capitalize text-v-dark translate" key="register.reset">
												Acceder</h3>
											<p
												class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
												<label class="mb-1 font-weight-medium"
													for="username"><span class="translate" key="register.email">placeholder</span><span
														class="required">*</span></label>
												<input type="text"
													class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
													name="username" id="username"
													autocomplete="username">
											</p>
											
											<p class="status">errors here</p>

											<div
												class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
												<div class="porto-checkbox my-2 my-sm-0" style="margin-left: auto; margin-right: 0px;">
												<a href="javascript:void(0)" onclick="navigateToPage('login', 'register.login', Login_Login_Load)"
													class="text-v-dark font-weight-semibold translate" key="register.login">placeholder</a>
												</div>
											</div>
											<div
												class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
												<div class="porto-checkbox my-2 my-sm-0" style="margin-left: auto; margin-right: 0px;">
												<a href="javascript:void(0)" onclick="navigateToPage('register', 'register.register', Login_Register_Load)"
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
