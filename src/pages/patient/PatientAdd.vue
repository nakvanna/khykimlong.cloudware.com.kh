<template>
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
                ឈ្មោះខ្មែរ
              </q-item-label>
              <q-item-label class="col q-my-sm">
                ឈ្មោះឡាតាំង
              </q-item-label>
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col"
                outlined
                v-model="data.kh_name"
                label="ឈ្មោះខ្មែរ"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input
                class="col"
                outlined
                v-model="data.lt_name"
                label="ឡាតាំង"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-select class="col-md-4 col-xs-12"
                        outlined
                        v-model="data.gender"
                        label="ភេទ"
                        :options="['ស្រី', 'ប្រុស']"
                        square
                        lazy-rules
                        :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
              </q-select>
              <q-input class="col-md-4 col-xs-12"
                       outlined
                       v-model="data.age"
                       label="អាយុ (35ឆ្នាំ 5ខែ 20ថ្ងៃ)"
                       square
                       lazy-rules
                       :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input class="col-md col-xs-12"
                       outlined
                       v-model="data.phone"
                       label="លេខទូរសព្ទ"
                       square
                       lazy-rules
                       :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-item-label class="q-my-sm">
                អាស័យដ្ឋានបច្ចុប្បន្ន
                <q-btn icon="add" round flat color="primary" @click="$refs.addressBook.show()"/>
              </q-item-label>
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-select class="col"
                        use-input
                        @filter="filterFnAddressBook"
                        outlined
                        v-model="data.current_address_book"
                        label="ជ្រើសរើស អាស័យដ្ឋានបច្ចុប្បន្ន"
                        :options="optionsAddressBook"
                        square
                        lazy-rules
                        :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
              </q-select>
            </div>

            <div class="row q-gutter-x-sm q-mb-sm">
              <q-uploader
                :factory="factoryFnUploadPhoto"
                class="col"
                accept="image/*"
                hide-upload-btn
                label="ដាក់រូបភាព"
                color="grey"
                square
                flat
                bordered
                style="max-width: 300px"
                auto-upload
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-item-label class="col q-my-sm">
                ពិនិត្យអម
              </q-item-label>
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col-md-8 col-xs-12"
                outlined
                v-model="data_detail.diagnosis"
                label="រោគវិនិច្ឆ័យ"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input class="col-md col-xs-12" label="ថ្ងៃចូលពិនិត្យ" outlined square v-model="data_detail.date"
                       mask="date"
                       :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="data_detail.date" @input="() => $refs.qDateProxy.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col-md-3 col-xs-12"
                outlined
                v-model="data_detail.ta"
                label="TA"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input
                class="col-md-3 col-xs-12"
                outlined
                v-model="data_detail.t"
                label="T0"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input
                class="col-md-3 col-xs-12"
                outlined
                v-model="data_detail.spo"
                label="SPO2"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input
                class="col-md col-xs-12"
                outlined
                v-model="data_detail.poules"
                label="Poules"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col"
                rows="3"
                outlined
                v-model="data_detail.note"
                label="ចំណាំ"
                type="textarea"
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
    <address-book ref="addressBook"/>
  </q-card>
</template>

<script>
import AddressBook from "pages/address-book/AddressBook";

export default {
  name: "PatientAdd",
  components: {AddressBook},
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
      formData: new FormData(),
      data: {
        kh_name: null,
        lt_name: null,
        gender: null,
        age: null,
        phone: null,
        current_address_book: null,
        // hostname: 'https://api.visai.cloudware.com.kh/',
        hostname: 'http://localhost:3000/',
      },
      data_detail: {
        diagnosis: null,
        ta: null,
        t: null,
        spo: null,
        poules: null,
        note: null,
        date: null,
        patient: null,
      },
      optionsAddressBook: []
    }
  },
  computed: {
    getAddressBooks() {
      return this.$store.getters['address_book/getAddressBook'].map(function (x) {
        return {
          value: x._id,
          label: `${x.province} - ${x.district} - ${x.commune} - ${x.village}`
        }
      })
    },
  },
  methods: {
    onSubmit() {
      let self = this;
      console.log(self.data)
      let postData = JSON.stringify(self.data);
      self.formData.set("data", postData);
      self.$q.loading.show();
      self.$store.dispatch('patient/storePatient', self.formData).then(function (data) {
        self.data_detail.patient = data.data._id;
        if (data.status) {
          console.log(self.data_detail)
          self.$store.dispatch('patient/storePatientDetail', self.data_detail).then(function (data_detail) {
            if (data_detail.status) {
              self.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: data_detail.message
              });
              self.isShow = false;
              window.history.back();
              self.$q.loading.hide();
            } else {
              self.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: data_detail.message
              })
            }
          })
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
    filterFnAddressBook(val, update, abort) {
      let self = this;
      update(() => {
        const needle = val.toLowerCase()
        self.optionsAddressBook = self.getAddressBooks.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    factoryFnUploadPhoto(file) {
      let self = this;
      self.formData.set('photo', file[0]);
    }
  }
}
</script>

<style scoped>

</style>
