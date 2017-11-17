import 'whatwg-fetch'

async function parseJSON(response) {
  return response.json()
}

async function parseTxt(response) {
  return response.text()
}

async function checkStatus(response) {
  if (response.ok) {
    const parser = !response.headers.get('Content-Type') ? parseTxt : parseJSON
    return parser(response)
  }
  else {
    return parseJSON(response)
      .then((json) => {
        const error = new Error(response.statusText)
        error.response = json
        throw error
      })
  }

}

/**
 * Requests a URL, returning a promise
 */
export default function request(url, {method='GET', body={}, headers={}} = {}){
  headers['Accept'] = 'application/json'
  let request = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body),
  }

  if ( method === 'GET' ) { delete request.body }

  if (process.env.NODE_ENV === 'test') {
    request.headers['Access-Control-Allow-Origin'] = '*'
  }

  return fetch(url, request)
    .then(checkStatus)
}
