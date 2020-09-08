<template>
  <q-page>
    <q-card-actions align="left">
      <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
        <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
      </q-btn>
    </q-card-actions>
    <q-card-section v-show="is_stay">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          :duration="1000"
          v-model="expand"
          label="បន្ថែមថ្នាំ"
          caption="សម្រាប់អ្នកជម្ងឺស្នាក់នៅក្នុងបន្ទាប់"
        >
          <q-card flat bordered class="my-card bg-grey-1">
            <q-card-section>
              <q-form
                @submit="onSubmit"
                class="q-gutter-md"
                ref="addForm"
              >
                <div class="row q-gutter-x-sm q-mb-sm">
                  <q-input class="col-3" label="ថ្ងៃលក់ចេញ" outlined square v-model="data.sale_date" mask="date"
                           :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qSubDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="data.sale_date" @input="() => $refs.qSubDateProxy.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    class="col"
                    v-model="data.description"
                    type="textarea"
                    rows="1"
                    outlined
                    label="ចំណាំ"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </div>
                <q-table
                  separator="cell"
                  :title="`បញ្ចីថ្នាំ នឹងតម្លៃសរុប $${data.amount = totalAmount}`"
                  :data="data_detail"
                  :columns="columns"
                  :pagination.sync="pagination"
                  :rows-per-page-options="[0]"
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr>
                      <q-td>
                        {{ props.pageIndex + 1 }}
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
                          :max="props.row.stock_qty"
                          square
                          lazy-rules
                          :rules="[ val => val <= props.row.stock_qty || 'សូមបំពេញចន្លោះ']"
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
              <q-btn icon="save" style="width: 100px; height: 35px" color="primary" label="រក្សារទុក"
                     @click="confirm = true">
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
        </q-expansion-item>
      </q-list>
    </q-card-section>
    <q-card-section>
      <q-table
        :title="`ប្រវត្តិនៃការព្យាបាល ${data.patient_obj.label}`"
        class="table-virtual-scroll-stock"
        :data="getSaleByExamine"
        :columns="columns_stay"
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
            <q-td key="amount" :props="props" class="q-gutter-x-xs">
              <span class="text-bold text-primary">${{ props.row.amount }}</span>
            </q-td>
            <q-td key="paid_amount" :props="props" class="q-gutter-x-xs">
              <span class="text-bold text-warning">${{ props.row.paid_amount }}</span>
            </q-td>
            <q-td key="due_amount" :props="props" class="q-gutter-x-xs">
              <span class="text-bold text-negative">${{ props.row.due_amount }}</span>
            </q-td>
            <q-td key="description" :props="props" class="q-gutter-x-xs">
              <q-input
                class="col"
                readonly
                v-model="props.row.description"
                type="textarea"
                rows="2"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </q-td>
            <q-td key="sale_date" :props="props" class="q-gutter-x-xs">
              <span class="text-bold">{{ dateFormat(props.row.sale_date) }}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
    <q-card-actions>
      <div class="text-h5 text-left text-bold">
        តម្លៃត្រូវបង់: ${{ totalToPay.toFixed(2) }}
      </div>
      <q-space/>
      <q-btn
        icon="attach_money"
        style="height: 35px"
        color="primary"
        v-show="is_stay"
        label="គិតលុយ/ចាកចេញ"
        @click="fullWidthDialog = true">
      </q-btn>
    </q-card-actions>
    <q-dialog
      persistent
      v-model="fullWidthDialog"
      full-width
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card flat bordered class="my-card bg-grey-1">
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">អ្នកជម្ងឺចាកចេញ</span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup/>
        </q-toolbar>

        <q-card-section>
          <q-form
            @submit="onSubmitPending"
            class="q-gutter-md"
            ref="addForm2"
          >
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input class="col-3" label="ថ្ងៃលក់ចេញ" outlined square v-model="data_pending.sale_date" mask="date"
                       :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="data_pending.sale_date" @input="() => $refs.qDateProxy.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                class="col"
                v-model="data_pending.description"
                type="textarea"
                rows="1"
                outlined
                label="ចំណាំ"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <q-table
              separator="cell"
              :title="`បញ្ចីទំនិញ នឹងតម្លៃសរុប $${data_pending.amount = totalAmountPending}`"
              :data="data_detail_pending"
              :columns="columns_pending"
              :pagination.sync="pagination"
              :rows-per-page-options="[0]"
              hide-bottom
            >
              <template v-slot:body="props">
                <q-tr>
                  <q-td>
                    {{ props.pageIndex + 1 }}
                  </q-td>
                  <q-td style="width: 300px" key="name">
                    <q-select
                      use-input
                      input-debounce="0"
                      @filter="filterFnPending"
                      behavior="dialog"
                      class="col"
                      v-model="props.row.product_obj"
                      :options="options_pending"
                      @input="onSelectPending(props.rowIndex, props.row.product_obj)"
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
                    <q-btn @click="removeDataDetailPending(props.pageIndex)" outline round color="negative"
                           icon="delete"/>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <q-separator color="orange" inset/>
            <q-btn class="col" @click="addDataDetailPending()" outline color="blue" icon="add" label="បន្ថែម"/>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col-3"
                v-model="data.due_balance = getDueBalancePending"
                type="number"
                label="ថ្លៃជំពាក់"
                disable
                square
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn icon="save" style="width: 150px; height: 35px" color="primary" label="រក្សារទុក"
                 @click="confirm_2 = true">
            <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm_2" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="info" color="primary" text-color="white"/>
          <span class="q-ml-sm text-h6">តើអ្នកប្រាកដហើយមែនទេ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="ទេ" color="negative" v-close-popup/>
          <q-btn @click="$refs.addForm2.submit()" flat label="បាទ/ចាស" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {date, LocalStorage} from "quasar";

let data_from_stock_detail = [];
let data_from_stock_detail_pending = [];
export default {
  name: "ExamineSale",
  data() {
    return {
      is_stay: false,
      expand: false,
      confirm: false,
      confirm_2: false,
      fullWidthDialog: false,
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      data_from_stock_detail,
      options: data_from_stock_detail,
      data_from_stock_detail_pending,
      options_pending: data_from_stock_detail_pending,
      data_detail: [],
      data_detail_pending: [],
      data: {
        user: null,
        examine: this.$route.params.id,
        patient_obj: {label: 'ឈ្មោះអ្នកជម្ងឺ'},
        patient: null,
        sale_status: 'Stay',
        sale_date: null,
        description: '',
        amount: 0,
        paid_amount: 0,
        paid_balance: 0,
        due_balance: 0,
        due_amount: 0,
      },
      data_pending: {
        user: null,
        patient_obj: {label: 'ឈ្មោះអ្នកជម្ងឺ'},
        patient: null,
        sale_status: 'Pending',
        sale_date: null,
        description: '',
        amount: 0,
        paid_amount: 0,
        paid_balance: 0,
        due_balance: 0,
        due_amount: 0,
      },
      room_id: null,
      examination: {
        patient: null,
        is_stay: true,
        createdAt: null
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
      columns_pending: [
        {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
        {align: 'left', name: 'name', label: 'ទំនិញ', field: 'name', sortable: true},
        {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
        {align: 'left', name: 'sale_qty', label: 'ចំនួន', field: 'sale_qty', sortable: true},
        {align: 'left', name: 'sale_price', label: 'តម្លៃលក់', field: 'sale_price', sortable: true},
        {align: 'left', name: 'total', label: 'សរុប/មុខ', field: 'total', sortable: true},
        {align: 'left', name: 'option', label: 'ដកចេញ', field: 'option', sortable: true},
      ],
      columns_stay: [
        {align: 'left', name: 'amount', label: 'សរុប', field: 'amount', sortable: true},
        {align: 'left', name: 'paid_amount', label: 'ថ្លៃចំណាយ', field: 'paid_amount', sortable: true},
        {align: 'left', name: 'due_amount', label: 'ថ្លៃជំពាក់', field: 'due_amount', sortable: true},
        {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
        {align: 'left', name: 'sale_date', label: 'កាលបរិច្ឆេទ', field: 'sale_date', sortable: true},
      ],
    }
  },
  async created() {
    let self = this;
    self.data.user = LocalStorage.getItem('userInfo')['user_info']._id;
    self.$q.loading.show();
    /*await self.$store.dispatch('stock/fetchStockDetailForSale').then(function (d) {
      if (d.status) {
        self.data_from_stock_detail = d.data.map(function (m) {
          return {
            label: m.invent_type === 'Service' ? m.product.name : m.product.name + ' សល់ ' + m.stock_qty,
            description: m.product.description,
            stock_qty: m.stock_qty,
            sale_price: m.sale_price,
            buy_price: m.buy_price,
            invent_type: m.invent_type,
            product_id: m.product._id,
            stock_detail_id: m._id,
          }
        });
        self.data_from_stock_detail_pending = d.data.map(function (m) {
          return {
            label: m.invent_type === 'Service' ? m.product.name : m.product.name + ' សល់ ' + m.stock_qty,
            description: m.product.description,
            stock_qty: m.stock_qty,
            sale_price: m.sale_price,
            buy_price: m.buy_price,
            invent_type: m.invent_type,
            product_id: m.product._id,
            stock_detail_id: m._id,
          }
        });
        self.$q.loading.hide();
      }
    });*/

    await self.$store.dispatch('stock/fetchStockDetailForSale').then(function (d) {
      if (d.status) {
        self.data_from_stock_detail_pending = d.data.map(function (m) {
          return {
            label: m.product.name,
            description: m.product.description,
            stock_qty: m.stock_qty,
            sale_price: m.sale_price,
            buy_price: m.buy_price,
            invent_type: m.invent_type,
            product_id: m.product._id,
            stock_detail_id: m._id,
          }
        });
        self.$q.loading.hide();
      }
    });
    await self.$store.dispatch('stock/fetchStockDetailForSale').then(function (d) {
      let items = [];
      if (d.status) {
        d.data.map(function (m) {
          const index = items.findIndex((e) => e.pro_name === m.product.name);
          if (index === -1) {
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
          } else {
            items[index].stock_qty += m.stock_qty;
            items[index].label = m.invent_type === 'Service' ? m.product.name : m.product.name + items[index].stock_qty;
            if (m.stock_qty <= 0) {
              items[index].stock_detail_id = m._id;
            }
          }
          self.data_from_stock_detail = items;
        });
        self.$q.loading.hide();
      }
    });

    await self.$store.dispatch('examine/fetchExamineByID', self.$route.params.id).then((res) => {
      self.is_stay = res.data.is_stay;
      self.room_id = res.data.room._id;
      self.examination = {
        patient: res.data.patient._id,
        createdAt: res.data.createdAt
      }
      self.data.patient_obj = {
        label: res.data.patient.kh_name,
        _id: res.data.patient._id,
      }
      self.data_pending.patient_obj = {
        label: res.data.patient.kh_name,
        _id: res.data.patient._id,
      }
    });
    await self.$store.dispatch('sale/fetchSaleByExamination', self.$route.params.id);
  },
  computed: {
    getSaleByExamine() {
      return this.$store.getters['sale/getSalesByExamined']
    },
    totalToPay() {
      let total = 0;
      this.getSaleByExamine.map((m) => {
        total += m.amount;
      });
      return total;
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
        amount += el.total
      });
      return amount
    },
    getDueBalance() {
      return this.totalAmount - this.data.paid_balance;
    },
    totalAmountPending() {
      let self = this;
      let totalGroup = self.data_detail_pending.map(function (x) {
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
    getDueBalancePending() {
      return this.totalAmountPending - this.data_pending.paid_balance;
    },
  },
  methods: {
    dateFormat(val) {
      return date.formatDate(val, 'DD/MM/YYYY')
    },
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
            await self.$store.dispatch('sale/storeSaleDetail', d)
          });
          Promise.all(promise).then(async function () {
            await self.$store.dispatch('sale/fetchSaleByExamination', self.$route.params.id).then(async function (res) {
              if (res.status) {
                await self.$store.dispatch('stock/fetchStockDetailForReport');
                self.expand = false;
                self.$q.loading.hide();
              }
            });
          })
        }
      });
    },
    onSelect(rowIndex, selectedData) {
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
    onSelectPending(rowIndex, selectedData) {
      const index = this.data_from_stock_detail_pending.findIndex(function (d) {
        return d.label === selectedData
      });
      let vm = this.data_detail_pending[rowIndex];
      let vm1 = this.data_from_stock_detail_pending[index]
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
    async onSubmitPending() {
      let self = this;
      self.$q.loading.show();
      let vm_data = self.data_pending;
      let vm_detail = self.data_detail_pending;
      vm_data.patient = vm_data.patient_obj._id; //get id of product selected
      vm_data.paid_amount = vm_data.paid_balance; //for make a payment when indebted
      vm_data.due_amount = vm_data.due_balance; //for make a payment when indebted
      await self.$store.dispatch('sale/storeSale', vm_data).then(async function (data) {
        console.log(data)
        if (data.status) {
          let sale_id = await data.data._id;
          let promise = vm_detail.map(async function (d) {
            d.sale_status = vm_data.sale_status;
            d.sale = sale_id;
            await self.$store.dispatch('sale/storeSaleDetail', d)
          });
          Promise.all(promise).then(async function () {
            await self.$store.dispatch('sale/fetchSaleAfterDetail', sale_id).then(async function (res) {
              console.log(res)
              if (res.status) {
                await self.$store.dispatch('stock/fetchStockDetailForReport');
                await self.$store.dispatch('examine/updateStayExamine', {
                  examine_id: self.$route.params.id,
                  room_id: self.room_id
                });
                self.$q.loading.hide();
                window.history.back();
              }
            });
          })
        }
      });
    },
    removeDataDetailPending(index) {
      this.data_detail_pending.splice(index, 1)
    },
    addDataDetailPending() {
      this.data_detail_pending.push({
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
    filterFnPending(val, update) {
      if (val === '') {
        update(() => {
          this.options_pending = this.data_from_stock_detail_pending.map((f) => f.label)
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options_pending = this.data_from_stock_detail_pending.map((f) => f.label).filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>

<style scoped>

</style>
