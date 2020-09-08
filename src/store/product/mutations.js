//Product type
export function STORE_PRODUCT_TYPE (state, payload) {
  state.product_types.push(payload.data)
}
export function SET_PRODUCT_TYPE(state, payload) {
  state.product_types = payload.data
}

//Unit type
export function STORE_UNIT_TYPE (state, payload) {
  state.unit_types.push(payload.data)
}
export function SET_UNIT_TYPE(state, payload) {
  state.unit_types = payload.data
}

//Product
export function STORE_PRODUCT (state, payload) {
  state.products.unshift(payload.data)
}
export function SET_PRODUCT(state, payload) {
  state.products = payload.data
}
export function UPDATE_PRODUCT(state, payload) {
  let index = state.products.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.products.splice(index,1,payload.data)
}
