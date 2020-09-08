<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">របាយការណ៍ចំណូលផ្សេងៗ</div>
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
            @click="tab = 'empty-stock'"
            class="col-4 my-card text-white"
            style="cursor: pointer; background: radial-gradient(circle, #1C9C64 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">{{getTotalIncome.toFixed(2)}}<span class="text-h6">ដុល្លា</span></div>
                  <div class="text-subtitle2">ប្រាក់ចំណូលផ្សេងៗ</div>
                </div>
                <q-card-actions>
                  <q-btn @click="tab = 'empty-stock'" size="20px" icon="filter_list" flat round/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll-stock"
          :data="getIncomeByDate"
          :columns="column_staff_salary"
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
            <q-tr :props="props" >
              <q-td key="_id" :props="props" class="q-gutter-x-xs">
                <span class="text-h6">{{props.pageIndex + 1}}</span>
              </q-td>
              <q-td key="income" :props="props" class="q-gutter-x-xs">
                <span class="text-h6 text-bold">${{parseFloat(props.row.income).toFixed(2)}}</span>
              </q-td>
              <q-td key="salary" :props="props" class="q-gutter-x-xs text-primary">
                <span class="text-h6 text-bold">${{props.row.salary}}</span>
              </q-td>
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
              <q-td key="income_type" :props="props" class="q-gutter-x-xs">
                <span class="text-bold">{{props.row.income_type}}</span>
              </q-td>
              <q-td key="income_date" :props="props" class="q-gutter-x-xs">
                <span class="text-bold">{{formatDateToString(props.row.income_date)}}</span>
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
    name: "IncomeReport",
    data(){
      return {
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        column_staff_salary: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'income', label: 'ចំណូល', field: 'income', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'income_type', label: 'ប្រភេទ', field: 'income_type', sortable: true},
          {align: 'left', name: 'income_date', label: 'ថ្ងៃទី', field: 'income_date', sortable: true},
        ],
        data: {
          start_date: this.formatDate(date.subtractFromDate(new Date(), {month: 1})),
          end_date: this.formatDate(new Date()),
        },
      }
    },
    computed: {
      getIncomeByDate(){
        return this.$store.getters['income/getIncomeByDate'];
      },
      getTotalIncome(){
        let total = 0
        this.getIncomeByDate.map((m)=>{
          total += parseFloat(m.income);
        });
        return total;
      }
    },
    created() {
      this.$q.loading.show();
      this.$store.dispatch('income/fetchIncomeByDate', this.data)
      this.$q.loading.hide();
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
        this.$refs.qDateProxyStart.hide()
        await this.$store.dispatch('income/fetchIncomeByDate', this.data)
      },
      async getEndDate() {
        this.$refs.qDateProxyEnd.hide()
        await this.$store.dispatch('income/fetchIncomeByDate', this.data)
      }
    }
  }
</script>

<style scoped>

</style>
