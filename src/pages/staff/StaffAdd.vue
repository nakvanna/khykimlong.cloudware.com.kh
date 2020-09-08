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
              <q-item-label class="q-my-sm">
                ឈ្មោះខ្មែរ
              </q-item-label>
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col"
                outlined
                v-model="data.lname"
                label="នាមត្រកូល"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input
                class="col"
                outlined
                v-model="data.fname"
                label="នាមខ្លួន"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-item-label class="q-my-sm">
                ឈ្មោះឡាតាំង
              </q-item-label>
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col"
                outlined
                v-model="data.llatin"
                label="នាមត្រកូលឡាតាំង"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input
                class="col"
                outlined
                v-model="data.flatin"
                label="នាមខ្លួនឡាតាំង"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-select class="col-xs-12 col-md-4"
                        outlined
                        v-model="data.gender"
                        label="ភេទ"
                        :options="['ស្រី', 'ប្រុស']"
                        square
                        lazy-rules
                        :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
              </q-select>
              <q-input class="col-xs-12 col-md-4"
                       outlined
                       v-model="data.dob"
                       label="ថ្ងៃខែឆ្នាំកំណើត"
                       square
                       lazy-rules
                       mask="date" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="dateDOB" transition-show="scale" transition-hide="scale">
                      <q-date v-model="data.dob" @input="() => $refs.dateDOB.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input class="col-xs-12 col-md"
                outlined
                v-model="data.national_id"
                label="លេខអត្តសញ្ញាណប័ណ្ឌ"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col-md-6 col-xs-12"
                outlined
                v-model="data.bank_account_no"
                label="លេខគណនីធនាគារ"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input
                class="col-md col-xs-12"
                outlined
                v-model="data.bank_name"
                label="ឈ្មោះធនាគា"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-item-label class="q-my-sm">
                ទំនាក់ទំនង
              </q-item-label>
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input class="col-xs-12 col-md"
                outlined
                v-model="data.email"
                label="អ៊ីម៉ែ់ល"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input class="col-xs-12 col-md"
                outlined
                v-model="data.tel"
                label="លេខទូរស័ព្ទ"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input class="col-xs-12 col-md"
                       outlined
                       v-model="data.telegram"
                       label="Telegram"
                       square
                       lazy-rules
                       :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-input class="col-xs-12 col-md"
                       outlined
                       v-model="data.facebook"
                       label="Facebook"
                       square
                       lazy-rules
                       :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-item-label class="q-my-sm">
                ទីកន្លែងកំណើត
                <q-btn icon="add" round flat color="primary" @click="$refs.addressBook.show()"/>
              </q-item-label>
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-select class="col"
                        use-input
                        @filter="filterFnAddressBook"
                        outlined
                        v-model="data.pob_address_book"
                        label="ជ្រើសរើស ទីកន្លែងកំណើត..."
                        :options="optionsAddressBook"
                        square
                        lazy-rules
                        :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
              </q-select>
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
          <q-card-actions align="right">
            <q-btn icon="save" style="width: 150px; height: 50px" color="primary" label="រក្សារទុក" @click="$refs.addForm.submit()">
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
    name: "StaffAdd",
    components: {
      AddressBook
    },
    data() {
      return {
        content: 'Hi',
        dialog: false,
        maximizedToggle: true,
        formData: new FormData(),
        data: {
          lname: '',
          fname: '',
          llatin: '',
          flatin: '',
          gender: '',
          dob: '',
          national_id: '',
          bank_account_no: '',
          bank_name: '',
          email: '',
          tel: '',
          telegram: '',
          facebook: '',
          pob_address_book: '',
          current_address_book: '',
          hostname: 'https://api.khykimlong.cloudware.com.kh/',
          // hostname: 'http://localhost:3000/',
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
      onSubmit(){
        let self = this;
        self.$q.loading.show();
        let postData = JSON.stringify(self.data);
        self.formData.set("data", postData);
        self.$store.dispatch('staff/storeStaff', self.formData).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.isShow = false;
            self.$q.loading.hide();
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
