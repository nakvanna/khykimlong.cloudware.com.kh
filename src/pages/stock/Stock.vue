<template>
  <q-page>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">ស្តុកទំនិញ</div>
        <q-space/>
        <q-btn size="20px" icon="add_circle_outline" flat round to="/stock/create"/>
      </q-card-section>
      <q-card-section>
        <div>
          <q-option-group
            v-model="panel"
            inline
            :options="[
          { label: 'Receive', value: 'receive' },
          { label: 'Pending', value: 'pending' },
        ]"
          />

          <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
            <q-tab-panel name="receive">
              <div class="text-h6 text-bold">Receive</div>
              <q-card-section>
                <q-table
                  class="table-virtual-scroll-stock"
                  :data="getStocksReceive"
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
                    <q-tr :props="props" class="cursor-pointer" @click="$router.push({path: `/stock/${props.row._id}/view`})">
                      <q-td key="_id" :props="props" class="q-gutter-x-xs">
                        <q-btn size="15px" flat round color="green" dense icon="fas fa-hand-holding-usd"
                               :to="`/pay/${props.row._id}/back`"/>

                      </q-td>
                      <q-td key="sup_name" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold text-uppercase">{{props.row.supplier.name}}</span>
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
                      <q-td key="amount" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold text-primary">${{props.row.amount}}</span>
                      </q-td>
                      <q-td key="paid_balance" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold text-warning">${{props.row.paid_amount}}</span>
                      </q-td>
                      <q-td key="due_balance" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold text-negative">${{props.row.due_amount}}</span>
                      </q-td>
                      <q-td key="purchase_date" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold">{{dateFormat(props.row.purchase_date)}}</span>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-tab-panel>

            <q-tab-panel name="pending">
              <div class="text-h6 text-bold">Pending</div>
              <q-card-section>
                <q-table
                  class="table-virtual-scroll-stock"
                  :data="getStocksPending"
                  :columns="columns_pending"
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
                      <q-td key="_id" :props="props" class="q-gutter-x-xs">
                        <q-btn size="15px" flat round color="warning" dense icon="fas fa-edit"
                               :to="`/stock/${props.row._id}/edit`"/>

                      </q-td>
                      <q-td key="sup_name" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold text-uppercase">{{props.row.supplier.name}}</span>
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
                      <q-td key="amount" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold text-primary">${{props.row.amount}}</span>
                      </q-td>
                      <q-td key="paid_balance" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold text-warning">${{props.row.paid_amount}}</span>
                      </q-td>
                      <q-td key="due_balance" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold text-negative">${{props.row.due_amount}}</span>
                      </q-td>
                      <q-td key="purchase_date" :props="props" class="q-gutter-x-xs">
                        <span class="text-bold">{{dateFormat(props.row.purchase_date)}}</span>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  export default {
    name: "Stock",
    data() {
      return {
        panel: 'receive',
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns_receive: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'sup_name', label: 'អ្នកផ្គត់ផ្គង់', field: 'sup_name', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'amount', label: 'សរុប', field: 'amount', sortable: true},
          {align: 'left', name: 'paid_balance', label: 'ថ្លៃចំណាយ', field: 'paid_balance', sortable: true},
          {align: 'left', name: 'due_balance', label: 'ថ្លៃជំពាក់', field: 'due_balance', sortable: true},
          {align: 'left', name: 'purchase_date', label: 'ថ្ងៃនាំចូល', field: 'purchase_date', sortable: true},
        ],
        columns_pending: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'sup_name', label: 'អ្នកផ្គត់ផ្គង់', field: 'sup_name', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'amount', label: 'សរុប', field: 'amount', sortable: true},
          {align: 'left', name: 'paid_balance', label: 'ថ្លៃចំណាយ', field: 'paid_balance', sortable: true},
          {align: 'left', name: 'due_balance', label: 'ថ្លៃជំពាក់', field: 'due_balance', sortable: true},
          {align: 'left', name: 'purchase_date', label: 'ថ្ងៃនាំចូល', field: 'purchase_date', sortable: true},
        ],
      }
    },
    computed: {
      getStocksReceive(){
        return this.$store.getters['stock/getStocks'].filter((d)=> {
          return d.purchase_status === 'Receive'
        })
      },
      getStocksPending(){
        return this.$store.getters['stock/getStocks'].filter((d)=> {
          return d.purchase_status === 'Pending'
        })
      }
    },
    methods: {
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      }
    }
  }
</script>

<style scoped>

</style>
