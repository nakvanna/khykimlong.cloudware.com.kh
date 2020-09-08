export function STORE_STAFF(state, payload) {
  state.staffs.push(payload.data);
}
export function SET_STAFF(state, payload) {
  state.staffs = payload.data;
}
export function UPDATE_STAFF(state, payload) {
  let index = state.staffs.findIndex(function (x) {
    return x._id === payload.data._id
  })
  state.staffs.splice(index,1,payload.data)
}
export function STORE_STAFF_SALARY(state, payload) {
  state.staff_salary.push(payload.data);
}
export function SET_STAFF_SALARY(state, payload) {
  state.staff_salary = payload.data;
}
export function SET_STAFF_SALARY_BY_DATE(state, payload) {
  state.staff_salary_by_date = payload.data;
}
