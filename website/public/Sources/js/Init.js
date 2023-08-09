var contextData = {};

async function getContextData(context = null) {
    doPost('context',
        { 
            'context': context
        }
    ).then((response) => response.json())
    .then((json) => {
        console.log(json);
		parseFromJSON(json.data, { }, "context");
	});
}
