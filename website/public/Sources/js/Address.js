function Address_Manager_Load(main) {
    setPageSectionHeader('pages.catalog.title', 'pages.catalog.title');

    main.innerHTML = `
        <article class="post-11798 page type-page status-publish hentry">
            <div class="page-content">
                <div class="woocommerce">
                    <div class="woocommerce-MyAccount-content">
                        <div class="align-left">
                            <div class="box-content">
                                <div class="woocommerce-notices-wrapper"></div>
                                <h3 class="account-sub-title mb-4 mt-2"><i class="porto-icon-user-2 align-middle m-r-sm"></i>Direcciones</h3>
                                <form action="" method="post" class="woocommerce-EditAccountForm edit-account">

                                    <p class="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                                        <label class="mb-1" for="account_first_name">Nombre&nbsp;<span class="required">*</span></label>
                                        <input type="text" class="woocommerce-Input woocommerce-Input--text line-height-xl input-text" name="account_first_name" id="account_first_name" autocomplete="given-name" value="">
                                    </p>
                                    <p class="woocommerce-form-row woocommerce-form-row--last form-row form-row-last">
                                        <label class="mb-1" for="account_last_name">Apellidos&nbsp;<span class="required">*</span></label>
                                        <input type="text" class="woocommerce-Input woocommerce-Input--text line-height-xl input-text" name="account_last_name" id="account_last_name" autocomplete="family-name" value="">
                                    </p>
                                    <div class="clear"></div>

                                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                        <label class="mb-1" for="account_display_name">Nombre visible&nbsp;<span class="required">*</span></label>
                                        <input type="text" class="woocommerce-Input woocommerce-Input--text line-height-xl input-text" name="account_display_name" id="account_display_name" value="sadfa"> <span class="text-sm">Así será como se mostrará tu nombre en la sección de tu cuenta y en las valoraciones</span>
                                    </p>
                                    <div class="clear"></div>

                                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                        <label class="mb-1" for="account_email">Dirección de correo electrónico&nbsp;<span class="required">*</span></label>
                                        <input type="email" class="woocommerce-Input woocommerce-Input--email line-height-xl input-text" name="account_email" id="account_email" autocomplete="email" value="sadfa@mailinator.com">
                                    </p>
                                    <div class="featured-boxes m-t-xl m-b-lg p-l-lg p-r-lg pb-4">
                                        <fieldset class="mt-4">
                                            <legend class="text-v-dark font-weight-bold text-uppercase mb-3 text-md">Cambio de contraseña</legend>

                                            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                <label class="mb-1 font-weight-medium" for="password_current">Contraseña actual (déjalo en blanco para no cambiarla)</label>
                                                <span class="password-input"><input type="password" class="woocommerce-Input woocommerce-Input--password line-height-xl input-text" name="password_current" id="password_current" autocomplete="off"><span class="show-password-input"></span></span>
                                            </p>

                                            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                <label class="mb-1 font-weight-medium" for="password_1">Nueva contraseña (déjalo en blanco para no cambiarla)</label>
                                                <span class="password-input"><input type="password" class="woocommerce-Input woocommerce-Input--password line-height-xl input-text" name="password_1" id="password_1" autocomplete="off"><span class="show-password-input"></span></span>
                                            </p>

                                            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                <label class="mb-1 font-weight-medium" for="password_2">Confirmar nueva contraseña (déjalo en blanco para no cambiarla)</label>
                                                <span class="password-input"><input type="password" class="woocommerce-Input woocommerce-Input--password line-height-xl input-text" name="password_2" id="password_2" autocomplete="off"><span class="show-password-input"></span></span>
                                            </p>
                                        </fieldset>
                                    </div>
                                    <div class="clear"></div>


                                    <p class="clearfix">
                                        <input type="hidden" id="save-account-details-nonce" name="save-account-details-nonce" value="d020ce4f88" />
                                        <input type="hidden" name="_wp_http_referer" value="/mi-cuenta/editar-cuenta/" />
                                        <button type="submit" class="woocommerce-Button button btn-v-dark btn-go-shop pt-left" name="save_account_details" value="Guardar los cambios">Guardar los cambios</button>
                                        <input type="hidden" name="action" value="save_account_details" />
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article >
    `;
}

Address_Manager_Load(document.getElementById("content"))