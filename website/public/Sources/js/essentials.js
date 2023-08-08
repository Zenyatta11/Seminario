
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
            let attrib = element.getAttribute("attributeName");

            if(json !== undefined && json[keys[0]] !== undefined) {
                jsonNest = json[keys[0]];
            } else if(fallbackJson !== undefined && fallbackJson[keys[0]] !== undefined) {
                jsonNest = fallbackJson[keys[0]];
            }

            let i = 0;
            for( ; i < keys.length; i = i + 1) {
                if(jsonNest[keys[i]] !== undefined) {
                    if(i == keys.length - 1) {
                        element.innerHTML = jsonNest[keys[i]];
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

function echo(content) {  
    var replacingElement = document.createElement("div");
    replacingElement.innerHTML = content;
    document.currentScript.parentElement.replaceChild(document.currentScript, replacingElement);
}
