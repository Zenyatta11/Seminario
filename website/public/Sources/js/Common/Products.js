function getNewProducts() {
    doPost('products/get/latest', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            more = getKeyFromJson(language, fallbackLanguage, "product.more");
            buy = getKeyFromJson(language, fallbackLanguage, "product.buy");
            list = '';
            
            json.data.forEach((item) => {
                list = list + `
                <div class="owl-item active" style="width: 232.5px;">
                    <li class="product-col product-default show-links-hover product type-product post-23297 status-publish instock product_cat-pesca-monofilamento-y-multifilamento product_tag-galan has-post-thumbnail shipping-taxable product-type-simple yith-wcbm-product-has-badges">
                        <div class="product-inner">
                            <div class="product-image">
                                <a href="/product/` + item.product_id + `_` + item.url_name + `"
                                    onclick="event.preventDefault(); navigateToPage('/product/` + item.product_id + `_` + item.url_name + `', 'pages.product', Index_Load);">
                                    <div class="inner">
                                        <div class="container-image-and-badge  ">
                                            <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + item.product_id + `/0.png" src="/Media/Products/` + item.product_id + `/0.png"
                                                class="wp-post-image entered litespeed-loaded"
                                                width="600" height="600">
                                            ` + (item.offer != null && (item.start_date === null || new Date(item.start_date) < new Date())? `
                                            <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23297 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158"
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
                                    <a href="/catalog/` + item.category_id + `-` + item.category + `" 
                                        onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `-` + item.category + `', 'pages.catalog', Catalog_Load);" 
                                        rel="tag">` + item.category + `</a></span>
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
                                            <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.offer) + `
                                            </bdi>
                                        </span>
                                    </ins>
                                </span>` : `<span class="price"><strong>$` + parsePrice(item.price) + `</strong></span>` ) + `

                                <div class="add-links-wrap">
                                    <div class="add-links no-effect clearfix">
                                        <a href="#0"
                                            class="viewcart-style-3 button product_type_simple view"
                                            rel="nofollow"><i class="icon-search"></i><span class="translate" key="product.more">` + more + `</span></a>
                                        <a href="#0"
                                            class="viewcart-style-3 button product_type_simple buy_now"
                                            rel="nofollow"><i class="icon-money"></i><span class="translate" key="product.buy">` + buy + `</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>`;
            });

            document.getElementById("page-products-new").innerHTML = list;
        }
    });
}

function getFeaturedProducts() {
    doPost('products/get/featured', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            more = getKeyFromJson(language, fallbackLanguage, "product.more");
            buy = getKeyFromJson(language, fallbackLanguage, "product.buy");
            list = '';
            
            json.data.forEach((item) => {
                list = list + `
                <div class="owl-item active" style="width: 232.5px;">
                    <li class="product-col product-default show-links-hover product type-product post-23297 status-publish instock product_cat-pesca-monofilamento-y-multifilamento product_tag-galan has-post-thumbnail shipping-taxable product-type-simple yith-wcbm-product-has-badges">
                        <div class="product-inner">
                            <div class="product-image">
                                <a href="/product/` + item.product_id + `_` + item.url_name + `"
                                    onclick="event.preventDefault(); navigateToPage('/product/` + item.product_id + `_` + item.url_name + `', 'pages.product', Index_Load);">
                                    <div class="inner">
                                        <div class="container-image-and-badge  ">
                                            <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + item.product_id + `/0.png" src="/Media/Products/` + item.product_id + `/0.png"
                                                class="wp-post-image entered litespeed-loaded"
                                                width="600" height="600">
                                            ` + (item.offer != null && (item.start_date === null || new Date(item.start_date) < new Date())? `
                                            <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23297 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158"
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
                                    <a href="/catalog/` + item.category_id + `-` + item.category + `" 
                                        onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `-` + item.category + `', 'pages.catalog', Catalog_Load);" 
                                        rel="tag">` + item.category + `</a></span>
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
                                            <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.offer) + `
                                            </bdi>
                                        </span>
                                    </ins>
                                </span>` : `<span class="price"><strong>$` + parsePrice(item.price) + `</strong></span>` ) + `

                                <div class="add-links-wrap">
                                    <div class="add-links no-effect clearfix">
                                        <a href="#0"
                                            class="viewcart-style-3 button product_type_simple view"
                                            rel="nofollow"><i class="icon-search"></i><span class="translate" key="product.more">` + more + `</span></a>
                                        <a href="#0"
                                            class="viewcart-style-3 button product_type_simple buy_now"
                                            rel="nofollow"><i class="icon-money"></i><span class="translate" key="product.buy">` + buy + `</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>`;
            });

            document.getElementById("page-products-featured").innerHTML = list;
        }
    });
}

function getOffersProducts() {
    doPost('products/get/offers', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            list = '';
            more = getKeyFromJson(language, fallbackLanguage, "product.more");
            buy = getKeyFromJson(language, fallbackLanguage, "product.buy");
            
            json.data.forEach((item) => {
                console.log(item);
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
                                            <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23297 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158"
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
                                    <a href="/catalog/` + item.category_id + `-` + item.category + `" 
                                        onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `-` + item.category + `', 'pages.catalog', Catalog_Load);" 
                                        rel="tag">` + item.category + `</a></span>
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
                                            <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.offer) + `
                                            </bdi>
                                        </span>
                                    </ins>
                                </span>` : `<span class="price"><strong>$` + parsePrice(item.price) + `</strong></span>` ) + `
                                
                                <div class="add-links-wrap">
                                    <div class="add-links no-effect clearfix">
                                        <a href="#0"
                                            class="viewcart-style-3 button product_type_simple view"
                                            rel="nofollow"><i class="icon-search"></i><span class="translate" key="product.more">` + more + `</span></a>
                                        <a href="#0"
                                            class="viewcart-style-3 button product_type_simple buy_now"
                                            rel="nofollow"><i class="icon-money"></i><span class="translate" key="product.buy">` + buy + `</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>`;
            });

            document.getElementById("page-products-offers").innerHTML = list;
        }
    });
}
