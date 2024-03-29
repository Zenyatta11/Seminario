var pageTitle;
var pageFunc;

const translationDebug = true;

async function doPost(endpoint, data) {
    return fetch('/api/' + endpoint, {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}

function getValueById(id) {
    return document.getElementById(id).value;
}

function getOptionsFromJson(select, data, keyValue, keyText, selectedId) {
    var returnValue = "";
    data.forEach((item) => returnValue = returnValue + '<option ' + (selectedId && item[keyValue] == selectedId ? 'selected ' : '') + 'value="' + item[keyValue] + '">' + item[keyText] + '</option>');
    
    if(returnValue === "" || !selectedId) returnValue = '<option value="" disabled selected>' + select + '</option>' + returnValue;

    return returnValue;
}

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            }
            else {
                error(xhr);
            }
        }
    };

    xhr.open('GET', path, true);
    xhr.send();
}

function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');

    for(let i = 0; i <cookies.length; i++) {
        let cookie = cookies[i];
        
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
}

function refreshPage() {
    if(pageTitle.search("context") === -1) document.title = getKeyFromJson(language, fallbackLanguage, pageTitle) ?? pageTitle;
    else document.title = getKeyFromJson(contextData, { }, pageTitle.replace("context.", "")) ?? pageTitle;

    pageFunc(document.getElementById("content"), document.getElementById("sidebar-content"));
    document.getElementById("content").hidden = false;
    document.getElementById("sidebar-content").hidden = false;

    parseTranslations();
}

function parseFromJSON(json, fallbackJson, key) {
    Array.from(document.getElementsByClassName(key))
    .forEach((element) => {
            let keys = element.getAttribute('key').split('.');
            let jsonNest = {};
            let attrib = element.getAttribute("attributename");

            if(json !== undefined && json[keys[0]] !== undefined) jsonNest = json[keys[0]];
            else if(fallbackJson !== undefined && fallbackJson[keys[0]] !== undefined && !translationDebug) {
                jsonNest = fallbackJson[keys[0]];
            }

            let i = 1;
            for( ; i < keys.length; i = i + 1) {
                if(jsonNest[keys[i]] !== undefined) {
                    if(i == keys.length - 1) {
                        if(attrib === null) element.innerHTML = jsonNest[keys[i]];
                        else element.setAttribute(attrib, jsonNest[keys[i]]);
                        break;
                    } else jsonNest = jsonNest[keys[i]];
                }
            }

            if(i === keys.length) 
                if(attrib === null) element.innerHTML = element.getAttribute('key');
                else element.setAttribute(attrib, element.getAttribute('key'));
        }
    );
}

function getKeyFromJson(json, fallbackJson, key) {
    let keys = key.split('.');
    let jsonNest = {};

    if(json !== undefined && json[keys[0]] !== undefined) jsonNest = json[keys[0]];
    else if(fallbackJson !== undefined && fallbackJson[keys[0]] !== undefined) {
        jsonNest = fallbackJson[keys[0]];
    }

    let i = 1;
    for( ; i < keys.length; i = i + 1) {
        if(jsonNest[keys[i]] !== undefined) {
            if(i == keys.length - 1) {
                return jsonNest[keys[i]];
            } else jsonNest = jsonNest[keys[i]];
        }
    }

    if(i === keys.length) 
        return key;

}

function echo(content) {  
    var replacingElement = document.createElement("div");
    replacingElement.innerHTML = content;
    document.currentScript.parentElement.replaceChild(replacingElement, document.currentScript);
}

function toggleChildList(element) {
    childList = element.parentElement.lastElementChild;

    if(childList.getAttribute('style') === null) childList.setAttribute('style', "display: inherit");
    else childList.removeAttribute('style');
}

function hidePreloader(element) {
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        setTimeout(function () {
            element.classList.remove('visuallyhidden');
        }, 20);
    } else {
            element.classList.add('visuallyhidden');    
            element.addEventListener('transitionend', function(e) {
                element.setAttribute('style', 'display: none !important');
            }, {
                capture: false,
                once: true,
                passive: false
            }
        );
    }
}

function navigateToPage(url, title, func) {
    window.history.pushState('', '', url); 
    setPage(title, func);
}

function setPage(title, func) {
    pageTitle = title;
    pageFunc = func;
    
    if(title.search("context") === -1) document.title = getKeyFromJson(language, fallbackLanguage, title) ?? title;
    else document.title = getKeyFromJson(contextData, { }, title.replace("context.", "")) ?? title;

    getShoppingCart();
    func(document.getElementById("content"), document.getElementById("sidebar-content"));
    document.getElementById("content").hidden = false;
    document.getElementById("sidebar-content").hidden = false;

    parseTranslations();
}

function setPageSectionHeader(site, title) {
    sectionList = '';
    sections = site.split('/');

    for(var i = 0; i < sections.length - 1; i = i + 1)
        sectionList = sectionList + `
            <li itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                <a itemprop="item">
                    <span itemprop="name" class="translate" key="` + sections[i] + `">placeholder</span>
                </a>
                <meta itemprop="position" content="1"><i class="delimiter"></i>
            </li>`;
    
    sectionList = sectionList + `<li class="translate" key="` + sections[sections.length - 1] + `" style="color: #777777">placeholder</li>`;
    document.getElementById('page-section-header').innerHTML = sectionList;
    document.getElementById('page-section-title').innerHTML = `<h1 class="page-title translate" key="` + title + `" style="color: #777777">placeholder</h1>`
}

window.addEventListener('popstate', () => {
        loadPageByURL()
    }
);

function parsePrice(price) {
    const parts = price.toString().split('.');
    const integerPart = parts[0];
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedPrice = parts.length > 1 ? formattedIntegerPart + '.' + parts[1] : formattedIntegerPart;
    return formattedPrice;
}

function CategoryUrl(id, name, className) {
    urlName = getUrlName(name);

    return `<a ` + (className ? `class="` + className + `" ` : ``) + `href="/catalog/` + id + `_` + urlName + `" onclick="event.preventDefault(); navigateToPage('/catalog/` + id + `_` + urlName + `', 'pages.catalog.title', Catalog_Load);">` + name + `</a>`;
}

function ProductUrl(id, name, innerHTML, className) {
    urlName = getUrlName(name);
    safeName = name.replace("'", "\\'");

    return `<a ` + (className ? `class="` + className + `" ` : ``) + `href="/product/` + id + `_` + urlName + `" onclick="event.preventDefault(); navigateToPage('/product/` + id + `_` + urlName + `', '` + safeName + `', Product_Load);">` + innerHTML + `</a>`;
}

function SubcategoryUrl(categoryId, categoryName, subcategoryId, subcategoryName, className) {
    categoryUrlName = getUrlName(categoryName);
    subcategoryUrlName = getUrlName(subcategoryName);

    return `<a ` + (className ? `class="` + className + `" ` : ``) + `href="/catalog/` + categoryId + `-` + subcategoryId + `_` + categoryUrlName + `-` + subcategoryUrlName + `" onclick="event.preventDefault(); navigateToPage('/catalog/` + categoryId + `-` + subcategoryId + `_` + categoryUrlName + `-` + subcategoryUrlName + `', 'pages.catalog.title', Catalog_Load);">` + subcategoryName + `</a>`;
}

function getUrlName(name) {
    let string = name.replace(/\s+/g, '-');
    string = string.replace(/[^A-Za-z0-9\-]/g, '');
    
    return string;
}
