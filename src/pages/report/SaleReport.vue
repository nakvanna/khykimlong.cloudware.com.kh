<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">របាយការណ៍លក់ចេញ</div>
        <q-space/>
        <div class="q-pb-lg q-pr-md">
          <q-btn-dropdown
            push
            split
            color="cyan"
            no-caps
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-icon left name="event" size="lg"/>
                <div class="text-center">
                  ជ្រើសរើស<br>កាលបរិច្ឆេទ
                </div>
              </div>
            </template>

            <q-list>
              <q-item clickable v-close-popup @click="onItemClick(1)">
                <q-item-section>
                  <q-item-label>Yesterday</q-item-label>
                  <q-item-label caption>ជ្រើសរើសម្សិលមិញ</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick(2)">
                <q-item-section>
                  <q-item-label>Last week</q-item-label>
                  <q-item-label caption>ជ្រើសរើស៧ថ្ងៃមុន</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick(3)">
                <q-item-section>
                  <q-item-label>Last month</q-item-label>
                  <q-item-label caption>ជ្រើសរើសខែមុន</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick(4)">
                <q-item-section>
                  <q-item-label>Last year</q-item-label>
                  <q-item-label caption>ជ្រើសរើសឆ្នាំមុន</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="row q-gutter-x-sm">
          <q-input class="col" label="ថ្ងៃទិញចូល" outlined square v-model="data.start_date" mask="date"
                   :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
                  <q-date v-model="data.start_date" @input="getStartDate()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input @change="getEndDate()" class="col" label="ថ្ងៃលក់ចេញ" outlined square v-model="data.end_date"
                   mask="date"
                   :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyEnd" transition-show="scale" transition-hide="scale">
                  <q-date v-model="data.end_date" @input="getEndDate()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-x-sm">
          <q-card
            class="col my-card text-white"
            style="background: radial-gradient(circle, #1C9C64 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">${{getExpense}}</div>
                  <div class="text-subtitle2">ចំណាយ (Expenses)</div>
                </div>
                <q-card-actions>
                  <q-btn size="20px" icon="fas fa-money-bill-wave" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            class="col my-card text-white"
            style="background: radial-gradient(circle, #E5CA44 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">${{getTotalIndebted}}</div>
                  <div class="text-subtitle2">ជំពាក់គេ (Indebted)</div>
                </div>
                <q-card-actions>
                  <q-btn size="20px" icon="fas fa-money-bill-wave" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            class="col my-card text-white"
            style="background: radial-gradient(circle, #F15451 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">${{getTotalExpense}}</div>
                  <div class="text-subtitle2">ចំណាយសរុប (Total expenses)</div>
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
        <q-table
          class="table-virtual-scroll-stock"
          :data="getSales"
          :columns="column_stock"
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
<!--              <q-td key="_id" :props="props" class="q-gutter-x-xs">-->
<!--                <q-btn disable size="15px" flat round color="green" dense icon="fas fa-hand-holding-usd"-->
<!--                       :to="`/stock/${props.row._id}/edit`"/>-->
<!--              </q-td>-->
              <q-td key="description" :props="props" class="q-gutter-x-xs">
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
              <q-td key="paid_amount" :props="props" class="q-gutter-x-xs text-primary">
                <span class="text-h6 text-bold">${{props.row.paid_amount}}</span>
              </q-td>
              <q-td key="due_amount" :props="props" class="q-gutter-x-xs text-warning">
                <span class="text-h6 text-bold">${{props.row.due_amount}}</span>
              </q-td>
              <q-td key="amount" :props="props" class="q-gutter-x-xs text-negative">
                <span class="text-h6 text-bold">${{props.row.amount}}</span>
              </q-td>
              <q-td key="purchase_date" :props="props" class="q-gutter-x-xs">
                <span class="text-h6">{{formatDateToString(props.row.sale_date)}}</span>
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
    name: "SaleStockReport",
    data() {
      return {
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        column_stock: [
          // {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'paid_amount', label: 'ថ្លៃចំណាយ', field: 'paid_amount', sortable: true},
          {align: 'left', name: 'due_amount', label: 'ថ្លៃជំពាក់', field: 'due_amount', sortable: true},
          {align: 'left', name: 'amount', label: 'សរុប', field: 'amount', sortable: true},
          {align: 'left', name: 'purchase_date', label: 'ថ្ងៃនាំចូល', field: 'purchase_date', sortable: true},
        ],
        data: {
          start_date: this.formatDate(date.subtractFromDate(new Date(), {month: 1})),
          end_date: this.formatDate(new Date()),
        },
      }
    },
    async created() {
      await this.$store.dispatch('sale/fetchSaleByDate', this.data);
    },
    computed: {
      getSales() {
        return this.$store.getters['sale/getSalesByDate'].filter((d) => {
          return d.sale_status === 'Receive' && d.amount !== 0
        });
      },
      getExpense() {
        let expense = 0;
        this.getSales.forEach((f) => {
          expense += f.paid_amount;
        });
        return expense;
      },
      getTotalExpense() {
        let total_expense = 0;
        this.getSales.forEach((f) => {
          total_expense += f.amount;
        });
        return total_expense;
      },
      getTotalIndebted() {
        let total_indebted = 0;
        this.getSales.forEach((f) => {
          total_indebted += f.due_amount;
        });
        return total_indebted;
      },
    },
    methods: {
      formatDate(timeStamp) {
        return date.formatDate(timeStamp, 'YYYY-MM-DD')
      },
      formatDateToString(timeStamp) {
        return date.formatDate(timeStamp, 'DD-MMM-YYYY')
      },
      onItemClick(selection){
        if(selection === 1){
          this.data.start_date = this.formatDate(date.subtractFromDate(new Date(), {days: 1}));
        } else if (selection === 2){
          this.data.start_date = this.formatDate(date.subtractFromDate(new Date(), {days: 7}));
        }else if (selection === 3){
          this.data.start_date = this.formatDate(date.subtractFromDate(new Date(), {month: 1}));
        }else if(selection === 4){
          this.data.start_date = this.formatDate(date.subtractFromDate(new Date(), {year: 1}));
        }
        this.getStartDate();
      },
      async getStartDate() {
        this.$q.loading.show();
        this.$refs.qDateProxyStart.hide()
        await this.$store.dispatch('sale/fetchSaleByDate', this.data);
        this.$q.loading.hide();
      },
      async getEndDate() {
        this.$q.loading.show();
        this.$refs.qDateProxyEnd.hide()
        await this.$store.dispatch('sale/fetchSaleByDate', this.data);
        this.$q.loading.hide();
      }
    }
  }
</script>

<style scoped>

</style>
