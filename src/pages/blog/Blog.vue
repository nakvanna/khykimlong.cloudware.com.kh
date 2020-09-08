<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">ប្លុក</div>
        <q-space/>
        <q-btn icon="add" flat round to="/blog/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getBlogs"
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
                <q-btn size="10px" flat round color="grey" dense icon="fas fa-eye"
                       :to="`/blog/${props.row._id}/edit`"/>
                <q-btn flat icon="more_vert" dense color="grey" size="12px">
                  <q-menu>
                    <q-list dense style="min-width: 100px">
                      <q-item clickable @click="printStaffCV(props.row._id)">
                        <q-item-section>CV</q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable @click="printStaffCertifyAdmin(props.row._id)">
                        <q-item-section>Certify Administration</q-item-section>
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
                  <q-img :src="props.row.hostname+props.row.thumbnail"/>
                </q-avatar>
              </q-td>
              <q-td key="title" :props="props">
                {{props.row.title}}
              </q-td>
              <q-td key="category" :props="props">
                {{props.row.category}}
              </q-td>
              <q-td key="tags" :props="props">
                {{props.row.tags}}
              </q-td>
              <q-td key="auth" :props="props">
                {{props.row.auth}}
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
    name: 'BlogIndex',
    data() {
      return {
        data: {
          content: 'Hi'
        },
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
        columns: [
          {align: 'left', name: '_id', field: '_id'},
          {align: 'left', name: 'thumbnail', field: 'thumbnail'},
          {align: 'left', name: 'title', label: 'Title', field: 'title', sortable: true},
          {align: 'left', name: 'category', label: 'Category', field: 'category'},
          {align: 'left', name: 'tags', label: 'Tags', field: 'tags'},
          {align: 'left', name: 'auth', label: 'Author', field: 'auth'},
          {align: 'left', name: 'createdAt', label: 'Date', field: 'createdAt'},
        ],
      }
    },
    computed: {
      getBlogs() {
        return this.$store.getters['blog/getBlog']
      }
    },
    async created() {
      let self = this;
      let route_meta = self.$router.currentRoute.meta;
      await self.$store.dispatch('active_route/updateCurrentRoute', route_meta)
    }
  }
</script>
