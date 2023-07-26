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

function doDeleteCategory() {
    doPost('categories/delete',
        {
            'category_id': getValueById('category-select')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))
        
        if(json.status_code === 200) 
            getCategories();
    });
}

function doModifyCategory() {
    doPost('categories/update',
        {
            'category_id': getValueById('category-select'),
            'name': getValueById('new-category')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))
        
        if(json.status_code === 200) 
            getCategories();
    });
}

function doNewSubCategory() {
    doPost('subcategories/new',
        {
            'name': getValueById('new-subcategory'),
            'category_id': getValueById('category-select')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))
        
        if(json.status_code === 200) 
            getSubCategories();
    });
}

function doModifySubCategory() {
    doPost('subcategories/update',
        {
            'name': getValueById('new-subcategory'),
            'category_id': getValueById('category-select'),
            'subcategory_id': getValueById('subcategory-select')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))
        
        if(json.status_code === 200) 
            getSubCategories();
    });
}

function doDeleteSubCategory() {
    doPost('subcategories/delete',
        {
            'category_id': getValueById('category-select'),
            'subcategory_id': getValueById('subcategory-select')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))
        
        if(json.status_code === 200) 
            getSubCategories();
    });
}


function getCategories() {
    doPost('categories/get',
        { }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))

        if(json.status_code === 200) {
            document.getElementById('category-select').innerHTML = getOptionsFromJson('Select category...', json.data, 'category_id', 'name');
        }
    });
}

function getSubCategories() {
    doPost('subcategories/get',
        { 
            'category_id': getValueById('category-select')
        }
    ).then((response) => response.json())
    .then((json) => {
        setResponse(JSON.stringify(json))

        if(json.status_code === 200)
            document.getElementById('subcategory-select').innerHTML = getOptionsFromJson('Select subcategory...', json.data, 'subcategory_id', 'name');
        else if(json.status_code === 404)
            document.getElementById('subcategory-select').innerHTML = '<option value="" disabled selected>No subcategories</option>'
    });
}
