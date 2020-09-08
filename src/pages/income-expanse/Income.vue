<template>
  <q-page>
    <q-card-section>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          :duration="1000"
          v-model="expand"
          label="តារាងចំណូល"
          caption="ចំណូលផ្សេងៗ"
        >
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
            ref="addForm"
          >
            <q-card-section class="row" align="right">
              <q-input class="col-md-3 col-xs-12 align-right"
                       v-model="income_date"
                       square
                       lazy-rules
                       mask="date" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="dateDOB" transition-show="scale" transition-hide="scale">
                      <q-date v-model="income_date" @input="() => $refs.dateDOB.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-table

                :data="data_income"
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
                      <q-input class="col"
                        v-model="props.row.income"
                        type="number"
                        square
                        lazy-rules
                        :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                      />
                    </q-td>
                    <q-td>
                      <q-input class="col"
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
                                  v-model="props.row.inc_type"
                                  :options="getIncomeType"
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
            :data="getIncomes"
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
                <q-td :props="props" key="income">
                  <span class="text-h6 text-bold">${{props.row.income}}</span>
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
                <q-td :props="props" key="income_type">
                  {{props.row.income_type}}
                </q-td>
                <q-td :props="props" key="income_date">
                  {{dateFormat(props.row.income_date)}}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
    <q-dialog full-width position="top" v-model="isDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">បន្ថែមប្រភេទចំណូល</div>
          <q-space/>
          <q-btn icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section>
          <q-input
            class="col"
            v-model="income_type"
            square
            lazy-rules
            :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
          />
        </q-card-section>
        <q-card-section class="row items-center q-pb-none align-right">
          <q-space/>
          <q-btn @click="storeIncomeType" flat color="blue" icon="save" label="រក្សាទុក"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  const columns_store = [
    {align: 'left', name: 'no', label: 'ល.រ', field: 'no'},
    {align: 'left', name: 'income', label: 'ចំណូល', field: 'income'},
    {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description'},
    {align: 'left', name: 'income_type', label: 'ប្រភេទ', field: 'income_type'},
    {align: 'left', name: 'option', label: 'ដកចេញ', field: 'option'},
  ];
  const columns_fetch = [
    {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
    {align: 'left', name: 'income', label: 'ចំណូល', field: 'income', sortable: true},
    {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
    {align: 'left', name: 'income_type', label: 'ប្រភេទ', field: 'income_type', sortable: true},
    {align: 'left', name: 'income_date', label: 'ថ្ងៃទី', field: 'income_date', sortable: true},
  ];
  export default {
    name: "Income",
    data() {
      return {
        columns_store,
        columns_fetch,
        income_type: '',
        isDialog: false,
        pagination: {
          rowsPerPage: 0
        },
        filter: '',
        expand: false,
        data_income: [],
        income_date: null,
      }
    },
    async created() {
      await this.$store.dispatch('inc_exp/fetchIncomeType');
      await this.$store.dispatch('income/fetchIncome');
    },
    computed: {
      getIncomeType() {
        return this.$store.getters['inc_exp/getIncomeType'].map((m) => {
          return {
            label: m.name,
            _id: m._id
          }
        });
      },
      getIncomes() {
        return this.$store.getters['income/getIncomes'];
      }
    },
    methods: {
      onSubmit() {
        let self = this;
        self.$q.loading.show();
        let new_data = self.data_income.map(function (m) {
          return {
            ...m,
            income_date: self.income_date,
            income_type: m.inc_type.label
          }
        });
        const promise = new_data.map(function (f) {
          self.$store.dispatch('income/storeIncome', f)
        });
        Promise.all(promise).then(() => {
          self.expand = false;
          self.$q.loading.hide();
        })
      },
      addData() {
        this.data_income.push({
          income: 0,
          inc_type: null,
          description: '',
          inc_date: null
        })
      },
      removeData(index) {
        this.data_income.splice(index, 1)
      },
      storeIncomeType() {
        let self = this;
        self.$store.dispatch('inc_exp/storeIncomeType', {name: self.income_type}).then(function () {
          self.isDialog = false;
        });
      },
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      }
    }
  }
</script>

<style scoped>

</style>
