import {LocalStorage} from 'quasar'

export function LOGIN(state, payload) {
  state.user._id = payload.user._id;
  state.user.name = payload.user.name;
  state.user.email = payload.user.email;
  state.user.user_type = payload.user.user_type;
  state.user.token = payload.token;
  LocalStorage.set("userInfo", {user_info: state.user})
}

export function UPDATE_USER_DATA(state, payload) {
  state.user._id = payload.user_info._id;
  state.user.name = payload.user_info.name;
  state.user.email = payload.user_info.email;
  state.user.user_type = payload.user_info.user_type;
  state.user.token = payload.user_info.token;
}
