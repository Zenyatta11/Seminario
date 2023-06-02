
async function doPost(endpoint, data) {
    return fetch('api/' + endpoint, {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}