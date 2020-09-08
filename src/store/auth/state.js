import {LocalStorage} from 'quasar'

export default function () {
  return {
    user: {
      name: "Nak Vanna",
      email: "nakvannamcu@gmail.com",
      token: LocalStorage.getItem("userInfo") || '',
      user_type: 'Super Admin'
    },
  }
}
