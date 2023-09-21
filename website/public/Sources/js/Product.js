
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
    <div class="main-content col-lg-9">
    <div id="primary" class="content-area">
        <main id="content" class="site-main">
            <div class="woocommerce-notices-wrapper"></div>
            <div id="product-23306"
                class="product type-product post-23306 status-publish first instock product_cat-pesca-con-mosca-canas product_tag-dolphin has-post-thumbnail shipping-taxable purchasable product-type-simple yith-wcbm-product-has-badges product-layout-default">
                <div class="product-summary-wrap">
                    <div class="row">
                        <div class="summary-before col-md-6">
                            <div class="labels"></div>
                            <div class="product-images images">
                                <div class="container-image-and-badge  ">
                                    <div
                                        class="product-image-slider owl-carousel show-nav-hover has-ccols ccols-1 owl-loaded owl-drag">
                                        <div class="owl-stage-outer owl-height" style="height: 500.867px;">
                                            <div class="owl-stage"
                                                style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 435px;">
                                                <div class="owl-item active" style="width: 435px;">
                                                    <div class="img-thumbnail">
                                                        <div class="inner"><img data-lazyloaded="1"
                                                                src="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-600x694.webp"
                                                                width="600" height="694"
                                                                data-src="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-600x694.webp"
                                                                class="woocommerce-main-image img-responsive entered litespeed-loaded"
                                                                alt="" decoding="async"
                                                                href="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F.webp"
                                                                title="D_NQ_NP_2X_752124-MLA51990397423_102022-F"
                                                                loading="lazy"
                                                                data-srcset="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-600x694.webp 600w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-400x463.webp 400w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-367x425.webp 367w"
                                                                data-sizes="(max-width: 600px) 100vw, 600px"
                                                                data-ll-status="loaded"
                                                                sizes="(max-width: 600px) 100vw, 600px"
                                                                srcset="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-600x694.webp 600w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-400x463.webp 400w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-367x425.webp 367w">
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
                                            </div>
                                        </div>
                                        <div class="owl-nav disabled"><button type="button" aria-label="owl-button"
                                                role="presentation" class="owl-prev"></button><button type="button"
                                                aria-label="owl-button" role="presentation" class="owl-next"></button>
                                        </div>
                                        <div class="owl-dots disabled"></div>
                                    </div><span class="zoom" data-index="0"><i class="porto-icon-plus"></i></span>
                                    <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23306 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158"
                                        data-position="{&quot;top&quot;:&quot;auto&quot;,&quot;bottom&quot;:0,&quot;left&quot;:&quot;auto&quot;,&quot;right&quot;:0}">
                                        <div class="yith-wcbm-badge__wrap">
                                            <div class="yith-wcbm-css-s1"></div>
                                            <div class="yith-wcbm-css-s2"></div>
                                            <div class="yith-wcbm-css-text">
                                                <div class="yith-wcbm-badge-text">Efectivo 15% OFF</div>
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
                                                <div class="img-thumbnail"><img data-lazyloaded="1"
                                                        src="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F.webp"
                                                        width="1037" height="1200"
                                                        class="woocommerce-main-thumb img-responsive entered litespeed-loaded"
                                                        alt="D_NQ_NP_2X_752124-MLA51990397423_102022-F"
                                                        data-src="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F.webp"
                                                        data-ll-status="loaded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="owl-nav disabled"><button type="button" aria-label="owl-button"
                                            role="presentation" class="owl-prev"></button><button type="button"
                                            aria-label="owl-button" role="presentation" class="owl-next"></button></div>
                                    <div class="owl-dots disabled"></div>
                                </div>
                            </div>
                        </div>
                        <div class="summary entry-summary col-md-6">
                            <h2 class="product_title entry-title show-product-nav">
                                Primer Tramo Puntero Caña Lexus Pride L67 – 9 Pies marca Lexus</h2>
                            <div class="product-nav">
                                <div class="product-prev">
                                    <a
                                        href="https://www.florida-camping.com.ar/producto/cana-de-mosca-line-linea-5-marca-grey-gull/">
                                        <span class="product-link"></span>
                                        <span class="product-popup">
                                            <span class="featured-box">
                                                <span class="box-content">
                                                    <span class="product-image">
                                                        <span class="inner">
                                                            <div class="container-image-and-badge  "><img
                                                                    data-lazyloaded="1"
                                                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGw6I2NmZDRkYjtmaWxsLW9wYWNpdHk6IDAuMTsiLz48L3N2Zz4="
                                                                    width="150" height="150"
                                                                    data-src="https://www.florida-camping.com.ar/wp-content/uploads/2020/07/Caña-Grey-Gull-Line-6-150x150.jpg"
                                                                    class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"
                                                                    alt="" decoding="async">
                                                                <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-21999 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158"
                                                                    data-position="{&quot;top&quot;:&quot;auto&quot;,&quot;bottom&quot;:0,&quot;left&quot;:&quot;auto&quot;,&quot;right&quot;:0}">
                                                                    <div class="yith-wcbm-badge__wrap">
                                                                        <div class="yith-wcbm-css-s1"></div>
                                                                        <div class="yith-wcbm-css-s2"></div>
                                                                        <div class="yith-wcbm-css-text">
                                                                            <div class="yith-wcbm-badge-text">Efectivo
                                                                                15% OFF</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </span>
                                                    <span class="product-details">
                                                        <span class="product-title">Caña de Mosca Line Linea #5 marca
                                                            Grey Gull</span>
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                    </a>
                                </div>
                                <div class="product-next">
                                    <a
                                        href="https://www.florida-camping.com.ar/producto/primer-tramo-puntero-cana-lexus-pride-l78-9-pies-marca-lexus/">
                                        <span class="product-link"></span>
                                        <span class="product-popup">
                                            <span class="featured-box">
                                                <span class="box-content">
                                                    <span class="product-image">
                                                        <span class="inner">
                                                            <div class="container-image-and-badge  "><img
                                                                    data-lazyloaded="1"
                                                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDM3IiBoZWlnaHQ9IjEyMDAiIHZpZXdCb3g9IjAgMCAxMDM3IDEyMDAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0eWxlPSJmaWxsOiNjZmQ0ZGI7ZmlsbC1vcGFjaXR5OiAwLjE7Ii8+PC9zdmc+"
                                                                    width="1037" height="1200"
                                                                    data-src="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F.webp"
                                                                    class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"
                                                                    alt="" decoding="async" fetchpriority="high"
                                                                    data-srcset="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F.webp 1037w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-600x694.webp 600w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-885x1024.webp 885w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-768x889.webp 768w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-640x741.webp 640w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-400x463.webp 400w, https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-367x425.webp 367w"
                                                                    data-sizes="(max-width: 1037px) 100vw, 1037px">
                                                                <div class="yith-wcbm-badge yith-wcbm-badge-21158 yith-wcbm-badge--on-product-23309 yith-wcbm-badge--anchor-point-bottom-right yith-wcbm-badge-css yith-wcbm-css-badge-21158"
                                                                    data-position="{&quot;top&quot;:&quot;auto&quot;,&quot;bottom&quot;:0,&quot;left&quot;:&quot;auto&quot;,&quot;right&quot;:0}">
                                                                    <div class="yith-wcbm-badge__wrap">
                                                                        <div class="yith-wcbm-css-s1"></div>
                                                                        <div class="yith-wcbm-css-s2"></div>
                                                                        <div class="yith-wcbm-css-text">
                                                                            <div class="yith-wcbm-badge-text">Efectivo
                                                                                15% OFF</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </span>
                                                    <span class="product-details">
                                                        <span class="product-title">Primer Tramo Puntero Caña Lexus
                                                            Pride L78 – 9 Pies marca Lexus</span>
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="sticky-product hide pos-top">
                                <div class="container">
                                    <div class="sticky-image"><img data-lazyloaded="1"
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgc3R5bGU9ImZpbGw6I2NmZDRkYjtmaWxsLW9wYWNpdHk6IDAuMTsiLz48L3N2Zz4="
                                            width="150" height="150"
                                            data-src="https://www.florida-camping.com.ar/wp-content/uploads/2023/08/D_NQ_NP_2X_752124-MLA51990397423_102022-F-150x150.webp"
                                            class="attachment-thumbnail size-thumbnail" alt="" decoding="async"
                                            loading="lazy"></div>
                                    <div class="sticky-detail">
                                        <div class="product-name-area">
                                            <h2 class="product-name">Primer Tramo Puntero Caña Lexus Pride L67 – 9 Pies
                                                marca Lexus</h2>
                                            <p class="price"><span class="woocommerce-Price-amount amount"><bdi><span
                                                            class="woocommerce-Price-currencySymbol">$</span>21,429</bdi></span>
                                            </p>
                                        </div>
                                        <div class="star-rating" title="" data-bs-original-title="0" aria-label="0">
                                            <span style="width:0%"></span></div>
                                        <div class="availability"><span>In stock</span></div>
                                    </div>
                                    <div class="add-to-cart">
                                        <div class="quantity hidden buttons_added"><button type="button" value="-"
                                                class="minus">-</button>
                                            <input type="hidden" id="quantity_650b25d859811" class="qty" name="quantity"
                                                value="1"><button type="button" value="+" class="plus">+</button>
                                        </div><button type="submit" class="single_add_to_cart_button button">Añadir al
                                            carrito</button>
                                    </div>
                                </div>
                            </div>
                            <p class="price"><span class="woocommerce-Price-amount amount"><bdi><span
                                            class="woocommerce-Price-currencySymbol">$</span>21,429</bdi></span></p>
                            <div class="description woocommerce-product-details__short-description">
                                <p>&nbsp;</p>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                                <div id="extensionInstalled"></div>
                            </div>
                            <div class="product_meta">
                                <p
                                    style="background: #636363;color: white;margin-top: -20px;font-weight: bold;text-transform: uppercase;text-align: left;padding: 7px;max-width: 249px">
                                    Abonando en Efectivo 15% OFF</p><span class="product-stock in-stock">Disponibilidad:
                                    <span class="stock">Hay existencias</span></span>
                                <span class="sku_wrapper">SKU: <span class="sku">SKU 10663</span></span>
                                <span class="posted_in">Categoría: <a
                                        href="https://www.florida-camping.com.ar/categoria/pesca-con-mosca/pesca-con-mosca-canas/"
                                        rel="tag">Cañas</a></span>
                                <span class="tagged_as">Etiqueta: <a
                                        href="https://www.florida-camping.com.ar/etiqueta/dolphin/"
                                        rel="tag">Dolphin</a></span>
                                <span class="posted_in">Brand: <a href="https://www.florida-camping.com.ar/brand/lexus/"
                                        rel="tag">Lexus</a></span>
                            </div>
                            <div class="mp-credits-banner-info">
                                <div class="mp-credits-banner-round-base">
                                    <div class="mp-credits-banner-round-background">
                                        <img data-lazyloaded="1"
                                            src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/mp-logo-hands-shake.png"
                                            width="27" height="18" alt="mp-logo-hand-shake"
                                            class="mp-credits-banner-round-logo entered litespeed-loaded"
                                            data-src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/mp-logo-hands-shake.png"
                                            data-ll-status="loaded">
                                    </div>
                                </div>
                                <div class="mp-credits-banner-text">
                                    <span>Compra en hasta<span> 12 pagos sin tarjeta</span> con Mercado Pago</span>
                                </div>
                                <div class="mp-credits-banner-link">
                                    <span><a id="mp-open-modal">Saber más</a></span>
                                    <div id="mp-credits-modal">
                                        <div id="mp-credits-centralize" class="mp-credits-modal-content-centralize">
                                            <div class="mp-credits-modal-container">
                                                <div class="mp-credits-modal-container-content">
                                                    <div class="mp-credits-modal-content">
                                                        <div class="mp-credits-modal-close-button">
                                                            <img data-lazyloaded="1"
                                                                src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/close-icon.png"
                                                                width="16" height="16" id="mp-credits-modal-close-modal"
                                                                data-src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/close-icon.png"
                                                                data-ll-status="loaded"
                                                                class="entered litespeed-loaded">
                                                        </div>
                                                        <div class="mp-logo-img">
                                                            <img data-lazyloaded="1"
                                                                src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/logo-mp.png"
                                                                width="106" height="28"
                                                                data-src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/logo-mp.png"
                                                                data-ll-status="loaded"
                                                                class="entered litespeed-loaded">
                                                        </div>
                                                        <div class="mp-credits-modal-titles">
                                                            <div>
                                                                <span>¡Compra ahora y paga después!</span>
                                                                <p>
                                                                    Compra en hasta <b>12 pagos mensuales sin usar
                                                                        tarjeta de crédito</b></p>
                                                            </div>
                                                            <div>
                                                                <div class="mp-credits-modal-how-to-use">
                                                                    <div>
                                                                        <div>
                                                                            <div class="mp-credits-modal-blue-circle">
                                                                                <span>
                                                                                    <img data-lazyloaded="1"
                                                                                        src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/check-blue.png"
                                                                                        width="12" height="12"
                                                                                        alt="mp-logo-hand-shake"
                                                                                        data-src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/check-blue.png"
                                                                                        data-ll-status="loaded"
                                                                                        class="entered litespeed-loaded">
                                                                                </span>
                                                                            </div>
                                                                            <span>Puedes solicitar tu línea de crédito
                                                                                100% online y de forma segura.</span>
                                                                        </div>
                                                                        <div>
                                                                            <div class="mp-credits-modal-blue-circle">
                                                                                <span>
                                                                                    <img data-lazyloaded="1"
                                                                                        src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/check-blue.png"
                                                                                        width="12" height="12"
                                                                                        alt="mp-logo-hand-shake"
                                                                                        data-src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/check-blue.png"
                                                                                        data-ll-status="loaded"
                                                                                        class="entered litespeed-loaded">
                                                                                </span>
                                                                            </div>
                                                                            <span>Sin trámites. ¡Haz todo desde la app
                                                                                de Mercado Pago!</span>
                                                                        </div>
                                                                        <div>
                                                                            <div class="mp-credits-modal-blue-circle">
                                                                                <span>
                                                                                    <img data-lazyloaded="1"
                                                                                        src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/check-blue.png"
                                                                                        width="12" height="12"
                                                                                        alt="mp-logo-hand-shake"
                                                                                        data-src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/templates/../assets/images/credits/check-blue.png"
                                                                                        data-ll-status="loaded"
                                                                                        class="entered litespeed-loaded">
                                                                                </span>
                                                                            </div>
                                                                            <span>Sin tasas de mantenimiento ni costos
                                                                                adicionales.</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mp-credits-modal-FAQ">
                                                            <p>
                                                                ¿Tienes dudas? <a id="mp-modal-footer-link"
                                                                    target="_blank"
                                                                    href="https://www.mercadopago.com.ar/help/19040">Consulta
                                                                    nuestra FAQ</a>
                                                                . Crédito sujeto a aprobación.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form class="cart"
                                action="https://www.florida-camping.com.ar/producto/primer-tramo-puntero-cana-lexus-pride-l67-9-pies-marca-lexus/"
                                method="post" enctype="multipart/form-data">
                                <div class="quantity hidden buttons_added"><button type="button" value="-"
                                        class="minus">-</button>
                                    <input type="hidden" id="quantity_650b25d859811" class="qty" name="quantity"
                                        value="1"><button type="button" value="+" class="plus">+</button>
                                </div>
                                <button type="submit" name="add-to-cart" value="23306"
                                    class="single_add_to_cart_button button alt">Añadir al carrito</button>
                            </form>
                            <div class="product-share">
                                <div class="share-links"><a
                                        href="https://www.facebook.com/sharer.php?u=https://www.florida-camping.com.ar/producto/primer-tramo-puntero-cana-lexus-pride-l67-9-pies-marca-lexus/"
                                        target="_blank" rel="noopener noreferrer nofollow" data-bs-tooltip=""
                                        data-bs-placement="bottom" title="" class="share-facebook"
                                        data-bs-original-title="Facebook">Facebook</a>
                                    <a href="https://twitter.com/intent/tweet?text=Primer+Tramo+Puntero+Ca%C3%B1a+Lexus+Pride+L67+%26%238211%3B+9+Pies+marca+Lexus&amp;url=https://www.florida-camping.com.ar/producto/primer-tramo-puntero-cana-lexus-pride-l67-9-pies-marca-lexus/"
                                        target="_blank" rel="noopener noreferrer nofollow" data-bs-tooltip=""
                                        data-bs-placement="bottom" title="" class="share-twitter"
                                        data-bs-original-title="Twitter">Twitter</a>
                                    <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://www.florida-camping.com.ar/producto/primer-tramo-puntero-cana-lexus-pride-l67-9-pies-marca-lexus/&amp;title=Primer+Tramo+Puntero+Ca%C3%B1a+Lexus+Pride+L67+%26%238211%3B+9+Pies+marca+Lexus"
                                        target="_blank" rel="noopener noreferrer nofollow" data-bs-tooltip=""
                                        data-bs-placement="bottom" title="" class="share-linkedin"
                                        data-bs-original-title="LinkedIn">LinkedIn</a>
                                    <a href="https://plus.google.com/share?url=https://www.florida-camping.com.ar/producto/primer-tramo-puntero-cana-lexus-pride-l67-9-pies-marca-lexus/"
                                        target="_blank" rel="noopener noreferrer nofollow" data-bs-tooltip=""
                                        data-bs-placement="bottom" title="" class="share-googleplus"
                                        data-bs-original-title="Google+">Google+</a>
                                    <a href="mailto:?subject=Primer+Tramo+Puntero+Ca%C3%B1a+Lexus+Pride+L67+%26%238211%3B+9+Pies+marca+Lexus&amp;body=https://www.florida-camping.com.ar/producto/primer-tramo-puntero-cana-lexus-pride-l67-9-pies-marca-lexus/"
                                        target="_blank" rel="noopener noreferrer nofollow" data-bs-tooltip=""
                                        data-bs-placement="bottom" title="" class="share-email"
                                        data-bs-original-title="Email">Email</a>
                                </div>
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
                            <p><strong>Primer Tramo Puntero Caña Lexus Pride L67 – 9 Pies marca Lexus</strong></p>
                            <p>Primer tramos para caña de mosca Lexus Pride línea 6-7 9 pies.<br>
                                Original</p>
                        </div>
                        <h2 class="resp-accordion" role="tab" aria-controls="tab_item-1"><span
                                class="resp-arrow"></span>
                            Información adicional</h2>
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
                        <h2 class="resp-accordion" role="tab" aria-controls="tab_item-2"><span
                                class="resp-arrow"></span>
                            Consulta de Producto</h2>
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
                            <script type="text/javascript"
                                src="blob:https://www.florida-camping.com.ar/8b1e014b-3efd-469f-a24c-a9e546b0ed00"></script>
                        </div>
                    </div>
                    <script type="text/javascript"
                        src="blob:https://www.florida-camping.com.ar/5caebbc9-0a6a-4246-8596-9ca312a5457e"></script>
                </div>
                <picture>
                    <source type="image/webp"
                        srcset="https://www.florida-camping.com.ar/wp-content/uploads/2023/09/SEP.jpg.webp">
                    <img data-lazyloaded="1"
                        src="https://www.florida-camping.com.ar/wp-content/uploads/2023/09/SEP.jpg.webp" width="900"
                        height="400"
                        data-src="https://www.florida-camping.com.ar/wp-content/uploads/2023/09/SEP.jpg.webp"
                        data-ll-status="loaded" class="entered litespeed-loaded">
                </picture>
            </div>
        </main>
    </div>
</div>`;


}