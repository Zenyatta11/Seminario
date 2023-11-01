
function Product_Load(main) {
    const idRegex = /(\d+)_.*/;

    let productId = 0;
    const url = window.location.pathname;
    const idMatch = idRegex.exec(url);

    if(idMatch) {
        productId = idMatch[1];
    }

    doPost('products/get/', { 
        product_id: productId
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            product = json.data;
            amount = 0;
            
            document.title = product.name;
            setPageSectionHeader(product.name, 'pages.product.info');

            main.innerHTML = `
                <div class="woocommerce-notices-wrapper"></div>
                <div class="product type-product status-publish first instock has-post-thumbnail shipping-taxable purchasable product-type-simple yith-wcbm-product-has-badges product-layout-default">
                    <div class="product-summary-wrap">
                        <div class="row">
                            <div class="summary-before col-md-6">
                                <div class="labels"></div>
                                <div class="product-images images">
                                    <div class="container-image-and-badge">
                                        <div class="product-image-slider owl-carousel show-nav-hover has-ccols ccols-1 owl-loaded owl-drag">
                                            <div class="owl-stage-outer owl-height" style="height: 500.867px;">
                                                <div class="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 435px;">
                                                    <div class="owl-product active" style="width: 435px;">
                                                        <div class="img-thumbnail">
                                                            <div class="inner">
                                                                <img data-lazyloaded="1" onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + product.id + `/0.png"
                                                                    class="wp-post-image entered litespeed-loaded" width="600" height="600">
                                                                <div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:0px;top:0px;height:492.867px;width:426.117px;">
                                                                    <div class="zoomWindowContainer" style="width: 400px;">
                                                                        <div style="z-index: 999; overflow: hidden; margin-left: 0px; margin-top: 0px; background-position: 0px -372.516px; width: 426.117px; height: 492.867px; float: left; cursor: grab; border: 0px solid rgb(136, 136, 136); background-repeat: no-repeat; position: absolute; background-image: url(&quot;https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F.webp&quot;); top: 0px; left: 0px; display: none;"
                                                                            class="zoomWindow">&nbsp;</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ` + (product.offer ? `
                                                    <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23306 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158">
                                                        <div class="yith-wcbm-badge__wrap">
                                                            <div class="yith-wcbm-css-s1"></div>
                                                            <div class="yith-wcbm-css-s2"></div>
                                                            <div class="yith-wcbm-css-text">
                                                                <div class="yith-wcbm-badge-text">` + (Math.floor(parseInt(product.offer) / parseInt(product.price) * 100)) + `% OFF</div>
                                                            </div>
                                                        </div>
                                                    </div>` : ``) + `
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-thumbnails thumbnails">
                                    <div class="product-thumbs-slider owl-carousel has-ccols ccols-4 owl-loaded owl-drag">
                                        <div class="owl-stage-outer">
                                            <div class="owl-stage"
                                                style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 113px; padding-left: 1px; padding-right: 1px;">
                                                <div class="owl-product active selected"
                                                    style="width: 102.25px; margin-right: 8px;">
                                                    <div class="img-thumbnail">
                                                        <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + product.id + `/0.png"
                                                            class="wp-post-image entered litespeed-loaded"
                                                            width="128px" height="128px">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="summary entry-summary col-md-6">
                                <h2 class="product_title entry-title show-product-nav">` + product.name + `</h2>
                                ` + (product.offer ? `
                                <p class="price">
                                    <span class="woocommerce-Price-discount amount">
                                        <span>
                                            <bdi>
                                                <span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(product.price) + `
                                            </bdi>
                                        </span>
                                    </span>
                                </p>
                                <p class="price">
                                    <span class="woocommerce-Price-amount amount">
                                        <span>
                                            <bdi>
                                                <span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(product.offer) + `
                                            </bdi>
                                        </span>
                                    </span>
                                </p>` : `
                                <p class="price">
                                    <span class="woocommerce-Price-amount amount">
                                        <span>
                                            <bdi>
                                                <span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(product.price) + `
                                            </bdi>
                                        </span>
                                    </span>
                                </p>`) + `

                                <div class="description woocommerce-product-details__short-description">
                                    <p>&nbsp;</p>
                                </div>
                                <div class="product_meta">
                                    <span class="product-stock in-stock"><span class="translate" key="pages.product.stock">Disponibilidad</span>: <span class="stock attribute">` + product.stock + ` <span class="translate attribute" key="pages.product.stocktext">Unidades Disponibles</span></span></span>
                                    <span class="sku_wrapper"><span>ID</span>: <span class="sku attribute">` + product.id + `</span></span>
                                    <span class="posted_in"><span class="translate" key="pages.product.category">Categoría</span>: ` + CategoryUrl(product.category.id, product.category.name, `attribute`) + `</span>
                                    ` + (product.subcategory ? `<span class="posted_in"><span class="translate" key="pages.product.subcategory">Subcategoría</span>: ` + SubcategoryUrl(product.category.id, product.category.name, product.subcategory.id, product.subcategory.name, `attribute`) + `</span>` : ``) + `
                                </div>
                                <div id="product-quantity-buttons" style="width: 100%;" class="quantity buttons_added"></div>
                            </div>
                        </div>
                    </div>
                    <div class="woocommerce-tabs woocommerce-tabs-pgrjn2ug resp-htabs" id="product-tab"
                        style="display: block; width: 100%;">
                        <ul class="resp-tabs-list" role="tablist">
                            <li class="description_tab resp-tab-product resp-tab-active" id="tab-title-description" onclick="toggleTab(this);"><span class="translate" key="pages.product.description">Disponibilidad</span></li>
                            <li class="additional_information_tab resp-tab-product" id="tab-title-additional_information" onclick="toggleTab(this);"><span class="translate" key="pages.product.reviews.title">Disponibilidad</span></li>
                            <li class="product_enquiry_tab resp-tab-product" id="tab-title-product_enquiry" onclick="toggleTab(this);"><span class="translate" key="pages.product.questions.title">Consulta de Producto</span></li>
                        </ul>

                        <div class="resp-tabs-container">
                            <h2 class="resp-accordion resp-tab-active">
                                <span class="resp-arrow"></span>
                                <span class="translate" key="pages.product.description">Descripción</span></h2>
                            <div class="tab-content resp-tab-content resp-tab-content-active" id="tab-description">
                                <h2><span class="translate" key="pages.product.description">Descripción</span></h2>
                                <p><strong>` + product.name + `</strong></p>
                                <p>` + product.description + `</p>
                                <hr>
                                <h2><span class="translate" key="pages.product.specifications">Información Adicional</span></h2>
                                <table class="woocommerce-product-attributes shop_attributes table table-striped">
                                    <tbody>
                                        <tr
                                            class="woocommerce-product-attributes-product woocommerce-product-attributes-product--weight">
                                            <th class="woocommerce-product-attributes-json.data__label"><span class="translate" key="pages.product.weight">Disponibilidad</span></th>
                                            <td class="woocommerce-product-attributes-json.data__value">` + product.weight + ` kg</td>
                                        </tr>
                                        <tr
                                            class="woocommerce-product-attributes-product woocommerce-product-attributes-product--dimensions">
                                            <th class="woocommerce-product-attributes-json.data__label"><span class="translate" key="pages.product.size">Disponibilidad</span></th>
                                            <td class="woocommerce-product-attributes-json.data__value">
                                                ` + product.dimensions.length + ` × 
                                                ` + product.dimensions.width + ` × 
                                                ` + product.dimensions.height + ` cm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h2 class="resp-accordion" role="tab">
                                <span class="resp-arrow"></span>
                                <span class="translate" key="pages.product.questions.title">Consulta de Producto</span>
                            </h2>
                            <h2 class="resp-accordion" role="tab">
                                <span class="resp-arrow"></span>
                                <span class="translate" key="pages.product.reviews.title">Reseñas</span>
                            </h2>
                            <div class="tab-content resp-tab-content" id="tab-additional_information">
                                <h2><span class="translate" key="pages.product.description">Descripción</span></h2>
                                <p><strong>` + product.name + `</strong></p>
                                <p>` + product.description + `</p>
                                <hr>
                                <h2><span class="translate" key="pages.product.reviews.title">Información Adicional</span></h2>
                                <table class="woocommerce-product-attributes shop_attributes table table-striped">
                                    <tbody>
                                        <tr class="woocommerce-product-attributes-product woocommerce-product-attributes-product--weight">
                                            <td colspan="2" class="woocommerce-product-attributes-json.data__value translate" key="pages.product.reviews.none">No hay reseñas para mostrar.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-content resp-tab-content" id="tab-product_enquiry">
                                <h2><span class="translate" key="pages.product.description">Descripción</span></h2>
                                <p><strong>` + product.name + `</strong></p>
                                <p>` + product.description + `</p>
                                <hr>
                                <h2><span class="translate" key="pages.product.questions.title">Información Adicional</span></h2>
                                <table class="woocommerce-product-attributes shop_attributes table table-striped">
                                    <tbody>
                                        <tr class="woocommerce-product-attributes-product woocommerce-product-attributes-product--weight">
                                            <td colspan="2" class="woocommerce-product-attributes-json.data__value translate" key="pages.product.questions.none">No hay consultas para mostrar.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h2 class="resp-accordion" role="tab" aria-controls="tab_json.data-1">
                                <span class="resp-arrow"></span>
                                <span class="translate" key="pages.product.reviews.title">Reseñas</span>
                            </h2>
                            <div class="tab-content resp-tab-content" id="tab-product_enquiry" aria-labelledby="tab_json.data-2">
                                <h2><span class="translate" key="pages.product.reviews.title">Reseñas</span></h2>
                            </div>
                        </div>
                    </div>
                </div>`;

            loadProductCartButtons(product.id, product.stock, product.price);
            toggleTab(document.getElementById("tab-title-description"));
            parseTranslations();
        }
    });
}

function toggleTab(caller) {
    tabs = [
        document.getElementById("tab-title-description"),
        document.getElementById("tab-title-additional_information"),
        document.getElementById("tab-title-product_enquiry")
    ]

    tabContents = [
        document.getElementById("tab-description"),
        document.getElementById("tab-additional_information"),
        document.getElementById("tab-product_enquiry")
    ]

    for(i = 0; i < 3; i = i + 1) {
        if(tabs[i] == caller) {
            tabs[i].classList.add("resp-tab-active");
            tabs[i].classList.add("resp-tab-content-active");
            tabContents[i].classList.add("resp-tab-content-active");
            tabContents[i].classList.add("resp-tab-active");
        } else {
            tabs[i].classList.remove("resp-tab-active");
            tabs[i].classList.remove("resp-tab-content-active");
            tabContents[i].classList.remove("resp-tab-content-active");
            tabContents[i].classList.remove("resp-tab-active");
        }
    }
}

function loadProductCartButtons(productId, productStock) {
    doPost('orders/check/', { 
        product_id: productId
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            amount = json.data.amount;
            orderId = json.data.order_id;

            container = document.getElementById("product-quantity-buttons");
            styleDisabled = `background-color: #979696 !important; cursor: not-allowed;`;

            if(amount == -1) {
                container.innerHTML = `
                    <a style="height: 36px; width: 100%;" href="javascript:;" onclick="ProductAddToCart(` + productId + `, ` + productStock + `);"
                        class="viewcart-style-3 button product_type_simple buy_now"
                        rel="nofollow"><i class="icon-shopping-cart"></i><span class="translate" key="pages.product.buy">Disponibilidad</span></a>`;
            } else {
                container.innerHTML = `
                    <button style="" id="product-sub_` + productId + `" type="button" value="-" class="minus" onclick="ProductSubAmount(` + orderId + `, ` + productId + `, ` + productStock + `);">-</button>
                    <input id="product-qty_` + productId + `" class="qty" disabled="" value="` + amount + `" type="number" max="` + productStock + `">
                    <input id="product-stock_` + productId + `" type="hidden" value="` + productStock + `">
                    <button style="` + (productStock > amount ? `` : styleDisabled) + `" id="product-add_` + productId + `" type="button" value="+" class="plus" onclick="ProductAddAmount(` + productId + `, ` + productStock + `);">+</button>`;
            }
        }

        parseTranslations();
    });
}

function ProductAddToCart(productId, productStock) {
    doPost('orders/buy/' + productId, {
        "amount": 1
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code == 200 && json.data !== false) {
            loadProductCartButtons(productId, productStock);
        }
        getShoppingCart();
    });
}

function ProductSubAmount(orderId, productId, productStock) {
    if(document.getElementById("product-sub_" + productId).getAttribute("style") != '') return;
        
    quantityBox = document.getElementById("product-qty_" + productId);
    amount = parseInt(quantityBox.value);

    document.getElementById("product-add_" + productId).setAttribute("style", 'background-color: #979696 !important;cursor: not-allowed;');
    document.getElementById("product-sub_" + productId).setAttribute("style", 'background-color: #979696 !important;cursor: not-allowed;');

    if(amount == 1) {
        doPost('orders/remove', {
            "order_id": orderId,
            "product_id": productId
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status_code == 200) {
                getShoppingCart()
            }

            loadProductCartButtons(productId, productStock)
        });
    } else {
        doPost('orders/buy/' + productId, {
            "amount": (amount - 1)
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status_code == 200) {
                getShoppingCart()
            }

            loadProductCartButtons(productId, productStock)
        });
    }
}

function ProductAddAmount(productId, productStock) {
    if(document.getElementById("product-add_" + productId).getAttribute("style") != '') return;

    quantityBox = document.getElementById("qty_" + productId);
    amount = parseInt(quantityBox.value);

    document.getElementById("product-add_" + productId).setAttribute("style", 'background-color: #979696 !important; cursor: not-allowed;');
    document.getElementById("product-sub_" + productId).setAttribute("style", 'background-color: #979696 !important; cursor: not-allowed;');

    doPost('orders/buy/' + productId, {
        "amount": (amount + 1)
    })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code == 200) {
            getShoppingCart()
        }

        loadProductCartButtons(productId, productStock)
    });
}
