<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <q-table
          grid
          card-class="bg-primary text-white"
          :data="getUsers"
          :columns="columns"
          row-key="name"
          :filter="filter"
          hide-header
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </template>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card class="cursor-pointer" @click="toUpdate(props.row._id)">
                <q-card-section class="text-center">
                  ឈ្មោះ
                  <br>
                  <strong>{{ props.row.name }}</strong>
                  <br>
                  <strong>{{ props.row.email }}</strong>
                </q-card-section>
                <q-separator/>
                <q-card-section class="flex flex-center">
                  <div class="text-primary">
                    <span v-if="props.row.user_type === 0">Admin</span>
                    <span v-else>Normal User</span>
                  </div>
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
  name: "UserManager",
  data() {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {name: '_id', align: 'center', label: 'ល.រ', field: '_id', sortable: true},
        {name: 'name', label: 'ឈ្មោះ', field: 'name', sortable: true},
        {name: 'email', label: 'Username', field: 'email', sortable: true},
        {name: 'user_type', label: 'ប្រភេទ', field: 'user_type', sortable: true}
      ],
      getUsers: []
    }
  },
  created() {
    let self = this;
    this.$store.dispatch('auth/fetchUsers').then(function (res) {
      self.getUsers = res.data;
    })
  },
  methods: {
    toUpdate(id) {
      this.$router.push(`/user/${id}/update`);
    }
  }
}
</script>

<style scoped>

</style>
