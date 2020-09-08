export function STORE_INCOME_TYPE (state, payload) {
  state.income_type.push(payload.data)
}
export function SET_INCOME_TYPE(state, payload) {
  state.income_type = payload.data
}
export function STORE_EXPENSE_TYPE (state, payload) {
  state.expense_type.push(payload.data)
}
export function SET_EXPENSE_TYPE(state, payload) {
  state.expense_type = payload.data
}
