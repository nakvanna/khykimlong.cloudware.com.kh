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
                  ពត៍មានគ្រូពេទ្យ
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-select class="col"
                          outlined
                          v-model="data.doctor"
                          label="ឈ្មោះអ្នកគ្រូពេទ្យ"
                          :options="['Dr.SORN Visai']"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
                <q-input
                  class="col"
                  outlined
                  v-model="data.title"
                  label="ចំណងជើង"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
              </div>
              <div v-show="data.hematology.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>HAEMATHOLOGY</b>
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
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.hematology" :key="'hematology'+i">
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
                  ({{item.min}} - {{item.max}})
                </div>
                <div class="col-2 q-pt-md text-right">
                  <q-btn
                    @click="onRemove('hematology', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>
              <div v-show="data.biochemistry.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>BIOCHEMISTRY</b>
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
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.biochemistry" :key="'biochemistry'+i">
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
                  ({{item.min}} - {{item.max}})
                </div>
                <div class="col-2 q-pt-md text-right">
                  <q-btn
                    @click="onRemove('biochemistry', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>
              <div v-show="data.hormonologie.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>HORMONOLOGIE</b>
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
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.hormonologie" :key="'hormonologie'+i">
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
                  ({{item.min}} - {{item.max}})
                </div>
                <div class="col-2 q-pt-md text-right">
                  <q-btn
                    @click="onRemove('hormonologie', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>
              <div v-show="data.ionogram.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>IONOGRAM</b>
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
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.ionogram" :key="'ionogram'+i">
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
                  ({{item.min}} - {{item.max}})
                </div>
                <div class="col-2 q-pt-md text-right">
                  <q-btn
                    @click="onRemove('ionogram', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>
              <div v-show="data.serology.length" class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col-6 q-my-sm">
                  <b>SEROLOGY</b>
                </q-item-label>
                <q-item-label class="col q-my-sm text-right">
                  <b>REMOVE</b>
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm" v-for="(item, i) in data.serology" :key="'serology'+i">
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
                    @click="onRemove('serology', i)"
                    round
                    color="negative"
                    icon="delete"
                  />
                </div>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="col q-my-sm">
                  ពត៍មានផ្សេងៗ
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input
                  class="col"
                  outlined
                  v-model="data.blood_pressure"
                  label="សម្ពាធឈាម"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                  class="col"
                  outlined
                  v-model="data.pulse"
                  label="ជីពចរ"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                  class="col"
                  outlined
                  v-model="data.heat"
                  label="កម្ដៅ"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
                <q-input
                  class="col"
                  outlined
                  v-model="data.spo"
                  label="SPO"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
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
          hematology: [],
          biochemistry: [],
          serology: [],
          ionogram: [],
          hormonologie: [],
          blood_pressure: '',
          pulse: '',
          heat: '',
          spo: ''
        }
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
      }
    },
    created() {
      let self = this;
      self.$store.dispatch('labo_setting/fetchLaboSetting').then(function (data) {
        self.data.hematology = data.data.filter(function (x) {
          return x.type === 'HAEMATHOLOGY'
        });
        self.data.biochemistry = data.data.filter(function (x) {
          return x.type === 'BIOCHEMISTRY'
        });
        self.data.serology  = data.data.filter(function (x) {
          return x.type === 'SEROLOGY'
        });
        self.data.ionogram  = data.data.filter(function (x) {
          return x.type === 'IONOGRAM'
        });
        self.data.hormonologie  = data.data.filter(function (x) {
          return x.type === 'HORMONOLOGIE'
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
        if(type === 'hematology'){
          vm.hematology.splice(i, 1);
        } else if(type === 'biochemistry'){
          vm.biochemistry.splice(i, 1);
        } else if(type === 'hormonologie'){
          vm.hormonologie.splice(i, 1);
        } else if(type === 'ionogram'){
          vm.ionogram.splice(i, 1);
        } else {
          vm.serology.splice(i, 1);
        }
      },
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      }
    }
  }
</script>

<style scoped>

</style>
