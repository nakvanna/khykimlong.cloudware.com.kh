<template>
  <q-page>
    <q-card>
      <q-card-actions align="left">
        <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
          <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
        </q-btn>
      </q-card-actions>
      <q-card-section class="text-center">
        <span class="text-h3 text-bold text-uppercase">{{stock_data.sup_name}}</span><br>
        <span class="text-subtitle1">From {{stock_data.sup_company}} purchased on {{dateFormat(stock_data.purchased_date)}}</span>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-x-sm">
          <q-card
            class="col my-card text-primary"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">${{stock_data.amount}}</div>
                  <div class="text-subtitle2">តម្លៃសរុប (Amount)</div>
                </div>
                <q-card-actions>
                  <q-btn size="20px" icon="fas fa-money-bill-wave" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            class="col my-card text-warning"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">${{calPaidAmount}}</div>
                  <div class="text-subtitle2">បានចំណាយ (Paid)</div>
                </div>
                <q-card-actions>
                  <q-btn size="20px" icon="fas fa-money-bill-wave" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            class="col my-card text-negative"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">${{calDueAmount}}</div>
                  <div class="text-subtitle2">នៅជំពាក់ (Indebted)</div>
                </div>
                <q-card-actions>
                  <q-btn size="20px" icon="fas fa-money-bill-wave" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
          <div class="row q-gutter-x-sm">
            <div class="col">
              <q-input
                outlined
                prefix="$"
                v-model="pay_back_data.pay_back"
                type="number"
                min="0"
                :max="stock_data.due_amount"
                label="ចំនួនត្រូវសង"
                square
              />
            </div>
            <q-input class="col" label="ថ្ងៃទីសង" outlined square v-model="pay_back_data.pay_date" mask="date"
                     :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="pay_back_data.pay_date" @input="() => $refs.qDateProxy.hide()"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row q-gutter-x-sm">
            <q-input
              class="col"
              v-model="pay_back_data.description"
              type="textarea"
              rows="3"
              outlined
              label="ចំណាំ"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
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
      <q-card-section>
        <q-table
          class="table-virtual-scroll-stock"
          :data="get_pay_back"
          :columns="columns_payback"
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
            <q-tr :props="props" class="cursor-pointer" @click="$router.push({path: `/stock/${props.row._id}/view`})">
              <q-td key="description" :props="props">
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
                <span class="text-bold">${{props.row.pay_back}}</span>
              </q-td>
              <q-td>
                <span>{{dateFormat(props.row.pay_date)}}</span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  export default {
    name: "PayBack",
    data() {
      return {
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns_payback: [
          // {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'pay_back', label: 'ចំនួនបានសង់', field: 'pay_back', sortable: true},
          {align: 'left', name: 'pay_date', label: 'ថ្ងៃសង', field: 'pay_date', sortable: true},

        ],
        get_pay_back: [],
        pay_back_data: {
          stock: this.$route.params.id,
          pay_back: 0,
          pay_date: null,
          description: null
        },
        stock_data: {
          _id: this.$route.params.id,
          sup_name: 'Supplier name',
          sup_company: 'Supplier company',
          purchased_date: null,
          paid_amount: 0,
          due_amount: 0,
          amount: 0,
        }
      }
    },
    computed: {
      calDueAmount() {
        return parseFloat(this.stock_data.due_amount) - parseFloat(this.pay_back_data.pay_back);
      },
      calPaidAmount() {
        return parseFloat(this.stock_data.paid_amount) + parseFloat(this.pay_back_data.pay_back);
      },
    },
    async created() {
      let self = this;
      self.$q.loading.show();
      await self.$store.dispatch('stock/editStock', self.$route.params.id).then(async function (res) {
        self.stock_data.sup_name = res.data.supplier.name;
        self.stock_data.sup_company = res.data.supplier.company;
        self.stock_data.amount = res.data.amount;
        self.stock_data.paid_amount = res.data.paid_amount;
        self.stock_data.due_amount = res.data.due_amount;
        self.stock_data.purchased_date = res.data.purchase_date;
      });
      await self.$store.dispatch('stock/fetchStockPayBack', self.$route.params.id).then(function (res) {
        self.get_pay_back = res.data;
      });
      self.$q.loading.hide();
    },
    methods: {
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      },
      onSubmit() {
        let self = this;
        self.$q.loading.show();
        self.$store.dispatch('stock/updateStock', {
          _id: self.stock_data._id, paid_amount: self.calPaidAmount, due_amount: self.calDueAmount
        }).then(async function (res) {
          if (res.status) {
            await self.$store.dispatch('stock/stockPayBack', self.pay_back_data).then(function (res_pay_back) {
              if (res_pay_back.status) {
                window.history.back();
                self.$q.loading.hide();
              }
            });
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
