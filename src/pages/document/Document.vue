<template>
  <q-page>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">ការណែនាំ</div>
        <q-space/>
        <q-btn icon="add" flat round to="/blog/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getDocument"
          :columns="columns"
          row-key="name"
          :filter="filter"
          virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          :virtual-scroll-sticky-size-start="48"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="_id" :props="props" class="q-gutter-x-xs">
                <q-btn size="10px" flat round color="grey" dense icon="fas fa-eye"
                       :to="`/documents/${props.row._id}/edit`"/>
              </q-td>
              <q-td key="title" :props="props">
                {{props.row.title}}
              </q-td>
              <q-td key="auth" :props="props">
                {{props.row.auth}}
              </q-td>
              <q-td key="isPublished" :props="props">
                {{props.row.isPublished}}
              </q-td>
              <q-td key="createdAt" :props="props">
                {{props.row.createdAt}}
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
    name: "Document",
    data(){
      return {
        getDocument: [],
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'title', label: 'Title', field: 'title', sortable: true},
          {align: 'left', name: 'auth', label: 'Author', field: 'auth'},
          {align: 'left', name: 'isPublished', label: 'Published', field: 'isPublished'},
          {align: 'left', name: 'createdAt', label: 'Date', field: 'createdAt'},
        ],
      }
    },
    async created(){
      let self = this;
      await self.$store.dispatch('document/fetchDocument').then(function(res){
        self.getDocument = res.data;
      })
    }
  }
</script>

<style scoped>

</style>
