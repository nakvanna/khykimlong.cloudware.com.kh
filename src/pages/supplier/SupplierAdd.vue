<template>
  <q-dialog persistent v-model="isShow" full-width position="top">
    <q-card>
      <q-bar style="height: 50px">
        <h6>បន្ថែមអ្នកផ្គត់ផ្គង់</h6>
        <q-space/>
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
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-item-label class="col q-my-sm">
              អ្នកផ្គត់ផ្គង់
            </q-item-label>
            <q-item-label class="col q-my-sm">
              ក្រុមហ៊ុន
            </q-item-label>
            <q-item-label class="col q-my-sm">
              អាស័យដ្ឋាន
              <q-btn icon="add" round flat color="primary" @click="$refs.addressBook.show()"/>
            </q-item-label>
          </div>
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-input
              class="col"
              outlined
              v-model="data.name"
              label="ឈ្មោះ"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
            <q-input
              class="col"
              outlined
              v-model="data.company"
              label="ឈ្មោះក្រុមហ៊ុន"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
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
            <q-input
              class="col"
              outlined
              v-model="data.contact"
              label="ទំនាក់ទំនង"
              type="textarea"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
          </div>
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-input
              class="col"
              outlined
              v-model="data.description"
              label="សំគាល់"
              type="textarea"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
          </div>
        </q-form>
        <div class="row">
          <div class="col" align="right">
            <q-btn dense icon="save" style="height: 50px; width: 120px" label="រក្សាទុក" color="primary" @click="$refs.addForm.submit()">
              <q-tooltip content-class="bg-white text-primary" v-close-popup>Save</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <address-book ref="addressBook"/>
  </q-dialog>
</template>

<script>
  import AddressBook from "pages/address-book/AddressBook";
  export default {
    name: "SupplierAdd",
    components: {AddressBook},
    data() {
      return {
        isShow: false,
        optionsAddressBook: [],
        data: {
          name: '',
          company: '',
          current_address_book: '',
          contact: '',
          description: '',
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
    methods: {
      onSubmit() {
        let self = this;
        self.$q.loading.show();
        let vm = self.data;
        let postData = {
          name: vm.name,
          company: vm.company,
          current_address_book: vm.current_address_book.value,
          contact: vm.contact,
          description: vm.description
        }
        self.$store.dispatch('supplier/storeSupplier', postData).then(function (data) {
          if (data.status) {
            self.isShow = false;
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
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
      show() {
        this.isShow = true;
      },
      filterFnAddressBook(val, update, abort) {
        let self = this;
        update(() => {
          const needle = val.toLowerCase()
          self.optionsAddressBook = self.getAddressBooks.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
    }
  }
</script>

<style scoped>

</style>
