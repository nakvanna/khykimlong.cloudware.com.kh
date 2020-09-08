<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">ពិនិត្រឡាបូ</div>
        <q-space/>
        <q-btn size="20px" icon="add_circle_outline" flat round to="/labo/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getLabos"
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
                      <q-item clickable :to="`/labo/${props.row._id}/edit`">
                        <q-item-section side>
                          <q-icon name="edit" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          Edit
                        </q-item-section >
                        <q-item-section side>
                          <q-icon  name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable @click="printLabo(props.row._id)">
                        <q-item-section side>
                          <q-icon name="print" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          Print
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
                          Download
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
                {{props.row.patient.kh_name}}
              </q-td>
              <q-td key="title" :props="props">
                {{props.row.title}}
              </q-td>
              <q-td key="heat" :props="props">
                {{props.row.heat}}
              </q-td>
              <q-td key="blood_pressure" :props="props">
                {{props.row.blood_pressure}}
              </q-td>
              <q-td key="pulse" :props="props">
                {{props.row.pulse}}
              </q-td>
              <q-td key="spo" :props="props">
                {{props.row.spo}}
              </q-td>
              <q-td key="doctor" :props="props">
                {{props.row.doctor}}
              </q-td>
              <q-td key="createdAt" :props="props">
                {{dateFormat(props.row.createdAt)}}
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
    name: "Labo",
    data() {
      return {
        // hostname: 'https://api.visai.cloudware.com.kh/',
        hostname: 'http://localhost:3000/',
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'photo', field: 'photo'},
          {align: 'left', name: 'kh_name', label: 'អ្នកជម្ងឺ', field: 'kh_name', sortable: true},
          {align: 'left', name: 'title', label: 'ចំណងជើង', field: 'title', sortable: true},
          {align: 'left', name: 'heat', label: 'កម្ដៅខ្លួន', field: 'heat', sortable: true},
          {align: 'left', name: 'blood_pressure', label: 'សម្ពាធឈាម', field: 'blood_spressure', sortable: true},
          {align: 'left', name: 'pulse', label: 'ជីពចរ', field: 'pulse', sortable: true},
          {align: 'left', name: 'spo', label: 'SPO', field: 'spo', sortable: true},
          {align: 'left', name: 'doctor', label: 'ពិនិត្យដោយ', field: 'doctor', sortable: true},
          {align: 'left', name: 'createdAt', label: 'កាលបរិច្ឆេទ', field: 'createdAt'},
        ],
      }
    },
    computed: {
      getLabos() {
        return this.$store.getters['labo/getLabos'];
      },
    },
    methods: {
      printLabo(id) {
        let self = this;
        self.$q.loading.show()
        self.$store.dispatch('report/printLabo', id).then(function (data) {
          if (data.status) {
            setTimeout(function () {
              self.$q.loading.hide()
              window.open(data.data.pdf, '_blank')
            }, 2000);
          }
        })
      },
      async downloadLabo(id){
        let self = this;
        self.$q.loading.show()
        await self.$store.dispatch('report/downloadLabo', id).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Successfully downloaded DOCX\'s file!'
            });
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Error download DOCX\'s file!'
            })
          }
          self.$q.loading.hide()
        })
      },
      dateFormat(val) {
        return date.formatDate(val, 'DD/MM/YYYY')
      }
    }
  }
</script>

<style scoped>

</style>
