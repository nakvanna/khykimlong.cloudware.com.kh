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
                <q-select class="col-md col-xs-12"
                          outlined
                          v-model="data.patient_obj"
                          label="ឈ្មោះអ្នកជម្ងឺ"
                          :options="getPatients"
                          @input="patientSelected"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
                <q-input class="col-md col-xs-12"
                         outlined
                         v-model="data.title"
                         label="ចំណងជើង"
                         square
                         lazy-rules
                         :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input class="col-md col-xs-12"
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
                <q-select class="col-md col-xs-12"
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
                            <q-btn dense color="primary" flat label="បន្ថែម" @click="$refs.formAddDoctor.submit()"
                                   no-caps/>
                          </div>
                        </q-form>
                      </q-popup-edit>
                    </q-btn>
                  </template>
                </q-select>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input class="col-md col-xs-12"
                         outlined
                         v-model="data.description"
                         label="ចំណាំ"
                         type="textarea"
                         rows="3"
                         square
                         lazy-rules
                         :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
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
  name: "EchoNoteAdd",
  data() {
    return {
      data: {
        patient_obj: null,
        patient: null,
        title: null,
        description: null,
        check_date: null
      },
      doctor: {
        doctor: null
      },
      doctorOptions: this.getDoctors
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
      self.$q.loading.show();
      self.$store.dispatch('echo_note/storeEchoNote', self.data).then(function (res) {
        if (res.status) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: res.message
          });
          window.history.back();
          self.$q.loading.hide();
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: res.message
          })
        }
      });
    },
    dateFormat(val) {
      return date.formatDate(val, 'DD/MM/YYYY')
    },
    filterFn(val, update) {
      let self = this;
      update(() => {
        if (val === '') {
          self.doctorOptions = self.getDoctors
        } else {
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
    patientSelected(selected) {
      this.data.patient = selected.value;
    }
  }
}
</script>

<style scoped>

</style>
