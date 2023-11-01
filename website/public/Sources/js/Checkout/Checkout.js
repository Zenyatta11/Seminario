var orderCache;

function Checkout_Cart_Load(main) {
	document.getElementById("mini-cart")?.remove();
	
	pageToShow = `
		<div class="align-left">
			<div class="box-content">
				<div class="woocommerce-notices-wrapper">
					<ul id="page-section-header" class="breadcrumb standalone-list" itemscope=""
						itemtype="https://schema.org/BreadcrumbList">
						<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
							<span class="translate" key="checkout.header.products">Confirmar Productos</span>
							<i class="delimiter"></i>
						</li>
						<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
							<span style="color: #777777" class="translate" key="checkout.header.shipping">Cotizar Envio</span>
							<i class="delimiter"></i>
						</li>
						<li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
							<span style="color: #777777" class="translate" key="checkout.header.payments">Pagos</span>
							<i class="delimiter"></i>
						</li>
						<li><span style="color: #777777" class="translate" key="checkout.header.confirmation">Confirmacion</span></li>
					</ul>
				</div>`;
	noItemsInCart = `
		<div class="text-center" style="padding-top: 20%;">
			<i style="font-size: xx-large" class="icon-shopping-cart"></i>
			<p class="mt-2 mb-4" class="translate" key="checkout.header.empty">Su carrito se encuentra vacío.</p>
			<div class="porto-separator">
				<hr class="separator-line align_center" />
			</div>
			<div class="push-top">
				<a href="/catalog" onclick="event.preventDefault(); navigateToPage('/catalog', 'common.header.catalog', Catalog_Load);">
					<span class="translate" key="common.header.catalog">Ir de compras</span>
				</a>
			</div>
		</div>`;

	doPost('orders/get', { })
	.then((response) => response.json())
	.then((json) => {
		if(json.status_code === 200) {
			if(json.data.products.length != 0) {
				orderCache = json.data.products;
				
				pageToShow = pageToShow + `
					<h3 class="account-sub-title d-none d-md-block mb-3 mt-2" style="text-align: center;">
						<span>Checkout</span>
					</h3>
					<table
						class="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
						<thead>
							<tr>
								<th class="woocommerce-orders-table__header">
									<span class="nobr"></span>
								</th>
								<th class="woocommerce-orders-table__header">
									<span class="nobr translate" key="checkout.products.product">Articulo</span>
								</th>
								<th class="woocommerce-orders-table__header">
									<span class="nobr translate" key="checkout.products.price">Precio</span>
								</th>
								<th class="woocommerce-orders-table__header">
									<span class="nobr translate" key="checkout.products.amount">Cantidad</span>
								</th>
								<th class="woocommerce-orders-table__header">
									<span class="nobr translate" key="checkout.products.subtotal">Subtotal</span>
								</th>
							</tr>`;
				
				subtotal = 0;
				discount = 0;
				items = "";

				for(i = 0; i < json.data.products.length; i = i + 1) {
					item = json.data.products[i];

					subtotal = subtotal + (item.product.price * item.amount);
					discount = discount + ((item.product.offer ?? 0) * item.amount);
					
					items = items + `
						<tr>
							<td>
								` + (item.product.offer ? `<div class="container-image-and-badge">
									<img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/13/0.png" alt=""
										width="85" height="85">
									<div
										class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23297 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158"
										style="/*! width: 85px; */bottom: -11px;right: 35px;">
										<div class="yith-wcbm-badge__wrap">
											<div class="yith-wcbm-css-text">
												<div class="yith-wcbm-badge-text" style="/*! width: 85px; */">-` + (Math.floor(parseInt(item.product.offer) / parseInt(item.product.price) * 100)) + `%</div>
											</div>
										</div>
									</div>` : `<img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + item.product.id + `/0.png" alt=""
									width="85" height="85">`) + `
							</td>
							<td>` + ProductUrl(item.product.id, item.product.name, item.product.name, ``) + `</td>
							<td>$` + parsePrice(item.product.price) + `</td>
							<td>` + item.amount + `</td>
							<td>$` + parsePrice(item.product.price * item.amount) + `</td>
						</tr>`;
				}
				
				pageToShow = pageToShow + items + `
					</thead>
					<tbody>
						<tr class="table-totals">
							<td></td>
							<td colspan="3" class="translate" key="checkout.products.totals.subtotal">
								Subtotal:
							</td>
							<td>
								$` + parsePrice(subtotal) + `
							</td>
							<td></td>
						</tr>
						<tr class="table-totals">
							<td></td>
							<td colspan="3" class="translate" key="checkout.products.totals.discounts">
								Descuentos:
							</td>
							<td>
								$` + parsePrice(discount) + `
							</td>
							<td></td>
						</tr>
						<tr class="table-totals">
							<td></td>
							<td colspan="3" class="translate" key="checkout.products.totals.totals">
								Total de Productos:
							</td>
							<td>
								$` + parsePrice(subtotal - discount) + `
							</td>
							<td></td>
						</tr>
						<tr class="table-totals">
							<td id="continue-button" colspan="6" style="text-align: center; border-top: 1px solid #e7e7e7; padding: 10px 10px;">
								<a class="woocommerce-Button button btn-v-dark btn-go-shop translate" key="checkout.products.totals.shipping"
									href="javascript:;" onclick="continueToAddress()">
									Continuar al Envio
								</a>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
					<tbody id="checkout-errors">
					</tbody>
				</table>
			</div>
		</div>`;
			} else {
				pageToShow = pageToShow + noItemsInCart;
			}
		} else {
			pageToShow = pageToShow + noItemsInCart;
		}

		main.innerHTML = pageToShow;
		parseTranslations();
	});
}

function continueToAddress() {
	doPost('orders/confirmStock', { "data": JSON.stringify(orderCache) })
	.then((response) => response.json())
	.then((json) => {
		if(json.data.length != 0) {
			productList = ``;

			json.data.forEach((item) => {
				productList = productList + `
					<tr class="table-totals">
						<td colspan="4">` + ProductUrl(item.id, item.name, item.name, ``) + `</td>
						<td>` + item.amount + `</td>
						<td>` + item.stock + `</td>
					</tr>`;
			});

			document.getElementById("continue-button").innerHTML = "";
			document.getElementById("checkout-errors").innerHTML = `
				<tr class="table-totals">
					<td style="text-align: center;" colspan="6" class="translate" key="errors.checkout.NO_STOCK"></td>
				</tr>
				<tr class="table-totals">
					<td colspan="4" class="translate" key="checkout.products.product"></td>
					<td class="translate" key="checkout.products.amount"></td>
					<td class="translate" key="checkout.products.available"></td>
				</tr>` + productList;
		} else Checkout_Address_Load(document.getElementById('content'));

		parseTranslations();
	});
}
