<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">ទំនិញ</div>
        <q-space/>
        <q-btn size="20px" icon="add_circle_outline" flat round to="/product/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getProducts"
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
                      <q-item clickable :to="`/product/${props.row._id}/edit`">
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
              <q-td key="photo" :props="props">
                <q-avatar size="100px" class="shadow-1">
                  <q-img :src="props.row.hostname+props.row.photo"/>
                </q-avatar>
              </q-td>
              <q-td key="name" :props="props" class="q-gutter-x-xs">
                {{ props.row.name }}
              </q-td>
              <q-td key="type" :props="props" class="q-gutter-x-xs">
                {{ props.row.type }}
              </q-td>
              <q-td key="unit" :props="props" class="q-gutter-x-xs">
                {{ props.row.unit }}
              </q-td>
              <q-td key="buy_price" :props="props" class="q-gutter-x-xs">
                {{ props.row.buy_price }}
              </q-td>
              <q-td key="sale_price" :props="props" class="q-gutter-x-xs">
                {{ props.row.sale_price }}
              </q-td>
              <q-td key="invent_type" :props="props" class="q-gutter-x-xs">
                {{ props.row.invent_type }}
              </q-td>
              <q-td key="description" :props="props" class="q-gutter-x-xs">
                {{ props.row.description }}
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
  name: "Product",
  data() {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'photo', field: 'photo'},
        {align: 'left', name: 'name', label: 'ឈ្មោះ', field: 'name', sortable: true},
        {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type', sortable: true},
        {align: 'left', name: 'unit', label: 'ឯកតា', field: 'unit', sortable: true},
        {align: 'left', name: 'buy_price', label: 'ទិញចូល', field: 'buy_price', sortable: true},
        {align: 'left', name: 'sale_price', label: 'លក់ចេញ', field: 'sale_price', sortable: true},
        {align: 'left', name: 'invent_type', label: 'ស្ដុក', field: 'invent_type', sortable: true},
        {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description', sortable: true},
      ],
    }
  },
  computed: {
    getProducts() {
      return this.$store.getters['product/getProducts']
    }
  }
}
</script>

<style scoped>

</style>
