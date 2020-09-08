<template>
  <q-page>
    <q-card flat bordered class="my-card bg-grey-1">
      <q-expansion-item
        expand-separator
        :duration="1000"
        v-model="expand"
        label="តារាងគិតលុយ"
        caption="គិតលុយអតិថជន"
      >
        <q-card-section>
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
            ref="addForm"
          >
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-select
                use-input
                input-debounce="0"
                @filter="filterFn"
                behavior="dialog"
                class="col"
                outlined
                v-model="data.patient_obj"
                label="ជ្រើសរើសអតិថជន"
                :options="options"
                @input="onPatientSelect"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
              </q-select>
            </div>

            <q-table
              separator="cell"
              :title="`បញ្ចីទំនិញ នឹងតម្លៃសរុប $${data.amount = totalAmount}`"
              :data="data_detail"
              :columns="columns"
              :rows-per-page-options="[0]"
              hide-bottom
            >
              <template v-slot:body="props">
                <q-tr>
                  <q-td>
                    {{props.pageIndex + 1}}
                  </q-td>
                  <q-td style="width: 300px" key="name">
                    <q-select
                      readonly
                      class="col"
                      v-model="props.row.product_obj"
                      :options="data_detail"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                    </q-select>
                  </q-td>
                  <q-td style="width: 200px">
                    <q-input
                      class="col"
                      placeholder="ចំណាំ"
                      readonly
                      v-model="props.row.description"
                      type="textarea"
                      rows="1"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                  </q-td>
                  <q-td>
                    <q-input
                      class="col"
                      placeholder="ប្រភេទស្ដុក"
                      readonly
                      v-model="props.row.invent_type"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                  </q-td>
                  <q-td>
                    <q-input
                      class="col"
                      v-model="props.row.sale_qty"
                      type="number"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                  </q-td>
                  <q-td>
                    <q-input
                      class="col"
                      v-model="props.row.sale_price"
                      type="number"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                  </q-td>
                  <q-td>
                  <span class="text-bold" style="font-size: large">
                    ${{props.row.sale_qty * props.row.sale_price}}
                  </span>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-separator color="orange" inset/>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col-3"
                v-model="data.paid_balance = totalAmount"
                type="number"
                label="ថ្លៃចំណាយ"
                square
              />
              <q-input
                class="col-3"
                v-model="data.due_balance = getDueBalance"
                type="number"
                label="ថ្លៃជំពាក់"
                disable
                square
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <div class="q-gutter-sm q-pr-lg">
            <q-checkbox v-model="is_auto" label="Print Invoice" />
          </div>
          <q-btn v-show="!data_detail.length" disable icon="save" style="width: 150px; height: 35px" color="primary"
                 label="គិតលុយ"
          >
            <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
          </q-btn>
          <q-btn v-show="data_detail.length" icon="save" style="width: 150px; height: 35px" color="primary"
                 label="គិតលុយ"
                 @click="confirm_cashier = true">
            <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        :duration="1000"
        v-model="getToggleExpand"
        label="បញ្ចីគិតលុយ"
        caption="អតិថជនដែលបានគិតលុយ"
      >
        <q-card-section>
          <q-table
            class="table-virtual-scroll-stock"
            :data="getSalesReceive"
            :columns="columns_receive"
            row-key="_id"
            :filter="filter"
            virtual-scroll
            :pagination.sync="pagination"
            :rows-per-page-options="[0]"
            :virtual-scroll-sticky-size-start="48"
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props" class="cursor-pointer" @click="$router.push({path: `/sale/${props.row._id}/view`})">
                <q-td key="no" :props="props" class="q-gutter-x-xs">
                  <span>{{props.rowIndex + 1}}</span>
                </q-td>
                <q-td key="patient_name" :props="props" class="q-gutter-x-xs">
                  <span class="text-bold text-uppercase">{{props.row.patient.kh_name}}</span>
                </q-td>
                <q-td key="amount" :props="props" class="q-gutter-x-xs">
                  <span class="text-bold text-primary">${{props.row.amount}}</span>
                </q-td>
                <q-td key="paid_amount" :props="props" class="q-gutter-x-xs">
                  <span class="text-bold text-warning">${{props.row.paid_amount}}</span>
                </q-td>
                <q-td key="due_amount" :props="props" class="q-gutter-x-xs">
                  <span class="text-bold text-negative">${{props.row.due_amount}}</span>
                </q-td>
                <q-td key="sale_date" :props="props" class="q-gutter-x-xs">
                  <span class="text-bold">{{dateFormat(props.row.sale_date)}}</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-expansion-item>
    </q-card>
    <q-dialog v-model="confirm_cashier" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="info" color="primary" text-color="white"/>
          <span class="q-ml-sm text-h6">តើអ្នកប្រាកដហើយមែនទេ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="ទេ" color="negative" v-close-popup/>
          <q-btn @click="$refs.addForm.submit()" flat label="បាទ/ចាស" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import {date, LocalStorage} from "quasar";

  let patient_data = [];
  export default {
    name: "Cashier",
    data() {
      return {
        is_auto: true,
        confirm_cashier: false,
        patient_data,
        options: patient_data,
        expand: true,
        data: {
          _id: null,
          user_cashier: LocalStorage.getItem('userInfo')['user_info']._id,
          patient_obj: null,
          patient: null,
          sale_status: 'Receive',
          sale_date: null,
          description: '',
          amount: '0',
          paid_amount: '0',
          paid_balance: '0',
          due_balance: '0',
          due_amount: '0',
        },
        data_detail: [],
        columns: [
          {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
          {align: 'left', name: 'name', label: 'ទំនិញ', field: 'name', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'invent_type', label: 'ប្រភេទស្តុក', field: 'invent_type', sortable: true},
          {align: 'left', name: 'sale_qty', label: 'ចំនួន', field: 'sale_qty', sortable: true},
          {align: 'left', name: 'sale_price', label: 'តម្លៃលក់', field: 'sale_price', sortable: true},
          {align: 'left', name: 'total', label: 'សរុប/មុខ', field: 'total', sortable: true},
        ],
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns_receive: [
          // {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
          {align: 'left', name: 'patient_name', label: 'អ្នកជម្ងឺ', field: 'patient_name', sortable: true},
          // {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'amount', label: 'សរុប', field: 'amount', sortable: true},
          {align: 'left', name: 'paid_amount', label: 'ថ្លៃចំណាយ', field: 'paid_amount', sortable: true},
          {align: 'left', name: 'due_amount', label: 'ថ្លៃជំពាក់', field: 'due_amount', sortable: true},
          {align: 'left', name: 'sale_date', label: 'ថ្ងៃលក់ចេញ', field: 'sale_date', sortable: true},
        ],
      }
    },
    async created() {
      let self = this;
      await self.$store.dispatch('patient/fetchPatient').then(function (res) {
        self.patient_data = res.data.map(function (m) {
          return {
            label: 'ឈ្មោះ ' + m.kh_name + ' ភេទ ' + m.gender + ' លេខទូរសព្ទ ' + m.phone,
            kh_name: m.kh_name,
            phone: m.phone,
            _id: m._id,
          }
        });
      })
    },
    computed: {
      getToggleExpand() {
        return !this.expand;
      },
      getPatient() {
        return this.$store.getters['patient/getPatient'].map((m) => {
          return {
            label: m.kh_name + ' ' + m.lt_name,
            name: m.kh_name,
            phone: m.phone,
            _id: m._id,
          }
        });
      },
      totalAmount() {
        let self = this;
        let totalGroup = self.data_detail.map(function (x) {
          return {
            total: x.sale_qty * x.sale_price
          }
        })
        let amount = 0;
        totalGroup.forEach(function (el) {
          amount += el.total;
        });
        return amount;
      },
      getDueBalance() {
        return this.totalAmount - this.data.paid_balance;
      },
      getSalesReceive() {
        return this.$store.getters['sale/getSales'].filter((f) => {
          return f.sale_status === 'Receive'
        })
      },
    },
    methods: {
      async onSubmit() {
        let self = this;
        let vm_data = self.data;
        let vm_detail = self.data_detail;
        vm_data.paid_amount = vm_data.paid_balance;
        vm_data.due_amount = vm_data.due_balance;
        await self.$store.dispatch('sale/deleteSaleDetail', self.data._id).then(async function (data_delete) {
          if (data_delete.status) {
            await self.$store.dispatch('sale/updateSale', self.data).then(async function (data) {
              if (data.status) {
                let promise = vm_detail.map(async function (data_ex) {
                  data_ex.sale = await data.data._id; //Sale ID that return
                  data_ex.product = await data_ex.product_obj._id; //Product ID
                  data_ex.sale_status = await vm_data.sale_status; //Status in detail
                  data_ex.sale_qty = await data_ex.sale_qty;
                  await self.$store.dispatch('sale/storeSaleDetail', data_ex)
                });
                Promise.all(promise).then(async function () {
                  await self.$store.dispatch('stock/fetchStock');
                  await self.$store.dispatch('stock/fetchStockDetailForReport');
                  await self.$store.dispatch('sale/fetchSale');
                  self.expand = false;
                  self.$q.loading.hide();
                  if (self.is_auto){
                    await self.$store.dispatch('pdf_make/autoPrintSale', {data: vm_data, detail: vm_detail});
                  }
                });
              }
            })
          }
        });
      },
      async onPatientSelect(data) {
        let self = this;
        self.$q.loading.show();
        self.data.patient = data._id;
        self.data_detail = [];
        await self.$store.dispatch('sale/fetchSaleByPatient', data._id).then(async function (res) {
          if (res.data.length) {
            let sale_id = res.data[0]._id;
            self.data.sale_date = res.data[0].sale_date;
            self.data.description = res.data[0].description;
            self.data.paid_balance = res.data[0].paid_balance;
            self.data.sale_date = res.data[0].sale_date;
            self.data._id = res.data[0]._id;
            await self.$store.dispatch('sale/fetchSaleDetailBySale', sale_id).then(function (res_detail) {
              res_detail.data.map((d) => {
                d.product_obj = {label: d.product.name, name: d.product.name, _id: d.product._id};
                d.description = d.product.description;
                d.invent_type = d.product.invent_type;
              });
              self.data_detail = res_detail.data.map((m) => {
                return {
                  buy_price: `${m.buy_price}`,
                  sale_price: `${m.sale_price}`,
                  sale_qty: `${m.sale_qty}`,
                  description: m.description,
                  invent_type: m.invent_type,
                  product: null,
                  product_obj: m.product_obj,
                  sale: null,
                  stock_detail_id: m.stock_detail_id,
                  stock_qty: m.stock_qty
                }
              });
              self.$q.loading.hide();
            });
          } else {
            self.$q.loading.hide();
          }
        });
      },
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      },
      filterFn(val, update) {
        if (val === '') {
          update(() => {
            this.options = this.patient_data.map((f) => f)
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase();
          this.options = this.patient_data.map((f) => f).filter((v) => {
            if (isNaN(needle)) {
              return v.name.toLowerCase().indexOf(needle) > -1
            } else {
              return v.phone.toLowerCase().indexOf(needle) > -1
            }
          });
        })
      }
    }
  }
</script>

<style scoped>

</style>
