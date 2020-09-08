export function STORE_SUPPLIER (state, payload) {
  state.suppliers.push(payload.data)
}
export function SET_SUPPLIER(state, payload) {
  state.suppliers = payload.data
}
