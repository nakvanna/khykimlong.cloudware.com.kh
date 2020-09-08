import $http from "boot/token_request";

export async function storeIncomeType ({commit}, data) {
  try {
    const res = await $http.post('/income-types', data);
    if (res.data.status) {
      commit('STORE_INCOME_TYPE', res.data);
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function fetchIncomeType({commit}) {
  try {
    const res = await $http.get('/income-types/get');
    if (res.data.status){
      commit('SET_INCOME_TYPE', res.data)
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function storeExpenseType ({commit}, data) {
  try {
    const res = await $http.post('/expense-types', data);
    if (res.data.status) {
      commit('STORE_EXPENSE_TYPE', res.data);
    }
    return res.data
  }catch (e) {
    return false
  }
}
export async function fetchExpenseType({commit}) {
  try {
    const res = await $http.get('/expense-types/get');
    if (res.data.status){
      commit('SET_EXPENSE_TYPE', res.data)
    }
    return res.data
  }catch (e) {
    return false
  }
}
