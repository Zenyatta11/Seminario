
function Product_Load(main) {
    setPageSectionHeader('pages.catalog', 'pages.catalog');

    const subcategoryRegex = /(\d+)-(\d+)_.*/;
    const categoryRegex = /(\d+)_.*/;

    /*let filter = 'all';
    const url = window.location.pathname;
    const subcategoryAndCategoryMatch = subcategoryRegex.exec(url);

    if(subcategoryAndCategoryMatch) {
        filter = subcategoryAndCategoryMatch[0];
    } else {
        const categoryMatch = categoryRegex.exec(url);

        if(categoryMatch) filter = categoryMatch[0];
        else if(url == "/catalog/offers") filter = "offers";
        else if(url == "/catalog/featured") filter = "featured";
    }

    doPost('products/get/' + filter, { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            more = getKeyFromJson(language, fallbackLanguage, "product.more");
            buy = getKeyFromJson(language, fallbackLanguage, "product.buy");
            
            if(json.data.category != undefined) {
                categoryTitle = " - " + json.data.category.name;
                subcategoryTitle = "";
            } else if(json.data.subcategory != undefined) {
                categoryTitle = " - " + json.data.subcategory.category.name;
                subcategoryTitle = " - " + json.data.subcategory.name;
            } else if(url == "/catalog/offers"){
                categoryTitle = " - " + getKeyFromJson(language, fallbackLanguage, "index.offers");
                subcategoryTitle = "";
            } else if(url == "/catalog/featured"){
                categoryTitle = " - " + getKeyFromJson(language, fallbackLanguage, "index.featured");
                subcategoryTitle = "";
            } else {
                categoryTitle = "";
                subcategoryTitle = "";
            }

            i = 0;
            list = `
                <div class="slider-wrapper">
                    <div class="woocommerce columns-4 ">
                        <ul class="products products-container products-slider owl-carousel show-nav-middle pcols-lg-4 pcols-md-3 pcols-xs-3 pcols-ls-2 pwidth-lg-4 pwidth-md-3 pwidth-xs-2 pwidth-ls-1 is-shortcode owl-loaded owl-drag">
                            <div class="owl-stage-outer owl-height" style="height: 389.55px;">
                                <div id="page-catalog" class="owl-stage" style="transition: all 0.25s ease 0s; width: 3720px;">`;
            

            if(url == "/catalog/offers" || url == "/catalog/featured") json.data.products = json.data;

            json.data.products.forEach((item) => {
                list = list + `
                <div class="owl-item active" style="width: 232.5px;">
                    <li class="product-col product-default show-links-hover product type-product post-23297 status-publish instock product_cat-pesca-monofilamento-y-multifilamento product_tag-galan has-post-thumbnail shipping-taxable product-type-simple yith-wcbm-product-has-badges">
                        <div class="product-inner">
                            <div class="product-image">
                                <a href="/product/` + item.product_id + `_` + item.url_name + `"
                                    onclick="event.preventDefault(); navigateToPage('/product/` + item.product_id + `_` + item.url_name + `', 'pages.product', Index_Load);">
                                    <div class="inner">
                                        <div class="container-image-and-badge  ">
                                            <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + item.product_id + `/0.png"
                                                class="wp-post-image entered litespeed-loaded"
                                                width="600" height="600">
                                            ` + (item.offer != null && (item.start_date === null || new Date(item.start_date) < new Date())? `
                                            <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23297 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158">
                                                <div class="yith-wcbm-badge__wrap">
                                                    <div class="yith-wcbm-css-text">
                                                        <div class="yith-wcbm-badge-text">` + Math.floor(parseInt(item.offer) / parseInt(item.price) * 100) + `% OFF!</div>
                                                    </div>
                                                </div>
                                            </div>` : ``) + `
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div class="product-content">
                                <span class="category-list">
                                    <a href="/catalog/` + item.category_id + `_` + item.category_url_name + `"
                                        onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `_` + item.category_url_name + `', 'pages.catalog', Catalog_Load);">` + item.category + `</a></span>
                                <a class="product-loop-title" href="/product/` + item.product_id + `_` + item.url_name + `"
                                    onclick="event.preventDefault(); navigateToPage('/product/` + item.product_id + `_` + item.url_name + `', 'pages.product', Index_Load);">
                                    <h3 class="woocommerce-loop-product__title">` + item.name + `</h3>
                                </a>
                                
                                ` + (item.offer != null && (item.start_date === null || new Date(item.start_date) < new Date()) ? `
                                <span class="price">
                                    <del aria-hidden="true">
                                        <span class="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.price) + `
                                            </bdi>
                                        </span>
                                    </del>
                                    <ins>
                                        <span class="woocommerce-Price-amount amount">
                                            <bdi>
                                                <span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.offer) + `
                                            </bdi>
                                        </span>
                                    </ins>
                                </span>` : `<span class="price"><strong>$` + parsePrice(item.price) + `</strong></span>` ) + `

                                <div class="add-links-wrap">
                                    <div class="add-links no-effect clearfix">
                                        <a href="#0"
                                            class="viewcart-style-3 button product_type_simple view"
                                            rel="nofollow"><i class="icon-search"></i><span class="translate" key="product.more">` + more + `</span></a>
                                        <a href="javascript:;" onclick="AddToCart(this, ` + item.product_id + `, 1);"
                                            class="viewcart-style-3 button product_type_simple buy_now"
                                            rel="nofollow"><i class="icon-shopping-cart"></i><span class="translate" key="product.buy">` + buy + `</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>`;

                i = i + 1;

                if(i == 4) {
                    i = 0;
                    list = list + `
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div class="slider-wrapper">
                            <div class="woocommerce columns-4 ">
                                <ul class="products products-container products-slider owl-carousel show-nav-middle pcols-lg-4 pcols-md-3 pcols-xs-3 pcols-ls-2 pwidth-lg-4 pwidth-md-3 pwidth-xs-2 pwidth-ls-1 is-shortcode owl-loaded owl-drag">
                                    <div class="owl-stage-outer owl-height" style="height: 389.55px;">
                                        <div id="page-catalog" class="owl-stage" style="transition: all 0.25s ease 0s; width: 3720px;">`;
                }
            });

            if(i != 0) 
                list = list + `
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>`;

            main.innerHTML = `
                <div data-elementor-type="wp-page" data-elementor-id="133" class="elementor elementor-133">
                    <section
                        class="elementor-section elementor-top-section elementor-element elementor-element-19843752 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
                        data-id="19843752" data-element_type="section">
                        <div class="elementor-container elementor-column-gap-default">
                            <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-66021e7a"
                                data-id="66021e7a" data-element_type="column">
                                <div class="elementor-widget-wrap elementor-element-populated e-swiper-container">
                                    <div class="elementor-element elementor-element-2d501f33 elementor-widget elementor-widget-text-editor"
                                        data-id="2d501f33" data-element_type="widget" data-widget_type="text-editor.default">
                                        <div class="elementor-widget-container">
                                            <p></p>
                                            <div id="porto-products-8858" class="porto-products wpb_content_element ">
                                                <h2 class="section-title slider-title"><span class="inline-title translate" key="index.catalog">placeholder</span>
                                                <span class="inline-title">` + categoryTitle + `</span>
                                                <span class="inline-title">` + subcategoryTitle + `</span>
                                                <span class="line"></span></h2>
                                                ` + list + `
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>`;
            
            parseTranslations();
        }
    });*/

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
                                                <div class="owl-item active" style="width: 435px;">
                                                    <div class="img-thumbnail">
                                                        <div class="inner">
                                                            <img data-lazyloaded="1" onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/50/0.png"
                                                                class="wp-post-image entered litespeed-loaded" width="600" height="600">
                                                            <div class="zoomContainer"
                                                                style="-webkit-transform: translateZ(0);position:absolute;left:0px;top:0px;height:492.867px;width:426.117px;">
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
                                            <div class="owl-item active selected"
                                                style="width: 102.25px; margin-right: 8px;">
                                                <div class="img-thumbnail">
                                                    <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/50/0.png"
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
                                <p style="background: #636363;color: white;margin-top: -20px;font-weight: bold;text-transform: uppercase;text-align: left;padding: 7px;max-width: 249px">
                                    Abonando en Efectivo 15% OFF
                                </p>
                                    <span class="product-stock in-stock">Disponibilidad: <span class="stock">80 Unidades</span></span>
                                <span class="sku_wrapper">ID: <span class="sku">50</span></span>
                                <span class="posted_in">Categoría: <a href="/catalog/` + item.category_id + `_` + item.category_url_name + `"
                                        onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `_` + item.category_url_name + `', 'pages.catalog', Catalog_Load);">` + item.category + `</a></span>
                                <span class="posted_in">Subcategoría: <a href="/catalog/` + item.category_id + `-` + subitem.subcategory_id + `_` + item.url_name + `-` + subitem.url_name + `"
                                        onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `-` + subitem.subcategory_id + `_` + item.url_name + `-` + subitem.url_name + `', 'pages.catalog', Catalog_Load);">` + subitem.name + `</a></span>
                            </div>
                            <div class="cart">
                                <div class="quantity hidden buttons_added"><button type="button" value="-"
                                        class="minus">-</button>
                                    <input type="hidden" id="quantity_650b25d859811" class="qty" name="quantity"
                                        value="1"><button type="button" value="+" class="plus">+</button>
                                </div>
                                <button type="submit" name="add-to-cart" value="23306"
                                    class="single_add_to_cart_button button alt">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="woocommerce-tabs woocommerce-tabs-pgrjn2ug resp-htabs" id="product-tab"
                    style="display: block; width: 100%;">
                    <ul class="resp-tabs-list" role="tablist">
                        <li class="description_tab resp-tab-item resp-tab-active" id="tab-title-description" role="tab"
                            aria-controls="tab_item-0">
                            Descripción</li>
                        <li class="additional_information_tab resp-tab-item" id="tab-title-additional_information"
                            role="tab" aria-controls="tab_item-1">
                            Información adicional</li>
                        <li class="product_enquiry_tab resp-tab-item" id="tab-title-product_enquiry" role="tab"
                            aria-controls="tab_item-2">
                            Consulta de Producto</li>
                    </ul>
                    <div class="resp-tabs-container">
                        <h2 class="resp-accordion resp-tab-active" role="tab" aria-controls="tab_item-0"><span
                                class="resp-arrow"></span>
                            Descripción</h2>
                        <div class="tab-content resp-tab-content resp-tab-content-active" id="tab-description"
                            aria-labelledby="tab_item-0" style="display:block">
                            <h2>Descripción</h2>
                            <p><strong>Product Name</strong></p>
                            <p>Full product description</p>
                        </div>
                        <h2 class="resp-accordion" role="tab" aria-controls="tab_item-1">
                            <span class="resp-arrow"></span>
                            Información adicional
                        </h2>
                        <div class="tab-content resp-tab-content" id="tab-additional_information"
                            aria-labelledby="tab_item-1">
                            <h2>Información adicional</h2>
                            <table class="woocommerce-product-attributes shop_attributes table table-striped">
                                <tbody>
                                    <tr
                                        class="woocommerce-product-attributes-item woocommerce-product-attributes-item--weight">
                                        <th class="woocommerce-product-attributes-item__label">Peso</th>
                                        <td class="woocommerce-product-attributes-item__value">0.5 kg</td>
                                    </tr>
                                    <tr
                                        class="woocommerce-product-attributes-item woocommerce-product-attributes-item--dimensions">
                                        <th class="woocommerce-product-attributes-item__label">Dimensiones</th>
                                        <td class="woocommerce-product-attributes-item__value">110 × 10 × 10 cm</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h2 class="resp-accordion" role="tab" aria-controls="tab_item-2">
                            <span class="resp-arrow"></span>
                            Consulta de Producto
                        </h2>
                        <div class="tab-content resp-tab-content" id="tab-product_enquiry" aria-labelledby="tab_item-2">
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
                        <h2 class="resp-accordion" role="tab" aria-controls="tab_item-1">
                            <span class="resp-arrow"></span>
                            Reseñas
                        </h2>
                        <div class="tab-content resp-tab-content" id="tab-product_enquiry" aria-labelledby="tab_item-2">
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

}

Product_Load(document.getElementById("content"));

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
