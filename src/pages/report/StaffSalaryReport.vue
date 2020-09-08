<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">របាយការណ៍ប្រាក់ខែបុគ្គលិក</div>
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
          <q-input class="col" label="ថ្ងៃចាប់ផ្ដើម" outlined square v-model="data.start_date" mask="date"
                   :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
                  <q-date v-model="data.start_date" @input="getStartDate()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input @change="getEndDate()" class="col" label="ថ្ងៃចុងក្រោយ" outlined square v-model="data.end_date"
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
            style="cursor: pointer; background: radial-gradient(circle, #F15451 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">{{getTotalSalary.toFixed(2)}} <span class="text-h6">ដុល្លា</span></div>
                  <div class="text-subtitle2">ប្រាក់ខែបានបើក</div>
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
          :data="getStaffSalary"
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
            <q-tr :props="props">
              <q-td key="staff_name" :props="props" class="q-gutter-x-xs">
                <span class="text-bold">{{props.row.staff.lname}} {{props.row.staff.fname}}</span>
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
              <q-td key="amount" :props="props" class="q-gutter-x-xs text-negative">
                <span class="text-h6 text-bold">${{props.row.amount}}</span>
              </q-td>
              <q-td key="pay_date" :props="props" class="q-gutter-x-xs">
                <span class="text-h6">{{formatDateToString(props.row.pay_date)}}</span>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {date} from 'quasar';
  export default {
    name: "StaffSalaryReport",
    data(){
      return {
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        date_now: new Date(),
        column_staff_salary: [
          // {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'staff_name', label: 'បុគ្គលិក', field: 'staff_name', sortable: true},
          {align: 'left', name: 'salary', label: 'ប្រាក់ខែបុគ្គលិក', field: 'salary', sortable: true},
          {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
          {align: 'left', name: 'pay_date', label: 'ថ្ងៃបើក', field: 'pay_date', sortable: true},
        ],
        data: {
          start_date: this.formatDate(date.subtractFromDate(new Date(), {month: 1})),
          end_date: this.formatDate(new Date()),
        },
      }
    },
    computed: {
      getStaffSalary(){
        return this.$store.getters['staff/getStaffSalaryByDate'];
      },
      getTotalSalary(){
        let total = 0
        this.getStaffSalary.map((m)=>{
          total += m.salary;
        });
        return total;
      }
    },
    created() {
      this.$q.loading.show();
      this.$store.dispatch('staff/fetchSalaryStaffByDate', this.data);
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
        this.$q.loading.show();
        this.$refs.qDateProxyStart.hide()
        await this.$store.dispatch('staff/fetchSalaryStaffByDate', this.data)
        this.$q.loading.hide();
      },
      async getEndDate() {
        this.$q.loading.show();
        this.$refs.qDateProxyEnd.hide()
        await this.$store.dispatch('staff/fetchSalaryStaffByDate', this.data)
        this.$q.loading.hide();
      }
    }
  }
</script>

<style scoped>

</style>
