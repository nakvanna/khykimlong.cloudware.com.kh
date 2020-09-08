export function STORE_INCOME (state, payload) {
  state.incomes.push(payload.data)
}
export function SET_INCOME(state, payload) {
  state.incomes = payload.data
}
export function SET_INCOME_BY_DATE(state, payload) {
  state.income_by_date = payload.data
}
