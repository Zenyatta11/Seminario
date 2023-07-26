function doNewCategory() {
    doPost('categories/new',
        {
            'name': getValueById('new-category')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))
        
        if(json.status_code === 200) 
            getCategories();
    });
}


function getCategories() {
    doPost('categories/get',
        { }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))

        if(json.status_code === 200) {
            document.getElementById('newsubcategory-category-select').innerHTML = getOptionsFromJson('Select category...', json.data, 'category_id', 'name');
            document.getElementById('category-select').innerHTML = getOptionsFromJson('Select category...', json.data, 'category_id', 'name');
        }
    });
}

function getSubcategories() {
    doPost('subcategories/get',
        { 
            'category_id': getValueById('newsubcategory-category-select')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))

        if(json.status_code === 200)
            document.getElementById('subcategory-select').innerHTML = getOptionsFromJson('Select category...', json.data, 'category_id', 'name');
    });
}
