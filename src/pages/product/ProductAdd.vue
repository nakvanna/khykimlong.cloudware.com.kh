<template>
  <q-page>
    <q-card-actions align="left">
      <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
        <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
      </q-btn>
    </q-card-actions>
    <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-select class="col-xs-12 col-md-6 col-lg-4"
                      outlined
                      v-model="data.invent_type"
                      label="ប្រភេទស្តុក"
                      :options="['Inventory-Part', 'Purchase-Only', 'Sale-Only', 'Service']"
                      @input="inventTypeSelect"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
            </q-select>
          </div>
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-input
              class="col col-xs-12 col-md"
              v-model="data.name"
              outlined
              label="ឈ្មោះទំនិញ"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
            <div class="col col-xs-12 col-md-4">
              <div class="row">
                <q-select class="col"
                          outlined
                          v-model="data.type_obj"
                          label="ជ្រើសរើសប្រភេទ"
                          :options="getProductTypes"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
                <q-btn
                  @click="$refs.ProductType.show()"
                  class="col-1"
                  style="height: 55px"
                  dense
                  color="primary"
                  icon="add"
                />
              </div>
            </div>
            <div class="col col-xs-12 col-md-4">
              <div class="row">
                <q-select class="col"
                          outlined
                          v-model="data.unit_obj"
                          label="ជ្រើសរើសឯកតា"
                          :options="getUnitTypes"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
                <q-btn
                  @click="$refs.UnitType.show()"
                  class="col-1"
                  style="height: 55px"
                  dense
                  color="primary"
                  icon="add"
                />
              </div>
            </div>
          </div>
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-input
              :readonly="data_readonly.buy_price"
              class="col"
              v-model="data.buy_price"
              outlined
              label="តម្លៃទិញ"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
            <q-input
              :readonly="data_readonly.sale_price"
              class="col-4"
              v-model="data.sale_price"
              outlined
              label="តម្លៃលក់"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
            <q-input
              :readonly="data_readonly.alert"
              class="col-4"
              v-model="data.stock_alert"
              outlined
              label="ចំនួនជូនដំណឹង"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
          </div>

          <div class="row q-gutter-x-sm q-mb-sm">
            <q-input
              class="col"
              v-model="data.description"
              outlined
              label="ចំណាំ"
              square
              type="textarea"
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
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
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn icon="save" style="width: 150px; height: 50px" color="primary" label="រក្សារទុក"
               @click="$refs.addForm.submit()">
          <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
    <product-type ref="ProductType"/>
    <unit-type ref="UnitType"/>
  </q-page>
</template>

<script>
  import ProductType from "pages/product/ProductType";
  import UnitType from "pages/product/UnitType";

  export default {
    name: "ProductAdd",
    components: {
      ProductType, UnitType
    },
    data() {
      return {
        formData: new FormData(),
        data: {
          name: '',
          type_obj: null,
          unit_obj: null,
          stock_alert: '0',
          buy_price: '0',
          sale_price: '0',
          invent_type: '',
          description: '',
          hostname: 'https://api.khykimlong.cloudware.com.kh/',
          // hostname: 'http://localhost:3000/',
        },
        data_readonly: {
          buy_price: false,
          sale_price: false,
          alert: false,
        }
      }
    },
    computed: {
      getProductTypes() {
        return this.$store.getters['product/getProductTypes'].map((x) => {
          return {
            label: x.name,
            value: x._id
          }
        })
      },
      getUnitTypes() {
        return this.$store.getters['product/getUnitTypes'].map((x) => {
          return {
            label: x.name,
            value: x._id
          }
        })
      },
    },
    methods: {
      onSubmit() {
        let self = this;
        self.$q.loading.show();
        let vm = self.data;
        let postData = JSON.stringify({
          name: vm.name,
          type: vm.type_obj.label,
          unit: vm.unit_obj.label,
          stock_alert: vm.stock_alert,
          buy_price: vm.buy_price,
          sale_price: vm.sale_price,
          invent_type: vm.invent_type,
          description: vm.description,
          hostname: vm.hostname,
        });
        self.formData.set("data", postData);
        self.$store.dispatch('product/storeProduct', self.formData).then(async function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
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
      factoryFnUploadPhoto(file) {
        let self = this;
        self.formData.set('photo', file[0]);
      },
      inventTypeSelect(selected) {
        let vm = this.data_readonly;
        if (selected === 'Inventory-Part'){
          vm.buy_price = false;
          vm.sale_price = false;
          vm.alert = false;
        }else if (selected === 'Purchase-Only') {
          vm.buy_price = false;
          vm.sale_price = true
          vm.alert = true
        } else if (selected === 'Sale-Only') {
          vm.buy_price = true;
          vm.sale_price = false;
          vm.alert = false;
        } else if (selected === 'Service'){
          vm.buy_price = true;
          vm.sale_price = false;
          vm.alert = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
