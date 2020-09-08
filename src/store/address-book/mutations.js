export function STORE_ADDRESS_BOOK(state, payload) {
  state.address_books.push(payload.data)
}
export function SET_ADDRESS_BOOK(state, payload) {
  state.address_books = payload.data
}
export function STORE_PROVINCE(state, payload) {
  state.provinces.push(payload.data)
}
export function SET_PROVINCE(state, payload) {
  state.provinces = payload.data
}
export function STORE_DISTRICT(state, payload) {
  state.districts.push(payload.data)
}
export function SET_DISTRICT(state, payload) {
  state.districts = payload.data
}
export function STORE_COMMUNE(state, payload) {
  state.communes.push(payload.data)
}
export function SET_COMMUNE(state, payload) {
  state.communes = payload.data
}
export function STORE_VILLAGE(state, payload) {
  state.villages.push(payload.data)
}
export function SET_VILLAGE(state, payload) {
  state.villages = payload.data
}
