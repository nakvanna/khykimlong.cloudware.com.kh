<template>
  <q-page padding>
    <q-card>
      <q-card-actions align="left">
        <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
          <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
        </q-btn>
      </q-card-actions>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
          <q-card flat bordered class="my-card bg-grey-1">
            <q-card-section>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col q-my-sm">
                  ពត៍មានអ្នកជម្ងឺ
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-select class="col"
                          outlined
                          v-model="data.patient_obj"
                          label="ឈ្មោះអ្នកជម្ងឺ"
                          :options="getPatients"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col q-my-sm">
                  ពត៍មានពិនិត្យ
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_num"
                  label="ចំនួនទារក"
                  type="number"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-select class="col col-xs-12"
                  outlined
                  v-model="data.bby_gender"
                  multiple
                  :options="['ប្រុស','ស្រី', 'ប្រុស & ស្រី']"
                  label="ភេទទារក"
                  lazy-rules
                  :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']"
                />
                <q-select class="col col-xs-12"
                          outlined
                          v-model="data.place_placenta"
                          label="ទីតាំងសុក"
                          :options="['មុខ', 'ក្រោយ']"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_status"
                  label="ទំរង់របស់កូន"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.status_waterfall"
                  label="ស្ថានភាពទឹកភ្លោះ"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_healthy"
                  label="សុខភាពទារក"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_heartrate"
                  label="ចលនាចង្វាក់បេះដូង(ធម្មតា 150)"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_activity"
                  label="សកម្មភាពទារក"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_skull"
                  label="ទំហំឆ្អឹងក្បាល"
                  type="number"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_thigh_bone"
                  label="ប្រវែងឆ្អឹងភ្លៅ"
                  type="number"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_weight"
                  label="ទំងន់ទារក"
                  type="number"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input class="col col-xs-12"
                  outlined
                  v-model="data.bby_age"
                  label="អាយុទារក(4ខែ 4សប្ដាហ៍ 4ថ្ងៃ)"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input class="col col-xs-12"
                         label="ថ្ងៃគ្រប់ខែ" outlined square v-model="data.bby_birth" mask="date"
                         :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxyBirth" transition-show="scale" transition-hide="scale">
                        <q-date v-model="data.bby_birth" @input="() => $refs.qDateProxyBirth.hide()"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input class="col col-xs-12"
                         label="ថ្ងៃពិនិត្យ" outlined square v-model="data.check_date" mask="date"
                         :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxyCheck" transition-show="scale" transition-hide="scale">
                        <q-date v-model="data.check_date" @input="() => $refs.qDateProxyCheck.hide()"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-select class="col col-xs-12"
                  outlined
                  v-model="data.doctor"
                  label="គ្រូទេព្យ"
                  :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']"
                  :options="Object.freeze(doctorOptions)"
                  use-input
                  @filter="filterFn"
                >
                  <template
                    v-slot:append>
                    <q-btn round
                           dense
                           flat
                           icon="add">
                      <q-popup-edit v-model="doctor.doctor" title="បន្ថែមគ្រូទេព្យ" ref="addCurrency">
                        <q-form
                          ref="formAddDoctor"
                          @submit="storeDoctor"
                        >
                          <div class="row">
                            <q-input
                              v-model="doctor.doctor"
                              label="ឈ្មោះគ្រូទេព្យ"
                              dense
                              lazy-rules
                              :rules="[ val => !!val||'សូមបំពេញចន្លោះ' ]"
                            />
                          </div>
                          <div class="row">
                            <q-btn dense v-close-popup color="negative" flat label="បិទ" no-caps/>
                            <q-space/>
                            <q-btn dense color="primary" flat label="បន្ថែម" @click="$refs.formAddDoctor.submit()" no-caps/>
                          </div>
                        </q-form>
                      </q-popup-edit>
                    </q-btn>
                  </template>
                </q-select>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-uploader
                  :factory="factoryFnUploadPhotoUp"
                  class="col"
                  accept="image/*"
                  hide-upload-btn
                  label="ដាក់រូបភាពខាងលើ"
                  color="grey"
                  square
                  flat
                  bordered
                  style="max-width: 300px"
                  auto-upload
                />
                <q-uploader
                  :factory="factoryFnUploadPhotoDown"
                  class="col"
                  accept="image/*"
                  hide-upload-btn
                  label="ដាក់រូបភាពខាងក្រោម"
                  color="grey"
                  square
                  flat
                  bordered
                  style="max-width: 300px"
                  auto-upload
                />
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn icon="save" style="width: 150px; height: 50px" color="primary" label="រក្សារទុក"
                     @click="$refs.addForm.submit()">
                <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  export default {
    name: "EchoAdd",
    data() {
      return {
        formData: new FormData(),
        data: {
          patient_obj: '',
          type: 'Obstétrique',
          bby_num: 1,
          bby_gender: [],
          place_placenta: '',
          bby_status: '',
          status_waterfall: '',
          bby_healthy: '',
          bby_heartrate: '',
          bby_activity: '',
          bby_skull: '',
          bby_thigh_bone: '',
          bby_weight: '',
          bby_age: '',
          bby_birth: '',
          check_date: '',
          doctor: '',
          photo: '',
          // hostname: 'https://api.visai.cloudware.com.kh/',
          hostname: 'http://localhost:3000/',
        },
        doctor: {
          doctor: null
        },
        doctorOptions:this.getDoctors
      }
    },
    computed: {
      getPatients() {
        let self = this;
        return self.$store.getters['patient/getPatient'].map(function (x) {
          return {
            label: `${x.kh_name}, ភេទ ${x.gender}, អាយុ ${x.age}, Tel: ${x.phone}`,
            value: x._id,
          }
        })
      },
      getDoctors() {
        return this.$store.getters['doctor/getDoctors'].map(function (x) {
          return x.doctor
        })
      }
    },
    methods: {
      onSubmit() {
        let self = this;
        let vm = self.data;
        self.$q.loading.show();
        let postData = JSON.stringify({
          patient: vm.patient_obj.value,
          type: vm.type,
          bby_num: vm.bby_num,
          bby_gender: vm.bby_gender,
          place_placenta: vm.place_placenta,
          bby_status: vm.bby_status,
          status_waterfall: vm.status_waterfall,
          bby_healthy: vm.bby_healthy,
          bby_heartrate: vm.bby_heartrate,
          bby_activity: vm.bby_activity,
          bby_skull: vm.bby_skull,
          bby_thigh_bone: vm.bby_thigh_bone,
          bby_weight: vm.bby_weight,
          bby_age: vm.bby_age,
          bby_birth: vm.bby_birth,
          check_date: vm.check_date,
          doctor: vm.doctor,
          hostname: vm.hostname,
        });
        self.formData.set("data", postData);
        self.$store.dispatch('echo/storeEchoBaby', self.formData).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.isShow = false;
            window.history.back();
            self.$q.loading.hide();
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
        });
      },
      factoryFnUploadPhotoUp(file) {
        let self = this;
        self.formData.append('photos', file[0]);
      },
      factoryFnUploadPhotoDown(file) {
        let self = this;
        self.formData.append('photos', file[0]);
      },
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      },
      filterFn (val, update) {
        let self = this;
        update(() => {
          if (val === '') {
            self.doctorOptions = self.getDoctors
          }
          else {
            const needle = val.toLowerCase()
            self.doctorOptions = self.getDoctors.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            )
          }
        })
      },
      storeDoctor() {
        let self = this;
        self.$store.dispatch('doctor/storeDoctor', self.doctor).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.data.doctor = data.data.doctor
            self.doctor.doctor = null
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
