
function getShoppingCart() {
    doPost('orders/get', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            cart = `
            <div id="mini-cart" class="mini-cart minicart-arrow-alt">
                <div class="cart-head">
                    <span class="cart-icon"><i style="font-size: xx-large" class="icon-shopping-cart"></i><span
                        style="top: -15px;" id="cart-items-count" class="cart-items">` + json.data.products.length + `</span></span><span
                        class="cart-items-text"><i class="icon-shopping-cart"></i></span>
                </div>`;

            if(json.data.products.length === 0) {
                cart = cart + `
                        <div id="cart-content" class="cart-popup widget_shopping_cart">
                            <div class="widget_shopping_cart_content">
                                <div class="total-count text-v-dark clearfix"><span id="cart-items-count-text">0 ITEMS</span>
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
                    <div id="cart-content" class="cart-popup widget_shopping_cart" style="width: max-content;">
                        <div class="widget_shopping_cart_content" style="opacity: 1;">
                            <div class="total-count text-v-dark clearfix">
                                <span id="cart-items-count-text">` + json.data.products.length + ` ITEM` + (json.data.products.length == 1 ? '' : 'S') + `</span>
                                <a class="text-v-dark pull-right text-uppercase translate" key="cart.view" href="#0">` + getKeyFromJson(language, fallbackLanguage, "cart.view") + `</a>
                            </div>

                            <ul class="cart_list product_list_widget scrollbar-inner ">`;

                for(i = 0; i < json.data.products.length; i = i + 1) {
                    item = json.data.products[i];
                    subtotal = subtotal + (item.product.price * item.amount);
                    
                    cart = cart + `
                        <li id="cart-item_` + item.product.id + `" class="woocommerce-mini-cart-item mini_cart_item">
                            <div class="product-image">
                                <div class="inner" style="text-align: center">
                                    ` + ProductUrl(item.product.id, item.product.name, `<img width="150" height="150" onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + item.product.id + `/0.png" class="attachment-woocommerce_gallery_thumbnail size-woocommerce_gallery_thumbnail" alt="">`, false) + `
                                    <a href="javascript:;" onclick="RemoveFromCart(` + json.data.id + `, ` + item.product.id + `);" class="remove remove-product translate" key="cart.delete" aria-label="">
                                        ` + getKeyFromJson(language, fallbackLanguage, "cart.delete") + `
                                    </a>
                                </div>
                            </div>
                            <div class="product-details">
                                <div>
                                ` + ProductUrl(item.product.id, item.product.name, item.product.name, ``) + `
                                    <span id="shown_qty_` + item.product.id + `" class="quantity">` + item.amount + ` × 
                                        <span class="woocommerce-Price-amount amount">
                                            <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.product.price) + `</bdi>
                                        </span>
                                    </span>
                                </div>
                                <div class="quantity buttons_added">
                                    <button style="" id="sub_` + item.product.id + `" type="button" value="-" class="minus" onclick="SubAmount(` + json.data.id + `, ` + item.product.id + `, ` + item.product.price + `);">-</button>
                                    <input id="qty_` + item.product.id + `" class="qty" disabled="" value="` + item.amount + `" type="number" max="` + item.product.stock + `">
                                    <input id="stock_` + item.product.id + `" type="hidden" value="` + item.product.stock + `">
                                    <button style="` + (item.product.stock > item.amount ? `` : `background-color: #979696 !important; cursor: not-allowed;`) + `" id="add_` + item.product.id + `" type="button" value="+" class="plus" onclick="AddAmount(` + item.product.id + `, ` + item.product.price + `);">+</button>
                                </div>
                            </div>
                        </li>`;
                }

                cart = cart + `
                            </ul>

                            <p class="woocommerce-mini-cart__total total">
                                <strong class="translate" key="cart.subtotal">` + getKeyFromJson(language, fallbackLanguage, "cart.subtotal") + `:</strong>
                                <span class="woocommerce-Price-amount amount"><bdi id="cart-subtotal">
                                    <span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(subtotal) + `</bdi>
                                </span>
                            </p>

                            <p class="quantity" style="text-align: center">
                                <bdi class="translate" key="cart.discounts">` + getKeyFromJson(language, fallbackLanguage, "cart.discounts") + `</bdi>
                            </p>

                            <p class="woocommerce-mini-cart__buttons buttons">
                                <a href="#0" class="button wc-forward translate" key="cart.view">` + getKeyFromJson(language, fallbackLanguage, "cart.view") + `</a>
                                <a href="javascript:;" onclick="CartDoCheckout()" class="button checkout wc-forward translate" key="cart.buy">` + getKeyFromJson(language, fallbackLanguage, "cart.buy") + `</a>
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
                            <div class="total-count text-v-dark clearfix"><span id="cart-items-count-text">0 ITEMS</span>
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

function updateCart() {
    doPost('orders/get', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            document.getElementById("cart-items-count").innerHTML = json.data.products.length;
            document.getElementById("cart-items-count-text").innerHTML = json.data.products.length + ` ITEM` + (json.data.products.length == 1 ? '' : 'S');

            if(json.data.products.length === 0) {
                document.getElementById("cart-content").innerHTML = `
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
                        </div>`;
            } else {
                subtotal = 0;
                
                for(i = 0; i < json.data.products.length; i = i + 1) {
                    item = json.data.products[i];
                    subtotal = subtotal + (item.product.price * item.amount);
                }

                document.getElementById("cart-subtotal").innerHTML = '<span class="woocommerce-Price-currencySymbol">$</span>' + parsePrice(subtotal);
            }
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
        if(json.status_code == 200) {
            document.getElementById("cart-item_" + productId).remove();
            updateCart();
        }

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

function SubAmount(orderId, productId, price) {
    if(document.getElementById("sub_" + productId).getAttribute("style") != '') return;
    
    quantityBox = document.getElementById("qty_" + productId);
    quantityDiv = document.getElementById("shown_qty_" + productId);
    amount = parseInt(quantityBox.value);

    document.getElementById("add_" + productId).setAttribute("style", 'background-color: #979696 !important;cursor: not-allowed;');
    document.getElementById("sub_" + productId).setAttribute("style", 'background-color: #979696 !important;cursor: not-allowed;');

    if(amount == 1) {
        doPost('orders/remove', {
            "order_id": orderId,
            "product_id": productId
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status_code == 200) {
                document.getElementById("cart-item_" + productId).remove();
                updateCart();
            }
    
            refreshPage();
        });
    } else {
        doPost('orders/buy/' + productId, {
            "amount": (amount - 1)
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status_code == 200) {
                quantityBox.value = amount - 1;
                quantityDiv.innerHTML = `
                    ` + (amount - 1) + ` × 
                    <span class="woocommerce-Price-amount amount">
                        <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(price) + `</bdi>
                    </span>`;

                document.getElementById("add_" + productId).setAttribute("style", '');
                document.getElementById("sub_" + productId).setAttribute("style", '');
                updateCart();
                refreshPage();
            }
        });
    }
}

function AddAmount(id, price) {
    if(document.getElementById("add_" + id).getAttribute("style") != '') return;

    quantityBox = document.getElementById("qty_" + id);
    quantityDiv = document.getElementById("shown_qty_" + id);
    amount = parseInt(quantityBox.value);

    document.getElementById("add_" + id).setAttribute("style", 'background-color: #979696 !important; cursor: not-allowed;');
    document.getElementById("sub_" + id).setAttribute("style", 'background-color: #979696 !important; cursor: not-allowed;');

    doPost('orders/buy/' + id, {
        "amount": (amount + 1)
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code == 200) {
            quantityBox.value = amount + 1;
            quantityDiv.innerHTML = `
                ` + (amount + 1) + ` × 
                <span class="woocommerce-Price-amount amount">
                    <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(price) + `</bdi>
                </span>`;
            
            if(parseInt(document.getElementById("stock_" + id).value) > (amount + 1)) document.getElementById("add_" + id).setAttribute("style", '');
            document.getElementById("sub_" + id).setAttribute("style", '');
            updateCart();
            refreshPage();
        }
    });
}

function CartDoCheckout() {
    doPost('orders/checkout/', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code == 200) window.location = json.data;
    });
}