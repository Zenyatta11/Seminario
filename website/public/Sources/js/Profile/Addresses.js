var addressCache;

function Profile_Addresses_Load(main) {
    setPageSectionHeader('pages.account/pages.profile.titles.addresses', 'pages.profile.titles.addresses');

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
                if(selectedAddress) {
                    selectedProvince = selectedAddress.province_id;
                    selectedCity = selectedAddress.city_id;
                } else {
                    userData.address = undefined;
                }
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
                                citiesOptionsSelected = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.ciudad"), citiesJSON.data, 'city_id', 'name', selectedCity);
                                showProfileAddressPage(main, addressList, provinceOptionsSelected, citiesOptionsSelected, selectedAddress);
                                setProfileAddressDefaultButtons();
                                disableAllFields();
                                document.getElementById("address").disabled = false;

                            }
                        });
                    } else {
                        showProfileAddressPage(main, addressList, provinceOptionsSelected, null, selectedAddress);
                        setProfileAddressDefaultButtons();
                        disableAllFields();
                        document.getElementById("address").disabled = false;
                    }
                }
            });
        }
    });
}

function showProfileAddressPage(main, addressList, provinceOptionsSelected, citiesOptionsSelected, address) {
    pageToShow = `
        <div class="woocommerce-notices-wrapper"></div>
        
        <h3 class="account-sub-title mb-4 mt-2">
            <svg class="svg-inline--fa fa-user fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
            <span class="translate" key="pages.profile.titles.profiles.addresses">Domicilios</span>
        </h3>

        <div class="account-sub-title mb-4 mt-2">
            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-2">
                <select onchange="updateProfileAddressList(this)" id="address" name="address" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl">
                    ` + addressList + `
                </select>
            </p>
            <p class="woocommerce-FormRow woocommerce-FormRow--first form-row form-row-first">
                <label class="mb-1 font-weight-medium" for="province">
                    <span class="translate" key="checkout.address.province">Provincia</span>
                    <span class="required">*</span>
                </label>
                <select onchange="onProfileAddressProvinceUpdated(this);" id="province" name="province" class="woocommerce-Input woocommerce-Input--text input-text line-height-xl">
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
                    autocomplete="street" value="` + (address?.street ?? "") + `"/>
            </p>
            <p class="woocommerce-FormRow woocommerce-FormRow--last form-row form-row-last">
                <label class="mb-1 font-weight-medium" for="streetnumber">
                    <span class="translate" key="checkout.address.streetnumber">N°</span>
                    <span class="required">*</span>
                </label>
                <input type="number" onblur="verifyNotEmpty(this);"
                    class="woocommerce-Input woocommerce-Input--number input-number line-height-xl"
                    name="streetnumber" id="streetnumber"
                    autocomplete="streetnumber" value="` + (address?.number ?? "") + `"/>
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
                    onblur="verifyProfileAddressZipcode();" name="zipcode" id="zipcode"
                    autocomplete="zipcode" value="` + (address?.zip_code ?? "") + `"/>
            </p>
            <p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide mb-2">
                <label class="mb-1 font-weight-medium" for="extra">
                    <span class="translate" key="checkout.address.extra">Aclaraciones</span>
                </label>
                <textarea id="extra" name="extra">` + (address?.extra ?? "") + `</textarea>
            </p>

            <p id="status-bar" class="status">&nbsp;</p>

            <div class="woocommerce-LostPassword lost_password d-flex flex-column flex-sm-row justify-content-between mb-4">
                <div class="porto-checkbox my-2 my-sm-0" style="margin-left: auto; margin-right: 0px;">
                    <span id="shipping-price"></span>
                </div>
            </div>

            <div id="button-panel">
            </div>
        </div>`;
    main.innerHTML = pageToShow;

    parseTranslations();
    setProfileAddressDefaultButtons();
    disableAllFields();
    document.getElementById("address").disabled = false;
}

function updateProfileAddressList(item) {
    userData.address = item.value;
    setProfileAddressDefaultButtons();
    disableAllFields();
    document.getElementById("address").disabled = false;

    if(item.value == -1) {
        enableAllFields();
        setProfileAddressSaveButton();

        document.getElementById("zipcode").value = "";
        document.getElementById("streetnumber").value = "";
        document.getElementById("street").value = "";
        document.getElementById("extra").value = "";
        document.getElementById("city").innerHTML = '<option disabled selected>Seleccione una provincia</option>';

        doPost('provinces/get', { })
        .then((provinceResponse) => provinceResponse.json())
        .then((provinceJSON) => {
            if(provinceJSON.status_code === 200) {
                document.getElementById("province").innerHTML = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.province"), provinceJSON.data, 'province_id', 'name');
                parseTranslations();
            }
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
}

function saveAddress() {
    disableAllFields();
    document.getElementById("address").disabled = false;

    if(!verifyProfileAllNotEmpty()) {
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
                    if(json.status_code == 200 && json.data != false) {
                        userData.address = json.data;
                        Profile_Addresses_Load(document.getElementById("profile-content"));
                    }
                    else document.getElementById("status-bar").innerHTML = json.data.message;

                    parseTranslations();
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
                    if(json.status_code == 200) {
                        resetProfileAddressForm();
                    } else document.getElementById("status-bar").innerHTML = json.data.message;

                    parseTranslations();
                });
            }

            resetProfileAddressForm();
        }
    });
}

function resetProfileAddressForm() {
    setProfileAddressDefaultButtons();
    disableAllFields();
    document.getElementById("address").disabled = false;
}

function setProfileAddressDefaultButtons() {
    document.getElementById("button-panel").innerHTML = `
        <p class="woocommerce-FormRow woocommerce-FormRow--first form-row form-row-first">
            <button onclick="enableAddressEditing();" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.address.modify">
                Editar Domicilio
            </button>
        </p>
        <p class="woocommerce-FormRow woocommerce-FormRow--last form-row form-row-last">
            <button onclick="deleteAddress()" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.address.delete">
                Eliminar
            </button>
        </p>`;

    parseTranslations();
}

function setProfileAddressSaveButton() {
    document.getElementById("button-panel").innerHTML = `
        <p class="woocommerce-FormRow woocommerce-FormRow--first form-row form-row-first">
            <button onclick="saveAddress();" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.address.save">
                Guardar
            </button>
        </p>
        <p class="woocommerce-FormRow woocommerce-FormRow--last form-row form-row-last">
            <button onclick="Profile_Addresses_Load(document.getElementById('profile-content'));" class="woocommerce-Button button login-btn btn-v-dark py-3 text-md w-100 translate" key="checkout.address.cancel">
                Cancelar
            </button>
        </p>`;

    parseTranslations();
}

function verifyProfileAllNotEmpty() {
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

    verifyProfileAddressZipcode();

    return success && verifyDNI();;
}


function onProfileAddressProvinceUpdated(item) {
    doPost('cities/get', 
        {
            'province_id': item.value
        }
    )
    .then((citiesResponse) => citiesResponse.json())
    .then((citiesJSON) => {
        if(citiesJSON.status_code === 200) {
            document.getElementById("city").innerHTML = getOptionsFromJson(getKeyFromJson(language, fallbackLanguage, "checkout.address.select.city"), citiesJSON.data, 'city_id', 'name');

            parseTranslations();
        }
    });

    verifyProfileAddressZipcode();
}

function verifyProfileAddressZipcode() {
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
            enableAddressEditing();
        } else if(json.status_code === 200) {
            zipcodeBox.setAttribute("style", "");
        }
    });
}  

function enableAddressEditing() {
    enableAllFields();
    setProfileAddressSaveButton();
    
    addressSelect = document.getElementById("address");
    doPost('address/get', { })
    .then((addressResponse) => addressResponse.json())
    .then((addressJSON) => {
        if(addressJSON.status_code === 200) {
            addressCache = addressJSON.data;
            addressSelect.innerHTML = getAddressOptionsFromJson(addressJSON.data, addressSelect.value);

            parseTranslations();
        }
    });
}

function deleteAddress() {
    addressId = document.getElementById("address").value;

    if(addressId === -1) return;
    doPost('address/delete', 
        {
            'address_id': addressId
        }
    ).then((addressResponse) => addressResponse.json())
    .then((addressJSON) => {
        if(addressJSON.status_code === 200) {
            Profile_Addresses_Load(document.getElementById('profile-content'));
        }
    });
}