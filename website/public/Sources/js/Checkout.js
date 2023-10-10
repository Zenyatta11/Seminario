function Checkout_Load(main) {
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

    <div class="align-left">
  <div class="box-content">
    <div class="woocommerce-notices-wrapper">
        <ul id="page-section-header" class="breadcrumb standalone-list" itemscope="" itemtype="https://schema.org/BreadcrumbList">
            <li itemprop="itemListElement"  itemscope="" itemtype="https://schema.org/ListItem">
                <span>Confirmar Productos</span>
                <i class="delimiter"></i>
            </li>
            <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                <span style="color: #777777">Cotizar Envio</span>
                <i class="delimiter"></i>
            </li>
            <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                <span style="color: #777777">Pagos</span>
                <i class="delimiter"></i>
            </li>
            <li><span  style="color: #777777">Confirmacion</span></li>
        </ul>
    </div>
    
    <h3 class="account-sub-title d-none d-md-block mb-3 mt-2" style="text-align: center;">
	  <span>Checkout</span>
    </h3>
    <table class="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
      <thead>
        <tr>
          <th
            class="woocommerce-orders-table__header"
          >
            <span class="nobr"></span>
          </th>
          <th
            class="woocommerce-orders-table__header"
          >
            <span class="nobr">Articulo</span>
          </th>
          <th
            class="woocommerce-orders-table__header"
          >
            <span class="nobr">Precio</span>
          </th>
          <th
            class="woocommerce-orders-table__header"
          >
            <span class="nobr">Cantidad</span>
          </th>
          <th
            class="woocommerce-orders-table__header"
          >
            <span class="nobr">Subtotal</span>
          </th>
          <th
            class="woocommerce-orders-table__header"
          >
            <span class="nobr"></span>
          </th>
        </tr>
		<tr>
			<td>
                <div class="container-image-and-badge">
                    <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/13/0.png" alt="" width="85" height="85">
                    <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23297 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158" style="/*! width: 85px; */bottom: -11px;right: 35px;">
                    <div class="yith-wcbm-badge__wrap">
                        <div class="yith-wcbm-css-text">
                            <div class="yith-wcbm-badge-text" style="/*! width: 85px; */">-68%</div>
                        </div>
                    </div>
                </div>
            </td>
			<td>Nest Thermostat</td>
			<td>$8.800</td>
			<td>3</td>
			<td>$24.000</td>
			<td>&lt; Editar</td>
		</tr>
		<tr>
			<td><img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/13/0.png" alt="" width="85" height="85"></td>
			<td>Nest Thermostat</td>
			<td>$8.800</td>
			<td>3</td>
			<td>$24.000</td>
			<td>&lt; Editar</td>
		</tr>
      </thead>
      <tbody>
            <tr class="table-totals">
                <td></td>
                <td colspan="3">
                    Subtotal:
                </td>
                <td>
                    $7358925
                </td>
                <td></td>
            </tr>
            <tr class="table-totals">
                <td></td>
                <td colspan="3">
                    Descuentos:
                </td>
                <td>
                    $7358925
                </td>
                <td></td>
            </tr>
            <tr class="table-totals">
                <td></td>
                <td colspan="3">
                    Total de Productos:
                </td>
                <td>
                    $7358925
                </td>
                <td></td>
            </tr>
            <tr class="table-totals">
                <td colspan="6" style="text-align: center; border-top: 1px solid #e7e7e7; padding: 10px 10px;">
                            <a
                    class="woocommerce-Button button btn-v-dark btn-go-shop"
                    href="https://www.florida-camping.com.ar/tienda/"
                    >
                    Continuar al Envio
                    </a>
                </td>
            </tr>
      </tbody>
    </table>
    <div
      class="woocommerce-message woocommerce-message--info woocommerce-Message woocommerce-Message--info woocommerce-info text-center"
    >
      <p class="mt-2 mb-4">No se ha hecho ningún pedido todavía.</p>
      <div class="porto-separator">
        <hr class="separator-line align_center" />
      </div>
      <div class="push-top">
        <a
          class="woocommerce-Button button btn-v-dark btn-go-shop"
          href="https://www.florida-camping.com.ar/tienda/"
        >
          Ir de compras
        </a>
      </div>
    </div>
  </div>
</div>

`;
}

Checkout_Load(document.getElementById("content"));
