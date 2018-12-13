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
    throw new Error(e);
  }
}

const request = (url, options) => (
  fetch(url, options)
    .then(checkStatus)
    .then(parseJson)
    .then(data => ({ status: 1, data }))
    .catch(err => ({ status: 0, err }))
);

export default request;
