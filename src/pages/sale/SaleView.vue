<template>
  <q-page>
    <q-card>
      <q-card-actions align="left">
        <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
          <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
        </q-btn>
        <q-space/>
        <q-btn @click="printPdf" style="width: 150px" color="primary" icon="print" label="បោះពុម្ព">
          <q-tooltip content-class="bg-white text-primary">បោះពុម្ព</q-tooltip>
        </q-btn>
      </q-card-actions>
      <q-card-section>
        <q-table
          title="ព័ត៌មានលក់ចេញ"
          :data="sale_data"
          :columns="columns_default"
          :rows-per-page-options="[0]"
          :pagination.sync="pagination"
          hide-bottom
          separator="cell"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="patient_name">
              <span style="font-size: large">
                {{ props.row.patient.kh_name}}
                <br>
                {{ props.row.patient.lt_name}}
              </span>
              </q-td>
              <q-td key="patient_contact" :props="props">
                <span style="font-size: large">
                {{ props.row.patient.phone }}
              </span>
              </q-td>
              <q-td key="description" :props="props">
                <q-input
                  class="col"
                  readonly
                  v-model="props.row.description"
                  type="textarea"
                  rows="3"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
              </q-td>
              <q-td key="sale_status">
              <span style="font-size: large">
                {{ props.row.sale_status }}
              </span>
              </q-td>
              <q-td key="sale_date">
              <span style="font-size: large">
                {{ dateFormat(props.row.sale_date) }}
              </span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <br>
        <q-separator color="orange" inset/>
        <br>
        <q-table
          :data="sale_detail_data"
          :columns="columns_detail"
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          separator="cell"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="no">
              <span style="font-size: large">
                {{props.pageIndex + 1}}
              </span>
              </q-td>
              <q-td key="pro_name">
              <span class="text-bold" style="font-size: large">
                {{props.row.product.name}}
              </span>
              </q-td>
              <q-td key="pro_description" :props="props">
                <q-input
                  class="col"
                  readonly
                  v-model="props.row.product.description"
                  type="textarea"
                  rows="1"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
              </q-td>
              <q-td key="sale_qty">
              <span style="font-size: large">
                {{ props.row.sale_qty }}
              </span>
              </q-td>
              <q-td key="buy_price">
              <span style="font-size: large">
                ${{ props.row.buy_price }}
              </span>
              </q-td>
              <q-td key="sale_price">
              <span style="font-size: large">
                ${{ props.row.sale_price }}
              </span>
              </q-td>
              <q-td key="sale_status">
              <span class="text-bold" style="font-size: large">
                ${{ props.row.sale_price * props.row.sale_qty }}
              </span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <div style="font-size: 30px" class="text-bold row q-gutter-x-sm q-mb-sm">
          តម្លៃសរុប: ${{data_amount.toFixed(2)}}
        </div>
        <div class="row q-gutter-x-sm q-mb-sm">
          <span class="col-1"></span>
          <span class="col-2 text-bold" style="font-size: large">
            <u>ថ្លៃចំណាយ: ${{data_paid.toFixed(2)}}</u>
          </span>
          <span class="col-2 text-bold" style="font-size: large;">
            <u>ថ្លៃជំពាក់: ${{data_due.toFixed(2)}}</u>
          </span>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  const columns_default = [
    {align: 'left', name: 'patient_name', label: 'អ្នកទិញ', field: 'patient_name'},
    {align: 'left', name: 'patient_contact', label: 'ទូរសព្ទ', field: 'patient_contact'},
    {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description'},
    {align: 'left', name: 'sale_status', label: 'ស្ថានភាពលក់', field: 'sale_status'},
    {align: 'left', name: 'sale_date', label: 'ថ្ងៃខែឆ្នាំទិញ', field: 'sale_date'},
  ];
  const columns_detail = [
    {align: 'left', name: 'no', label: 'ល.រ', field: 'no'},
    {align: 'left', name: 'pro_name', label: 'ទំនិញ', field: 'pro_name'},
    {align: 'left', name: 'pro_description', label: 'ចំណាំ', field: 'pro_description'},
    {align: 'left', name: 'sale_qty', label: 'ចំនួនលក់ចេញ', field: 'sale_qty'},
    {align: 'left', name: 'buy_price', label: 'តម្លៃទិញ', field: 'buy_price'},
    {align: 'left', name: 'sale_price', label: 'តម្លៃលក់', field: 'sale_price'},
    {align: 'left', name: 'total', label: 'សរុប', field: 'total'},
  ];
  export default {
    name: "SaleView",
    data(){
      return {
        pagination: {
          rowsPerPage: 0
        },
        sale_data: [],
        sale_detail_data: [],
        columns_default,
        columns_detail,
        data_amount: 0,
        data_paid: 0,
        data_due: 0,
      }
    },
    async created() {
      let self = this;
      await self.$store.dispatch('sale/viewSale', self.$route.params.id).then(async function(res){
        let sale_id = res.data._id;
        self.sale_data = [];
        self.sale_data.push(res.data);
        self.data_amount = res.data.amount;
        self.data_paid = res.data.paid_amount;
        self.data_due = res.data.due_amount;
        await self.$store.dispatch('sale/fetchSaleDetailBySale', sale_id).then(async function (res_detail) {
          self.sale_detail_data = [];
          self.sale_detail_data = res_detail.data;
        })
      })
    },
    methods: {
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      },
      printPdf(){
        this.$store.dispatch('pdf_make/printSale', {data:this.sale_data, detail: this.sale_detail_data});
      }
    }
  }
</script>

<style scoped>

</style>
