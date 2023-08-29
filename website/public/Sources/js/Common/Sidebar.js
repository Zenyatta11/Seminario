function Sidebar_GetCategories() {
    doPost('categories/getWithSub', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            list = '';

            json.data.forEach((item) => {
                list = list + `
                <li class="cat-item cat-item-21 cat-parent">
                    <a href="/catalog/` + item.category_id + `-` + item.name + `"
                        onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `-` + item.name + `', 'pages.catalog', Index_Load);">` + item.name + `</a>
                    ` + (item.subcategories.length === 0 ? `` : `<span class="toggle" onclick="toggleChildList(this)"></span>
                    <ul class="children">`);

                item.subcategories.forEach((subitem) => {
                    list = list + `
                        <li class="cat-item cat-item-30">
                            <a href="/catalog/` + item.category_id + `-` + item.name + `/` + subitem.subcategory_id + `-` + subitem.name + `"
                                onclick="event.preventDefault(); navigateToPage('/catalog/` + item.category_id + `-` + item.name + `/` + subitem.subcategory_id + `-` + subitem.name + `', 'pages.catalog', Index_Load);">` + subitem.name + `</a>
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
                list = list + `
                <li class="cat-item cat-item-21 cat-parent">
                <div class="product-details">
                    <a class="product-image"
                        href="/product/` + item.product_id + (item.category_id != undefined ? `-` + item.category_id + '_' : '_') + item.url_name + `" 
                        title="` + item.name + `" 
                        onclick="event.preventDefault(); navigateToPage('/products/` + item.product_id + (item.category_id != undefined ? `-` + item.category_id + '_' : '_') + item.url_name + `', 'pages.product', Index_Load);">
                        <span class="product-title">` + item.name + `</span>
                    </a>
                    <div class="star-rating" title="" data-bs-original-title="0"><span style="width:0%"><strong class="rating">0</strong> de
                                5</span></div><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>15.200</bdi></span>
                    </div>

                list = list + `
                </li>`;
            });

            document.getElementById("sidebar-product-categories").innerHTML = list;
        }
    });
} 

<li>
    <a class="product-image" href="/https://seminario.batatas.club/" title="product title">
        <div class="inner"><img src="/Sources/img/product-thumb.png" alt="" width="85" height="85"></div>
    </a>
    <div class="product-details">
        <a href="/https://seminario.batatas.club/" title="product title">
            <span class="product-title">product name</span>
        </a>

        <div class="star-rating" title="" data-bs-original-title="0"><span style="width:0%"><strong class="rating">0</strong> de
                5</span></div><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>15.200</bdi></span>
    </div>
</li>