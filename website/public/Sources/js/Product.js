
function Product_Load(main) {
    setPageSectionHeader('pages.catalog', 'pages.catalog');

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
                                                    <div class="owl-json.data active" style="width: 435px;">
                                                        <div class="img-thumbnail">
                                                            <div class="inner">
                                                                <img data-lazyloaded="1" onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + json.data.id + `/0.png"
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
                                                    <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23306 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158">
                                                        <div class="yith-wcbm-badge__wrap">
                                                            <div class="yith-wcbm-css-s1"></div>
                                                            <div class="yith-wcbm-css-s2"></div>
                                                            <div class="yith-wcbm-css-text">
                                                                <div class="yith-wcbm-badge-text">20% OFF</div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                <div class="owl-json.data active selected"
                                                    style="width: 102.25px; margin-right: 8px;">
                                                    <div class="img-thumbnail">
                                                        <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + json.data.id + `/0.png"
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
                                <h2 class="product_title entry-title show-product-nav">Product Name</h2>
                                <p class="price"><span class="woocommerce-Price-amount amount">
                                    <span>
                                        <bdi>
                                            <span class="woocommerce-Price-currencySymbol">$</span>21,429
                                        </bdi>
                                    </span>
                                </p>
                                <div class="description woocommerce-product-details__short-description">
                                    <p>&nbsp;</p>
                                </div>
                                <div class="product_meta">
                                    <span class="product-stock in-stock">Disponibilidad: <span class="stock">` + json.data.stock + ` Unidades Disponibles</span></span>
                                    <span class="sku_wrapper">ID: <span class="sku">` + json.data.id + `</span></span>
                                    <span class="posted_in">Categoría: ` + CategoryUrl(json.data.category.id, json.data.category.name) + `</span>
                                    ` + (json.data.subcategory ? `<span class="posted_in">Subcategoría: ` + SubcategoryUrl(json.data.category.id, json.data.category.name, json.data.subcategory.id, json.data.subcategory.name) + `</span>` : ``) + `
                                </div>
                                <div class="cart">
                                    <div class="quantity hidden buttons_added"><button type="button" value="-" class="minus">-</button>
                                        <input type="hidden" id="quantity_650b25d859811" class="qty" name="quantity" value="1"><button type="button" value="+" class="plus">+</button>
                                    </div>
                                    <button type="submit" name="add-to-cart" value="23306" class="single_add_to_cart_button button alt">Añadir al carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="woocommerce-tabs woocommerce-tabs-pgrjn2ug resp-htabs" id="product-tab"
                        style="display: block; width: 100%;">
                        <ul class="resp-tabs-list" role="tablist">
                            <li class="description_tab resp-tab-json.data resp-tab-active" id="tab-title-description" role="tab" aria-controls="tab_json.data-0">Descripción</li>
                            <li class="additional_information_tab resp-tab-json.data" id="tab-title-additional_information" role="tab" aria-controls="tab_json.data-1">Información adicional</li>
                            <li class="product_enquiry_tab resp-tab-json.data" id="tab-title-product_enquiry" role="tab" aria-controls="tab_json.data-2">Consulta de Producto</li>
                        </ul>

                        <div class="resp-tabs-container">
                            <h2 class="resp-accordion resp-tab-active" role="tab" aria-controls="tab_json.data-0"><span
                                    class="resp-arrow"></span>
                                Descripción</h2>
                            <div class="tab-content resp-tab-content resp-tab-content-active" id="tab-description"
                                aria-labelledby="tab_json.data-0" style="display:block">
                                <h2>Descripción</h2>
                                <p><strong>Product Name</strong></p>
                                <p>Full product description</p>
                            </div>
                            <h2 class="resp-accordion" role="tab" aria-controls="tab_json.data-1">
                                <span class="resp-arrow"></span>
                                Información adicional
                            </h2>
                            <div class="tab-content resp-tab-content" id="tab-additional_information"
                                aria-labelledby="tab_json.data-1">
                                <h2>Información adicional</h2>
                                <table class="woocommerce-product-attributes shop_attributes table table-striped">
                                    <tbody>
                                        <tr
                                            class="woocommerce-product-attributes-json.data woocommerce-product-attributes-json.data--weight">
                                            <th class="woocommerce-product-attributes-json.data__label">Peso</th>
                                            <td class="woocommerce-product-attributes-json.data__value">0.5 kg</td>
                                        </tr>
                                        <tr
                                            class="woocommerce-product-attributes-json.data woocommerce-product-attributes-json.data--dimensions">
                                            <th class="woocommerce-product-attributes-json.data__label">Dimensiones</th>
                                            <td class="woocommerce-product-attributes-json.data__value">110 × 10 × 10 cm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h2 class="resp-accordion" role="tab" aria-controls="tab_json.data-2">
                                <span class="resp-arrow"></span>
                                Consulta de Producto
                            </h2>
                            <div class="tab-content resp-tab-content" id="tab-product_enquiry" aria-labelledby="tab_json.data-2">
                                <h2>Consulta de Producto</h2>
                                <form action="" method="post" id="product_enquiry_form">
                                    <p class="form-row form-row-first">
                                        <label for="product_enquiry_name">Nombre</label>
                                        <input type="text" class="input-text" name="product_enquiry_name"
                                            id="product_enquiry_name" placeholder="Su nombre" value="">
                                    </p>
                                    <p class="form-row form-row-last">
                                        <label for="product_enquiry_email">Email</label>
                                        <input type="text" class="input-text" name="product_enquiry_email"
                                            id="product_enquiry_email" placeholder="you@yourdomain.com" value="">
                                    </p>
                                    <div class="clear"></div>
                                    <p class="form-row notes">
                                        <label for="product_enquiry_message">Consulta</label><textarea class="input-text"
                                            name="product_enquiry_message" id="product_enquiry_message" rows="5" cols="20"
                                            placeholder="En que podemos ayudarte?"></textarea>
                                    </p>
                                    <div class="clear"></div>
                                    <p class="product_enquiry_button_container">
                                        <input type="hidden" name="product_id" value="23306">
                                        <input type="submit" id="send_product_enquiry" value="Enviar consulta"
                                            class="button">
                                    </p>
                                </form>
                            </div>
                            <h2 class="resp-accordion" role="tab" aria-controls="tab_json.data-1">
                                <span class="resp-arrow"></span>
                                Reseñas
                            </h2>
                            <div class="tab-content resp-tab-content" id="tab-product_enquiry" aria-labelledby="tab_json.data-2">
                                <h2>Reseñas</h2>
                                <form action="" method="post" id="product_enquiry_form">
                                    <p class="form-row form-row-first">
                                        <label for="product_enquiry_name">Nombre</label>
                                        <input type="text" class="input-text" name="product_enquiry_name"
                                            id="product_enquiry_name" placeholder="Su nombre" value="">
                                    </p>
                                    <p class="form-row form-row-last">
                                        <label for="product_enquiry_email">Email</label>
                                        <input type="text" class="input-text" name="product_enquiry_email"
                                            id="product_enquiry_email" placeholder="you@yourdomain.com" value="">
                                    </p>
                                    <div class="clear"></div>
                                    <p class="form-row notes">
                                        <label for="product_enquiry_message">Consulta</label><textarea class="input-text"
                                            name="product_enquiry_message" id="product_enquiry_message" rows="5" cols="20"
                                            placeholder="En que podemos ayudarte?"></textarea>
                                    </p>
                                    <div class="clear"></div>
                                    <p class="product_enquiry_button_container">
                                        <input type="hidden" name="product_id" value="23306">
                                        <input type="submit" id="send_product_enquiry" value="Enviar consulta"
                                            class="button">
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`;
            parseTranslations();
        }
    });
}

function toggleTab(caller) {
    console.log(caller);

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
            tabContents[i].classList.add("resp-tab-active");
        } else {
            tabs[i].classList.remove("resp-tab-active");
            tabContents[i].classList.remove("resp-tab-active");
        }
    }
}
