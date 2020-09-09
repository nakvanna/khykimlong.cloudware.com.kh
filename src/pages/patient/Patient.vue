<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">អ្នកជម្ងឺ</div>
        <q-space/>
        <q-btn size="20px" icon="add_circle_outline" flat round to="/patient/create"/>
      </q-card-section>
      <q-card-section>
        <q-table
          class="table-virtual-scroll"
          :data="getPatients"
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
                      <q-item clickable :to="`/patient/${props.row._id}/history`">
                        <q-item-section side>
                          <q-icon name="fas fa-eye" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          ឆែកប្រវត្តិអ្នកជម្ងឺ
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable @click="showDetail(props.row._id)">
                        <q-item-section side>
                          <q-icon name="fas fa-edit" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          ពិនិត្យអម
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable :to="`/patient/${props.row._id}/edit`">
                        <q-item-section side>
                          <q-icon name="fas fa-edit" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          កែប្រែ
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="keyboard_arrow_right" size="15px"/>
                        </q-item-section>
                      </q-item>
                      <q-separator/>
                      <q-item clickable @click="printPatient(props.row._id)">
                        <q-item-section side>
                          <q-icon name="print" size="15px"/>
                        </q-item-section>
                        <q-item-section>
                          បោះពុម្ភ
                        </q-item-section>
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
                  <q-img :src="props.row.hostname+props.row.photo"/>
                </q-avatar>
              </q-td>
              <q-td key="kh_name" :props="props">
                {{ props.row.kh_name }}
              </q-td>
              <q-td key="lt_name" :props="props">
                {{ props.row.lt_name }}
              </q-td>
              <q-td key="gender" :props="props">
                {{ props.row.gender }}
              </q-td>
              <q-td key="age" :props="props">
                {{ (props.row.age) }}
              </q-td>
              <q-td key="phone" :props="props">
                {{ props.row.phone }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-dialog
      v-model="dialog_show"
      full-width
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">បន្ថែមថ្មី+</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card-section>
            <q-form
              @submit="onSubmit"
              class="q-gutter-md"
              ref="addForm"
            >
              <q-card flat bordered class="my-card bg-grey-1">
                <q-card-section>
                  <div class="row q-gutter-x-sm q-mb-sm">
                    <q-item-label class="col q-my-sm">
                      ពិនិត្យអម
                    </q-item-label>
                  </div>
                  <div class="row q-gutter-x-sm q-mb-sm">
                    <q-input
                      class="col-md-8 col-xs-12"
                      outlined
                      v-model="data_detail.diagnosis"
                      label="រោគវិនិច្ឆ័យ"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                    <q-input class="col-md col-xs-12" label="ថ្ងៃចូលពិនិត្យ" outlined square v-model="data_detail.date"
                             mask="date"
                             :rules="['date']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="data_detail.date" @input="() => $refs.qDateProxy.hide()"/>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="row q-gutter-x-sm q-mb-sm">
                    <q-input
                      class="col-md-3 col-xs-12"
                      outlined
                      v-model="data_detail.ta"
                      label="TA"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                    <q-input
                      class="col-md-3 col-xs-12"
                      outlined
                      v-model="data_detail.t"
                      label="T0"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                    <q-input
                      class="col-md-3 col-xs-12"
                      outlined
                      v-model="data_detail.spo"
                      label="SPO2"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                    <q-input
                      class="col-md col-xs-12"
                      outlined
                      v-model="data_detail.poules"
                      label="Poules"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                  </div>
                  <div class="row q-gutter-x-sm q-mb-sm">
                    <q-input
                      class="col"
                      rows="3"
                      outlined
                      v-model="data_detail.note"
                      label="ចំណាំ"
                      type="textarea"
                      square
                      lazy-rules
                      :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                    />
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn icon="save" style="width: 150px; height: 40px" color="primary" label="រក្សារទុក"
                         @click="$refs.addForm.submit()">
                    <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
                  </q-btn>
                </q-card-actions>

              </q-card>
            </q-form>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {getPatient} from "src/store/patient/getters";

export default {
  name: "Patient",
  data() {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {align: 'left', name: '_id', field: '_id'},
        {align: 'left', name: 'thumbnail', field: 'thumbnail'},
        {align: 'left', name: 'kh_name', label: 'ឈ្មោះខ្មែរ', field: 'kh_name', sortable: true},
        {align: 'left', name: 'lt_name', label: 'ឈ្មោះឡាតាំង', field: 'lt_name', sortable: true},
        {align: 'left', name: 'gender', label: 'ភេទ', field: 'gender', sortable: true},
        {align: 'left', name: 'age', label: 'អាយុ', field: 'age', sortable: true},
        {align: 'left', name: 'phone', label: 'លេខទូរសព្ទ', field: 'phone', sortable: true},
      ],
      dialog_show: false,
      data_detail: {
        diagnosis: null,
        ta: null,
        t: null,
        spo: null,
        poules: null,
        note: null,
        date: null,
        patient: null,
      },
    }
  },
  computed: {
    getPatients() {
      return this.$store.getters['patient/getPatient'];
    }
  },
  methods: {
    printPatient(id) {
      let self = this;
      self.$q.loading.show()
      self.$store.dispatch('report/printPatient', id).then(function (data) {
        if (data.status) {
          setTimeout(function () {
            self.$q.loading.hide()
            window.open(data.data.pdf, '_blank')
          }, 3000);
        }
      })
    },
    showDetail(pid) {
      let self = this;
      self.data_detail.patient = pid;
      self.dialog_show = true;
    },
    async onSubmit() {
      let self = this;
      self.$q.loading.show();
      await self.$store.dispatch('patient/storePatientDetail', self.data_detail).then(function (data_detail) {
        if (data_detail.status) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: data_detail.message
          });
          self.$q.loading.hide();
          self.dialog_show = false;
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: data_detail.message
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
