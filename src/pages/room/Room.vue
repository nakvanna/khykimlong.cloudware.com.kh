<template>
  <q-page padding>
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h5 text-bold">បន្ទប់</div>
      <q-space/>
      <q-btn size="20px" icon="add_circle_outline" flat round to="/room/create"/>
    </q-card-section>
    <q-card>
      <q-card-section>
          <q-table
            grid
            card-class="bg-primary text-white"
            :data="getRooms"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <q-card>
                  <q-card-section class="text-center">
                    បន្ទប់
                    <br>
                    <strong>{{ props.row.name }}</strong>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="flex flex-center">
                    <div v-if="props.row.status" class="text-negative">បន្ទប់មិនទំនេរ</div>
                    <div v-else  class="text-primary">បន្ទប់ទំនេរ</div>
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    name: "Room",
    data() {
      return {
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns: [
          { name: '_id', align: 'center', label: 'ល.រ', field: '_id', sortable: true },
          { name: 'name', label: 'បន្ទប់', field: 'name', sortable: true },
          { name: 'status', label: 'ស្ថានភាព', field: 'status' }
        ],
        // columns: [
        //   {align: 'left', name: '_id', field: '_id'},
        //   {align: 'left', name: 'name', label: 'បន្ទប់', field: 'name', sortable: true},
        //   {align: 'left', name: 'status', label: 'ស្ថានភាព', field: 'status', sortable: true},
        // ],
      }
    },
    computed: {
      getRooms() {
        return this.$store.getters['room/getRooms']
      }
    }
  }
</script>

<style scoped>

</style>
