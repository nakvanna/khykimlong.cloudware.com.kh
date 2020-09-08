export function STORE_EXPENSE (state, payload) {
  state.expenses.push(payload.data)
}
export function SET_EXPENSE(state, payload) {
  state.expenses = payload.data
}
export function SET_EXPENSE_BY_DATE(state, payload) {
  state.expense_by_date = payload.data
}
