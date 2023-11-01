
function loadLanguage(select) {
    var locale = localStorage.getItem("locale");

    if(select !== null) {
        locale = select.value;
        if(locale === language?.locale) return;
        localStorage.locale = locale;
    } else if(locale === null) locale = fallbackLocale;

    console.log("Changing language to [" + locale + "]");
    loadJSON("/Sources/Common/Locales/" + locale + ".json", 
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

function getLanguageSelector() {
    returnValue = "";
    var locale = localStorage.getItem("locale");
    
    fallbackLanguage.languages.forEach((item) => {
        returnValue += '<option ' + (item.name == locale ? 'selected ' : '') + 'value="' + item.name + '" key="languages.' + item.name + '">' + item.text + '</option>';
    });

    return returnValue;
}

function parseTranslations() {
    parseFromJSON(language, fallbackLanguage, "translate");
}
