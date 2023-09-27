function Checkout_Load(main) {
    main.innerHTML = `
    <div class="woocommerce-MyAccount-content">
    <div class="align-left">
        <div class="box-content">
            <div class="woocommerce-notices-wrapper"></div><h3 class="account-sub-title d-none d-md-block mb-3 mt-2"><i class="Simple-Line-Icons-social-dropbox align-middle m-r-sm"></i>Pedidos</h3>
<table class="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
    <thead>
        <tr>
                                <th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-number"><span class="nobr">Pedido</span></th>
                                <th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-date"><span class="nobr">Fecha</span></th>
                                <th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-status"><span class="nobr">Estado</span></th>
                                <th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-total"><span class="nobr">Total</span></th>
                                <th class="woocommerce-orders-table__header woocommerce-orders-table__header-order-actions"><span class="nobr">Acciones</span></th>
                        </tr>
    </thead>
</table>
<div class="woocommerce-message woocommerce-message--info woocommerce-Message woocommerce-Message--info woocommerce-info text-center">
    <p class="mt-2 mb-4">No se ha hecho ningún pedido todavía.</p>
    <div class="porto-separator"><hr class="separator-line  align_center"></div>
    <div class="push-top">
        <a class="woocommerce-Button button btn-v-dark btn-go-shop" href="https://www.florida-camping.com.ar/tienda/">
            Ir de compras		</a>
</div>
</div>
                </div>
    </div>
</div>`;
}