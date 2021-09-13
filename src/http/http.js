const BASE_URL="https://api.spotify.com/v1";
  
const http = async (url, access_token, options={}) => {
  return fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': 'Bearer ' + access_token
    }
  })
  .then(res => res.json())
}

export default http;