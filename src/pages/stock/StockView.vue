<template>
  <q-page>
    <q-card>
      <q-card-actions >
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
          title="ព័ត៌មាននាំទំនិញចូល"
          :data="stock_data"
          :columns="columns_default"
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          separator="cell"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="sup_name">
              <span style="font-size: medium">
                ឈ្មោះ {{ props.row.supplier.name}} from
                {{ props.row.supplier.company }}<br>
                <q-icon name="place" size="30px"/>
                {{props.row.supplier.current_address_book.province}}-
                {{props.row.supplier.current_address_book.district}}-
                {{props.row.supplier.current_address_book.commune}}-
                {{props.row.supplier.current_address_book.village}}
              </span>
              </q-td>
              <q-td key="sup_contact" :props="props">
                <q-input
                  class="col"
                  readonly
                  v-model="props.row.supplier.contact"
                  type="textarea"
                  rows="3"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
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
              <q-td key="purchase_status">
              <span style="font-size: large">
                {{ props.row.purchase_status }}
              </span>
              </q-td>
              <q-td key="purchase_date">
              <span style="font-size: large">
                {{ dateFormat(props.row.purchase_date) }}
              </span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <br>
        <q-separator color="orange" inset/>
        <br>
        <q-table
          :data="stock_data_detail"
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
              <q-td key="qty">
              <span style="font-size: large">
                {{ props.row.qty }}
              </span>
              </q-td>
              <q-td key="stock_qty">
              <span style="font-size: large">
                {{ props.row.stock_qty }}
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
              <q-td key="purchase_status">
              <span class="text-bold" style="font-size: large">
                ${{ props.row.buy_price * props.row.qty }}
              </span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <div style="font-size: 30px" class="text-bold row q-gutter-x-sm q-mb-sm">
          តម្លៃសរុប: ${{data_amount}}
        </div>
        <div class="row q-gutter-x-sm q-mb-sm">
          <span class="col-1"></span>
          <span class="col-2 text-bold" style="font-size: large">
            <u>ថ្លៃចំណាយ: ${{data_paid}}</u>
          </span>
          <span class="col-2 text-bold" style="font-size: large;">
            <u>ថ្លៃជំពាក់: ${{data_due}}</u>
          </span>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  const columns_default = [
    {align: 'left', name: 'sup_name', label: 'អ្នកផ្គត់ផ្គង់', field: 'sup_name'},
    {align: 'left', name: 'sup_contact', label: 'ទំនាក់ទំនង', field: 'sup_contact'},
    {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description'},
    {align: 'left', name: 'purchase_status', label: 'ស្ថានភាពទិញ', field: 'purchase_status'},
    {align: 'left', name: 'purchase_date', label: 'ថ្ងៃខែឆ្នាំទិញ', field: 'purchase_date'},
  ];
  const columns_detail = [
    {align: 'left', name: 'no', label: 'ល.រ', field: 'no'},
    {align: 'left', name: 'pro_name', label: 'ទំនិញ', field: 'pro_name'},
    {align: 'left', name: 'pro_description', label: 'ចំណាំ', field: 'pro_description'},
    {align: 'left', name: 'qty', label: 'ចំនួនទិញចូល', field: 'qty'},
    {align: 'left', name: 'stock_qty', label: 'ចំនួននៅសល់', field: 'stock_qty'},
    {align: 'left', name: 'buy_price', label: 'តម្លៃទិញ', field: 'buy_price'},
    {align: 'left', name: 'sale_price', label: 'តម្លៃលក់', field: 'sale_price'},
    {align: 'left', name: 'total', label: 'សរុប', field: 'total'},
  ];
  export default {
    name: "StockView",
    data() {
      return {
        pagination: {
          rowsPerPage: 0
        },
        dialog:false,
        url:null,
        columns_default,
        columns_detail,
        stock_data: [],
        data_amount: 0,
        data_paid: 0,
        data_due: 0,
        stock_data_detail: [],
      }
    },
    async created() {
      let self = this;
      await self.$store.dispatch('stock/viewStock', self.$route.params.id).then(async function (res) {
        let stock_id = res.data._id;
        self.stock_data = [];
        self.stock_data.push(res.data);
        self.data_amount = res.data.amount;
        self.data_paid = res.data.paid_amount;
        self.data_due = res.data.due_amount;
        await self.$store.dispatch('stock/fetchStockDetailByStock', stock_id).then(async function (res_detail) {
          self.stock_data_detail = [];
          self.stock_data_detail = res_detail.data;
        })
      });
    },
    methods: {
      printPdf(){
        this.$store.dispatch('pdf_make/printStock', {data:this.stock_data, detail: this.stock_data_detail});
      },
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      },
    }
  }
</script>

<style scoped>

</style>
