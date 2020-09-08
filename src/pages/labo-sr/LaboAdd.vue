<template>
  <q-page>
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
                  បំពេញពត៍មាន
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-select class="col-md col-xs-12"
                          outlined
                          v-model="data.patient_obj"
                          label="ឈ្មោះអ្នកជម្ងឺ"
                          :options="getPatients"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
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
                            <q-btn dense color="primary" flat label="បន្ថែម" @click="$refs.formAddDoctor.submit()" no-caps/>
                          </div>
                        </q-form>
                      </q-popup-edit>
                    </q-btn>
                  </template>
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
                         label="ថ្ងៃពិនិត្យ" outlined square v-model="data.labo_date" mask="date"
                         :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxyLaboDate" transition-show="scale" transition-hide="scale">
                        <q-date v-model="data.labo_date" @input="() => $refs.qDateProxyLaboDate.hide()"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div v-show="data.hem.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>HEMATOLOGY</b>
                </q-item-label>
                <q-item-label class="col q-my-sm text-center">
                  <b>UNIT</b>
                </q-item-label>
                <q-item-label class="col q-my-sm text-center">
                  <b>REFERENCE</b>
                </q-item-label>
                <q-item-label class="col-2 q-my-sm text-right">
                  <b>REMOVE</b>
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.hem" :key="'hem'+i">
                <q-input
                  class="col-6"
                  v-model="item.result"
                  type="number"
                  :label="item.name"
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <div class="col q-pt-lg text-center">
                  {{item.value}}<sup>{{item.superscript}}</sup>{{item.unit}}
                </div>
                <div class="col q-pt-lg text-center">
                  (N: {{item.min.toFixed(2)}} - {{item.max.toFixed(2)}})
                </div>
                <div class="col-2 q-pt-md text-right">
                  <q-btn
                    @click="onRemove('hem', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>

              <div v-show="data.leu.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>LEUCOCYTAIRE</b>
                </q-item-label>
                <q-item-label class="col q-my-sm text-center">
                  <b>UNIT</b>
                </q-item-label>
                <q-item-label class="col q-my-sm text-center">
                  <b>REFERENCE</b>
                </q-item-label>
                <q-item-label class="col-2 q-my-sm text-right">
                  <b>REMOVE</b>
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.leu" :key="'leu'+i">
                <q-input
                  class="col-6"
                  v-model="item.result"
                  type="number"
                  :label="item.name"
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <div class="col q-pt-lg text-center">
                  {{item.value}}<sup>{{item.superscript}}</sup>{{item.unit}}
                </div>
                <div class="col q-pt-lg text-center">
                  (N: {{item.min.toFixed(2)}} - {{item.max.toFixed(2)}})
                </div>
                <div class="col-2 q-pt-md text-right">
                  <q-btn
                    @click="onRemove('leu', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>

              <div v-show="data.bio.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>BIOCHIMIE</b>
                </q-item-label>
                <q-item-label class="col q-my-sm text-center">
                  <b>UNIT</b>
                </q-item-label>
                <q-item-label class="col q-my-sm text-center">
                  <b>REFERENCE</b>
                </q-item-label>
                <q-item-label class="col-2 q-my-sm text-right">
                  <b>REMOVE</b>
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.bio" :key="'bio'+i">
                <q-input
                  class="col-6"
                  v-model="item.result"
                  type="number"
                  :label="item.name"
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <div class="col q-pt-lg text-center">
                  {{item.value}}<sup>{{item.superscript}}</sup>{{item.unit}}
                </div>
                <div class="col q-pt-lg text-center">
                  <span v-if="item.min !== null && item.max !== null">(N: {{item.min}} - {{item.max}})</span>
                  <span v-else-if="item.min === null && item.max !== null">(< {{item.max}})</span>
                  <span v-else-if="item.min !== null && item.max === null">(< {{item.max}})</span>
                </div>
                <div class="col-2 q-pt-md text-right">
                  <q-btn
                    @click="onRemove('bio', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>

              <div v-show="data.ser.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>SÉROLOGIE</b>
                </q-item-label>
                <q-item-label class="col q-my-sm text-right">
                  <b>REMOVE</b>
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.ser" :key="'ser'+i">
                <q-select class="col-6"
                          v-model="item.result"
                          :label="item.name"
                          :options="['Negative', 'Positive']"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>

                <div class="col q-pt-md text-right">
                  <q-btn
                    @click="onRemove('ser', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>

            </q-card-section>
            <q-card-actions align="right">
              <q-btn icon="save" style="width: 150px; height: 50px" color="primary" label="រក្សារទុក" @click="$refs.addForm.submit()">
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
    name: "LaboAdd",
    data() {
      return {
        data: {
          patient_obj: '',
          patient: '',
          doctor: '',
          title: '',
          labo_date: '',
          hem: [],
          leu: [],
          bio: [],
          ser: [],
        },
        doctor: {
          doctor: null
        },
        doctorOptions:this.getDoctors
      }
    },
    computed: {
      getPatients(){
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
    created() {
      let self = this;
      self.$store.dispatch('labo_setting/fetchLaboSetting').then(function (data) {
        self.data.hem = data.data.filter(function (x) {
          return x.type === 'HEMATOLOGY'
        });
        self.data.leu = data.data.filter(function (x) {
          return x.type === 'LEUCOCYTAIRE'
        });
        self.data.bio  = data.data.filter(function (x) {
          return x.type === 'BIOCHIMIE'
        });
        self.data.ser  = data.data.filter(function (x) {
          return x.type === 'SÉROLOGIE'
        });
      })
    },
    methods: {
      onSubmit(){
        let self = this;
        self.data.patient = self.data.patient_obj.value;
        self.$store.dispatch('labo/storeLabo', self.data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.isShow = false;
            window.history.back();
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
      onRemove(type, i){
        let vm = this.data;
        if(type === 'hem'){
          vm.hem.splice(i, 1);
        } else if(type === 'leu'){
          vm.leu.splice(i, 1);
        } else if(type === 'ser'){
          vm.ser.splice(i, 1);
        } else {
          vm.bio.splice(i, 1);
        }
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
