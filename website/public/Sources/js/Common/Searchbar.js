String.prototype.rtrim = function(s) { 
    return this.replace(new RegExp(s + "*$"),''); 
};

function clearSuggestions() {
    document.getElementById('live-search-list').innerHTML = ``;
    document.getElementById('live-search-container').setAttribute("style", "");
}

function onSearchUpdated(element) {
    if(searchTimeout != null) {
        clearTimeout(searchTimeout);
        searchTimeout = null;
    }

    if(element.value.length < 3) {
        document.getElementById('live-search-list').innerHTML = ``;
        document.getElementById('live-search-container').setAttribute("style", "");
    } else {
        var suggestions;

        cache = contextData.common.productSearchCache;
        characters = element.value.split('');
        suggestionList = ``;
        root = getInsensitive(cache, characters);

        if(root) {
            if(characters.length > 3) {
                suggestions = getProductNames(getCacheFromNameArray(root, characters.slice(3)));
            } else suggestions = getProductNames(root);
        }

        document.getElementById('live-search-container').setAttribute("style", "border-radius: 0px !important;");

        options = ``;

        if(suggestions) {
            suggestions.forEach((item) => {
                data = item.split(';');
                id = data[1];
                suggestion = element.value + data[0];

                options = options + `
                    <li class="woocommerce-mini-cart-item mini_cart_item">
                        ` + ProductUrl(id, suggestion, `<span>` + suggestion + `</span>`, ``) + `
                    </li>`;
            });
        }
        
        if(!suggestions || options === ``) {
            options = `
                <li class="woocommerce-mini-cart-item mini_cart_item">
                    ` + getKeyFromJson(language, fallbackLanguage, "common.search.empty") + `
                </li>
            `;
        }

        document.getElementById('live-search-list').innerHTML = `
            <div class="autocomplete-suggestions" style="position: absolute; /*! display: none; */ max-height: 300px; z-index: 9999;width: 100% !important;left: 0%;right: 0%;">
                <ul class="cart_list product_list_widget scrollbar-inner ">
                    ` + options + `
                </ul>
            </div>
            `;
    
    }
}

function getCacheFromNameArray(data, characterArray) {
    for (let i = 0; i < characterArray.length; i = i + 1) {
        letter = characterArray[i];

        upperLetter = letter.toUpperCase();
        lowerLetter = letter.toLowerCase();

        if(data[upperLetter]) data = data[upperLetter];
        else if(data[lowerLetter]) data = data[lowerLetter];
        else return undefined;
    }

    return data;
}

function getInsensitive(data, name) {
    for (let i = 0; i < 2; i = i + 1) {
        letter1 = (i == 1 ? name[0].toUpperCase() : name[0].toLowerCase());
        
        for (let j = 0; j < 2; j = j + 1) {
            letter2 = (j == 1 ? name[1].toUpperCase() : name[1].toLowerCase());
            
            for (let k = 0; k < 2; k = k + 1) {
                letter3 = (k == 1 ? name[2].toUpperCase() : name[2].toLowerCase());

                if(data[letter1 + letter2 + letter3]) return data[letter1 + letter2 + letter3];
            }
        }
    }
            
    return undefined;
}

function getProductNames(obj, path = '') {
    let productNames = [];

    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            productNames = productNames.concat(getProductNames(obj[key], path + key));
        } else if (key === 'id') {
            productNames.push(path.rtrim() + ";" + obj['id']);
        }
    }

    return productNames;
}
