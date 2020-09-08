<template>
  <q-dialog v-model="isShow" persistent transition-show="flip-down" transition-hide="flip-up">
    <q-card style="width: 1250px; max-width: 90vw;">
      <q-bar>
        <h6>គ្រប់គ្រងអាស័យដ្ឋាន</h6>
        <q-space/>
        <q-btn class="q-mr-md" dense flat label="រក្សារទុក" icon-right="save" @click="$refs.addForm.submit()">
          <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
          <q-card flat bordered class="my-card bg-grey-1">
            <q-card-section>
              <div class="row q-gutter-x-sm">
                <q-select class="col"
                          use-input
                          @filter="filterFnProvince"
                          outlined
                          v-model="data.address_province"
                          label="ជ្រើសរើស ខេត្ត/ក្រុង..."
                          :options="optionsProvince"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                  <template v-slot:after>
                    <q-btn round dense flat icon="add" color="primary" @click="$refs.addProvince.show()"/>
                  </template>
                </q-select>
                <q-select class="col"
                          use-input
                          @filter="filterFnDistrict"
                          outlined
                          v-model="data.address_district"
                          label="ជ្រើសរើស ស្រុក/ខណ្ឌ..."
                          :options="optionsDistrict"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                  <template v-slot:after>
                    <q-btn round dense flat icon="add" color="primary" @click="$refs.addDistrict.show()"/>
                  </template>
                </q-select>
                <q-select class="col"
                          use-input
                          @filter="filterFnCommune"
                          outlined
                          v-model="data.address_commune"
                          label="ជ្រើសរើស ឃំុ/សង្កាត់..."
                          :options="optionsCommune"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                  <template v-slot:after>
                    <q-btn round dense flat icon="add" color="primary" @click="$refs.addCommune.show()"/>
                  </template>
                </q-select>
                <q-select class="col"
                          use-input
                          @filter="filterFnVillage"
                          outlined
                          v-model="data.address_village"
                          label="ជ្រើសរើស ភូមិ..."
                          :options="optionsVillage"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                  <template v-slot:after>
                    <q-btn round dense flat icon="add" color="primary" @click="$refs.addVillage.show()"/>
                  </template>
                </q-select>
              </div>
            </q-card-section>
            <q-card-section>
              <q-table
                title="បញ្ជីអាស័យដ្ឋាន"
                :data="getAddressBooks"
                :columns="columns"
                row-key="name"
                :filter="filter"
              >
                <template v-slot:top-right>
                  <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </q-form>
      </q-card-section>
    </q-card>
    <add-province ref="addProvince"/>
    <add-district ref="addDistrict"/>
    <add-commune ref="addCommune"/>
    <add-village ref="addVillage"/>
  </q-dialog>
</template>

<script>
  import AddProvince from "./AddProvince";
  import AddDistrict from "./AddDistrict";
  import AddCommune from "./AddCommune";
  import AddVillage from "./AddVillage";

  export default {
    name: "AddressBook",
    components: {AddVillage, AddCommune, AddDistrict, AddProvince},
    data() {
      return {
        isShow: false,
        filter: '',
        columns: [
          {name: 'province', align: 'left', label: 'ខេត្ត/ក្រុង', field: 'province', sortable: true},
          {name: 'district',align: 'left', label: 'ស្រុក/ខណ្ឌ', field: 'district', sortable: true},
          {name: 'commune',align: 'left', label: 'ឃំុ/សង្កាត់', field: 'commune', sortable: true},
          {name: 'village',align: 'left', label: 'ភូមិ', field: 'village', sortable: true},
        ],
        data:{
          address_province:null,
          address_district:null,
          address_commune:null,
          address_village:null,
        },
        optionsProvince: [],
        optionsDistrict: [],
        optionsCommune: [],
        optionsVillage: [],
      }
    },
    computed: {
      getAddressBooks() {
        return this.$store.getters['address_book/getAddressBook'];
      },
      getProvinces() {
        return this.$store.getters['address_book/getProvince'].map(function (x) {
          return {
            value: x._id,
            label: x.name
          }
        })
      },
      getDistricts() {
        return this.$store.getters['address_book/getDistrict'].map(function (x) {
          return {
            value: x._id,
            label: x.name
          }
        })
      },
      getCommunes() {
        return this.$store.getters['address_book/getCommune'].map(function (x) {
          return {
            value: x._id,
            label: x.name
          }
        })
      },
      getVillages() {
        return this.$store.getters['address_book/getVillage'].map(function (x) {
          return {
            value: x._id,
            label: x.name
          }
        })
      },
    },
    methods: {
      show() {
        this.isShow = true
      },
      onSubmit() {
        let self = this;
        self.$q.loading.show();
        self.$store.dispatch('address_book/storeAddressBook', self.data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.clearForm();
            self.$q.loading.hide();
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
      clearForm(){
        let self = this;
        for (let key of Object.keys(self.data)) {
          if (key!=='staff'){
            self.data[key] = null
          }
        }
      },
      filterFnProvince(val, update, abort) {
        let self = this;
        update(() => {
          const needle = val.toLowerCase()
          self.optionsProvince = self.getProvinces.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      filterFnDistrict(val, update, abort) {
        let self = this;
        update(() => {
          const needle = val.toLowerCase()
          self.optionsDistrict = self.getDistricts.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      filterFnCommune(val, update, abort) {
        let self = this;
        update(() => {
          const needle = val.toLowerCase()
          self.optionsCommune = self.getCommunes.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      filterFnVillage(val, update, abort) {
        let self = this;
        update(() => {
          const needle = val.toLowerCase()
          self.optionsVillage = self.getVillages.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }
</script>

<style scoped>

</style>
