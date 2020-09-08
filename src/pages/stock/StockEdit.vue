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
            <div class="col">
              <div class="row">
                <q-select class="col"
                          outlined
                          v-model="data.supplier_obj"
                          label="ជ្រើសរើសអ្នកផ្គត់ផ្គង់"
                          :options="getSuppliers"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
                <q-btn
                  @click="$refs.SupplierAdd.show()"
                  class="col-1"
                  style="height: 55px"
                  dense
                  color="primary"
                  icon="add"
                />
              </div>
            </div>
            <q-select class="col"
                      outlined
                      v-model="data.purchase_status"
                      label="ជ្រើសរើសប្រភេទ"
                      :options="['Receive', 'Pending']"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
            </q-select>
            <q-input class="col" label="ថ្ងៃទិញចូល" outlined square v-model="data.purchase_date" mask="date"
                     :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="data.purchase_date" @input="() => $refs.qDateProxy.hide()"/>
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
              label="សំគាល់"
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
                    use-input
                    input-debounce="0"
                    @filter="filterFn"
                    behavior="dialog"
                    class="col"
                    v-model="props.row.product_obj"
                    :options="options"
                    @input="onSelect(props.pageIndex,props.row.product_obj)"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
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
                    v-model="props.row.qty"
                    type="number"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </q-td>
                <q-td>
                  <q-input
                    class="col"
                    v-model="props.row.buy_price"
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
                    ${{props.row.qty*props.row.buy_price}}
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
            <q-input
              class="col-3"
              v-model="data.paid_balance"
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
        <q-btn icon="save" style="width: 150px; height: 50px" color="primary" label="រក្សារទុក"
               @click="$refs.addForm.submit()">
          <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
    <supplier-add ref="SupplierAdd"/>
  </q-page>
</template>

<script>
  import SupplierAdd from "pages/supplier/SupplierAdd";
  let data_product = [];
  export default {
    name: "StockEdit",
    components: {SupplierAdd},
    data() {
      return {
        columns: [
          {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
          {align: 'left', name: 'name', label: 'ទំនិញ', field: 'name', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'invent_type', label: 'ប្រភេទស្តុក', field: 'invent_type', sortable: true},
          {align: 'left', name: 'qty', label: 'ចំនួន', field: 'qty', sortable: true},
          {align: 'left', name: 'buy_price', label: 'តម្លៃទិញ', field: 'buy_price', sortable: true},
          {align: 'left', name: 'sale_price', label: 'តម្លៃលក់', field: 'sale_price', sortable: true},
          {align: 'left', name: 'total', label: 'សរុប/មុខ', field: 'total', sortable: true},
          {align: 'left', name: 'option', label: 'ដកចេញ', field: 'option', sortable: true},
        ],
        data: {
          _id: null,
          supplier_obj: null,
          supplier: null,
          purchase_status: 'Pending',
          purchase_date: null,
          description: '',
          amount: '0',
          paid_amount: '0',
          paid_balance: '0',
          due_balance: '0',
          due_amount: '0',
        },
        data_detail: [],
        data_product,
        options: data_product,
      }
    },
    computed: {
      totalAmount() {
        let self = this;
        let totalGroup = self.data_detail.map(function (x) {
          return {
            total: x.qty * x.buy_price
          }
        })
        let amount = 0;
        totalGroup.forEach(function (el) {
          amount += el.total
        });
        return amount
      },
      // getProducts() {
      //   return this.$store.getters['product/getProducts'].map((d) => {
      //     return {
      //       description: d.description,
      //       invent_type: d.invent_type,
      //       buy_price: `${d.buy_price}`,
      //       sale_price: `${d.sale_price}`,
      //       label: d.name,
      //       _id: d._id,
      //     }
      //   })
      // },
      getDueBalance() {
        return this.totalAmount - this.data.paid_balance;
      },
      getSuppliers() {
        return this.$store.getters['supplier/getSuppliers'].map((d) => {
          return {
            label: `${d.name} from ${d.company}`,
            _id: d._id,
          }
        })
      }
    },
    async created() {
      let self = this;
      let vm = self.data;
      await self.$store.dispatch('stock/editStock', self.$route.params.id).then(async function (res) {
        let stock_id = res.data._id;
        vm.supplier_obj = {
          label: `${res.data.supplier.name} from ${res.data.supplier.company}`,
          _id: res.data.supplier._id
        };
        vm.purchase_date = res.data.purchase_date;
        vm.description = res.data.description;
        vm.paid_balance = res.data.paid_balance;
        await self.$store.dispatch('stock/fetchStockDetailByStock', stock_id).then(function (res_detail) {
          res_detail.data.map((d) => {
            d.product_obj = {label: d.product.name, _id: d.product._id};
            d.description = d.product.description;
            d.invent_type = d.product.invent_type;
          })
          self.data_detail = res_detail.data.map((m) => {
            return {
              ...m,
              buy_price: `${m.buy_price}`,
              sale_price: `${m.sale_price}`,
              qty: `${m.qty}`,
              stock_qty: `${m.stock_qty}`,
            }
          });
        })
      });
      await self.$store.dispatch('product/fetchProduct').then(function(d){
        if (d.status) {
          self.data_product = d.data.map(function (m) {
            return {
              description: m.description,
              invent_type: m.invent_type,
              buy_price: m.buy_price,
              sale_price: m.sale_price,
              label: m.name,
              _id: m._id,
            };
          });
        }
      });
    },
    methods: {
      onSelect(rowIndex, selectedData) {
        const index = this.data_product.findIndex(function(d) {
          return d.label === selectedData.label
        });
        let vm = this.data_detail[rowIndex];
        let vm1 = this.data_product[index];
        vm.description = vm1.description;
        vm.invent_type = vm1.invent_type;
        vm.buy_price = `${vm1.buy_price}`;
        vm.sale_price = `${vm1.sale_price}`;
      },
      addDataDetail() {
        this.data_detail.push({
          stock: null,
          product: null,
          product_obj: null,
          description: '',
          invent_type: '',
          qty: 1,
          buy_price: '0',
          sale_price: '0',
          total: '0'
        });
      },
      removeDataDetail(index) {
        this.data_detail.splice(index, 1)
      },
      filterFn (val, update) {
        if (val === '') {
          update(() => {
            this.options = this.data_product.map((f)=> f)
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          this.options = this.data_product.map((f)=> f).filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      async onSubmit() {
        let self = this;
        let vm_data = self.data;
        let vm_detail = self.data_detail;
        vm_data.supplier = vm_data.supplier_obj._id;
        vm_data._id = self.$route.params.id;
        vm_data.paid_amount = vm_data.paid_balance;
        vm_data.due_amount = vm_data.due_balance;
        await self.$store.dispatch('stock/deleteStockDetail', self.$route.params.id).then(async function (data_delete) {
          if (data_delete.status) {
            await self.$store.dispatch('stock/updateStock', self.data).then(async function (data) {
              if (data.status) {
                let stock_id = await data.data._id;
                let promise = vm_detail.map(async function (data_ex) {
                  data_ex.stock = await data.data._id; //Stock ID that return
                  data_ex.product = await data_ex.product_obj._id; //Product ID
                  data_ex.purchase_status = await vm_data.purchase_status; //Status in detail
                  data_ex.stock_qty = await data_ex.qty;
                  await self.$store.dispatch('stock/storeStockDetail', data_ex)
                });
                Promise.all(promise).then(async function () {
                  await self.$store.dispatch('stock/fetchStockAfterDetail', stock_id).then(async function (res) {
                    if (res.status) {
                      await self.$store.dispatch('stock/fetchStock');
                      await self.$store.dispatch('stock/fetchStockDetailForReport');
                      self.$q.loading.hide();
                      window.history.back();
                    }
                  });
                })
              }
            });
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
