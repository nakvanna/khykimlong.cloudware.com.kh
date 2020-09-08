<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">របាយការណ៍ចំនួនក្នុងស្តុក</div>
        <q-space/>
        <q-btn size="20px" icon="fas fa-warehouse" flat round/>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-x-sm">
          <q-card
            @click="tab = 'total-stock'"
            class="col my-card text-white"
            style="cursor: pointer; background: radial-gradient(circle, #1C9C64 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">{{getTotalStock.length}} <span class="text-h6">មុខ</span></div>
                  <div class="text-subtitle2">ទំនិញមិនទាន់អស់</div>
                </div>
                <q-card-actions>
                  <q-btn @click="tab = 'total-stock'" size="20px" icon="filter_list" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            @click="tab = 'little-stock'"
            class="col my-card text-white"
            style="cursor: pointer; background: radial-gradient(circle, #E5CA44 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">{{getLittleStock.length}} <span class="text-h6">មុខ</span></div>
                  <div class="text-subtitle2">ទំនិញជិតដាច់ស្តុក</div>
                </div>
                <q-card-actions>
                  <q-btn @click="tab = 'empty-stock'" size="20px" icon="filter_list" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            @click="tab = 'empty-stock'"
            class="col my-card text-white"
            style="cursor: pointer; background: radial-gradient(circle, #F15451 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">{{getEmptyStock.length}} <span class="text-h6">មុខ</span></div>
                  <div class="text-subtitle2">ទំនិញដាច់ស្តុក</div>
                </div>
                <q-card-actions>
                  <q-btn @click="tab = 'empty-stock'" size="20px" icon="filter_list" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="total-stock">
          <div class="row q-pb-sm">
            <div class="text-h6 text-primary">ទំនិញនៅទាន់អស់</div>
            <q-space/>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
          <q-table
            class="table-virtual-scroll-stock"
            :data="getTotalStock"
            :columns="column_total_stock"
            row-key="pro_name"
            :filter="filter"
            virtual-scroll
            :pagination.sync="pagination"
            :rows-per-page-options="[0]"
            :virtual-scroll-sticky-size-start="48"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="no">
              <span style="font-size: small">
                {{props.pageIndex + 1}}
              </span>
                </q-td>
                <q-td key="pro_name">
              <span class="text-bold" style="font-size: small">
                {{props.row.pro_name}}
              </span>
                </q-td>
                <q-td key="pro_description" :props="props">
                  <q-input
                    class="col"
                    readonly
                    v-model="props.row.pro_description"
                    type="textarea"
                    rows="1"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </q-td>
                <q-td key="stock_qty">
                  <span style="font-size: medium" class="text-bold text-primary">{{ props.row.stock_qty }}</span>
                </q-td>
                <q-td key="invent_type">
                  <span style="font-size: small">{{ props.row.invent_type }}</span>
                </q-td>
                <q-td key="unit">
                  <span style="font-size: small">{{ props.row.unit }}</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="little-stock">
          <div class="row q-pb-sm">
            <div class="text-h6 text-warning">ទំនិញជិតដាច់ស្តុក</div>
            <q-space/>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
          <q-table
            class="table-virtual-scroll-stock"
            :data="getLittleStock"
            :columns="column_little_stock"
            row-key="pro_name"
            :filter="filter"
            virtual-scroll
            :pagination.sync="pagination"
            :rows-per-page-options="[0]"
            :virtual-scroll-sticky-size-start="48"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="no">
              <span style="font-size: small">
                {{props.pageIndex + 1}}
              </span>
                </q-td>
                <q-td key="pro_name">
              <span class="text-bold" style="font-size: small">
                {{props.row.pro_name}}
              </span>
                </q-td>
                <q-td key="pro_description" :props="props">
                  <q-input
                    class="col"
                    readonly
                    v-model="props.row.pro_description"
                    type="textarea"
                    rows="1"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </q-td>
                <q-td key="stock_qty">
                  <span style="font-size: medium" class="text-bold text-warning">{{ props.row.stock_qty }}</span>
                </q-td>
                <q-td key="invent_type">
                  <span style="font-size: small">{{ props.row.invent_type }}</span>
                </q-td>
                <q-td key="unit">
                  <span style="font-size: small">{{ props.row.unit }}</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="empty-stock">
          <div class="row q-pb-sm">
            <div class="text-h6 text-negative">ទំនិញដាច់ស្តុក</div>
            <q-space/>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
          <q-table
            class="table-virtual-scroll-stock"
            :data="getEmptyStock"
            :columns="column_empty_stock"
            row-key="pro_name"
            :filter="filter"
            virtual-scroll
            :pagination.sync="pagination"
            :rows-per-page-options="[0]"
            :virtual-scroll-sticky-size-start="48"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="no">
              <span style="font-size: small">
                {{props.pageIndex + 1}}
              </span>
                </q-td>
                <q-td key="pro_name">
              <span class="text-bold" style="font-size: small">
                {{props.row.pro_name}}
              </span>
                </q-td>
                <q-td key="pro_description" :props="props">
                  <q-input
                    class="col"
                    readonly
                    v-model="props.row.pro_description"
                    type="textarea"
                    rows="1"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </q-td>
                <q-td key="stock_qty">
                  <span style="font-size: medium" class="text-bold text-negative">{{ props.row.stock_qty }}</span>
                </q-td>
                <q-td key="invent_type">
                  <span style="font-size: small">{{ props.row.invent_type }}</span>
                </q-td>
                <q-td key="unit">
                  <span style="font-size: small">{{ props.row.unit }}</span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    name: "StockReport",
    data() {
      return {
        tab: 'total-stock',
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        column_total_stock: [
          {align: 'left', name: 'no', label: 'ល.រ', field: 'no'},
          {align: 'left', name: 'pro_name', label: 'ទំនិញ', field: 'pro_name', sortable: true},
          {align: 'left', name: 'pro_description', label: 'ចំណាំ', field: 'pro_description'},
          {align: 'left', name: 'stock_qty', label: 'ចំនួននៅសល់', field: 'stock_qty'},
          {align: 'left', name: 'invent_type', label: 'ប្រភេទស្តុក', field: 'invent_type'},
          {align: 'left', name: 'unit', label: 'ឯកតា', field: 'unit'},
        ],
        column_little_stock: [
          {align: 'left', name: 'no', label: 'ល.រ', field: 'no'},
          {align: 'left', name: 'pro_name', label: 'ទំនិញ', field: 'pro_name', sortable: true},
          {align: 'left', name: 'pro_description', label: 'ចំណាំ', field: 'pro_description'},
          {align: 'left', name: 'stock_qty', label: 'ចំនួននៅសល់', field: 'stock_qty'},
          {align: 'left', name: 'invent_type', label: 'ប្រភេទស្តុក', field: 'invent_type'},
          {align: 'left', name: 'unit', label: 'ឯកតា', field: 'unit'},
        ],
        column_empty_stock: [
          {align: 'left', name: 'no', label: 'ល.រ', field: 'no'},
          {align: 'left', name: 'pro_name', label: 'ទំនិញ', field: 'pro_name', sortable: true},
          {align: 'left', name: 'pro_description', label: 'ចំណាំ', field: 'pro_description'},
          {align: 'left', name: 'stock_qty', label: 'ចំនួននៅសល់', field: 'stock_qty'},
          {align: 'left', name: 'invent_type', label: 'ប្រភេទស្តុក', field: 'invent_type'},
          {align: 'left', name: 'unit', label: 'ឯកតា', field: 'unit'},
        ],
        data_total_stock: [],
        data_empty_stock: [],
      }
    },
    computed: {
      getDefaultStock() {
        let items = [];
        let total_stock = this.$store.getters['stock/getStockDetailForReport'].filter(function (f) {
          return f.purchase_status === 'Receive';
        });
        total_stock.map(function (d) {
          const index = items.findIndex((e) => e.pro_name === d.product.name);
          if (index === -1){
            items.push({
              pro_name: d.product.name,
              pro_description: d.product.description,
              invent_type: d.invent_type,
              pro_type: d.product.type,
              pro_alert: d.product.stock_alert,
              stock_qty: d.stock_qty,
              unit: d.product.unit,
            })
          } else {
            items[index].stock_qty += d.stock_qty;
          }
        });
        return items;
      },
      getTotalStock(){
        return this.getDefaultStock.filter(function (f) {
          return f.stock_qty > 0;
        })
      },
      getEmptyStock() {
        return this.getDefaultStock.filter(function (f) {
          return f.stock_qty === 0;
        });
      },
      getLittleStock() {
       return this.getDefaultStock.filter(function (f) {
          return f.stock_qty > 0 && f.stock_qty <= f.pro_alert;
        });
      },
    },
    async created() {
      this.$q.loading.show();
      await this.$store.dispatch('stock/fetchStockDetailForReport');
      this.$q.loading.hide();
    },
  }
</script>

<style scoped>

</style>
