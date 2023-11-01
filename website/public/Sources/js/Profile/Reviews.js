function Profile_Reviews_Load(main) {
    setPageSectionHeader('pages.account/pages.profile.titles.reviews', 'pages.profile.titles.reviews');

    main.innerHTML = `
        <div class="woocommerce-notices-wrapper"></div>
        <h3 class="account-sub-title mb-4 mt-2">
            <svg class="svg-inline--fa fa-user fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="user" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor"
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                </path>
            </svg>
            <span class="translate" key="pages.profile.titles.profiles.reviews">Notificaciones</span>
        </h3>
        <div id="open-orders">
            <table
                class="orders-table woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
                <thead>
                    <tr>
                        <th class="woocommerce-orders-table__header">
                            <span class="nobr translate" key="pages.profile.reviews.products">Producto</span>
                        </th>
                        <th class="woocommerce-orders-table__header">
                            <span class="nobr translate" key="pages.profile.reviews.review">Consulta</span>
                        </th>
                        <th class="woocommerce-orders-table__header">
                            <span class="nobr">&nbsp;</span>
                        </th>
                        <th class="woocommerce-orders-table__header">
                            <span class="nobr">&nbsp;</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="3">
                            <span class="translate" key="pages.profile.reviews.empty">There is no content to show.</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`;
}