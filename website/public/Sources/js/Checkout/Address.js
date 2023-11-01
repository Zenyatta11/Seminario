var addressCache;

function Checkout_Address_Load(main) {
	document.getElementById("mini-cart")?.remove();
    var provinceOptionsSelected, citiesOptionsSelected, addressList, selectedProvince, selectedCity;
    var citiesOptionsSelected = "<option selected disabled>Elegir Localidad</option>";

    doPost('address/get', { })
	.then((addressResponse) => addressResponse.json())
	.then((addressJSON) => {
        if(addressJSON.status_code === 200) {
            addressCache = addressJSON.data;
            addressList = getAddressOptionsFromJson(addressJSON.data, userData.address);

            if(addressJSON.data.length != 0 && userData.address) {
                selectedAddress = addressJSON.data.find(function(item) { return item.address_id == userData.address } );

                selectedProvince = selectedAddress.province_id;
                selectedCity = selectedAddress.city_id;
            }

            doPost('provinces/get', { })
            .then((provinceResponse) => provinceResponse.json())
            .then((provinceJSON) => {
                if(provinceJSON.status_code === 200) {
                    provinceOptionsSelected = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.province"), provinceJSON.data, 'province_id', 'name', selectedProvince);

                    if(userData.address) {
                        doPost('cities/get', 
                            {
                                'province_id': selectedProvince
                            }
                        )
                        .then((citiesResponse) => citiesResponse.json())
                        .then((citiesJSON) => {
                            if(citiesJSON.status_code === 200) {
                                citiesOptionsSelected = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.city"), citiesJSON.data, 'city_id', 'name', selectedCity);
                                showAddressPage(main, addressList, provinceOptionsSelected, citiesOptionsSelected, selectedAddress);
                            }
                        });
                    } else showAddressPage(main, addressList, provinceOptionsSelected, null, selectedAddress);
                }
            });
        }
    });
}

function getAddressOptionsFromJson(data, selector) {
    var returnValue = ""
    selected = false;
    
    for(i = 0; i < data.length; i = i + 1) {
        if(!selected && data[i]['address_id'] == selector) selected = true;
        
        returnValue = returnValue + 
            '<option ' + (data[i]['address_id'] == selector ? 'selected ' : '') + 'value="' + data[i]["address_id"] + '">' + 
                data[i]["street"] + ' ' + data[i]["number"] + 
            '</option>';
    }

    if(returnValue === "") returnValue = '<option value="-1" disabled selected>' + getKeyFromJson(language, fallbackLanguage, "checkout.address.new") + '</option>';
    else returnValue = returnValue + '<option ' + (!selected ? 'selected ' : '') + 'value="-1">' + getKeyFromJson(language, fallbackLanguage, "checkout.address.new") + '</option>';

    return returnValue;
}

function showAddressPage(main, addressList, provinceOptionsSelected, citiesOptionsSelected, address) {
    pageToShow = `
		<div class="align-left">
			<div class="box-content">
				<div class="woocommerce-notices-wrapper">
                    <ul id="page-section-header" class="breadcrumb standalone-list" itemscope=""
                        itemtype="https://schema.org/BreadcrumbList">
                        <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                            <span style="color: #777777" class="translate" key="checkout.header.products">Confirmar Productos</span>
                            <i class="delimiter"></i>
                        </li>
                        <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                            <span class="translate" key="checkout.header.shipping">Cotizar Envio</span>
                            <i class="delimiter"></i>
                        </li>
                        <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                            <span style="color: #777777" class="translate" key="checkout.header.payments">Pagos</span>
                            <i class="delimiter"></i>
                        </li>
                        <li><span style="color: #777777" class="translate" key="checkout.header.confirmation">Confirmacion</span></li>
                    </ul>
				</div>
                
                <div class="account-sub-title mb-4 mt-2">
                    <h3 class="account-sub-title mb-2 font-weight-bold text-capitalize text-v-dark translate" key="checkout.address.title">
                        <span class="translate" key="checkout.address.addresses">Domicilios</span>
                    </h3>
                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-2">
                        <select onchange="updateAddressList(this)" id="address" name="address" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl">
                            ` + addressList + `
                        </select>
                    </p>
                    <p class="woocommerce-FormRow woocommerce-FormRow--first form-row form-row-first">
                        <label class="mb-1 font-weight-medium" for="province">
                            <span class="translate" key="checkout.address.province">Provincia</span>
                            <span class="required">*</span>
                        </label>
                        <select onchange="onProvinceUpdated(this);" id="province" name="province" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl">
                            ` + provinceOptionsSelected + `
                        </select>
                    </p>
                    <p class="woocommerce-FormRow woocommerce-FormRow--last form-row form-row-last">
                        <label class="mb-1 font-weight-medium" for="city">
                            <span class="translate" key="checkout.address.city">Localidad</span>
                            <span class="required">*</span>
                        </label>
                        <select id="city" name="city" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl">
                            ` + citiesOptionsSelected + `
                        </select>
                    </p>
                    <p class="woocommerce-FormRow woocommerce-FormRow--first form-row form-row-first">
                        <label class="mb-1 font-weight-medium" for="street">
                            <span class="translate" key="checkout.address.street">Calle</span>
                            <span class="required">*</span>
                        </label>
                        <input type="text" onblur="verifyNotEmpty(this);"
                            class="woocommerce-Input woocommerce-Input--text input-text line-height-xl"
                            name="street" id="street"
                            autocomplete="street" value="` + (address.street ?? "") + `"/>
                    </p>
                    <p class="woocommerce-FormRow woocommerce-FormRow--last form-row form-row-last">
                        <label class="mb-1 font-weight-medium" for="streetnumber">
                            <span class="translate" key="checkout.address.streetnumber">N°</span>
                            <span class="required">*</span>
                        </label>
                        <input type="number" onblur="verifyNotEmpty(this);"
                            class="woocommerce-Input woocommerce-Input--number input-number line-height-xl"
                            name="streetnumber" id="streetnumber"
                            autocomplete="streetnumber" value="` + (address.number ?? "") + `"/>
                    </p>
                    <p class="woocommerce-FormRow woocommerce-FormRow--first form-row form-row-first">
                        <label class="mb-1 font-weight-medium" for="dni">
                            <span class="translate" key="checkout.address.dni">DNI / CUIT</span>
                            <span class="required">*</span>
                        </label>
                        <input type="number"
                            class="woocommerce-Input woocommerce-Input--number input-number line-height-xl"
                            name="dni" id="dni"
                            autocomplete="dni" onblur="verifyDNI()" value="` + (userData.dni ?? "") + `"/>
                    </p>
                    <p class="woocommerce-FormRow woocommerce-FormRow--last form-row form-row-last">
                        <label class="mb-1 font-weight-medium" for="zipcode">
                            <span class="translate" key="checkout.address.zipcode">Código Postal</span>
                            <span class="required">*</span>
                        </label>
                        <input type="number"
                            class="woocommerce-Input woocommerce-Input--number input-number line-height-xl"
                            onblur="verifyZipcode();" name="zipcode" id="zipcode"
                            autocomplete="zipcode" value="` + (address.zip_code ?? "") + `"/>
                    </p>
                    <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-2">
                        <label class="mb-1 font-weight-medium" for="extra">
                            <span class="translate" key="checkout.address.extra">Aclaraciones</span>
                        </label>
                        <textarea id="extra" name="extra">` + (address.extra ?? "") + `</textarea>
                    </p>

                    <p id="status-bar" class="status">&nbsp;</p>

                    <div class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
                        <div class="porto-checkbox my-2 my-sm-0" style="margin-left: auto; margin-right: 0px;">
                            <span id="shipping-price"></span>
                        </div>
                    </div>

                    <div id="button-panel">
                        <p class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100">
                            <button onclick="cotizarEnvio();" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.header.shipping">
                                Cotizar Envío
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
    main.innerHTML = pageToShow;

    parseTranslations();
}

function onProvinceUpdated(item) {
    doPost('cities/get', 
        {
            'province_id': item.value
        }
    )
    .then((citiesResponse) => citiesResponse.json())
    .then((citiesJSON) => {
        if(citiesJSON.status_code === 200) {
            document.getElementById("city").innerHTML = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.city"), citiesJSON.data, 'city_id', 'name');
        }
    });

    verifyZipcode();
}

function verifyDNI() {
    dniBox = document.getElementById('dni');

    if(dniBox.value > 999999 && dniBox.value < 100000000 || dniBox.value > 9999999999 && dniBox.value < 100000000000) {
        dniBox.setAttribute("style", "");
        return true;
    } else {
        dniBox.setAttribute("style", "border-color: red");
        return false;
    }
}

function verifyZipcode() {
    zipcodeBox = document.getElementById('zipcode');
    zipcode = document.getElementById("zipcode").value;
    doPost('zipcodes/verify',
        { 
            'zip-code': getValueById('zipcode'),
            'province_id': getValueById('province')
        }
    ).then((response) => response.json())
    .then((json) => {
        if(json.status_code === 400) {
            zipcodeBox.setAttribute("style", "border-color: red");
            editAddress();
        } else if(json.status_code === 200) {
            zipcodeBox.setAttribute("style", "");
        }
    });
}  

function updateAddressList(item) {
    if(item.value == -1) {
        document.getElementById("zipcode").value = "";
        document.getElementById("streetnumber").value = "";
        document.getElementById("street").value = "";
        document.getElementById("extra").value = "";
        document.getElementById("city").innerHTML = '<option disabled selected>' + getKeyFromJson(language, fallbackLanguage, "checkout.address.nocity") + '</option>';

        doPost('provinces/get', { })
        .then((provinceResponse) => provinceResponse.json())
        .then((provinceJSON) => {
            if(provinceJSON.status_code === 200) {
                document.getElementById("province").innerHTML = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.province"), provinceJSON.data, 'province_id', 'name');
            }

            parseTranslations();
        });

    } else {
        address = addressCache.find(function(address) { return address.address_id == item.value });

        doPost('provinces/get', { })
        .then((provinceResponse) => provinceResponse.json())
        .then((provinceJSON) => {
            if(provinceJSON.status_code === 200) {
                document.getElementById("province").innerHTML = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.province"), provinceJSON.data, 'province_id', 'name', address.province_id);

                doPost('cities/get', 
                    {
                        'province_id': address.province_id
                    }
                )
                .then((citiesResponse) => citiesResponse.json())
                .then((citiesJSON) => {
                    if(citiesJSON.status_code === 200) {
                        document.getElementById("city").innerHTML = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.city"), citiesJSON.data, 'city_id', 'name', address.city_id);
                        document.getElementById("zipcode").value = address.zip_code;
                        document.getElementById("streetnumber").value = address.number;
                        document.getElementById("street").value = address.street;
                        document.getElementById("extra").value = address.extra;
                    }

                    parseTranslations();
                });
            }
        });
    }

    parseTranslations();
}

function verifyNotEmpty(item) {
    if(item.value == "") item.setAttribute("style", "border-color: red");
    else item.setAttribute("style", "");
}

function disableAllFields() {
    document.getElementById("zipcode").disabled = true;
    document.getElementById("streetnumber").disabled = true;
    document.getElementById("street").disabled = true;
    document.getElementById("extra").disabled = true;
    document.getElementById("city").disabled = true
    document.getElementById("dni").disabled = true
    document.getElementById("province").disabled = true
    document.getElementById("address").disabled = true
}

function enableAllFields() {
    document.getElementById("zipcode").disabled = false;
    document.getElementById("streetnumber").disabled = false;
    document.getElementById("street").disabled = false;
    document.getElementById("extra").disabled = false;
    document.getElementById("city").disabled = false
    document.getElementById("dni").disabled = false
    document.getElementById("province").disabled = false
    document.getElementById("address").disabled = false
}

function cotizarEnvio() {
    disableAllFields();

    if(!verifyAllNotEmpty()) {
        enableAllFields();
        console.log("Missing fields!");
        return;
    }

    doPost('zipcodes/verify',
        { 
            'zip-code': getValueById('zipcode'),
            'province_id': getValueById('province')
        }
    ).then((response) => response.json())
    .then((json) => {
        if(json.status_code === 400) {
            zipcodeBox.setAttribute("style", "border-color: red");
            return;
        } else if(json.status_code === 200) {
            zipcodeBox.setAttribute("style", "");

            zipcode = document.getElementById("zipcode").value;
            number = document.getElementById("streetnumber").value;
            street = document.getElementById("street").value;
            extra = document.getElementById("extra").value;
            city = document.getElementById("city").value;
            dni = document.getElementById("dni").value;
            province = document.getElementById("province").value;
            address = document.getElementById("address").value;

            if(address == -1) {
                doPost('address/create', 
                    { 
                        'zip_code': zipcode,
                        'street': street,
                        'number': number,
                        'province_id': province,
                        'city_id': city,
                        'extra': extra,
                    }
                ).then((response) => response.json())
                .then((json) => {
                    if(json.status_code == 200 && json.data != false) updateShippingCost(json.data);
                    else document.getElementById("status-bar").innerHTML = json.data.message;
                });
            } else {
                doPost('address/update', 
                    { 
                        'address_id': address,
                        'zip_code': zipcode,
                        'street': street,
                        'number': number,
                        'province_id': province,
                        'city_id': city,
                        'extra': extra,
                    }
                ).then((response) => response.json())
                .then((json) => {
                    if(json.status_code == 200) updateShippingCost(address);
                    else document.getElementById("status-bar").innerHTML = json.data.message;
                });
            }

            document.getElementById("button-panel").innerHTML = `
                <p class="woocommerce-FormRow woocommerce-FormRow--first form-row form-row-first">
                    <button onclick="editAddress();" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.address.modify">
                        Editar Domicilio
                    </button>
                </p>
                <p id="checkoutButton" class="woocommerce-FormRow woocommerce-FormRow--last form-row form-row-last">
                    <button disabled class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.address.shippingfetch">
                        Cotizando envío...
                    </button>
                </p>`;
        }

        parseTranslations();
    });
}

function editAddress() {
    enableAllFields();

    document.getElementById("button-panel").innerHTML = `
        <p class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100">
            <button onclick="cotizarEnvio();" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.address.shipping">
                Cotizar Envío
            </button>
        </p>`;
    
    addressSelect = document.getElementById("address");
    doPost('address/get', { })
    .then((addressResponse) => addressResponse.json())
    .then((addressJSON) => {
        if(addressJSON.status_code === 200) {
            addressCache = addressJSON.data;
            addressSelect.innerHTML = getAddressOptionsFromJson(addressJSON.data, addressSelect.value);
        }

        parseTranslations();
    });
}

function doCheckout(button, addressId) {
    if(button.disabled) return;

    button.disabled = true;
    button.innerHTML = "Procesando...";

    if(addressId) payload = { 'address_id': addressId };
    else payload = { };

    doPost('orders/checkout/', payload)
    .then((response) => response.json())
    .then((json) => {
        if(json.status_code == 200) window.location = json.data;
    });
}

function verifyAllNotEmpty() {
    success = true;

    items = [];
    items.push(document.getElementById("streetnumber"));
    items.push(document.getElementById("street"));
    items.push(document.getElementById("city"));
    items.push(document.getElementById("province"));
    items.push(document.getElementById("address"));

    items.forEach((item) => {
        if(item.value == "") {
            item.setAttribute("style", "border-color: red");
            success = false;
        } else item.setAttribute("style", "");
    });

    verifyZipcode();
    parseTranslations();

    return success && verifyDNI();;
}

function updateShippingCost(addressId) {
    if(addressId) payload = { 'address_id': addressId };
    else payload = { };

    doPost('orders/cotizar', 
        payload
    ).then((response) => response.json())
    .then((json) => {
        itemsPrice = 0;

        if(!orderCache) {
            navigateToPage('/checkout', 'checkout.title', Checkout_Cart_Load);
            return;
        }

        for(i = 0; i < orderCache.length; i = i + 1) {
            item = orderCache[i];

            itemsPrice = itemsPrice + item.product.price * item.amount;
            itemsPrice = itemsPrice - ((item.product.offer ?? item.product.price) * item.amount);
        }

        shippingCost = 0;
        if(json.status_code == 200) {
            shippingLine = `
                <td><p style="margin: 2%; font-weight: initial;" class="translate" key="checkout.finish.shipping">Costo del Envio: $</p></td>
                <td><p style="margin: 2%; font-weight: initial;">` + parsePrice(json.data) + `</p></td>`;
            
            shippingCost = json.data;

            document.getElementById("checkoutButton").innerHTML = `
            <button onclick="doCheckout(this,` + (addressId ?? -1) + `);" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.address.continue">
                Continuar a pagar
            </button>`;
        } else if(json.status_code == 400 && json.data.message == "TOO_BIG") {
            shippingLine = `
                <td colspan="2"><p style="margin: 2%; font-weight: initial;" class="translate" key="errors.checkout.TOO_BIG">El pedido es muy grande, comuníquese con nosotros o elimine items.</td>`;
            
        }

        document.getElementById("shipping-price").innerHTML = `
            <table style="text-align: right; width: 110%; right: 20px; position: relative; ">
                <tr>
                    <td><p style="margin: 2%; font-weight: initial;" class="translate" key="checkout.finish.products">Total de productos: $</p></td>
                    <td><p style="margin: 2%; font-weight: initial;">` + parsePrice(itemsPrice) + `</p></td>
                </tr>
                <tr>
                    ` + shippingLine + `
                </tr>
                <tr>
                    <td class="translate" key="checkout.finish.total">Total a pagar: $</td>
                    <td>` + parsePrice(itemsPrice + shippingCost) + `</td>
                </tr>
            </table>`;

        parseTranslations();
    });
}