function Profile_Orders_Load(main) {
    setPageSectionHeader('pages.account/pages.profile.titles.orders', 'pages.profile.titles.orders');

    pageToShow = `
        <div class="woocommerce-notices-wrapper"></div>
        <h3 class="account-sub-title mb-4 mt-2">
            <svg class="svg-inline--fa fa-user fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
            <span class="translate" key="pages.profile.titles.profiles.orders">Detalles de sus pedidos</span>
        </h3>`;

	doPost('orders/getAll', { })
	.then((response) => response.json())
	.then((json) => {
		if(json.status_code === 200) {
            orderCache = json.data;

            openOrders = loadOpenOrders(orderCache.open);
            closedOrders = loadClosedOrders(orderCache.closed);

            pageToShow = pageToShow + `
                <div id="open-orders">` + openOrders + `</div>
                <div id="closed-orders">` + closedOrders + `</div>`;
            
            main.innerHTML = pageToShow;

            parseTranslations();
        }
    });
}

function loadOpenOrders(data) {
    returnValue = `
        <table class="orders-table woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
            <thead>
                <tr>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr">ID</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr translate" key="pages.profile.orders.products">Productos</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr translate" key="pages.profile.orders.date">Fecha</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr">&nbsp;</span>
                    </th>
                </tr>
            </thead>
            <tbody>`;

    if(data.length === 0) 
        return returnValue + `
                    <tr>
                        <td colspan="4">
                            <span class="translate" key="pages.profile.orders.empty">No hay contenido para mostrar</span>
                        </td>
                    </tr>
                </tbody>
            </table>`;
    
    data.forEach((item) => {
        date = new Date(item.date_opened);

        const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
        formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
        formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        returnValue = returnValue + `
            <tr>
                <td>` + item.order_id + `</td>
                <td>` + item.products.length + `</td>
                <td>${formattedDate} - ${formattedTime}</td>
                <td>
                    <a href="javascript:;" onclick="viewProducts(` + item.order_id + `);">
                        <i title="Ver" class="icon-eye-open"></i>
                    </a>
                    <a href="javascript:;" onclick="removeCart(` + item.order_id + `);">
                        <i title="Eliminar" class="icon-remove-sign" style="color: red;"></i>
                    </a>
                    ` + (item.active === 0 ? `<a href="javascript:;" onclick="setActiveCart(` + item.order_id + `);">
                        <i title="Cargar al Carrito" class="icon-shopping-cart"></i>
                    </a>` : ``) + `
                </td>
            </tr>`;
    });

    return returnValue + `
            </tbody>
        </table>`;
}

function loadClosedOrders(data) {
    returnValue = `
        <table class="orders-table woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
            <thead>
                <tr>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr">ID</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr translate" key="pages.profile.orders.products">Productos</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr translate" key="pages.profile.orders.date">Fecha</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr translate" key="pages.profile.orders.shipping">Envio</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr translate" key="pages.profile.orders.total">Total</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr translate" key="pages.profile.orders.state">Estado</span>
                    </th>
                    <th class="woocommerce-orders-table__header">
                        <span class="nobr">&nbsp;</span>
                    </th>
                </tr>
            </thead>
            <tbody>`;

    if(data.length === 0) 
        return returnValue + `
                    <tr>
                        <td colspan="7">
                            <span class="translate" key="pages.profile.orders.empty">No hay contenido para mostrar</span>
                        </td>
                    </tr>
                </tbody>
            </table>`;
    
    data.forEach((item) => {
        date = new Date(item.date_confirmed);
        formattedDate = new Intl.DateTimeFormat("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" }).format(date);
        formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        products = JSON.parse(item.products_json);

        returnValue = returnValue + `
            <tr>
                <td>` + item.order_confirmed_id + `</td>
                <td>` + (Object.keys(products).length - 1) + `</td>
                <td>${formattedDate} - ${formattedTime}</td>
                <td>$` + parsePrice(products.shipping) + `</td>
                <td>$` + parsePrice(item.subtotal) + `</td>
                <td>` + getOrderState(item.state) + `</td>
                <td>
                    <a href="javascript:;" onclick="viewProducts(` + item.order_id + `);">
                        <i class="icon-eye-open"></i>
                    </a>
                    ` + (item.active === 0 ? `<a href="javascript:;" onclick="setActiveCart(` + item.order_id + `);">
                        <i class="icon-truck"></i>
                    </a>` : ``) + `
                </td>
            </tr>`;
    });
    
    return returnValue + `
            </tbody>
        </table>`;
}

function getOrderState(state) {
    switch(state) {
        case 'A': return `<i title="Pendiente" class="icon-info-sign" style="color: blue;"></i>`;
        case 'A': return `<i title="Abonado" class="icon-money" style="color: green;"></i>`;
        case 'C': return `<i title="Completado" class="icon-check" style="color: green;"></i>`;
        case 'A': return `<i title="Cancelado" class="icon-ban-circle" style="color: red;"></i>`;
    }
}

function setActiveCart(id) {
    doPost('users/update', 
        { 
            'active_cart_id': id 
        }
    ).then((response) => response.json())
	.then((json) => {
        if(json.status_code === 200) {
            refreshListing();
            getShoppingCart();
        }
    });
}

function refreshListing() {
    doPost('orders/getAll', { })
	.then((response) => response.json())
	.then((json) => {
		if(json.status_code === 200) {
            orderCache = json.data;

            openOrders = loadOpenOrders(orderCache.open);
            closedOrders = loadClosedOrders(orderCache.closed);

            document.getElementById('open-orders').innerHTML = openOrders;
            document.getElementById('closed-orders').innerHTML = closedOrders;

            parseTranslations();
        }
    });
}

function removeCart(id) {
    doPost('orders/delete', 
        { 
            'order_id': id 
        }
    ).then((response) => response.json())
	.then((json) => {
        if(json.status_code === 200) {
            refreshListing();
            getShoppingCart();
        }
    });
}

function viewProducts() {
    alert("todo");
}