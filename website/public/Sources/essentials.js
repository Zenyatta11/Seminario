
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