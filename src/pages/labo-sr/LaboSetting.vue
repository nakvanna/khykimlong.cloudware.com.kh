<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">ការកំណត់</div>
        <q-space/>
        <q-btn icon="add" flat round to="/labo-setting/create"/>
      </q-card-section>

      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getLaboSettings"
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
                <q-btn size="10px" flat round color="grey" dense icon="fas fa-edit"
                       :to="`/labo-setting/${props.row._id}/edit`"/>

              </q-td>
              <q-td key="type" :props="props">
                {{props.row.type}}
              </q-td>
              <q-td key="name" :props="props">
                {{props.row.name}}
              </q-td>
              <q-td key="value" :props="props">
                {{props.row.value}}<sup>{{props.row.superscript}}</sup>{{props.row.unit}}
              </q-td>
              <q-td key="reference" :props="props">
                <span v-if="props.row.type === 'HEMATOLOGY'">
                  (N: {{props.row.min.toFixed(2)}} - {{props.row.max.toFixed(2)}} )
                </span>
                <span v-if="props.row.type === 'LEUCOCYTAIRE'">
                  (N: {{props.row.min.toFixed(2)}} - {{props.row.max.toFixed(2)}} )
                </span>
                <span v-if="props.row.type === 'BIOCHIMIE'">
                  <span v-if="props.row.min === null">(<{{props.row.max.toFixed(2)}} )</span>
                  <span v-else>(N: {{props.row.min.toFixed(2)}} - {{props.row.max.toFixed(2)}} )</span>
                </span>
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
    name: "LaboSetting",
    data() {
      return {
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type', sortable: true},
          {align: 'left', name: 'name', label: 'ឈ្មោះ', field: 'name', sortable: true},
          {align: 'left', name: 'value', label: 'ឯកតា', field: 'value', sortable: true},
          {align: 'left', name: 'reference', label: 'តម្លៃ', field: 'reference', sortable: true},
        ],
      }
    },
    computed: {
      getLaboSettings() {
        return this.$store.getters['labo_setting/getLaboSetting']
      }
    },
    created() {
      let self = this;
      self.$store.dispatch('labo_setting/fetchLaboSetting')
    }
  }
</script>

<style scoped>

</style>
