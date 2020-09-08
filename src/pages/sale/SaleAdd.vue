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
            <q-select
              use-input
              input-debounce="0"
              @filter="filterFnPatient"
              behavior="dialog"
              class="col"
              outlined
              v-model="data.patient_obj"
              label="ជ្រើសរើសអតិថិជន"
              :options="options_patient"

              square
              lazy-rules
              :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
            </q-select>
            <q-input class="col" label="ថ្ងៃលក់ចេញ" outlined square v-model="data.sale_date" mask="date"
                     :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="data.sale_date" @input="() => $refs.qDateProxy.hide()"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-input
              class="col"
              v-model="data.description"
              type="textarea"
              rows="3"
              outlined
              label="ចំណាំ"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
          </div>
          <q-table
            separator="cell"
            :title="`បញ្ចីទំនិញ នឹងតម្លៃសរុប $${data.amount = totalAmount}`"
            :data="data_detail"
            :columns="columns"
            :pagination.sync="pagination"
            :rows-per-page-options="[0]"
          >
            <template v-slot:body="props">
              <q-tr>
                <q-td>
                  {{props.pageIndex + 1}}
                </q-td>
                <q-td style="width: 300px" key="name">
                  <q-select
                    use-input
                    input-debounce="0"
                    @filter="filterFn"
                    behavior="dialog"
                    class="col"
                    v-model="props.row.product_obj"
                    :options="options"
                    @input="onSelect(props.rowIndex, props.row.product_obj)"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-td>
                <q-td style="width: 200px">
                  <q-input
                    class="col"
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
                    v-model="props.row.sale_qty"
                    type="number"
                    min="1"
                    square
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
                    ${{ props.row.sale_qty * props.row.sale_price }}
                  </span>
                </q-td>
                <q-td>
                  <q-btn @click="removeDataDetail(props.pageIndex)" outline round color="negative" icon="delete"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <q-separator color="orange" inset/>
          <q-btn class="col" @click="addDataDetail()" outline color="blue" icon="add" label="បន្ថែម"/>
          <div class="row q-gutter-x-sm q-mb-sm">
<!--            <q-input-->
<!--              class="col-3"-->
<!--              v-model="data.paid_balance"-->
<!--              type="number"-->
<!--              label="ថ្លៃចំណាយ"-->
<!--              square-->
<!--            />-->
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
        <q-btn icon="save" style="width: 150px; height: 50px" color="primary" label="រក្សារទុក" @click="confirm = true">
          <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="confirm" persistent>
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
  import {LocalStorage} from "quasar";

  let data_from_stock_detail = [];
  let patient_data = [];
  export default {
    name: "SaleAdd",
    data() {
      return {
        confirm: false,
        pagination: {
          rowsPerPage: 0
        },
        data_from_stock_detail,
        options: data_from_stock_detail,
        patient_data,
        options_patient: patient_data,
        data_detail: [],
        data: {
          user_admin: null,
          patient_obj: null,
          patient: null,
          sale_status: "Pending",
          sale_date: null,
          description: '',
          amount: 0,
          paid_amount: 0,
          paid_balance: 0,
          due_balance: 0,
          due_amount: 0,
        },
        columns: [
          {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
          {align: 'left', name: 'name', label: 'ទំនិញ', field: 'name', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'sale_qty', label: 'ចំនួន', field: 'sale_qty', sortable: true},
          {align: 'left', name: 'sale_price', label: 'តម្លៃលក់', field: 'sale_price', sortable: true},
          {align: 'left', name: 'total', label: 'សរុប/មុខ', field: 'total', sortable: true},
          {align: 'left', name: 'option', label: 'ដកចេញ', field: 'option', sortable: true},
        ],
      }
    },
    async created() {
      let self = this;
      self.data.user_admin = LocalStorage.getItem('userInfo')['user_info']._id;
      await self.$store.dispatch('patient/fetchPatient').then(function (res) {
        self.patient_data = res.data.map(function (m) {
          return {
            label: m.kh_name + ' ភេទ ' + m.gender + ' លេខទូរសព្ទ ' + m.phone,
            name: m.kh_name,
            phone: m.phone,
            _id: m._id,
          }
        });
      });
      await self.$store.dispatch('stock/fetchStockDetailForSale').then(function (d) {
        let items = [];
        if (d.status) {
          d.data.map(function (m) {
            const index = items.findIndex((e) => e.pro_name === m.product.name);
            if (index === -1){
              items.push({
                pro_name: m.product.name,
                label: m.invent_type === 'Service' ? m.product.name : m.product.name + m.stock_qty,
                description: m.product.description,
                stock_qty: m.stock_qty,
                sale_price: m.sale_price,
                buy_price: m.buy_price,
                invent_type: m.invent_type,
                product_id: m.product._id,
                stock_detail_id: m._id,
              });
            }else {
              items[index].stock_qty += m.stock_qty;
              items[index].label = m.invent_type === 'Service' ? m.product.name : m.product.name + items[index].stock_qty;
              if (m.stock_qty <= 0){
                items[index].stock_detail_id = m._id;
              }
            }
            self.data_from_stock_detail = items;
          });
          self.$q.loading.hide();
        }
      });
    },
    computed: {
      totalAmount() {
        let self = this;
        let totalGroup = self.data_detail.map(function (x) {
          return {
            total: x.sale_qty * x.sale_price
          }
        })
        let amount = 0;
        totalGroup.forEach(function (el) {
          amount += el.total
        });
        return amount
      },
      getDueBalance() {
        return this.totalAmount - this.data.paid_balance;
      },
      getPatient() {
        return this.$store.getters['patient/getPatient'].map((m) => {
          return {
            label: m.kh_name,
            _id: m._id,
          }
        });
      },
    },
    methods: {
      async onSubmit() {
        let self = this;
        self.$q.loading.show();
        let vm_data = self.data;
        let vm_detail = self.data_detail;
        vm_data.patient = vm_data.patient_obj._id; //get id of product selected
        vm_data.paid_amount = vm_data.paid_balance; //for make a payment when indebted
        vm_data.due_amount = vm_data.due_balance; //for make a payment when indebted
        await self.$store.dispatch('sale/storeSale', vm_data).then(async function (data) {
          if (data.status) {
            let sale_id = await data.data._id;
            let promise = vm_detail.map(async function (d) {
              d.sale_status = vm_data.sale_status;
              d.sale = sale_id;
              d.patient = vm_data.patient;
              await self.$store.dispatch('sale/storeSaleDetail', d)
            });
            Promise.all(promise).then(async function () {
              await self.$store.dispatch('sale/fetchSaleAfterDetail', sale_id).then(async function (res) {
                if (res.status) {
                  await self.$store.dispatch('stock/fetchStockDetailForReport');
                  self.$q.loading.hide();
                  window.history.back();
                }
              });
            })
          }
        });
      },
      onSelect(rowIndex, selectedData) {
        console.log(selectedData)
        const index = this.data_from_stock_detail.findIndex(function (d) {
          return d.label === selectedData
        });
        let vm = this.data_detail[rowIndex];
        let vm1 = this.data_from_stock_detail[index]
        vm.description = vm1.description;
        vm.product = vm1.product_id;
        vm.sale_price = vm1.sale_price;
        vm.buy_price = vm1.buy_price;
        vm.stock_qty = vm1.stock_qty;
        vm.invent_type = vm1.invent_type;
        vm.stock_detail_id = vm1.stock_detail_id;
      },
      removeDataDetail(index) {
        this.data_detail.splice(index, 1)
      },
      addDataDetail() {
        this.data_detail.push({
          sale: null, //get sale when stored sale to db
          stock_detail_id: null, //stock detail id
          invent_type: null, //check when cut stock detail
          product: null,
          product_obj: null,
          description: '',
          sale_qty: 1,
          buy_price: 0,
          sale_price: 0,
        });
      },
      filterFn(val, update) {
        if (val === '') {
          update(() => {
            this.options = this.data_from_stock_detail.map((f) => f.label)
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          this.options = this.data_from_stock_detail.map((f) => f.label).filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      },
      filterFnPatient(val, update) {
        if (val === '') {
          update(() => {
            this.options_patient = this.patient_data.map((f) => f)
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase();
          this.options_patient = this.patient_data.map((f) => f).filter((v) => {
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
