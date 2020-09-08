<template>
  <q-page class="flex flex-center" padding style="background-image: url(../statics/login-bg.jpg);background-position: center; background-repeat: no-repeat;background-size: cover;">
    <q-card class="q-pa-lg text-center my-card bg-transparent">
      <q-card-section>
        <div class="row flex-center q-gutter-xl">
          <div v-show="!$q.platform.is.mobile" class="col">
            <q-avatar size="400px" square>
              <img
                src="https://gawvs.in//assets/img/login.png">
            </q-avatar>
          </div>
          <div class="col text-center">
            <q-avatar square size="200px">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ios7-active-basic/512/user_access-512.png">
            </q-avatar>
            <q-form @submit="onSubmit">
              <q-input
                lazy-rules
                :rules="[val => !!val||'Please enter your password']"
                type="password" dark filled bottom-slots
                v-model="data.password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock"/>
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click="data.password = ''" class="cursor-pointer"/>
                </template>
              </q-input>
              <q-input
                lazy-rules
                :rules="[val => !!val||'Please enter your password']"
                type="password" dark filled bottom-slots
                v-model="data.confirm_password" label="Confirm password">
                <template v-slot:prepend>
                  <q-icon name="lock"/>
                </template>
                <template v-slot:append>
                  <q-icon name="close" @click="data.confirm_password = ''" class="cursor-pointer"/>
                </template>
              </q-input>
              <q-btn type="submit" style="width: 400px" unelevated rounded color="primary" label="Change"/>
            </q-form>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {LocalStorage} from "quasar";

  export default {
    name: "ChangePassword",
    data(){
      return {
        data: {
          password: null,
          confirm_password: null,
        }
      }
    },
    methods: {
      onSubmit(){
        let self = this;
        if(self.data.password === self.data.confirm_password){
          self.$store.dispatch('auth/updateUserPassword', {id: self.$route.params.id, data: self.data}).then(function (res) {
            if (res.status){
              self.logout();
            }
          })
        }else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'ពាក្យសម្ងាត់មិនដូចគ្នា!'
          });
        }
      },
      logout() {
        LocalStorage.remove('userInfo');
        this.$router.push('/login')
      },
    }
  }
</script>

<style scoped>

</style>
