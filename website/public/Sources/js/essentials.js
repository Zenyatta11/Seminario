
async function doPost(endpoint, data) {
    return fetch('api/' + endpoint, {
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

function setResponse(data) {
    document.getElementById("response-bar").innerHTML = data;
}

function getOptionsFromJson(select, data, keyValue, keyText) {
    var returnValue = '<option value="" disabled selected>' + select + '</option>';
    data.forEach((item) => returnValue = returnValue + '<option value="' + item[keyValue] + '">' + item[keyText] + '</option>');

    return returnValue;
}

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
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

function parseFromJSON(json, fallbackJson, key) {
    Array.from(document.getElementsByClassName(key))
    .forEach((element) => {
            let keys = element.getAttribute('key').split('.');
            let jsonNest = {};
            let attrib = element.getAttribute("attributename");

            if(json !== undefined && json[keys[0]] !== undefined) jsonNest = json[keys[0]];
            else if(fallbackJson !== undefined && fallbackJson[keys[0]] !== undefined) {
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
    setPage(url, title, func);
}

function setPage(url, title, func) {
    document.title = getKeyFromJson(language, fallbackLanguage, title) ?? document.title;
    func(document.getElementById("content"), document.getElementById("sidebar-content"));
    parseTranslations();
    document.getElementById("content").hidden = false;
    document.getElementById("sidebar-content").hidden = false;
}

window.addEventListener('popstate', () => {
        console.log('User clicked back button');
    }
);
