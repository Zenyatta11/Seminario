
function Catalog_Load(main) {
    setPageSectionHeader('pages.catalog.title', 'pages.catalog.title');

    const subcategoryRegex = /(\d+)-(\d+)_.*/;
    const categoryRegex = /(\d+)_.*/;

    let filter = 'all';
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

    pages = 0;
    currentPage = 0;
    const pageParameter = /page=([^&])/.exec(window.location.search);
    if(pageParameter !== null) currentPage = parseInt(pageParameter[1]);
    if(currentPage === NaN) currentPage = 0;

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

            count = 0;
            list = ``;

            if(url == "/catalog/offers" || url == "/catalog/featured") json.data.products = json.data;
            pages = Math.floor(json.data.products.length / 16);

            json.data.products.forEach((item) => {
                if(count > ((currentPage + 1) * 16 - 1)) return;
                else if(count < currentPage * 16) {
                    count = count + 1;
                    return;
                }

                if(count % 4 === 0) list = list + `
                    <div class="slider-wrapper">
                        <div class="woocommerce columns-4 ">
                            <ul class="products products-container products-slider owl-carousel show-nav-middle pcols-lg-4 pcols-md-3 pcols-xs-3 pcols-ls-2 pwidth-lg-4 pwidth-md-3 pwidth-xs-2 pwidth-ls-1 is-shortcode owl-loaded owl-drag">
                                <div class="owl-stage-outer owl-height" style="height: 389.55px;">
                                    <div id="page-catalog" class="owl-stage" style="transition: all 0.25s ease 0s; width: 3720px;">`;

                list = list + `
                    <div class="owl-item active" style="width: 232.5px;">
                        <li class="product-col product-default show-links-hover product type-product post-23297 status-publish instock product_cat-pesca-monofilamento-y-multifilamento product_tag-galan has-post-thumbnail shipping-taxable product-type-simple yith-wcbm-product-has-badges">
                            <div class="product-inner">
                                <div class="product-image">
                                    ` + ProductUrl(item.product_id, item.name,`
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
                                        `, false) + `
                                </div>

                                <div class="product-content">
                                    <span class="category-list">
                                        ` + CategoryUrl(item.category_id, item.category) + `</span>
                                    ` + ProductUrl(item.product_id, item.name, `<h3 class="woocommerce-loop-product__title">` + item.name + `</h3>`, `product-loop-title`) + `
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
                                        ` + ProductUrl(item.product_id, item.name,`<i class="icon-search"></i><span class="translate" key="product.more">` + more + `</span>`, `viewcart-style-3 button product_type_simple view`) + `
                                                ` + (item.in_cart ? `<a href="javascript:;"
                                                style="background-color: #979696 !important;cursor: not-allowed;" class="viewcart-style-3 button product_type_simple buy_now"
                                                rel="nofollow">` : `<a href="javascript:;" onclick="AddToCart(this, ` + item.product_id + `, 1);"
                                                class="viewcart-style-3 button product_type_simple buy_now"
                                                rel="nofollow">` ) + `<i class="icon-shopping-cart"></i><span class="translate" key="product.buy">` + buy + `</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>`;

                if(count % 4 === 3) list = list + `
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>`;

                count = count + 1;
            });

            if(count % 4 !== 3) list = list + `
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
                                                <span class="inline-title" style="float: right;">
                                                    <a class="link_button" href="/catalog` + (currentPage < 1 ? `` : `?page=` + (currentPage - 1)) + `"
                                                        onclick="event.preventDefault(); ` + (currentPage < 1 ? 'return;' : `window.history.pushState('', '', '/catalog` + (currentPage < 1 ? `` : `?page=` + (currentPage - 1)) + `'); refreshPage();`) + `">` + (currentPage < 1 ? `&nbsp;` : `&lt;`) + `</a> 
                                                        <span class="translate" key="pages.catalog.page"></span> ` + (currentPage + 1) + ` <span class="translate" key="pages.catalog.pageof"></span> ` + (pages + 1) + ` 
                                                    <a class="link_button" href="/catalog?page=` + (currentPage >= pages ? pages : currentPage + 1) + `"
                                                        onclick="event.preventDefault(); ` + (currentPage >= pages ? 'return;' : `window.history.pushState('', '', '/catalog?page=` + (currentPage >= pages ? pages : currentPage + 1) + `'); refreshPage();`) + `">` + (currentPage >= pages ? `&nbsp;` : `&gt;`) + `</a></span>
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
    });
}
