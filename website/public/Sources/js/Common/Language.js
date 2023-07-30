var fallbackLanguage;
var language;

loadJSON("./Sources/Common/Locales/es_AR.json", function(data) { fallbackLanguage = data; },'jsonp');

function loadLanguage(select) {
    if(select !== null) {
        locale = select.value;
        if(locale === language?.locale) return;
        document.cookie = "language=" + locale;
    } else {
        locale = getCookie("language");
        if(locale === null) locale = fallbackLocale;
    }

    console.log("Changing language to [" + locale + "]");
    loadJSON("./Sources/Common/Locales/" + locale + ".json", 
        function(data) { 
            language = data;
            parseTranslations();
        },
        function(data) { 
            console.log("Language [" + data + "] doesn't exist! Using fallback language...");
            language = {};
            parseTranslations();
        }
    );
}

function parseTranslations() {
    Array.from(document.getElementsByClassName('translate'))
    .forEach((element) => {
            let keys = element.getAttribute('key').split('.');
            let languageNest = {};

            if(language !== undefined && language[keys[0]] !== undefined) {
                languageNest = language[keys[0]];
            } else if(fallbackLanguage !== undefined && fallbackLanguage[keys[0]] !== undefined) {
                languageNest = fallbackLanguage[keys[0]];
            }

            for(let i = 0; i < keys.length; i = i + 1) {
                if(languageNest[keys[i]] !== undefined) {
                    if(i == keys.length - 1) element.innerHTML = languageNest[keys[i]];
                    else languageNest = languageNest[keys[i]];
                }
            }
        }
    );
}