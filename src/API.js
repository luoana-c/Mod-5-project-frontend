class API {
  static signin (email, password) {
    return fetch(API.signinURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    }).then(resp => resp.json())
  }

  static signup (name, email, password, phoneNumber, address) {
    return fetch(API.signupURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        name,
        phone_number: phoneNumber,
        address
      })
    }).then(resp => resp.json())
  }

  //   static fetchWishlist (user) {
  //     return fetch(API.baseURL + '/users/' + user.id + '/wishlist/', {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' }
  //     })
  //   }
}

API.baseURL = window.location.href.includes('localhost') ? 'http://localhost:3000/api/v1' : 'https://pigtail-stories-backend.herokuapp.com/api/v1'
// API.baseURL = 'https://pigtail-stories-backend.herokuapp.com/api/v1'
API.signinURL = API.baseURL + '/signin'
API.signupURL = API.baseURL + '/signup'

export default API

// static validate (token) {
//   return fetch(API.validateURL, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token
//     }
//   }).then(resp => resp.json())
// }

// static getItems () {
//   const token = localStorage.getItem('token')
//   return fetch(API.itemsURL, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: token
//     }
//   }).then(resp => resp.json())
// }
