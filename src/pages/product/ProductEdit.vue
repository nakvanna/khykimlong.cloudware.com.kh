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
          separator="cell"
          title="ព័ត៌មានទូទៅ"
          :data="product_data"
          :columns="columns_default1"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.name" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateProduct({id:data._id,data:{name:props.row.name}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="type" :props="props">
                {{ props.row.type }}
                <q-popup-edit v-model="props.row.type">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      @keyup.enter.stop
                      outlined
                      v-model="props.row.type"
                      label="ប្រភេទ"
                      :options="getProductTypes"
                      square
                    >
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateProduct({id:data._id,data:{type:props.row.type}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="unit" :props="props">
                {{ props.row.unit }}
                <q-popup-edit v-model="props.row.unit">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      @keyup.enter.stop
                      outlined
                      v-model="props.row.unit"
                      label="ប្រភេទ"
                      :options="getUnitTypes"
                      square
                    >
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateProduct({id:data._id,data:{unit:props.row.unit}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-table
          separator="cell"
          :data="product_data"
          :columns="columns_default2"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="buy_price" :props="props">
                {{ props.row.buy_price }}
                <q-popup-edit v-model="props.row.buy_price">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input type="number" @keyup.enter.stop v-model="props.row.buy_price" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateProduct({id:data._id,data:{buy_price:props.row.buy_price}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="sale_price" :props="props">
                {{ props.row.sale_price }}
                <q-popup-edit v-model="props.row.sale_price">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input type="number" @keyup.enter.stop v-model="props.row.sale_price" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateProduct({id:data._id,data:{sale_price:props.row.sale_price}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="invent_type" :props="props">
                {{ props.row.invent_type }}
                <q-popup-edit v-model="props.row.invent_type">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      @keyup.enter.stop
                      outlined
                      v-model="props.row.invent_type"
                      label="ប្រភេទ"
                      :options="['Inventory-Part', 'Service', 'Sale-Only', 'Purchase-Only']"
                      square
                    >
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateProduct({id:data._id,data:{invent_type:props.row.invent_type}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="stock_alert" :props="props">
                {{ props.row.stock_alert }}
                <q-popup-edit v-model="props.row.stock_alert">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input type="number" @keyup.enter.stop v-model="props.row.stock_alert" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateProduct({id:data._id,data:{stock_alert:props.row.stock_alert}})"
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
          separator="cell"
          :data="product_data"
          :columns="columns_default3"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="description" :props="props">
                {{ props.row.description }}
                <q-popup-edit v-model="props.row.description">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input type="textarea" @keyup.enter.stop v-model="props.row.description" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateProduct({id:data._id,data:{description:props.row.description}})"
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
    </q-card>
  </q-page>
</template>

<script>
const columns_default1 = [
  {align: 'left', name: 'name', label: 'ឈ្មោះទំនិញ', field: 'name'},
  {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type'},
  {align: 'left', name: 'unit', label: 'ឯកតា', field: 'unit'},
];
const columns_default2 = [
  {align: 'left', name: 'buy_price', label: 'តម្លៃទិញ', field: 'buy_price'},
  {align: 'left', name: 'sale_price', label: 'តម្លៃលក់', field: 'sale_price'},
  {align: 'left', name: 'invent_type', label: 'ស្ដុក', field: 'invent_type'},
  {align: 'left', name: 'stock_alert', label: 'ស្ដុកជូនដំណឹង', field: 'stock_alert'},
];
const columns_default3 = [
  {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description'},
];
export default {
  name: "ProductEdit",
  data() {
    return {
      dataPhoto: new FormData(),
      photo_prev: null,
      product_data: [],
      columns_default1,
      columns_default2,
      columns_default3,
      data: {
        _id: null,
        hostname: '',
        photo: '',
      }
    }
  },
  computed: {
    getProductTypes() {
      return this.$store.getters['product/getProductTypes'].map((t) => {
        return t.name
      })
    },
    getUnitTypes() {
      return this.$store.getters['product/getUnitTypes'].map((u) => {
        return u.name
      })
    },
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
      self.updateProductFile(self.dataPhoto)
    },
    updateProductFile(data) {
      let self = this;
      data.set('id', self.data._id);
      self.$store.dispatch('product/updateProductThumbnail', data).then(function (data) {
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
    },
    updateProduct(data) {
      let self = this;
      self.$store.dispatch('product/updateProduct', data).then(function (data) {
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
    }
  },
  created() {
    let self = this;
    let vm = self.data;
    self.$store.dispatch('product/editProduct', self.$route.params.id).then(function (d) {
      vm.hostname = d.data.hostname;
      vm.photo = d.data.photo;
      vm._id = d.data._id;
      self.product_data = [];
      self.product_data.push(d.data);
    })
  }
}
</script>

<style scoped>

</style>
