<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">ពិនិត្រអេកូ</div>
        <q-space/>
        <q-btn-group>
          <q-btn to="/echo/baby/create" push label="obstétrique" icon="pregnant_woman"/>
          <q-btn disable push label="abdomino-pelvienne" icon="airline_seat_flat"/>
          <q-btn disable push label="X-Ray" icon="personal_video"/>
        </q-btn-group>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getEchoBabies"
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
                      <q-item clickable disable :to="`/echo/${props.row._id}/edit`">
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
                      <q-item clickable @click="printEchoBaby(props.row._id)">
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
                      <q-item clickable @click="downloadEchoBaby(props.row._id)">
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
                {{ props.row.patient.kh_name }}
              </q-td>
              <q-td key="title" :props="props">
                {{ props.row.title }}
              </q-td>
              <q-td key="doctor" :props="props">
                {{ props.row.doctor }}
              </q-td>
              <q-td key="createdAt" :props="props">
                {{ props.row.createdAt }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Echo",
  data() {
    return {
      hostname: 'https://api.khykimlong.cloudware.com.kh/',
      // hostname: 'http://localhost:3000/',
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'photo', field: 'photo'},
        {align: 'left', name: 'kh_name', label: 'អ្នកជម្ងឺ', field: 'kh_name', sortable: true},
        {align: 'left', name: 'title', label: 'ចំណងជើង', field: 'title', sortable: true},
        {align: 'left', name: 'doctor', label: 'ពិនិត្យដោយ', field: 'doctor', sortable: true},
        {align: 'left', name: 'createdAt', label: 'កាលបរិច្ឆេទ', field: 'createdAt'},
      ],
    }
  },
  computed: {
    getEchoBabies() {
      return this.$store.getters['echo/getEchoBabies'].map((d) => {
        return {
          ...d,
          title: 'Obstétrique'
        }
      });
    },
  },
  methods: {
    async printEchoBaby(id) {
      let self = this;
      self.$q.loading.show()
      await self.$store.dispatch('report/printEchoBaby', id).then(function (data) {
        if (data.status) {
          setTimeout(function () {
            self.$q.loading.hide()
            window.open(data.data.pdf, '_blank')
          }, 1500);
        }
      })
    },
    async downloadEchoBaby(id) {
      let self = this;
      self.$q.loading.show()
      await self.$store.dispatch('report/downloadEchoBabyDocx', id).then(function (data) {
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
  }
}
</script>

<style scoped>

</style>
