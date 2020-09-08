<template>
  <q-page>
<!--    <q-card-section class="row items-center q-pb-none">-->
<!--      <div class="text-h6 text-bold">-->
<!--        ឈ្មោះ {{staff.lname +' '+staff.fname}} ភេទ {{staff.gender}}-->
<!--      </div>-->
<!--      <q-space/>-->
<!--      <q-btn outline @click="$refs.addForm.submit()" style="color: #FF0080" label="រក្សាទុក"/>-->
<!--    </q-card-section>-->
<!--    <q-card-section>-->
<!--      ធនាគា៖ {{staff.bank_name}} លេខធនាគា៖ {{staff.bank_account_no}}-->
<!--    </q-card-section>-->
    <q-card-section>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          :duration="1000"
          v-model="expand"
          :label= "'ឈ្មោះ '+staff.lname+' '+staff.fname +' ភេទ '+staff.gender"
          :caption="'ធនាគា៖ '+staff.bank_name+' លេខគណនី៖ '+staff.bank_account_no"
        >
          <q-card>
            <q-card-section>
              <q-form
                @submit="onSubmit"
                class="q-gutter-md"
                ref="addForm"
              >
                <div class="row q-gutter-x-sm q-mb-sm">
                  <q-input
                    class="col"
                    outlined
                    v-model="data.salary"
                    label="ចំនួនលុយបើក"
                    type="number"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                  <q-input class="col"
                           outlined
                           v-model="data.pay_date"
                           label="ថ្ងៃបើកលុយ"
                           square
                           lazy-rules
                           mask="date" :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="dateDOB" transition-show="scale" transition-hide="scale">
                          <q-date v-model="data.pay_date" @input="() => $refs.dateDOB.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="row q-gutter-x-sm q-mb-sm">
                  <q-input
                    class="col"
                    outlined
                    v-model="data.description"
                    label="ចំណាំ"
                    type="textarea"
                    square
                    lazy-rules
                    :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  />
                </div>
              </q-form>
            </q-card-section>
            <q-card-section align="right">
              <q-btn outline @click="$refs.addForm.submit()" style="color: #FF0080" label="រក្សាទុក"/>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
    <q-separator color="orange" inset />
    <q-card-section>
      <q-table
        :data="getStaffSalary"
        :columns="columns_salary"
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        hide-bottom
        separator="cell"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td :props="props" key="salary">
              <span class="text-bold text-h6">{{props.rowIndex + 1}}</span>
            </q-td>
            <q-td :props="props" key="salary">
              <span class="text-h6 text-bold">${{props.row.salary.toFixed(2)}}</span>
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
            <q-td :props="props" key="pay_date">
              {{dateFormat(props.row.pay_date)}}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  const columns_salary = [
    {align: 'left', name: 'no', label: 'ល.រ', field: 'no'},
    {align: 'left', name: 'salary', label: 'ប្រាក់ខែ', field: 'salary'},
    {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description'},
    {align: 'left', name: 'pay_date', label: 'ថ្ងៃខែឆ្នាំបើក', field: 'pay_date'},
  ]
  export default {
    name: "StaffSalary",
    data() {
      return {
        expand: false,
        pagination: {
          rowsPerPage: 0
        },
        columns_salary,
        staff: [],
        staff_salary: [],
        data: {
          salary: 0,
          pay_date: null,
          description: '',
          staff: null,
        }
      }
    },
    async created() {
      let self = this;
      let id = self.$route.params.id;
      self.$q.loading.show();
      await self.$store.dispatch('staff/fetchStaffForSalary', id).then(async function (res) {
        self.staff = res.data;
        await self.$store.dispatch('staff/fetchSalaryByStaff', id).then(function () {
          self.$q.loading.hide();
        })
      });
    },
    computed: {
      getStaffSalary() {
        return this.$store.getters['staff/getStaffSalary'];
      },
    },
    methods: {
      onSubmit() {
        let self = this;
        self.data.staff = self.staff._id;
        self.$q.loading.show();
        self.$store.dispatch('staff/storeStaffSalary', self.data).then(async function () {
          await self.$store.dispatch('staff/fetchSalaryByStaff', self.$route.params.id);
          self.data = {
            salary: 0,
            pay_date: null,
            description: '',
            staff: null,
          };
          self.expand = false;
          self.$q.loading.hide();
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
