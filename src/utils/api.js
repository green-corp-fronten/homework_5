const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRjZGY1NDhmYmM0NzNmYTg5ZmUxYWUiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjgyNzU5NTk1LCJleHAiOjE3MTQyOTU1OTV9.leMWcQPeMFKjoXHERxZwjeFLL8Lx55cM4pZgCT6j5NI',
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Error');
};

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }
  getProductList(page = 2) {
    return fetch(`${this._baseUrl}/products?page=${page}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  getProductById(id) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  addProduct(data) {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => onResponse(res));
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  searchProducts(query) {
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  // like - true / false
  changeLikeProductStatus(productId, like) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: like ? 'PUT' : 'DELETE',
    }).then((res) => onResponse(res));
  }
  deleteLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then((res) => onResponse(res));
  }
  addLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: 'PUT',
    }).then((res) => onResponse(res));
  }

addNewProduct() {
  return fetch(`${this._baseUrl}/products`, {
    headers: this._headers,
    method: 'POST',
    body: JSON.stringify({
      "name": "Говяжья нога",
      "price": 734,
      "discount": 8,
      "wight": "5-7шт.",
      "description": "Нога говяжья целиком сушено-вяленая",
      "available": true,
      "stock": 10,
      "pictures": "https://basket-01.wb.ru/vol87/part8711/8711223/images/big/2.jpg"
    }),
  }).then(onResponse);
}
}

export const api = new Api(config);

// api.getProductList();

export const getProductList = () => {
  return fetch(`${config.baseUrl}/products`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};

export const searchProducts = (query) => {
  return fetch(`${config.baseUrl}/products/search?query=${query}`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};

// export const funct = () => {
//  return fetch().then(onResponse)
// }

export const getProductById = (id) => {
  return fetch(`${config.baseUrl}/products/${id}`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};
