function checkStatus(response) {
  if (response.status !== 200) {
    throw new Error(`Unexpected status returned from server: ${response.status}`);
  }
  return response;
}

function parseJson(response) {
  try {
    return response.json();
  } catch (e) {
    // console.log(e);
    throw new Error('Error parsing json');
  }
}

const request = (url, options) => (
  fetch(url, options)
    .then(checkStatus)
    .then(parseJson)
    .then(data => ({ data }))
    .catch(err => ({ err }))
);

export default request;
