<template>
  <q-page>
    <q-card-section>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          :duration="1000"
          v-model="expand"
          label="តារាងចំណាយ"
          caption="ចំណាយផ្សេងៗ"
        >
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
            ref="addForm"
          >
            <q-card-section class="row" align="right">
              <q-input class="col-3 align-right"
                       v-model="expense_date"
                       square
                       lazy-rules
                       mask="date" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="dateDOB" transition-show="scale" transition-hide="scale">
                      <q-date v-model="expense_date" @input="() => $refs.dateDOB.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-table
                :data="data_expense"
                :columns="columns_store"
                hide-bottom
                :pagination.sync="pagination"
                :rows-per-page-options="[0]"
              >
                <template v-slot:body="props">
                  <q-tr>
                    <q-td>
                      {{props.pageIndex + 1}}
                    </q-td>
                    <q-td>
                      <q-input
                        class="col"
                        v-model="props.row.expense"
                        type="number"
                        square
                        lazy-rules
                        :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                      />
                    </q-td>
                    <q-td>
                      <q-input
                        class="col"
                        v-model="props.row.description"
                        type="textarea"
                        rows="1"
                        square
                        lazy-rules
                        :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                      />
                    </q-td>
                    <q-td>
                      <div class="row">
                        <q-select class="col"
                                  v-model="props.row.exp_type"
                                  :options="getExpenseType"
                                  square
                                  lazy-rules
                                  :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                        </q-select>
                        <q-btn
                          flat
                          @click="isDialog = true"
                          class="col-1"
                          style="height: 55px"
                          dense
                          color="primary"
                          icon="add"
                        />
                      </div>
                    </q-td>
                    <q-td align="center">
                      <q-btn @click="removeData(props.pageIndex)" outline round color="negative" icon="delete"/>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-card-section>
          </q-form>
          <q-card-section class="row items-center q-pb-none">
            <q-btn @click="addData()" flat color="blue" icon="add" label="បន្ថែម"/>
            <q-space/>
            <q-btn @click="$refs.addForm.submit()" flat color="blue" icon="save" label="រក្សាទុក"/>
          </q-card-section>
        </q-expansion-item>
      </q-list>
    </q-card-section>
    <q-separator color="orange" inset/>
    <q-card-section>
      <q-table
        :data="getExpenses"
        :columns="columns_fetch"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        class="table-virtual-scroll"
        row-key="name"
        :filter="filter"
        virtual-scroll
        :virtual-scroll-sticky-size-start="48"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td :props="props" key="no">
              <span class="text-bold text-h6">{{props.rowIndex + 1}}</span>
            </q-td>
            <q-td :props="props" key="expense">
              <span class="text-h6 text-bold">${{props.row.expense}}</span>
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
            <q-td :props="props" key="expense_type">
              {{props.row.expense_type}}
            </q-td>
            <q-td :props="props" key="expense_date">
              {{dateFormat(props.row.expense_date)}}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
    <q-dialog full-width position="top" v-model="isDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">បន្ថែមប្រភេទចំណាយ</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section>
          <q-input
            class="col"
            v-model="expense_type"
            square
            lazy-rules
            :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
          />
        </q-card-section>
        <q-card-section class="row items-center q-pb-none align-right">
          <q-space/>
          <q-btn @click="storeExpenseType" flat color="blue" icon="save" label="រក្សាទុក"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  const columns_store = [
    {align: 'left', name: 'no', label: 'ល.រ', field: 'no'},
    {align: 'left', name: 'expense', label: 'ចំណាយ', field: 'expense'},
    {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description'},
    {align: 'left', name: 'expense_type', label: 'ប្រភេទ', field: 'expense_type'},
    {align: 'left', name: 'option', label: 'ដកចេញ', field: 'option'},
  ];
  const columns_fetch = [
    {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
    {align: 'left', name: 'expense', label: 'ចំណាយ', field: 'expense', sortable: true},
    {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
    {align: 'left', name: 'expense_type', label: 'ប្រភេទ', field: 'expense_type', sortable: true},
    {align: 'left', name: 'expense_date', label: 'ថ្ងៃទី', field: 'expense_date', sortable: true},
  ];
  export default {
    name: "Expense",
    data() {
      return {
        columns_store,
        columns_fetch,
        expense_type: '',
        isDialog: false,
        pagination: {
          rowsPerPage: 0
        },
        filter: '',
        expand: false,
        data_expense: [],
        expense_date: null,
      }
    },
    async created() {
      await this.$store.dispatch('inc_exp/fetchExpenseType');
      await this.$store.dispatch('expense/fetchExpense');
    },
    computed: {
      getExpenseType() {
        return this.$store.getters['inc_exp/getExpenseType'].map((m) => {
          return {
            label: m.name,
            _id: m._id
          }
        });
      },
      getExpenses() {
        return this.$store.getters['expense/getExpenses'];
      }
    },
    methods: {
      onSubmit() {
        let self = this;
        self.$q.loading.show();
        let new_data = self.data_expense.map(function (m) {
          return {
            ...m,
            expense_date: self.expense_date,
            expense_type: m.exp_type.label
          }
        });
        const promise = new_data.map(function (f) {
          self.$store.dispatch('expense/storeExpense', f)
        });
        Promise.all(promise).then(() => {
          self.expand = false;
          self.$q.loading.hide();
        })
      },
      addData() {
        this.data_expense.push({
          expense: 0,
          exp_type: null,
          description: '',
          exp_date: null
        })
      },
      removeData(index) {
        this.data_expense.splice(index, 1)
      },
      storeExpenseType() {
        let self = this;
        self.$store.dispatch('inc_exp/storeExpenseType', {name: self.expense_type}).then(function () {
          self.isDialog = false;
        });
      },
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      },
    }
  }
</script>

<style scoped>

</style>
