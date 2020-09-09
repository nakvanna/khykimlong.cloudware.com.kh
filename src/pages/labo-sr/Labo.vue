<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">ពិនិត្រឡាបូ</div>
        <q-space/>
        <q-btn size="20px" icon="add_circle_outline" flat round to="/labo/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getLabos"
          :columns="columns"
          row-key="name"
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
            <q-tr :props="props">
              <q-td key="_id" :props="props" class="q-gutter-x-xs">
                <q-btn flat icon="more_vert" dense color="grey" size="12px">
                  <q-menu>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable @click="cashierLabo(props.row.patient._id)">
                        <q-item-section side>
                          <q-icon name="money" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          គិតលុយ
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-item clickable :to="`/labo/${props.row._id}/edit`">
                        <q-item-section side>
                          <q-icon name="fas fa-edit" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          បង្ហាញ & កែប្រែ
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable @click="printLabo(props.row._id)">
                        <q-item-section side>
                          <q-icon name="print" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          បោះពុម្ព
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable @click="downloadLabo(props.row._id)">
                        <q-item-section side>
                          <q-icon name="print" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          ទាញយកជា file docx
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-td>
              <q-td key="photo" :props="props">
                <q-avatar size="100px" class="shadow-1">
                  <q-img :src="hostname+props.row.patient.photo"/>
                </q-avatar>
              </q-td>
              <q-td key="kh_name" :props="props">
                {{ props.row.patient.kh_name }}
              </q-td>
              <q-td key="title" :props="props">
                {{ props.row.title }}
              </q-td>
              <q-td key="doctor" :props="props">
                {{ props.row.doctor }}
              </q-td>
              <q-td key="pay_status" :props="props">
                <span v-if="props.row.pay_status">បានគិតលុយ</span>
                <span v-else>មិនទាន់គិតលុយ</span>
              </q-td>
              <q-td key="createdAt" :props="props">
                {{ dateFormat(props.row.createdAt) }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
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
              <q-input class="col-3" label="ថ្ងៃលក់ចេញ" outlined square v-model="data_pending.sale_date"
                       mask="date"
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
                 @click="$refs.addForm2.submit()">
            <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    {{ is_store }}
  </q-page>
</template>

<script>
import {date, openURL} from "quasar";

let data_from_stock_detail_pending = [];

export default {
  name: "Labo",
  data() {
    return {
      is_store: true,
      fullWidthDialog: false,
      hostname: 'https://api.khykimlong.cloudware.com.kh/',
      // hostname: 'http://localhost:9000/',
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'photo', field: 'photo'},
        {align: 'left', name: 'kh_name', label: 'អ្នកជម្ងឺ', field: 'kh_name', sortable: true},
        {align: 'left', name: 'title', label: 'ចំណងជើង', field: 'title', sortable: true},
        {align: 'left', name: 'doctor', label: 'ពិនិត្យដោយ', field: 'doctor', sortable: true},
        {align: 'left', name: 'pay_status', label: 'គិតលុយ', field: 'pay_status', sortable: true},
        {align: 'left', name: 'createdAt', label: 'កាលបរិច្ឆេទ', field: 'createdAt'},
      ],
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
      columns_pending: [
        {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
        {align: 'left', name: 'name', label: 'ទំនិញ', field: 'name', sortable: true},
        {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
        {align: 'left', name: 'sale_qty', label: 'ចំនួន', field: 'sale_qty', sortable: true},
        {align: 'left', name: 'sale_price', label: 'តម្លៃលក់', field: 'sale_price', sortable: true},
        {align: 'left', name: 'total', label: 'សរុប/មុខ', field: 'total', sortable: true},
        {align: 'left', name: 'option', label: 'ដកចេញ', field: 'option', sortable: true},
      ],
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
      options_pending: data_from_stock_detail_pending,
    }
  },
  async created() {
    let self = this;
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
  },
  computed: {
    getLabos() {
      return this.$store.getters['labo/getLabos'];
    },
    getDueBalancePending() {
      return this.totalAmountPending - this.data_pending.paid_balance;
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
  },
  methods: {
    async onSubmitPending() {
      let self = this;
      // self.$q.loading.show();
      let vm_data = self.data_pending;
      let vm_detail = self.data_detail_pending;
      vm_data.paid_amount = vm_data.paid_balance; //for make a payment when indebted
      vm_data.due_amount = vm_data.due_balance; //for make a payment when indebted
      if (self.is_store) {
        await self.$store.dispatch('sale/storeSale', vm_data).then(async function (data) {
          if (data.status) {
            let sale_id = await data.data._id;
            let promise = vm_detail.map(async function (d) {
              d.sale_status = vm_data.sale_status;
              d.sale = sale_id;
              await self.$store.dispatch('sale/storeSaleDetail', d)
            });
            Promise.all(promise).then(async function () {
              await self.$store.dispatch('sale/fetchSaleAfterDetail', sale_id).then(async function (res) {
                if (res.status) {
                  self.$q.loading.hide();
                  window.history.back();
                }
              });
            })
          }
        });
      } else {
        self.$store.dispatch('sale/deleteSaleDetail', vm_data._id).then(async function (dl) {
          if (dl.status) {
            await self.$store.dispatch('sale/updateSale', vm_data).then(function (res) {
              if (res.status) {
                let promise = vm_detail.map(async function (m) {
                  m.sale = vm_data._id;
                  m.sale_status = vm_data.sale_status;
                  await self.$store.dispatch('sale/storeSaleDetail', m)
                });
                Promise.all(promise).then(async function () {
                  await self.$store.dispatch('sale/fetchSaleAfterDetail', vm_data._id).then(async function (res) {
                    if (res.status) {
                      self.$q.loading.hide();
                      window.history.back();
                    }
                  });
                })
              }
            })
          }
        })
      }
    },
    printLabo(id) {
      let self = this;
      self.$q.loading.show()
      self.$store.dispatch('report/printLabo', id).then(function (data) {
        if (data.status) {
          setTimeout(async function () {
            await openURL(data.data.pdf);
            await self.$q.loading.hide()
          }, 3000);
        }
      })
    },
    async downloadLabo(id) {
      let self = this;
      self.$q.loading.show()
      await self.$store.dispatch('report/downloadLabo', id).then(function (data) {
        if (data.status) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Successfully downloaded DOCX\'s file!'
          });
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Error download DOCX\'s file!'
          })
        }
        self.$q.loading.hide()
      })
    },
    dateFormat(val) {
      return date.formatDate(val, 'YYYY/MM/DD')
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
    cashierLabo(patient_id) {
      let self = this;
      self.data_pending.patient = patient_id;
      self.$store.dispatch('sale/fetchSaleByPatient', patient_id).then(function (res) {
        if (res.data.length) {
          self.is_store = false;
          self.data_pending = [];
          self.data_detail_pending = [];
          self.data_pending = res.data[0];
          self.data_pending.sale_date = self.dateFormat(res.data[0].sale_date);
          self.$store.dispatch('sale/fetchSaleDetailBySale', res.data[0]._id).then(function (ress) {
            self.data_detail_pending = ress.data.map((m) => {
              return {
                ...m,
                product_obj: {label: m.product.name, name: m.product.name, _id: m.product._id},
                product: m.product._id,
                invent_type: m.product.invent_type,
                description: m.product.description,
              }
            });
          })
        } else {
          self.is_store = true;
          self.data_pending = [];
          self.data_detail_pending = [];
        }
        self.fullWidthDialog = true;
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
