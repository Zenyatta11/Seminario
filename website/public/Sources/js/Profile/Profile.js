
function Profile_Index_Load(main) {
    if(!isLoggedIn) {
        navigateToPage('/login', 'register.login', Login_Login_Load);
        return;
    }

    setPageSectionHeader('pages.account', 'pages.account');
    section = window.location.pathname.replace("/profile", "");

	main.innerHTML = `
        <article class="post-11798 page type-page status-publish hentry">
            <h2 class="entry-title" style="display: none;">Detalles de la cuenta</h2><span class="vcard"
                style="display: none;"><span class="fn"><a href="/author/rayocreativo/" title="Entradas de Rayo Creativo"
                        rel="author">Rayo Creativo</a></span></span><span class="updated"
                style="display:none">2018-05-24T04:14:12-03:00</span>
            <div class="page-content">
                <div class="woocommerce">
                    <nav class="woocommerce-MyAccount-navigation">
                        ` + getProfileNavbar(section) + `
                    </nav>

                    <div class="woocommerce-MyAccount-content">
                        <div class="align-left">
                            <div id="profile-content" class="box-content">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>`;
    
    getProfilePage(section, document.getElementById('profile-content'))
}

function getProfileNavbar() {
    return `
        <h5 class="font-weight-bold text-md text-uppercase pt-1 m-b-sm translate" key="pages.account">Mi cuenta</h5>
        <ul>
            <li
                class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-account` + (section.includes("account") ? ` is-active` : ``) + `">
                <a href="/profile/account/" class="translate" key="pages.profile.titles.profiles.account"
                    onclick="event.preventDefault(); navigateToPage('/profile/account/', 'pages.profile.titles.profiles.account', Profile_Index_Load);">Detalles de la cuenta</a>
            </li>
            <li
                class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--edit-address` + (section.includes("addresses") ? ` is-active` : ``) + `">
                <a href="/profile/addresses/" class="translate" key="pages.profile.titles.profiles.addresses"
                    onclick="event.preventDefault(); navigateToPage('/profile/addresses/', 'pages.profile.titles.profiles.addresses', Profile_Index_Load);">Domicilios</a>
            </li>
            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--downloads` + (section.includes("notifications") ? ` is-active` : ``) + `">
                <a href="/profile/notifications/" class="translate" key="pages.profile.titles.profiles.notifications"
                    onclick="event.preventDefault(); navigateToPage('/profile/notifications/', 'pages.profile.titles.profiles.notifications', Profile_Index_Load);">Notificaciones</a>
            </li>
            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--orders` + (section.includes("orders") || section == '' || section == '/' ? ` is-active` : ``) + `">
                <a href="/profile/orders" class="translate" key="pages.profile.titles.profiles.orders"
                    onclick="event.preventDefault(); navigateToPage('/profile/orders/', 'pages.profile.titles.profiles.orders', Profile_Index_Load);">Pedidos</a>
            </li>
            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--downloads` + (section.includes("questions") ? ` is-active` : ``) + `">
                <a href="/profile/questions/" class="translate" key="pages.profile.titles.profiles.questions"
                    onclick="event.preventDefault(); navigateToPage('/profile/questions/', 'pages.profile.titles.profiles.questions', Profile_Index_Load);">Consultas</a>
            </li>
            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--downloads` + (section.includes("reviews") ? ` is-active` : ``) + `">
                <a href="/profile/reviews/" class="translate" key="pages.profile.titles.profiles.reviews"
                    onclick="event.preventDefault(); navigateToPage('/profile/reviews/', 'pages.profile.titles.profiles.reviews', Profile_Index_Load);">Reseñas</a>
            </li>
            <li class="woocommerce-MyAccount-navigation-link woocommerce-MyAccount-navigation-link--customer-logout">
                <a class="translate" key="pages.profile.titles.profiles.logout" href="javascript:void(0);" onclick="event.preventDefault(); doUserLogout()">Cerrar Sesión</a>
            </li>
        </ul>`;
}

function getProfilePage(section, main) {
    switch(section) {
        case '/addresses/':
        case '/addresses': return Profile_Addresses_Load(main);
        case '/account/':
        case '/account': return Profile_Account_Load(main);
        case '/reviews/':
        case '/reviews': return Profile_Reviews_Load(main);
        case '/notifications/':
        case '/notifications': return Profile_Notifications_Load(main);
        case '/questions/':
        case '/questions': return Profile_Questions_Load(main);
        default: return Profile_Orders_Load(main);
    }
}

