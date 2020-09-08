<template>
  <q-page>
    <q-card>
      <q-card-actions align="left">
        <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
          <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
        </q-btn>
      </q-card-actions>
      <q-card-section>
        <q-img
          :src="data.hostname+data.photo"
          style="height: 200px; max-width: 200px"
        >
          <div class="absolute-bottom text-right no-padding">
            <q-btn icon="edit" label="កែប្រែ" flat>
              <q-popup-edit v-model="photo_prev">
                <q-file style="width: 300px"
                        label="ជ្រើសរើសរូបភាព"
                        outlined
                        v-model="photo_prev"
                        square
                        accept="image/*"
                        dense
                        @input="photoFn"
                        lazy-rules
                        :rules="[ val => !!val || 'សូមជ្រើសរើស']">
                  <template v-slot:prepend>
                    <q-icon name="attach_file"/>
                  </template>
                </q-file>
              </q-popup-edit>
            </q-btn>
          </div>
        </q-img>
        <q-table
          title="ព័ត៌មានទូទៅ"
          :data="personal_data"
          :columns="columns_default"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="kh_name" :props="props">
                {{ props.row.kh_name }}
                <q-popup-edit v-model="props.row.kh_name">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.kh_name" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updatePatient({id:data._id,data:{kh_name:props.row.kh_name}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="lt_name" :props="props">
                {{ props.row.lt_name }}
                <q-popup-edit v-model="props.row.lt_name">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.lt_name" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updatePatient({id:data._id,data:{lt_name:props.row.lt_name}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="gender" :props="props">
                {{ props.row.gender }}
                <q-popup-edit v-model="props.row.gender">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select @keyup.enter.stop
                              outlined
                              v-model="props.row.gender"
                              label="ភេទ"
                              :options="['ប្រុស','ស្រី']"
                              square>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updatePatient({id:data._id,data:{gender:props.row.gender}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="age" :props="props">
                {{ props.row.age }}
                <q-popup-edit v-model="props.row.age">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.age" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updatePatient({id:data._id,data:{age:props.row.age}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="phone" :props="props">
                {{ props.row.phone }}
                <q-popup-edit v-model="props.row.phone">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.phone" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updatePatient({id:data._id,data:{phone:props.row.phone}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-table
          title="អាស័យដ្ឋាន"
          :data="address_data"
          :columns="columns_address"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="type" :props="props">
                {{ props.row.type }}
              </q-td>
              <q-td key="province" :props="props">
                {{ props.row.province }}
              </q-td>
              <q-td key="district" :props="props">
                {{ props.row.district }}
              </q-td>
              <q-td key="commune" :props="props">
                {{ props.row.commune }}
              </q-td>
              <q-td key="village" :props="props">
                {{ props.row.village }}
              </q-td>
              <q-td key="_id" :props="props">
                <q-btn dense round flat color="primary" icon="edit"/>
                <q-popup-edit v-model="props.row._id" :validate="val => !!val">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      use-input
                      @filter="filterFnAddressBook"
                      outlined
                      v-model="props.row._id"
                      label="ជ្រើសរើស អាស័យដ្ឋាន"
                      :options="optionsAddressBook"
                      square>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updatePatient({id:data._id,data:{current_address_book:props.row._id.value}})"
                               :disable="validate(value) === false || initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  const columns_default = [
    {align: 'left', name: 'kh_name', label: 'នាមត្រកូល', field: 'kh_name'},
    {align: 'left', name: 'lt_name', label: 'នាមខ្លួន', field: 'lt_name'},
    {align: 'left', name: 'gender', label: 'ភេទ', field: 'gender'},
    {align: 'left', name: 'age', label: 'ថ្ងៃខែឆ្នាំកំណើត', field: 'age'},
    {align: 'left', name: 'phone', label: 'លេខទូរសព្ទ', field: 'phone'},
  ];
  const columns_address = [
    {align: 'left', name: 'province', label: 'ខេត្ត/ក្រុង', field: 'province'},
    {align: 'left', name: 'district', label: 'ស្រុក/ខណ្ឌ', field: 'district'},
    {align: 'left', name: 'commune', label: 'ឃំុ/សង្កាត់', field: 'commune'},
    {align: 'left', name: 'village', label: 'ភូមិ', field: 'village'},
    {align: 'left', name: '_id', label: 'កែប្រែ', field: '_id'},
  ];
  export default {
    name: "PatientEdit",
    data(){
      return {
        dataPhoto: new FormData(),
        columns_default,
        columns_address,
        photo_prev: null,
        personal_data: [],
        address_data: [],
        optionsAddressBook: [],
        data: {
          _id: null,
          current_address_book: [],
          age: "14/06/2020",
          facebook: "Nak Vanna",
          flatin: "Vanna",
          gender: "ប្រុស",
          // hostname: "https://api.visai.cloudware.com.kh/",
          hostname: "http://localhost:3000/",
          kh_name: "ណាក់ វណ្ណា",
          phone: "5656645235",
          photo: "files/patients-icon-7.jpg",
        }
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
    created() {
      let self = this;
      let vm = self.data;
      self.$store.dispatch('patient/editPatient', self.$route.params.id).then(function (data) {
        vm._id = data.data._id;
        vm.current_address_book = data.data.current_address_book;
        vm.age = data.data.age;
        vm.contact = data.data.contact;
        vm.facebook = data.data.facebook;
        vm.lt_name = data.data.lt_name;
        vm.gender = data.data.gender;
        vm.kh_name = data.data.kh_name;
        vm.phone = data.data.phone;
        vm.photo = data.data.photo;
        vm.tel = data.data.tel;
        vm.telegram = data.data.telegram;
        self.personal_data = [];
        self.personal_data.push(data.data);
        self.address_data = [];
        let current_address = data.data.current_address_book;
        self.address_data.push({
          type: 'អាស័យដ្ឋានបច្ចុប្បន្ន',
          _id: {
            value: current_address._id,
            label: `${current_address.province} - ${current_address.district} - ${current_address.commune} - ${current_address.village}`
          },
          province: current_address.province,
          district: current_address.district,
          commune: current_address.commune,
          village: current_address.village
        });
      });
    },
    methods: {
      photoFn(value) {
        let self = this;
        self.dataPhoto.set('id', self.data._id);
        self.dataPhoto.set('photo', value);
        let reader = new FileReader();
        reader.readAsDataURL(value);
        reader.onload = function () {
          self.data.photo = reader.result;
          self.data.hostname = '';
        };
        self.updatePatientFile(self.dataPhoto)
      },
      filterFnAddressBook(val, update, abort) {
        let self = this;
        update(() => {
          const needle = val.toLowerCase()
          self.optionsAddressBook = self.getAddressBooks.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      updatePatient(data){
        let self = this;
        self.$store.dispatch('patient/updatePatient', data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
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
      updatePatientFile(data){
        let self = this;
        data.set('id', self.data._id);
        self.$store.dispatch('patient/updatePatientThumbnail', data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
