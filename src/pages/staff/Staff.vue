<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">បុគ្គលិក</div>
        <q-space/>
        <q-btn size="20px" icon="add_circle_outline" flat round to="/staff/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getStaffs"
          :columns="columns"
          row-key="name"
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
              <q-td key="_id" :props="props" class="q-gutter-x-xs">
                <q-btn flat icon="more_vert" dense color="grey" size="12px">
                  <q-menu>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable :to="`/staff/${props.row._id}/edit`">
                        <q-item-section side>
                          <q-icon name="edit" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          បង្ហាញ & កែប្រែ
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable :to="`/staff/${props.row._id}/salary`">
                        <q-item-section side>
                          <q-icon name="payment" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          បើកប្រាក់ខែបុគ្គលិក
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable disable @click="printStaffCV(props.row._id)">
                        <q-item-section side>
                          <q-icon name="print" size="15px"/>
                        </q-item-section>
                        <q-item-section>CV</q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-td>
              <q-td key="thumbnail" :props="props">
                <q-avatar size="100px" class="shadow-1">
                  <q-img :src="props.row.hostname+props.row.photo"/>
                </q-avatar>
              </q-td>
              <q-td key="full_name" :props="props">
                {{ props.row.full_name }}
              </q-td>
              <q-td key="full_latin" :props="props">
                {{ props.row.full_latin }}
              </q-td>
              <q-td key="gender" :props="props">
                {{ props.row.gender }}
              </q-td>
              <q-td key="dob" :props="props">
                {{ props.row.dob }}
              </q-td>
              <q-td key="national_id" :props="props">
                {{ props.row.national_id }}
              </q-td>
              <q-td key="banking" :props="props">
                {{ props.row.banking }}
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>
              <q-td key="tel" :props="props">
                {{ props.row.tel }}
              </q-td>
              <q-td key="telegram" :props="props">
                {{ props.row.telegram }}
              </q-td>
              <q-td key="facebook" :props="props">
                {{ props.row.facebook }}
              </q-td>
              <q-td key="createdAt" :props="props">
                {{ dateFormat(props.row.createdAt) }}
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
  name: "Staff",
  data() {
    return {
      panel: 'staff',
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'thumbnail', field: 'thumbnail'},
        {align: 'left', name: 'full_name', label: 'ឈ្មោះខ្មែរ', field: 'full_name', sortable: true},
        {align: 'left', name: 'full_latin', label: 'ឈ្មោះឡាតាំង', field: 'full_latin', sortable: true},
        {align: 'left', name: 'gender', label: 'ភេទ', field: 'gender', sortable: true},
        {align: 'left', name: 'dob', label: 'ថ្ងៃខែឆ្នាំកំណើត', field: 'dob', sortable: true},
        {align: 'left', name: 'national_id', label: 'អត្តសញ្ញាណប័ណ្ឌ', field: 'national_id', sortable: true},
        {align: 'left', name: 'banking', label: 'គុងធនាគារ', field: 'banking', sortable: true},
        {align: 'left', name: 'email', label: 'អ៊ី-ម៉ែល', field: 'email', sortable: true},
        {align: 'left', name: 'tel', label: 'ទូរសព្ទ', field: 'tel', sortable: true},
        {align: 'left', name: 'telegram', label: 'Telegram', field: 'telegram', sortable: true},
        {align: 'left', name: 'facebook', label: 'Facebook', field: 'facebook', sortable: true},
        {align: 'left', name: 'createdAt', label: 'កាលបរិច្ឆេទ', field: 'createdAt'},
      ],
    }
  },
  computed: {
    getStaffs() {
      return this.$store.getters['staff/getStaff'].map(function (x) {
        return {
          ...x,
          full_name: `${x.lname} ${x.fname}`,
          full_latin: `${x.llatin} ${x.flatin}`,
          banking: `${x.bank_name}: ${x.bank_account_no}`,
        }
      })
    }
  },
  async created() {
    let self = this;
    console.log(self.getStaffs);
    let route_meta = self.$router.currentRoute.meta;
    await self.$store.dispatch('active_route/updateCurrentRoute', route_meta)
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
