var fallbackLanguage = {};
var language = {};

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

parseFromJSON(language, fallbackLanguage);
