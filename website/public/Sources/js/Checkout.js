function Checkout_Load(main) {
    main.innerHTML = `
<article class="post-11797 page type-page status-publish hentry">
    <div class="page-content">
        <div class="woocommerce">
            <div class="woocommerce-notices-wrapper"></div>
            <div class="row" id="customer_details">
                <div class="col-lg-7">
                    <div class="align-left">
                        <div class="box-content">
                            <div class="woocommerce-billing-fields clearfix">
                                <h3>Detalles de facturación</h3>
                                <div class="woocommerce-billing-fields__field-wrapper">
                                    <p class="form-row form-row-first validate-required woocommerce-validated"
                                        id="billing_first_name_field" data-priority="10"><label for="billing_first_name"
                                            class="">Nombre&nbsp;<abbr class="required"
                                                title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                name="billing_first_name" id="billing_first_name" placeholder=""
                                                value="" autocomplete="given-name"></span></p>
                                    <p class="form-row form-row-last validate-required woocommerce-validated"
                                        id="billing_last_name_field" data-priority="20"><label for="billing_last_name"
                                            class="">Apellidos&nbsp;<abbr class="required"
                                                title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                name="billing_last_name" id="billing_last_name" placeholder="" value=""
                                                autocomplete="family-name"></span></p>
                                    <p class="form-row form-row-wide" id="billing_company_field" data-priority="30">
                                        <label for="billing_company" class="">Nombre de la empresa&nbsp;<span
                                                class="optional">(opcional)</span></label><span
                                            class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                name="billing_company" id="billing_company" placeholder="" value=""
                                                autocomplete="organization"></span>
                                    </p>
                                    <p class="form-row form-row-wide address-field update_totals_on_change validate-required"
                                        id="billing_country_field" data-priority="40"><label for="billing_country"
                                            class="">País / Región&nbsp;<abbr class="required"
                                                title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><strong>Argentina</strong><input
                                                type="hidden" name="billing_country" id="billing_country" value="AR"
                                                autocomplete="country" class="country_to_state"
                                                readonly="readonly"></span></p>
                                    <p class="form-row address-field validate-required form-row-wide"
                                        id="billing_address_1_field" data-priority="50"><label for="billing_address_1"
                                            class="">Dirección de la calle&nbsp;<abbr class="required"
                                                title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                name="billing_address_1" id="billing_address_1"
                                                placeholder="Número de la casa y nombre de la calle" value=""
                                                autocomplete="address-line1"
                                                data-placeholder="Número de la casa y nombre de la calle"></span>
                                    </p>
                                    <p class="form-row address-field form-row-wide" id="billing_address_2_field"
                                        data-priority="60"><label for="billing_address_2"
                                            class="screen-reader-text">Apartamento, habitación, escalera,
                                            etc.&nbsp;<span class="optional">(opcional)</span></label><span
                                            class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                name="billing_address_2" id="billing_address_2"
                                                placeholder="Apartamento, habitación, etc. (opcional)" value=""
                                                autocomplete="address-line2"
                                                data-placeholder="Apartamento, habitación, etc. (opcional)"></span>
                                    </p>
                                    <p class="form-row address-field validate-required form-row-wide"
                                        id="billing_city_field" data-priority="70"
                                        data-o_class="form-row form-row-wide address-field validate-required"><label
                                            for="billing_city" class="">Población&nbsp;<abbr class="required"
                                                title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                name="billing_city" id="billing_city" placeholder="" value=""
                                                autocomplete="address-level2"></span></p>
                                    <p class="form-row address-field validate-required validate-state form-row-wide"
                                        id="billing_state_field" data-priority="80"
                                        data-o_class="form-row form-row-wide address-field validate-required validate-state">
                                        <label for="billing_state" class="">Región / Provincia&nbsp;<abbr
                                                class="required" title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><select name="billing_state"
                                                id="billing_state" class="state_select select2-hidden-accessible"
                                                autocomplete="address-level1" data-placeholder="Elige una opción…"
                                                data-input-classes="" data-label="Región / Provincia" tabindex="-1"
                                                aria-hidden="true">
                                                <option value="">Elige una opción…</option>
                                                <option value="C">Ciudad Autónoma de Buenos Aires</option>
                                                <option value="B">Buenos Aires</option>
                                                <option value="K">Catamarca</option>
                                                <option value="H">Chaco</option>
                                                <option value="U">Chubut</option>
                                                <option value="X">Córdoba</option>
                                                <option value="W">Corrientes</option>
                                                <option value="E">Entre Ríos</option>
                                                <option value="P">Formosa</option>
                                                <option value="Y">Jujuy</option>
                                                <option value="L">La Pampa</option>
                                                <option value="F">La Rioja</option>
                                                <option value="M">Mendoza</option>
                                                <option value="N">Misiones</option>
                                                <option value="Q">Neuquén</option>
                                                <option value="R">Río Negro</option>
                                                <option value="A">Salta</option>
                                                <option value="J">San Juan</option>
                                                <option value="D">San Luis</option>
                                                <option value="Z">Santa Cruz</option>
                                                <option value="S">Santa Fe</option>
                                                <option value="G">Santiago del Estero</option>
                                                <option value="V">Tierra del Fuego</option>
                                                <option value="T">Tucumán</option>
                                            </select><span class="select2 select2-container select2-container--default"
                                                dir="ltr" style="width: 100%;"><span class="selection"><span
                                                        class="select2-selection select2-selection--single"
                                                        aria-haspopup="true" aria-expanded="false" tabindex="0"
                                                        aria-label="Región / Provincia" role="combobox"><span
                                                            class="select2-selection__rendered"
                                                            id="select2-billing_state-container" role="textbox"
                                                            aria-readonly="true" title="Buenos Aires">Buenos
                                                            Aires</span><span class="select2-selection__arrow"
                                                            role="presentation"><b
                                                                role="presentation"></b></span></span></span><span
                                                    class="dropdown-wrapper" aria-hidden="true"></span></span></span>
                                    </p>
                                    <p class="form-row address-field validate-required validate-postcode form-row-wide"
                                        id="billing_postcode_field" data-priority="90"
                                        data-o_class="form-row form-row-wide address-field validate-required validate-postcode">
                                        <label for="billing_postcode" class="">Código postal&nbsp;<abbr class="required"
                                                title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                name="billing_postcode" id="billing_postcode" placeholder="" value=""
                                                autocomplete="postal-code"></span>
                                    </p>
                                    <p class="form-row form-row-wide validate-required validate-phone"
                                        id="billing_phone_field" data-priority="100"><label for="billing_phone"
                                            class="">Teléfono&nbsp;<abbr class="required"
                                                title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><input type="tel" class="input-text "
                                                name="billing_phone" id="billing_phone" placeholder="" value=""
                                                autocomplete="tel"></span></p>
                                    <p class="form-row form-row-wide validate-required validate-email"
                                        id="billing_email_field" data-priority="110"><label for="billing_email"
                                            class="">Dirección de correo electrónico&nbsp;<abbr class="required"
                                                title="obligatorio">*</abbr></label><span
                                            class="woocommerce-input-wrapper"><input type="email" class="input-text "
                                                name="billing_email" id="billing_email" placeholder=""
                                                value="sadfa@mailinator.com" autocomplete="email username"></span></p>
                                </div>
                            </div>
                            <div class="woocommerce-shipping-fields mb-4">
                                <div id="ship-to-different-address" class="porto-checkbox">
                                    <input id="ship-to-different-address-checkbox"
                                        class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox porto-control-input"
                                        type="checkbox" name="ship_to_different_address" value="1">
                                    <label
                                        class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox porto-control-label ps-1 font-size-md"
                                        for="ship-to-different-address-checkbox">
                                        <span>¿Enviar a una dirección diferente?</span>
                                    </label>
                                </div>
                                <div class="shipping_address" style="display: none;">
                                    <div class="woocommerce-shipping-fields__field-wrapper">
                                        <p class="form-row form-row-first validate-required"
                                            id="shipping_first_name_field" data-priority="10"><label
                                                for="shipping_first_name" class="">Nombre&nbsp;<abbr class="required"
                                                    title="obligatorio">*</abbr></label><span
                                                class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                    name="shipping_first_name" id="shipping_first_name" placeholder=""
                                                    value="" autocomplete="given-name"></span></p>
                                        <p class="form-row form-row-last validate-required"
                                            id="shipping_last_name_field" data-priority="20"><label
                                                for="shipping_last_name" class="">Apellidos&nbsp;<abbr class="required"
                                                    title="obligatorio">*</abbr></label><span
                                                class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                    name="shipping_last_name" id="shipping_last_name" placeholder=""
                                                    value="" autocomplete="family-name"></span></p>
                                        <p class="form-row form-row-wide" id="shipping_company_field"
                                            data-priority="30"><label for="shipping_company" class="">Nombre de la
                                                empresa&nbsp;<span class="optional">(opcional)</span></label><span
                                                class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                    name="shipping_company" id="shipping_company" placeholder=""
                                                    value="" autocomplete="organization"></span></p>
                                        <p class="form-row form-row-wide address-field update_totals_on_change validate-required"
                                            id="shipping_country_field" data-priority="40"><label for="shipping_country"
                                                class="">País / Región&nbsp;<abbr class="required"
                                                    title="obligatorio">*</abbr></label><span
                                                class="woocommerce-input-wrapper"><strong>Argentina</strong><input
                                                    type="hidden" name="shipping_country" id="shipping_country"
                                                    value="AR" autocomplete="country" class="country_to_state"
                                                    readonly="readonly"></span></p>
                                        <p class="form-row address-field validate-required form-row-wide"
                                            id="shipping_address_1_field" data-priority="50"><label
                                                for="shipping_address_1" class="">Dirección de la calle&nbsp;<abbr
                                                    class="required" title="obligatorio">*</abbr></label><span
                                                class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                    name="shipping_address_1" id="shipping_address_1"
                                                    placeholder="Número de la casa y nombre de la calle" value=""
                                                    autocomplete="address-line1"
                                                    data-placeholder="Número de la casa y nombre de la calle"></span>
                                        </p>
                                        <p class="form-row address-field form-row-wide" id="shipping_address_2_field"
                                            data-priority="60"><label for="shipping_address_2"
                                                class="screen-reader-text">Apartamento,
                                                habitación, escalera, etc.&nbsp;<span
                                                    class="optional">(opcional)</span></label><span
                                                class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                    name="shipping_address_2" id="shipping_address_2"
                                                    placeholder="Apartamento, habitación, etc. (opcional)" value=""
                                                    autocomplete="address-line2"
                                                    data-placeholder="Apartamento, habitación, etc. (opcional)"></span>
                                        </p>
                                        <p class="form-row address-field validate-required form-row-wide"
                                            id="shipping_city_field" data-priority="70"
                                            data-o_class="form-row form-row-wide address-field validate-required">
                                            <label for="shipping_city" class="">Población&nbsp;<abbr class="required"
                                                    title="obligatorio">*</abbr></label><span
                                                class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                    name="shipping_city" id="shipping_city" placeholder="" value=""
                                                    autocomplete="address-level2"></span>
                                        </p>
                                        <p class="form-row address-field validate-required validate-state form-row-wide"
                                            id="shipping_state_field" data-priority="80"
                                            data-o_class="form-row form-row-wide address-field validate-required validate-state">
                                            <label for="shipping_state" class="">Región / Provincia&nbsp;<abbr
                                                    class="required" title="obligatorio">*</abbr></label><span
                                                class="woocommerce-input-wrapper"><select name="shipping_state"
                                                    id="shipping_state" class="state_select select2-hidden-accessible"
                                                    autocomplete="address-level1" data-placeholder="Elige una opción…"
                                                    data-input-classes="" data-label="Región / Provincia" tabindex="-1"
                                                    aria-hidden="true">
                                                    <option value="">Elige una opción…</option>
                                                    <option value="C">Ciudad Autónoma de Buenos Aires</option>
                                                    <option value="B">Buenos Aires</option>
                                                    <option value="K">Catamarca</option>
                                                    <option value="H">Chaco</option>
                                                    <option value="U">Chubut</option>
                                                    <option value="X">Córdoba</option>
                                                    <option value="W">Corrientes</option>
                                                    <option value="E">Entre Ríos</option>
                                                    <option value="P">Formosa</option>
                                                    <option value="Y">Jujuy</option>
                                                    <option value="L">La Pampa</option>
                                                    <option value="F">La Rioja</option>
                                                    <option value="M">Mendoza</option>
                                                    <option value="N">Misiones</option>
                                                    <option value="Q">Neuquén</option>
                                                    <option value="R">Río Negro</option>
                                                    <option value="A">Salta</option>
                                                    <option value="J">San Juan</option>
                                                    <option value="D">San Luis</option>
                                                    <option value="Z">Santa Cruz</option>
                                                    <option value="S">Santa Fe</option>
                                                    <option value="G">Santiago del Estero</option>
                                                    <option value="V">Tierra del Fuego</option>
                                                    <option value="T">Tucumán</option>
                                                </select><span
                                                    class="select2 select2-container select2-container--default"
                                                    dir="ltr" style="width: 100%;"><span class="selection"><span
                                                            class="select2-selection select2-selection--single"
                                                            aria-haspopup="true" aria-expanded="false" tabindex="0"
                                                            aria-label="Región / Provincia" role="combobox"><span
                                                                class="select2-selection__rendered"
                                                                id="select2-shipping_state-container" role="textbox"
                                                                aria-readonly="true" title="Buenos Aires">Buenos
                                                                Aires</span><span class="select2-selection__arrow"
                                                                role="presentation"><b
                                                                    role="presentation"></b></span></span></span><span
                                                        class="dropdown-wrapper"
                                                        aria-hidden="true"></span></span></span>
                                        </p>
                                        <p class="form-row address-field validate-required validate-postcode form-row-wide"
                                            id="shipping_postcode_field" data-priority="90"
                                            data-o_class="form-row form-row-wide address-field validate-required validate-postcode">
                                            <label for="shipping_postcode" class="">Código postal&nbsp;<abbr
                                                    class="required" title="obligatorio">*</abbr></label><span
                                                class="woocommerce-input-wrapper"><input type="text" class="input-text "
                                                    name="shipping_postcode" id="shipping_postcode" placeholder=""
                                                    value="" autocomplete="postal-code"></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="woocommerce-additional-fields">
                                <div class="woocommerce-additional-fields__field-wrapper">
                                    <p class="form-row notes" id="order_comments_field" data-priority=""><label
                                            for="order_comments" class="">Notas del pedido&nbsp;<span
                                                class="optional">(opcional)</span></label><span
                                            class="woocommerce-input-wrapper"><textarea name="order_comments"
                                                class="input-text " id="order_comments"
                                                placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
                                                rows="2" cols="5"></textarea></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="align-left">
                        <div class="checkout-order-review align-left">
                            <div class="box-content featured-boxes">
                                <h3 id="order_review_heading" class="text-md text-uppercase">Tu pedido</h3>
                                <div id="order_review" class="woocommerce-checkout-review-order">
                                    <table class="shop_table review-order woocommerce-checkout-review-order-table mb-0">
                                        <thead>
                                            <tr>
                                                <th colspan="2" class="product-name">
                                                    <h4 class="mb-0">Producto</h4>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-bottom-0 cart_item">
                                                <td class="product-name line-height-sm">
                                                    Primer Tramo Puntero Caña Lexus Pride L67 - 9 Pies marca
                                                    Lexus&nbsp; <strong
                                                        class="product-quantity font-weight-medium">×&nbsp;1</strong>
                                                </td>
                                                <td class="product-total">
                                                    <span class="woocommerce-Price-amount amount"><bdi><span
                                                                class="woocommerce-Price-currencySymbol">$</span>21,429</bdi></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr class="cart-subtotal">
                                                <th>
                                                    <h4 class="mb-0">Subtotal</h4>
                                                </th>
                                                <td><span class="woocommerce-Price-amount amount"><bdi><span
                                                                class="woocommerce-Price-currencySymbol">$</span>21,429</bdi></span>
                                                </td>
                                            </tr>
                                            <tr class="order-total">
                                                <th>
                                                    <h4 class="text-md my-3">Total</h4>
                                                </th>
                                                <td><strong><span class="woocommerce-Price-amount amount"><bdi><span
                                                                    class="woocommerce-Price-currencySymbol">$</span>21,429</bdi></span></strong>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div id="payment" class="woocommerce-checkout-payment">
                                        <div class="porto-separator m-b-md">
                                            <hr class="separator-line  align_center">
                                        </div>
                                        <h4 class="px-2">Métodos de pago</h4>
                                        <ul class="wc_payment_methods payment_methods methods px-2">
                                            <li class="wc_payment_method payment_method_jetpack_custom_gateway_2">
                                                <div class="porto-radio">
                                                    <input id="payment_method_jetpack_custom_gateway_2" type="radio"
                                                        class="input-radio porto-control-input" name="payment_method"
                                                        value="jetpack_custom_gateway_2" data-order_button_text="">

                                                    <label class="porto-control-label"
                                                        for="payment_method_jetpack_custom_gateway_2">
                                                        Transferencia Bancaria 10% OFF </label>
                                                </div>
                                                <div class="payment_box payment_method_jetpack_custom_gateway_2"
                                                    style="display:none;">
                                                    <p>Deposite el monto de su compra a:</p>
                                                    <p>Banco Itau</p>
                                                    <p>Caja de ahorro<br>
                                                        CBU: 2590087520044744630176<br>
                                                        Nro. de cuenta: 0447446-301/7<br>
                                                        Documento primer Titular DNI: 93.506.733<br>
                                                        Cuil: 27-93506733-8<br>
                                                        Alias: latuquitagudrun</p>
                                                    <p>Nombre primer Titular: GUDRUN BOCKSCH</p>
                                                    <p>Luego informe su transferencia o deposito a
                                                        info@florida-camping.com.ar</p>
                                                </div>
                                            </li>
                                            <li class="wc_payment_method payment_method_woo-mercado-pago-basic">
                                                <div class="porto-radio">
                                                    <input id="payment_method_woo-mercado-pago-basic" type="radio"
                                                        class="input-radio porto-control-input" name="payment_method"
                                                        value="woo-mercado-pago-basic" checked="checked"
                                                        data-order_button_text="">

                                                    <label class="porto-control-label"
                                                        for="payment_method_woo-mercado-pago-basic">
                                                        Paga con MercadoPago <img
                                                            src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/icons/mercadopago.png"
                                                            alt="Paga con MercadoPago"> </label>
                                                </div>
                                                <div class="payment_box payment_method_woo-mercado-pago-basic">
                                                    <div class="mp-checkout-container">
                                                        <div class="mp-checkout-pro-container">
                                                            <div class="mp-checkout-pro-content">

                                                                <div class="mp-checkout-pro-checkout-benefits">
                                                                    <checkout-benefits
                                                                        title="Inicia sesión en Mercado Pago y obtén beneficios"
                                                                        title-align="center"
                                                                        items="[{&quot;title&quot;:&quot;Paga r\u00e1pido&quot;,&quot;subtitle&quot;:&quot;Usa tu dinero disponible o tarjetas guardadas.&quot;,&quot;image&quot;:{&quot;src&quot;:&quot;https:\/\/www.florida-camping.com.ar\/wp-content\/plugins\/woocommerce-mercadopago\/includes\/..\/assets\/images\/blue-wallet.png&quot;,&quot;alt&quot;:&quot;Blue wallet image&quot;}},{&quot;title&quot;:&quot;Accede a cuotas&quot;,&quot;subtitle&quot;:&quot;Paga con o sin tarjeta de cr\u00e9dito.&quot;,&quot;image&quot;:{&quot;src&quot;:&quot;https:\/\/www.florida-camping.com.ar\/wp-content\/plugins\/woocommerce-mercadopago\/includes\/..\/assets\/images\/blue-phone-installments.png&quot;,&quot;alt&quot;:&quot;Blue phone installments image&quot;}},{&quot;title&quot;:&quot;Compra con confianza&quot;,&quot;subtitle&quot;:&quot;Recibe ayuda si tienes alg\u00fan problema con tu compra.&quot;,&quot;image&quot;:{&quot;src&quot;:&quot;https:\/\/www.florida-camping.com.ar\/wp-content\/plugins\/woocommerce-mercadopago\/includes\/..\/assets\/images\/blue-protection.png&quot;,&quot;alt&quot;:&quot;Blue protection image&quot;}}]"
                                                                        list-mode="image">
                                                                        <div class="mp-checkout-benefits-container">
                                                                            <p class="mp-checkout-benefits-title"
                                                                                style="text-align: center !important;">
                                                                                Inicia sesión en Mercado Pago y
                                                                                obtén beneficios</p>
                                                                            <div class="mp-checkout-benefits-list">
                                                                                <div class="mp-checkout-benefits-item">
                                                                                    <div
                                                                                        class="mp-checkout-benefits-image-list">
                                                                                        <img class="mp-checkout-benefits-image"
                                                                                            src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/blue-wallet.png"
                                                                                            alt="Blue wallet image">
                                                                                    </div><span>
                                                                                        <p
                                                                                            class="mp-checkout-benefits-item-title">
                                                                                            Paga rápido</p>
                                                                                        <p
                                                                                            class="mp-checkout-benefits-item-subtitle">
                                                                                            Usa tu dinero disponible
                                                                                            o tarjetas guardadas.
                                                                                        </p>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="mp-checkout-benefits-item">
                                                                                    <div
                                                                                        class="mp-checkout-benefits-image-list">
                                                                                        <img class="mp-checkout-benefits-image"
                                                                                            src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/blue-phone-installments.png"
                                                                                            alt="Blue phone installments image">
                                                                                    </div><span>
                                                                                        <p
                                                                                            class="mp-checkout-benefits-item-title">
                                                                                            Accede a cuotas</p>
                                                                                        <p
                                                                                            class="mp-checkout-benefits-item-subtitle">
                                                                                            Paga con o sin tarjeta
                                                                                            de crédito.</p>
                                                                                    </span>
                                                                                </div>
                                                                                <div class="mp-checkout-benefits-item">
                                                                                    <div
                                                                                        class="mp-checkout-benefits-image-list">
                                                                                        <img class="mp-checkout-benefits-image"
                                                                                            src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/blue-protection.png"
                                                                                            alt="Blue protection image">
                                                                                    </div><span>
                                                                                        <p
                                                                                            class="mp-checkout-benefits-item-title">
                                                                                            Compra con confianza</p>
                                                                                        <p
                                                                                            class="mp-checkout-benefits-item-subtitle">
                                                                                            Recibe ayuda si tienes
                                                                                            algún problema con tu
                                                                                            compra.</p>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </checkout-benefits>
                                                                </div>
                                                                <div class="mp-checkout-pro-payment-methods">
                                                                    <payment-methods-v2
                                                                        title="Medios de pago disponibles"
                                                                        methods="[{&quot;src&quot;:&quot;https:\/\/www.florida-camping.com.ar\/wp-content\/plugins\/woocommerce-mercadopago\/includes\/..\/assets\/images\/mercado-credito.png&quot;,&quot;alt&quot;:&quot;Credits image&quot;}]">
                                                                        <div class="mp-payment-methods-v2-container">
                                                                            <div class="mp-payment-methods-v2-content">
                                                                                <p class="mp-payment-methods-v2-title">
                                                                                    Medios de pago disponibles</p>
                                                                                <div class="mp-payment-methods-v2-list">
                                                                                    <payment-method-logo
                                                                                        src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/mercado-credito.png"
                                                                                        alt="Credits image">
                                                                                        <div
                                                                                            class="mp-payment-method-logo-container">
                                                                                            <img class="mp-payment-method-logo-image"
                                                                                                alt="Credits image"
                                                                                                src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/mercado-credito.png">
                                                                                        </div>
                                                                                    </payment-method-logo>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </payment-methods-v2>
                                                                </div>
                                                                <div class="mp-checkout-pro-redirect">
                                                                    <checkout-redirect-v2
                                                                        text="Al continuar, te llevaremos a Mercado Pago para completar tu compra de forma segura."
                                                                        src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/cho-pro-redirect-v2.png"
                                                                        alt="Imagen de redirección de Checkout Pro">
                                                                        <div class="mp-checkout-redirect-v2-container"
                                                                            data-cy="checkout-redirect-v2-container">
                                                                            <img class="mp-checkout-redirect-v2-image"
                                                                                src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/cho-pro-redirect-v2.png"
                                                                                alt="Imagen de redirección de Checkout Pro">
                                                                            <p class="mp-checkout-redirect-v2-text">
                                                                                Al continuar, te llevaremos a
                                                                                Mercado Pago para completar tu
                                                                                compra de forma segura.</p>
                                                                        </div>
                                                                    </checkout-redirect-v2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mp-checkout-pro-terms-and-conditions">
                                                            <terms-and-conditions
                                                                description="Al continuar, aceptas nuestros"
                                                                link-text="Términos y condiciones"
                                                                link-src="https://www.mercadopago.com.ar/ayuda/terminos-y-politicas_194">
                                                                <div class="mp-terms-and-conditions-container"
                                                                    data-cy="terms-and-conditions-container"><span
                                                                        class="mp-terms-and-conditions-text">Al
                                                                        continuar, aceptas nuestros</span><a
                                                                        class="mp-terms-and-conditions-link"
                                                                        href="https://www.mercadopago.com.ar/ayuda/terminos-y-politicas_194"
                                                                        target="blank">Términos y condiciones</a>
                                                                </div>
                                                            </terms-and-conditions>
                                                        </div>
                                                    </div>

                                                    <script type="text/javascript">
                                                        if (document.getElementById("payment_method_woo-mercado-pago-custom")) {
                                                            jQuery("form.checkout").on(
                                                                "checkout_place_order_woo-mercado-pago-basic",
                                                                function () {
                                                                    cardFormLoad();
                                                                }
                                                            );
                                                        }
                                                    </script>
                                                </div>
                                            </li>
                                            <li class="wc_payment_method payment_method_woo-mercado-pago-credits">
                                                <div class="porto-radio">
                                                    <input id="payment_method_woo-mercado-pago-credits" type="radio"
                                                        class="input-radio porto-control-input" name="payment_method"
                                                        value="woo-mercado-pago-credits" data-order_button_text="">

                                                    <label class="porto-control-label"
                                                        for="payment_method_woo-mercado-pago-credits">
                                                        Hasta 12 pagos sin tarjeta con Mercado Pago <img
                                                            src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/icons/mercadopago.png"
                                                            alt="Hasta 12 pagos sin tarjeta con Mercado Pago">
                                                    </label>
                                                </div>
                                                <div class="payment_box payment_method_woo-mercado-pago-credits"
                                                    style="display:none;">
                                                    <div class="mp-checkout-container">
                                                        <div class="mp-checkout-pro-container">
                                                            <div class="mp-checkout-pro-content">

                                                                <checkout-benefits title="¿Cómo usar?"
                                                                    title-align="left" items="[
&quot;<b>Inicia sesión o crea una cuenta en Mercado Pago.</b> Si has usado Mercado Libre para comprar, ¡ya tienes una!&quot;,
&quot;Conoce el límite disponible de tu línea de crédito y <b> elige el plazo en el que quieres pagar</b> tu compra.&quot;,
&quot;<b>Paga mes a mes con el medio de pago que prefieras.</b> ¡Todo desde la app de Mercado Pago!&quot;
]" list-mode="count">
                                                                    <div class="mp-checkout-benefits-container">
                                                                        <p class="mp-checkout-benefits-title"
                                                                            style="text-align: left !important;">
                                                                            ¿Cómo usar?</p>
                                                                        <div class="mp-checkout-benefits-list">
                                                                            <div class="mp-checkout-benefits-item">
                                                                                <div
                                                                                    class="mp-checkout-benefits-count-list-div">
                                                                                    <p
                                                                                        class="mp-checkout-benefits-count-list-item">
                                                                                        1</p>
                                                                                </div><span><b>Inicia sesión o crea
                                                                                        una cuenta en Mercado
                                                                                        Pago.</b> Si has usado
                                                                                    Mercado Libre para comprar, ¡ya
                                                                                    tienes una!</span>
                                                                            </div>
                                                                            <div class="mp-checkout-benefits-item">
                                                                                <div
                                                                                    class="mp-checkout-benefits-count-list-div">
                                                                                    <p
                                                                                        class="mp-checkout-benefits-count-list-item">
                                                                                        2</p>
                                                                                </div><span>Conoce el límite
                                                                                    disponible de tu línea de
                                                                                    crédito y <b> elige el plazo en
                                                                                        el que quieres pagar</b> tu
                                                                                    compra.</span>
                                                                            </div>
                                                                            <div class="mp-checkout-benefits-item">
                                                                                <div
                                                                                    class="mp-checkout-benefits-count-list-div">
                                                                                    <p
                                                                                        class="mp-checkout-benefits-count-list-item">
                                                                                        3</p>
                                                                                </div><span><b>Paga mes a mes con el
                                                                                        medio de pago que
                                                                                        prefieras.</b> ¡Todo desde
                                                                                    la app de Mercado Pago!</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </checkout-benefits>
                                                                <div class="mp-checkout-pro-redirect">
                                                                    <checkout-redirect-v2
                                                                        text="Al continuar, te llevaremos a Mercado Pago para completar tu compra de forma segura."
                                                                        alt="Imagen de redirección de Checkout Pro"
                                                                        src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/cho-pro-redirect-v2.png">
                                                                        <div class="mp-checkout-redirect-v2-container"
                                                                            data-cy="checkout-redirect-v2-container">
                                                                            <img class="mp-checkout-redirect-v2-image"
                                                                                src="https://www.florida-camping.com.ar/wp-content/plugins/woocommerce-mercadopago/includes/../assets/images/cho-pro-redirect-v2.png"
                                                                                alt="Imagen de redirección de Checkout Pro">
                                                                            <p class="mp-checkout-redirect-v2-text">
                                                                                Al continuar, te llevaremos a
                                                                                Mercado Pago para completar tu
                                                                                compra de forma segura.</p>
                                                                        </div>
                                                                    </checkout-redirect-v2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mp-checkout-pro-terms-and-conditions">
                                                            <terms-and-conditions
                                                                description="Al continuar, aceptas nuestros"
                                                                link-text="Términos y condiciones"
                                                                link-src="https://www.mercadopago.com.ar/ayuda/terminos-y-politicas_194">
                                                                <div class="mp-terms-and-conditions-container"
                                                                    data-cy="terms-and-conditions-container"><span
                                                                        class="mp-terms-and-conditions-text">Al
                                                                        continuar, aceptas nuestros</span><a
                                                                        class="mp-terms-and-conditions-link"
                                                                        href="https://www.mercadopago.com.ar/ayuda/terminos-y-politicas_194"
                                                                        target="blank">Términos y condiciones</a>
                                                                </div>
                                                            </terms-and-conditions>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="porto-separator m-b-lg">
                                            <hr class="separator-line  align_center">
                                        </div>
                                        <div class="form-row place-order">
                                            <noscript>
                                                Debido a que tu navegador no es compatible con JavaScript o lo tiene
                                                desactivado, por favor, asegúrate de hacer clic en el botón
                                                <em>Actualizar totales</em> antes de realizar tu pedido. De no
                                                hacerlo, se te podría cobrar más de la cantidad indicada arriba.
                                                <br /><button type="submit" class="button alt"
                                                    name="woocommerce_checkout_update_totals"
                                                    value="Actualizar totales">Actualizar totales</button>
                                            </noscript>

                                            <div class="woocommerce-terms-and-conditions-wrapper">
                                                <div class="woocommerce-privacy-policy-text"></div>
                                            </div>
                                            <button type="submit" class="button alt btn-v-dark w-100 mt-3 py-3"
                                                name="woocommerce_checkout_place_order" id="place_order"
                                                value="Realizar el pedido" data-value="Realizar el pedido">Realizar
                                                el pedido</button><img
                                                src="https://www.florida-camping.com.ar/wp-content/themes/porto/images/ajax-loader.gif"
                                                srcset="https://www.florida-camping.com.ar/wp-content/themes/porto/images/ajax-loader@2x.gif 2x"
                                                alt="loader">
                                            <input type="hidden" id="woocommerce-process-checkout-nonce"
                                                name="woocommerce-process-checkout-nonce" value="261ef0d621"><input
                                                type="hidden" name="_wp_http_referer"
                                                value="/?wc-ajax=update_order_review">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>`;
}