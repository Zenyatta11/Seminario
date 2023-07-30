function doCheckZipCode() {
    doPost('zipcodes/verify',
        { 
            'zip-code': getValueById('zip-code'),
            'province_id': getValueById('provinces-select')
        }
    ).then((response) => response.json())
    .then((json) => setResponse(JSON.stringify(json)));
}

function doUpdateCities() {
    doPost('cities/get',
        {
            'province_id': getValueById('provinces-select')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))
        
        if(json.status_code === 200) 
            document.getElementById('cities-select').innerHTML = getOptionsFromJson('Select city...', json.data, 'city_id', 'name');
    });
}

function doUpdateProvinces() {
    doPost('provinces/get',
        { }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))

        if(json.status_code === 200) 
            document.getElementById('provinces-select').innerHTML = getOptionsFromJson('Select province...', json.data, 'province_id', 'name');
    });
}
