<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-option-group
          v-model="panel"
          inline
          :options="[
          { label: 'ពិនិត្យអម', value: 'reg_check' },
          { label: 'ការលក់', value: 'sales' },
          { label: 'ពិនិត្យអេកូ', value: 'echo' },
          { label: 'ពិនិត្យឡាបូ', value: 'labo' },
          { label: 'សម្រាកព្យាបាល', value: 'stay' },
        ]"
        />

        <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
          <q-tab-panel name="reg_check">
            <div class="text-h6">ពិនិត្យអម</div>
            <q-table
              class="table-virtual-scroll-stock"
              :data="data_reg_check"
              :columns="columns_reg_check"
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
                  <q-td key="_id" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold text-uppercase">{{ props.rowIndex + 1 }}</span>
                  </q-td>
                  <q-td key="note" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold text-uppercase">{{ props.row.note }}</span>
                  </q-td>
                  <q-td key="diagnosis" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold">{{ props.row.diagnosis }}</span>
                  </q-td>
                  <q-td key="ta" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold">{{ props.row.ta }}</span>
                  </q-td>
                  <q-td key="t" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold">{{ props.row.t }}</span>
                  </q-td>
                  <q-td key="spo" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold">{{ props.row.spo }}</span>
                  </q-td>
                  <q-td key="poules" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold">{{ props.row.poules }}</span>
                  </q-td>
                  <q-td key="date" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold">{{ dateFormat(props.row.date) }}</span>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="sales">
            <div class="text-h6">ប្រវត្តិនៃការលក់</div>
            <q-table
              class="table-virtual-scroll-stock"
              :data="getSalesReceive"
              :columns="columns_receive"
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
                <q-tr :props="props" class="cursor-pointer"
                      @click="$router.push({path: `/sale/${props.row._id}/view`})">
                  <q-td key="no" :props="props" class="q-gutter-x-xs">
                    <span>{{ props.rowIndex + 1 }}</span>
                  </q-td>
                  <q-td key="patient_name" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold text-uppercase">{{ props.row.patient.kh_name }}</span>
                  </q-td>
                  <q-td key="amount" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold text-primary">${{ props.row.amount }}</span>
                  </q-td>
                  <q-td key="paid_amount" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold text-warning">${{ props.row.paid_amount }}</span>
                  </q-td>
                  <q-td key="due_amount" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold text-negative">${{ props.row.due_amount }}</span>
                  </q-td>
                  <q-td key="sale_date" :props="props" class="q-gutter-x-xs">
                    <span class="text-bold">{{ dateFormat(props.row.sale_date) }}</span>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="echo">
            <div class="text-h6">ពិនិត្យអេកូ</div>
            <q-table
              class="table-virtual-scroll"
              :data="getEchoNote"
              :columns="columns_echo"
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
                          <q-item clickable :to="`/echo-note/${props.row._id}/edit`">
                            <q-item-section side>
                              <q-icon name="edit" size="15px"/>
                            </q-item-section>
                            <q-item-section>
                              Edit
                            </q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_right" size="15px"/>
                            </q-item-section>
                          </q-item>
                          <q-separator/>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-td>
                  <q-td key="photo" :props="props">
                    <q-avatar size="100px" class="shadow-1">
                      <q-img :src="hostname+props.row.patient.photo"/>
                    </q-avatar>
                  </q-td>
                  <q-td key="kh_name" :props="props">
                    {{ props.row.patient.kh_name }}
                  </q-td>
                  <q-td key="title" :props="props">
                    {{ props.row.title }}
                  </q-td>
                  <q-td key="doctor" :props="props">
                    {{ props.row.doctor }}
                  </q-td>
                  <q-td key="createdAt" :props="props">
                    {{ dateFormat(props.row.check_date) }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="labo">
            <div class="text-h6">ពិនិត្យឡាបូ</div>
            <q-table
              class="table-virtual-scroll"
              :data="getLabos"
              :columns="columns_labo"
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
                          <q-item clickable @click="cashierLabo(props.row.patient._id)">
                            <q-item-section side>
                              <q-icon name="money" size="15px"/>
                            </q-item-section>
                            <q-item-section>
                              គិតលុយ
                            </q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_right" size="15px"/>
                            </q-item-section>
                          </q-item>
                          <q-item clickable :to="`/labo/${props.row._id}/edit`">
                            <q-item-section side>
                              <q-icon name="fas fa-edit" size="15px"/>
                            </q-item-section>
                            <q-item-section>
                              បង្ហាញ & កែប្រែ
                            </q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_right" size="15px"/>
                            </q-item-section>
                          </q-item>
                          <q-separator/>
                          <q-item clickable @click="printLabo(props.row._id)">
                            <q-item-section side>
                              <q-icon name="print" size="15px"/>
                            </q-item-section>
                            <q-item-section>
                              បោះពុម្ព
                            </q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_right" size="15px"/>
                            </q-item-section>
                          </q-item>
                          <q-separator/>
                          <q-item clickable @click="downloadLabo(props.row._id)">
                            <q-item-section side>
                              <q-icon name="print" size="15px"/>
                            </q-item-section>
                            <q-item-section>
                              ទាញយកជា file docx
                            </q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_right" size="15px"/>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-td>
                  <q-td key="photo" :props="props">
                    <q-avatar size="100px" class="shadow-1">
                      <q-img :src="hostname+props.row.patient.photo"/>
                    </q-avatar>
                  </q-td>
                  <q-td key="kh_name" :props="props">
                    {{ props.row.patient.kh_name }}
                  </q-td>
                  <q-td key="title" :props="props">
                    {{ props.row.title }}
                  </q-td>
                  <q-td key="doctor" :props="props">
                    {{ props.row.doctor }}
                  </q-td>
                  <q-td key="pay_status" :props="props">
                    <span v-if="props.row.pay_status">បានគិតលុយ</span>
                    <span v-else>មិនទាន់គិតលុយ</span>
                  </q-td>
                  <q-td key="createdAt" :props="props">
                    {{ dateFormat(props.row.createdAt) }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="stay">
            <div class="text-h6">ប្រវត្តិនៃការសម្រាកព្យាបាល</div>
            <q-table
              class="table-virtual-scroll"
              :data="getExamines"
              :columns="columns_stay"
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
                          <q-item clickable :to="`/examination/${props.row._id}`">
                            <q-item-section side>
                              <q-icon name="edit" size="15px"/>
                            </q-item-section>
                            <q-item-section>
                              បន្ថែមថ្នាំព្យាបាល
                            </q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_right" size="15px"/>
                            </q-item-section>
                          </q-item>
                          <q-separator/>
                          <q-item clickable disable :to="`/labo/${props.row._id}/edit`">
                            <q-item-section side>
                              <q-icon name="edit" size="15px"/>
                            </q-item-section>
                            <q-item-section>
                              Edit
                            </q-item-section>
                            <q-item-section side>
                              <q-icon name="keyboard_arrow_right" size="15px"/>
                            </q-item-section>
                          </q-item>
                          <q-separator/>
                          <q-item clickable disable @click="printLabo(props.row._id)">
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
                  <q-td key="kh_name" :props="props" class="q-gutter-x-xs">
                    {{ props.row.patient.kh_name }}
                  </q-td>
                  <q-td key="room" :props="props" class="q-gutter-x-xs">
                    {{ props.row.room }}
                  </q-td>
                  <q-td key="is_stay" :props="props" class="q-gutter-x-xs">
                    <span v-if="props.row.is_stay"> កំពុងស្នាក់នៅ</span>
                    <span v-else> ចេញហើយ</span>
                  </q-td>
                  <q-td key="reason" :props="props" class="q-gutter-x-xs">
                    {{ props.row.reason }}
                  </q-td>
                  <q-td key="exa_date" :props="props" class="q-gutter-x-xs">
                    {{ dateFormat(props.row.exa_date) }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import {date} from "quasar";

export default {
  name: "PatientHistory",
  data() {
    return {
      panel: 'reg_check',
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      // hostname: 'https://api.visai.cloudware.com.kh/',
      hostname: 'http://localhost:3000/',
      columns_receive: [
        // {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'no', label: 'ល.រ', field: 'no', sortable: true},
        {align: 'left', name: 'patient_name', label: 'អ្នកជម្ងឺ', field: 'patient_name', sortable: true},
        {align: 'left', name: 'amount', label: 'សរុប', field: 'amount', sortable: true},
        {align: 'left', name: 'paid_amount', label: 'ថ្លៃចំណាយ', field: 'paid_amount', sortable: true},
        {align: 'left', name: 'due_amount', label: 'ថ្លៃជំពាក់', field: 'due_amount', sortable: true},
        {align: 'left', name: 'sale_date', label: 'ថ្ងៃលក់ចេញ', field: 'sale_date', sortable: true},
      ],
      columns_stay: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'kh_name', label: 'អ្នកជំងឺ', field: 'kh_name', sortable: true},
        {align: 'left', name: 'room', label: 'ស្នាក់នៅ', field: 'room', sortable: true},
        {align: 'left', name: 'is_stay', label: 'ស្ថានភាព', field: 'is_stay', sortable: true},
        {align: 'left', name: 'reason', label: 'មូលហេតុសម្រាក', field: 'reason', sortable: true},
        {align: 'left', name: 'exa_date', label: 'ថ្ងៃចូលសម្រាក', field: 'exa_date', sortable: true},
      ],
      columns_echo: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'photo', field: 'photo'},
        {align: 'left', name: 'kh_name', label: 'អ្នកជម្ងឺ', field: 'kh_name', sortable: true},
        {align: 'left', name: 'title', label: 'ចំណងជើង', field: 'title', sortable: true},
        {align: 'left', name: 'doctor', label: 'ពិនិត្យដោយ', field: 'doctor', sortable: true},
        {align: 'left', name: 'createdAt', label: 'កាលបរិច្ឆេទ', field: 'createdAt'},
      ],
      columns_labo: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'photo', field: 'photo'},
        {align: 'left', name: 'kh_name', label: 'អ្នកជម្ងឺ', field: 'kh_name', sortable: true},
        {align: 'left', name: 'title', label: 'ចំណងជើង', field: 'title', sortable: true},
        {align: 'left', name: 'doctor', label: 'ពិនិត្យដោយ', field: 'doctor', sortable: true},
        {align: 'left', name: 'pay_status', label: 'គិតលុយ', field: 'pay_status', sortable: true},
        {align: 'left', name: 'createdAt', label: 'កាលបរិច្ឆេទ', field: 'createdAt'},
      ],
      columns_reg_check: [
        {align: 'left', name: '_id', label: 'ល.រ', field: '_id'},
        {align: 'left', name: 'note', label: 'ចំណាំ', field: 'note'},
        {align: 'left', name: 'diagnosis', label: 'រោគវិនិច្ឆ័យ', field: 'diagnosis'},
        {align: 'left', name: 'ta', label: 'TA', field: 'ta'},
        {align: 'left', name: 't', label: 'T0', field: 't'},
        {align: 'left', name: 'spo', label: 'Spo2', field: 'spo'},
        {align: 'left', name: 'poules', label: 'Poules', field: 'poules'},
        {align: 'left', name: 'date', label: 'ថ្ងៃទី', field: 'date'},
      ],
      data_reg_check: [],
    }
  },
  computed: {
    getLabos() {
      let self = this;
      return this.$store.getters['labo/getLabos'].filter((f) => {
        return f.patient._id === self.$route.params.id;
      });
    },
    getEchoNote() {
      let self = this;
      return this.$store.getters['echo_note/getEchoNotes'].filter((f) => {
        return f.patient._id === self.$route.params.id;
      });
    },
    getSalesReceive() {
      let self = this;
      return self.$store.getters['sale/getSales'].filter((f) => {
        return f.sale_status === 'Receive' && f.patient._id === self.$route.params.id
      })
    },
    getExamines() {
      let self = this;
      let examine = self.$store.getters['examine/getExamines'].map((x) => {
        return {
          ...x,
          room: x.room.name,
        }
      });
      return examine.filter(function (f) {
        return f.patient._id === self.$route.params.id;
      });
    }
  },
  created() {
    let self = this;
    self.$store.dispatch('patient/fetchPatientDetail', self.$route.params.id).then(function (res) {
      self.data_reg_check = [];
      self.data_reg_check = res.data;
    });
  },
  methods: {
    dateFormat(val) {
      return date.formatDate(val, 'DD/MM/YYYY');
    }
  }
}
</script>

<style scoped>

</style>
