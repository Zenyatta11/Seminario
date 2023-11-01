function showGuestPage() {
    document.getElementById("menu-top-navigation").innerHTML = `
        <li class="menu-item">
            <a class="porto-link-login" href="/login" onclick="event.preventDefault(); navigateToPage('/login', 'register.login', Login_Login_Load);">
                <svg class="svg-inline--fa fa-user fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
                <span class="translate" key="common.login">` + getKeyFromJson(language, fallbackLanguage, "common.login") + `</span>
            </a>
        </li>
        <li class="menu-item">
            <a class="porto-link-register" href="/register" onclick="event.preventDefault(); navigateToPage('/register', 'register.register', Login_Register_Load);">
                <svg class="svg-inline--fa fa-user-plus fa-w-20" aria-hidden="true" data-prefix="fas" data-icon="user-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
                <span class="translate" key="common.register">` + getKeyFromJson(language, fallbackLanguage, "common.register") + `</span>
            </a>
        </li>`
}

function showUserPage(name) {
    document.getElementById("menu-top-navigation").innerHTML = `
        <li class="menu-item">
            <a class="porto-link-login" href="/profile" onclick="event.preventDefault(); navigateToPage('/profile/orders', 'pages.profile.titles.profiles.profile', Profile_Index_Load);">
                <svg class="svg-inline--fa fa-user fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
                <span>` + name + `</span>
            </a>
        </li>
        <li class="menu-item">
            <a class="porto-link-register" href="javascript:void(0);" onclick="event.preventDefault(); doUserLogout()">
                <svg fill="#FFF" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 384.971 384.971" xml:space="preserve" style="width: 18px; height: 18px;">
                    <g>
                        <g id="Sign_Out">
                            <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
                            C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
                            C192.485,366.299,187.095,360.91,180.455,360.91z" />
                            <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
                            c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
                            c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
                        </g>
                        <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
                    </g>
                </svg>
                <span class="translate" key="common.logout">` + getKeyFromJson(language, fallbackLanguage, "common.logout") + `</span>
            </a>
        </li>`
}

let slideIndex = 0;

function Index_Load(main) {
    setPageSectionHeader('pages.home', 'pages.home');
    main.innerHTML = `
    <div data-elementor-type="wp-page" data-elementor-id="133" class="elementor elementor-133">
        <section
            class="elementor-section elementor-top-section elementor-element elementor-element-19843752 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="19843752" data-element_type="section">
            <div class="elementor-container elementor-column-gap-default">
                <div class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-66021e7a"
                    data-id="66021e7a" data-element_type="column">
                    <div class="elementor-widget-wrap elementor-element-populated e-swiper-container">
                        <div class="elementor-element elementor-element-4c04cd0 elementor-widget elementor-widget-image-carousel e-widget-swiper">
                            <div class="elementor-widget-container">
                                <div class="elementor-image-carousel-wrapper swiper-container swiper-container-fade swiper-container-initialized swiper-container-horizontal"
                                    dir="ltr">
                                    <div class="elementor-image-carousel swiper-wrapper" aria-live="off"
                                        style="transition-duration: 0ms;">
                                        <div class="swiper-slide swiper-slide-duplicate swiper-slide-next swiper-slide-duplicate-prev"
                                            role="group" aria-roledescription="slide" aria-label="2 de 2"
                                            data-swiper-slide-index="1"
                                            style="width: 900px;">
                                            <div class="slideshow-container" style="box-sizing:border-box">

                                                <div class="mySlides fade slider-active">
                                                    <div style="height: 90%;">
                                                        <img onerror="this.src='/Media/General/index_image.png'" src="/Media/General/Slider/0.png" alt="" width="1000" height="43" style="width:100%">
                                                    </div>
                                                    <div class="caption-text" style="bottom: -10%;">Unmatched offers!</div>
                                                </div>
                                            
                                                <div class="mySlides fade">
                                                    <div style="height: 90%;">
                                                        <img onerror="this.src='/Media/General/index_image.png'" src="/Media/General/Slider/1.png" alt="" width="1000" height="43" style="width:100%">
                                                    </div>
                                                    <div class="caption-text" style="bottom: -10%;">Try the next-gen websites!</div>
                                                </div>
                                            
                                                <div class="mySlides fade">
                                                    <div style="height: 90%;">
                                                        <img onerror="this.src='/Media/General/index_image.png'" src="/Media/General/Slider/2.png" alt="" width="1000" height="43" style="width:100%">
                                                    </div>
                                                    <div class="caption-text" style="bottom: -10%;">All of your electro needs!</div>
                                                </div>
                                            
                                                <a class="prev" onclick="moveSlide(-1)">&#10094;</a>
                                                <a class="next" onclick="moveSlide(1)">&#10095;</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="elementor-element elementor-element-2d501f33 elementor-widget elementor-widget-text-editor"
                            data-id="2d501f33" data-element_type="widget" data-widget_type="text-editor.default">
                            <div class="elementor-widget-container">
                                <p></p>
                                <div id="porto-products-8858" class="porto-products wpb_content_element ">
                                    <h2 class="section-title slider-title"><span class="inline-title translate" key="index.new">placeholder</span>
                                    <span class="line"></span></h2>
                                    <div class="slider-wrapper">
                                        <div class="woocommerce columns-4 ">
                                            <ul class="products products-container products-slider owl-carousel show-nav-middle pcols-lg-4 pcols-md-3 pcols-xs-3 pcols-ls-2 pwidth-lg-4 pwidth-md-3 pwidth-xs-2 pwidth-ls-1 is-shortcode owl-loaded owl-drag">
                                                <div class="owl-stage-outer owl-height" style="height: 389.55px;">
                                                    <div id="page-products-new" class="owl-stage" style="transition: all 0.25s ease 0s; width: 3720px;">
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="porto-products-8858" class="porto-products wpb_content_element ">
                                    <h2 class="section-title slider-title"><span class="inline-title translate" key="index.featured">placeholder</span><span
                                            class="line"></span></h2>
                                    <div class="slider-wrapper">
                                        <div class="woocommerce columns-4 ">
                                            <ul class="products products-container products-slider owl-carousel show-nav-middle pcols-lg-4 pcols-md-3 pcols-xs-3 pcols-ls-2 pwidth-lg-4 pwidth-md-3 pwidth-xs-2 pwidth-ls-1 is-shortcode owl-loaded owl-drag"
                                                data-plugin-options="{&quot;themeConfig&quot;:true,&quot;lg&quot;:4,&quot;md&quot;:3,&quot;xs&quot;:3,&quot;ls&quot;:2,&quot;nav&quot;:true}"
                                                data-cur_page="1" data-max_page="1"
                                                data-product_layout="product-default show-links-hover">
                                                <div class="owl-stage-outer owl-height" style="height: 389.55px;">
                                                    <div id="page-products-featured" class="owl-stage" style="transition: all 0.25s ease 0s; width: 3720px;">
                                                    </div>
                                                </div>
                                                <div class="owl-nav" hidden><button type="button" role="presentation"
                                                        class="owl-prev"></button><button type="button" role="presentation"
                                                        class="owl-next"></button></div>
                                                <div class="owl-dots disabled"></div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="porto-products-8858" class="porto-products wpb_content_element ">
                                    <h2 class="section-title slider-title"><span class="inline-title translate" key="index.offers">placeholder</span><span
                                            class="line"></span></h2>
                                    <div class="slider-wrapper">
                                        <div class="woocommerce columns-4 ">
                                            <ul class="products products-container products-slider owl-carousel show-nav-middle pcols-lg-4 pcols-md-3 pcols-xs-3 pcols-ls-2 pwidth-lg-4 pwidth-md-3 pwidth-xs-2 pwidth-ls-1 is-shortcode owl-loaded owl-drag"
                                                data-plugin-options="{&quot;themeConfig&quot;:true,&quot;lg&quot;:4,&quot;md&quot;:3,&quot;xs&quot;:3,&quot;ls&quot;:2,&quot;nav&quot;:true}"
                                                data-cur_page="1" data-max_page="1"
                                                data-product_layout="product-default show-links-hover">
                                                <div class="owl-stage-outer owl-height" style="height: 389.55px;">
                                                    <div id="page-products-offers" class="owl-stage" style="transition: all 0.25s ease 0s; width: 3720px;">
                                                    </div>
                                                </div>
                                                <div class="owl-nav" hidden><button type="button" role="presentation"
                                                        class="owl-prev"></button><button type="button" role="presentation"
                                                        class="owl-next"></button></div>
                                                <div class="owl-dots disabled"></div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;

    getNewProducts();
    getFeaturedProducts();
    getOffersProducts();
    showSlides();
}

let sliderLoop;

function moveSlide(n) {
    clearTimeout(sliderLoop);
    showSlides(slideIndex + n);
}

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");

    if(slides.length == 0) {
        console.log("Slider is no longer shown, stopping cycle...");
        clearTimeout(sliderLoop);
        return;
    }

    if(slideIndex >= slides.length) slideIndex = 0;
    else if(slideIndex < 0) slideIndex = slides.length - 1;

    for(let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.opacity = "0";
    }
    
    slides[slideIndex].style.display = "block";
    slides[slideIndex].style.opacity = "100";
    slideIndex = slideIndex + 1;

    sliderLoop = setTimeout(showSlides, 5000); 
} 