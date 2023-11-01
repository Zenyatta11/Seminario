function Profile_Account_Load(main) {
    setPageSectionHeader('pages.account/pages.profile.titles.account', 'pages.profile.titles.account');

    doPost('users/get', { })
    .then((response) => response.json())
    .then((json) => {
            if(json.status_code === 200) {
                user = json.data;

                main.innerHTML = `
                    <h3 class="account-sub-title mb-4 mt-2">
                        <svg class="svg-inline--fa fa-user fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="user" role="img"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                            <path fill="currentColor"
                                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                            </path>
                        </svg>
                        <span class="translate" key="pages.profile.titles.account">Notificaciones</span>
                    </h3>
                    <form class="woocommerce-form woocommerce-form-login login pr-lg-4 pe-0" onsubmit="event.preventDefault();">

                        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                            <label class="mb-1 font-weight-medium" for="register-name">
                                <span class="translate" key="pages.profile.account.name">placeholder</span>
                            </label>
                            <input type="text" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl" 
                                value="` + user.name + `" disabled="">
                        </p>
                        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                            <label class="mb-1 font-weight-medium" for="register-name">
                                <span class="translate" key="pages.profile.account.username">placeholder</span>
                            </label>
                            <input type="text" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl" 
                                value="` + user.username + `" disabled="">
                        </p>
                        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                            <label class="mb-1 font-weight-medium" for="register-name">
                                <span class="translate" key="pages.profile.account.dni">placeholder</span>
                            </label>
                            <input type="text" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl" 
                                value="` + user.dni + `" disabled="">
                        </p>
                        <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                            <label class="mb-1 font-weight-medium" for="register-name">
                                <span class="translate" key="pages.profile.account.email">placeholder</span>
                            </label>
                            <input type="text" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl" 
                                value="` + user.email + `" disabled="">
                        </p>
                    </form>`;

                parseTranslations();
            }
        }
    );

    
}