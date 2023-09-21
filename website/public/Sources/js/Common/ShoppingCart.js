
function getShoppingCart() {
    doPost('orders/get', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            cart = `
            <div id="mini-cart" class="mini-cart minicart-arrow-alt">
                <div class="cart-head">
                    <span class="cart-icon"><i style="font-size: xx-large" class="icon-shopping-cart"></i><span
                        style="top: -15px;" class="cart-items">` + json.data.products.length + `</span></span><span
                        class="cart-items-text"><i class="icon-shopping-cart"></i></span>
                </div>`;

            if(json.data.products.length === 0) {
                cart = cart + `
                        <div class="cart-popup widget_shopping_cart">
                            <div class="widget_shopping_cart_content">
                                <div class="total-count text-v-dark clearfix"><span>0 ITEMS</span>
                                    <a class="text-v-dark pull-right text-uppercase translate" key="cart.view" href="#0">` + getKeyFromJson(language, fallbackLanguage, "cart.view") + `</a>
                                </div>
                                <ul class="cart_list product_list_widget scrollbar-inner ">
                                    <li class="woocommerce-mini-cart__empty-message empty translate" key="cart.empty"> 
                                        ` + getKeyFromJson(language, fallbackLanguage, "cart.empty") + `
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
            } else {
                subtotal = 0;
                cart = cart + `
                    <div class="cart-popup widget_shopping_cart" style="width: max-content;">
                        <div class="widget_shopping_cart_content" style="opacity: 1;">
                            <div class="total-count text-v-dark clearfix">
                                <span>` + json.data.products.length + ` ITEM` + (json.data.products.length == 1 ? '' : 'S') + `</span>
                                <a class="text-v-dark pull-right text-uppercase translate" key="cart.view" href="#0">` + getKeyFromJson(language, fallbackLanguage, "cart.view") + `</a>
                            </div>

                            <ul class="cart_list product_list_widget scrollbar-inner ">`;

                for(i = 0; i < json.data.products.length; i = i + 1) {
                    item = json.data.products[i];
                    subtotal = subtotal + item.product.price;
                    
                    cart = cart + `
                        <li class="woocommerce-mini-cart-item mini_cart_item">
                            <div class="product-image">
                                <div class="inner" style="text-align: center">
                                    <a href="/product/` + item.product.id + `_` + item.url_name + `" onclick="event.preventDefault(); navigateToPage('/product/` + item.product.id + `_` + item.url_name + `', 'pages.product', Index_Load);" aria-label="product">
                                        <img width="150" height="150" onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + item.product.id + `/0.png" class="attachment-woocommerce_gallery_thumbnail size-woocommerce_gallery_thumbnail" alt="">
                                    </a>
                                    <a href="javascript:RemoveFromCart(` + json.data.id + `, ` + item.product.id + `);" class="remove remove-product translate" key="cart.delete" aria-label="">
                                        ` + getKeyFromJson(language, fallbackLanguage, "cart.delete") + `
                                    </a>
                                </div>
                            </div>
                            <div class="product-details">
                                <a href="/product/` + item.product.id + `_` + item.url_name + `"
                                onclick="event.preventDefault(); navigateToPage('/product/` + item.product.id + `_` + item.url_name + `', 'pages.product', Index_Load);" class="text-v-dark">` + item.product.name + `</a>
                                <span class="quantity">` + item.amount + ` × 
                                    <span class="woocommerce-Price-amount amount">
                                        <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.product.price) + `</bdi>
                                    </span>
                                </span>
                            </div>
                        </li>`;
                }

                cart = cart + `
                            </ul>

                            <p class="woocommerce-mini-cart__total total">
                                <strong class="translate" key="cart.subtotal">` + getKeyFromJson(language, fallbackLanguage, "cart.subtotal") + `:</strong>
                                <span class="woocommerce-Price-amount amount"><bdi>
                                    <span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(subtotal) + `</bdi>
                                </span>
                            </p>

                            <p class="quantity" style="text-align: center">
                                <bdi class="translate" key="cart.discounts">` + getKeyFromJson(language, fallbackLanguage, "cart.discounts") + `</bdi>
                            </p>

                            <p class="woocommerce-mini-cart__buttons buttons">
                                <a href="#0" class="button wc-forward translate" key="cart.view">` + getKeyFromJson(language, fallbackLanguage, "cart.view") + `</a>
                                <a href="#0" class="button checkout wc-forward translate" key="cart.buy">` + getKeyFromJson(language, fallbackLanguage, "cart.buy") + `</a>
                            </p>
                        </div>
                    </div>`;
            }
            document.getElementById("cart-icon").innerHTML = cart;
        } else if(json.status_code == 400 && json.data.message == "NO_ORDER") {
            document.getElementById("cart-icon").innerHTML = `
                <div id="mini-cart" class="mini-cart minicart-arrow-alt">
                    <div class="cart-head">
                        <span class="cart-icon">
                            <i style="font-size: xx-large" class="icon-shopping-cart"></i>
                            <span style="top: -15px;" class="cart-items">0</span>
                        </span>
                        <span class="cart-items-text">
                            <i class="icon-shopping-cart"></i>
                        </span>
                    </div>
                    <div class="cart-popup widget_shopping_cart">
                        <div class="widget_shopping_cart_content">
                            <div class="total-count text-v-dark clearfix"><span>0 ITEMS</span>
                                <a class="text-v-dark pull-right text-uppercase translate" key="cart.view" href="#0">` + getKeyFromJson(language, fallbackLanguage, "cart.view") + `</a>
                            </div>
                            <ul class="cart_list product_list_widget scrollbar-inner ">
                                <li class="woocommerce-mini-cart__empty-message empty translate" key="cart.empty"> 
                                    ` + getKeyFromJson(language, fallbackLanguage, "cart.empty") + `
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;
        }
    });
}

function RemoveFromCart(orderId, productId) {
    doPost('orders/remove', {
        "order_id": orderId,
        "product_id": productId
    })
    .then((response) => response.json())
    .then((json) => {
        getShoppingCart();
        refreshPage();
    });
}

function AddToCart(button, productId, amount) {
    doPost('orders/buy/' + productId, {
        "amount": amount
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code == 200) button.setAttribute("style", 'background-color: #979696 !important;cursor: not-allowed;');
        getShoppingCart();
    });
}