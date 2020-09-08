<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">សម្រាកព្យាបាល</div>
        <q-space/>
        <q-btn size="20px" icon="add_circle_outline" flat round to="/examine/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getExamines"
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
            <q-tr :props="props" class="cursor-pointer" @click="$router.push({path: `/examination/${props.row._id}`})">
              <q-td key="_id" :props="props" class="q-gutter-x-xs">
                <q-btn @click.stop flat icon="more_vert" dense color="grey" size="12px">
                  <q-menu>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable :to="`/examination/${props.row._id}`">
                        <q-item-section side>
                          <q-icon name="add" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          បន្ថែមថ្នាំព្យាបាល
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable :to="`/examine/${props.row._id}/edit`">
                        <q-item-section side>
                          <q-icon name="fas fa-edit" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          បង្ហាញពត៍មាន & កែប្រែ
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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {date} from "quasar";

export default {
  name: "Examine",
  data() {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'kh_name', label: 'អ្នកជំងឺ', field: 'kh_name', sortable: true},
        {align: 'left', name: 'room', label: 'ស្នាក់នៅ', field: 'room', sortable: true},
        {align: 'left', name: 'is_stay', label: 'ស្ថានភាព', field: 'is_stay', sortable: true},
        {align: 'left', name: 'reason', label: 'មូលហេតុសម្រាក', field: 'reason', sortable: true},
        {align: 'left', name: 'exa_date', label: 'ថ្ងៃចូលសម្រាក', field: 'exa_date', sortable: true},
      ],
    }
  },
  computed: {
    getExamines() {
      return this.$store.getters['examine/getExamines'].map((x) => {
        return {
          ...x,
          room: x.room.name,
        }
      })
    }
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
