const serverUrl =
  // process.env.NODE_ENV === 'development'
  //   ? 'http://192.168.43.244:34561'
  //   : 
    'https://yge.wvi.mybluehost.me/test/drug-cipher-server';
export const apiURL = serverUrl + '/api';

export const _postApi = (url, data = {}, success = f => f, error = f => f) => {
  console.log(apiURL + url);
  console.log(url);
  console.log(data);
  fetch(apiURL + url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })
    .then(raw => raw.json())
    .then(response => success(response))
    .catch(err => error(err));
};

export const _fetchApi = (
  url,
  success = f => f,
  error = f => f,
  empty = f => f,
) => {
  fetch(apiURL + url)
    .then(raw => raw.json())
    .then(response => {
      if (response) {
        success(response);
      } else {
        console.log('Empty response');
        empty();
      }
    })
    .catch(err => {
      error(err);
    });
};
