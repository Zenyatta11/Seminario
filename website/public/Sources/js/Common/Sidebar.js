function Sidebar_GetCategories() {
    doPost('categories/getWithSub', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            list = '';

            json.data.forEach((item) => {
                list = list + `
                <li class="cat-item cat-item-21 cat-parent">
                    <a href="/catalog/` + item.category_id + `_` + item.url_name + `"
                        onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `_` + item.url_name + `', 'pages.catalog', Catalog_Load);">` + item.name + `</a>
                    ` + (item.subcategories.length === 0 ? `` : `<span class="toggle" onclick="toggleChildList(this)"></span>
                    <ul class="children">`);

                item.subcategories.forEach((subitem) => {
                    list = list + `
                        <li class="cat-item cat-item-30">
                            <a href="/catalog/` + item.category_id + `-` + subitem.subcategory_id + `_` + item.url_name + `-` + subitem.url_name + `"
                                onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `-` + subitem.subcategory_id + `_` + item.url_name + `-` + subitem.url_name + `', 'pages.catalog', Catalog_Load);">` + subitem.name + `</a>
                        </li>`;
                });
                list = list + `
                    </ul>`;

                list = list + `
                </li>`;
            });

            document.getElementById("sidebar-product-categories").innerHTML = list;
        }
    });
}

function Sidebar_GetFeaturedProducts() {
    doPost('products/get/featured', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            list = '';

            json.data.forEach((item) => {
                let url = item.product_id + `_` + item.url_name;
                
                list = list + `
                <li class="cat-item cat-item-21 cat-parent">
                    <a class="product-image"
                        href="/product/` + url + `"
                        title="product title">
                        <div class="inner">
                            <img src="/Media/General/product-thumb.png" alt="" width="85" height="85">
                        </div>
                    </a>
                    <div class="product-details">
                        <a class="product-image"
                            style="width: 100%"
                            href="/product/` + url + `" 
                            title="` + item.name + `" 
                            onclick="event.preventDefault(); navigateToPage('/products/` + url + `', 'pages.product', Index_Load);">
                            <span class="product-title">` + item.name + `</span>
                        </a>
                        <div class="star-rating" title="" data-bs-original-title="0">
                            <span style="width:0%">
                                <strong class="rating">0</strong> de 5
                            </span>
                        </div>
                        
                        <span class="woocommerce-Price-amount amount">
                            <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.price) + `</bdi>
                        </span>
                    </div>
                </li>`
            });

            document.getElementById("sidebar-product-featured").innerHTML = list;
        }
    });
}

function Sidebar_GetMostSoldProducts() {
    doPost('products/get/latest', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            list = '';

            json.data.forEach((item) => {
                let url = item.product_id + `_` + item.url_name;
                
                list = list + `
                <li class="cat-item cat-item-21 cat-parent">
                    <a class="product-image"
                        href="/product/` + url + `"
                        title="product title">
                        <div class="inner">
                            <img src="/Media/General/product-thumb.png" alt="" width="85" height="85">
                        </div>
                    </a>
                    <div class="product-details">
                        <a class="product-image"
                            style="width: 100%"
                            href="/product/` + url + `" 
                            title="` + item.name + `" 
                            onclick="event.preventDefault(); navigateToPage('/products/` + url + `', 'pages.product', Index_Load);">
                            <span class="product-title">` + item.name + `</span>
                        </a>
                        <div class="star-rating" title="" data-bs-original-title="0">
                            <span style="width:0%">
                                <strong class="rating">0</strong> de 5
                            </span>
                        </div>
                        
                        <span class="woocommerce-Price-amount amount">
                            <bdi><span class="woocommerce-Price-currencySymbol">$</span>` + parsePrice(item.price) + `</bdi>
                        </span>
                    </div>
                </li>`
            });

            document.getElementById("sidebar-product-new").innerHTML = list;
        }
    });
}