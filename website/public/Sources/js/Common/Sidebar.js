function Sidebar_GetCategories() {
    doPost('categories/getWithSub', { })
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code === 200) {
            list = '';

            json.data.forEach((item) => {
                list = list + `
                <li class="cat-item cat-item-21 cat-parent">
                    ` + CategoryUrl(item.category_id, item.name) + `
                    ` + (item.subcategories.length === 0 ? `` : `<span class="toggle" onclick="toggleChildList(this)"></span>
                    <ul class="children">`);

                item.subcategories.forEach((subitem) => {
                    list = list + `
                        <li class="cat-item cat-item-30">
                            ` + SubcategoryUrl(item.category_id, item.name, subitem.subcategory_id, subitem.name) + `
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
                    ` + ProductUrl(item.product_id, item.name, `
                    <div class="inner">
                        <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + item.product_id + `/0.png" alt="" width="85" height="85">
                    </div>
                    `, `product-image`) + `
                    <div class="product-details">
                        ` + ProductUrl(item.product_id, item.name, `<span class="product-title">` + item.name + `</span>`, `product-image`) + `
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
                    ` + ProductUrl(item.product_id, item.name, `
                    <div class="inner">
                        <img onerror="this.src='/Media/General/product-thumb.png'" src="/Media/Products/` + item.product_id + `/0.png" alt="" width="85" height="85">
                    </div>
                    `, `product-image`) + `
                    <div class="product-details">
                        ` + ProductUrl(item.product_id, item.name, `<span class="product-title">` + item.name + `</span>`, `product-image`) + `
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