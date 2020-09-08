<template>
  <q-page>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">គ្រូពេទ្យចេញថ្នាំ</div>
        <q-space/>
        <q-btn size="20px" icon="add_circle_outline" flat round to="/sale/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll-stock"
          :data="getSalesPending"
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
            <q-tr :props="props" class="cursor-pointer" @click="$router.push({path: `/sale/${props.row._id}/view`})">
              <q-td key="_id" :props="props" class="q-gutter-x-xs">
                <q-btn size="15px" flat round color="warning" dense icon="fas fa-edit"
                       :to="`/sale/${props.row._id}/edit`"/>

              </q-td>
              <q-td key="patient_name" :props="props" class="q-gutter-x-xs">
                <span class="text-bold text-uppercase">{{props.row.patient.kh_name}}</span>
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
    </q-card>
  </q-page>
</template>

<script>
  import {date} from "quasar";
  export default {
    name: "Sale",
    data(){
      return {
        panel: 'receive',
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns_receive: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'patient_name', label: 'អ្នកជម្ងឺ', field: 'patient_name', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'amount', label: 'សរុប', field: 'amount', sortable: true},
          {align: 'left', name: 'paid_amount', label: 'ថ្លៃចំណាយ', field: 'paid_amount', sortable: true},
          {align: 'left', name: 'due_amount', label: 'ថ្លៃជំពាក់', field: 'due_amount', sortable: true},
          {align: 'left', name: 'sale_date', label: 'ថ្ងៃនាំចូល', field: 'sale_date', sortable: true},
        ],
        columns_pending: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'patient_name', label: 'អ្នកជម្ងឺ', field: 'patient_name', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'amount', label: 'សរុប', field: 'amount', sortable: true},
          {align: 'left', name: 'paid_amount', label: 'ថ្លៃចំណាយ', field: 'paid_amount', sortable: true},
          {align: 'left', name: 'due_amount', label: 'ថ្លៃជំពាក់', field: 'due_amount', sortable: true},
          {align: 'left', name: 'sale_date', label: 'ថ្ងៃនាំចូល', field: 'sale_date', sortable: true},
        ],
      }
    },
    computed: {
      getSalesReceive(){
        return this.$store.getters['sale/getSales'].filter((f)=>{
          return f.sale_status === 'Receive'
        })
      },
      getSalesPending(){
        return this.$store.getters['sale/getSales'].filter((f)=>{
          return f.sale_status === 'Pending'
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
