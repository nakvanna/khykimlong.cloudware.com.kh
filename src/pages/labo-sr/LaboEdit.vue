<template>
  <q-page>
    <q-card>
      <q-card-actions align="left">
        <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
          <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
        </q-btn>
      </q-card-actions>
      <q-card-section>
        <q-table
          separator="cell"
          title="ព័ត៌មានពិនិត្យ"
          :data="labo_data"
          :columns="columns_labo"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="title" :props="props">
                <span class="text-h5">{{ props.row.title }}</span>
                <q-popup-edit v-model="props.row.title">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.title" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLabo({id:data1._id,data:{title:props.row.title}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="doctor" :props="props">
                <span class="text-h5">{{ props.row.doctor }}</span>
                <q-popup-edit v-model="props.row.doctor">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select @keyup.enter.stop
                              outlined
                              v-model="props.row.doctor"
                              label="គ្រូពេទ្យ"
                              :options="getDoctors"
                              square>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLabo({id:data1._id,data:{doctor:props.row.doctor}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-table
          separator="cell"
          title="ព័ត៌មានពិនិត្យ"
          :data="labo_detail_data"
          :columns="columns_labo_detail"
          :rows-per-page-options="[0]"
          :pagination.sync="pagination"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="type" :props="props">
                <span class="text-h6">{{ props.row.type }}</span>
              </q-td>
              <q-td key="name" :props="props">
                <span class="text-h6">{{ props.row.name }}</span>
              </q-td>
              <q-td key="result" :props="props">
                <span
                  class="text-h6"
                  v-if="props.row.type === 'HEMATOLOGY'"
                  :class="props.row.result >= props.row.min && props.row.result <= props.row.max ? 'text-green':'text-red'">
                  {{ props.row.result }}
                </span>
                <span
                  class="text-h6"
                  v-if="props.row.type === 'LEUCOCYTAIRE'"
                  :class="props.row.result >= props.row.min && props.row.result <= props.row.max ? 'text-green':'text-red'">
                  {{ props.row.result }}
                </span>
                <span>
                  <span
                    class="text-h6"
                    v-if="props.row.type === 'BIOCHIMIE' && props.row.min !== null"
                    :class="props.row.result >= props.row.min && props.row.result <= props.row.max ? 'text-green':'text-red'">
                  {{ props.row.result }}
                  </span>
                  <span
                    class="text-h6"
                    v-if="props.row.type === 'BIOCHIMIE' && props.row.min === null"
                    :class="props.row.result <= props.row.max ? 'text-green':'text-red'">
                  {{ props.row.result }}
                  </span>
                </span>
                <span
                  class="text-h6"
                  v-if="props.row.type === 'SÉROLOGIE'"
                  :class="props.row.result === 'Negative' ? 'text-green':'text-red'">
                  {{ props.row.result }}
                </span>
                <q-popup-edit v-model="props.row.result">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      v-show="props.row.type === 'SÉROLOGIE'"
                      use-input
                      outlined
                      v-model="props.row.result"
                      label="ជ្រើសរើស អាស័យដ្ឋាន"
                      :options="['Negative', 'Positive']"
                      square>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboDetail({id:props.row._id,data:{result:props.row.result}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                    <q-input v-show="props.row.type !== 'SÉROLOGIE'" @keyup.enter.stop v-model="props.row.result" dense
                             autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboDetail({id:props.row._id,data:{result:props.row.result}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>

              <q-td key="unit" :props="props">
                <span class="text-h6">{{ props.row.value }} <sup> {{ props.row.superscript }} </sup> {{
                    props.row.unit
                  }}</span>
              </q-td>
              <q-td key="reference" :props="props">
                <span class="text-h6" v-if="props.row.type === 'HEMATOLOGY'">
                  ( N: {{ props.row.min }} - {{ props.row.max }} )
                </span>
                <span class="text-h6" v-if="props.row.type === 'LEUCOCYTAIRE'">
                  ( N: {{ props.row.min }} - {{ props.row.max }} )
                </span>
                <span>
                  <span class="text-h6" v-if="props.row.type === 'BIOCHIMIE' && props.row.min !== null">
                  ( N: {{ props.row.min }} - {{ props.row.max }} )
                </span>
                  <span class="text-h6" v-if="props.row.type === 'BIOCHIMIE' && props.row.min === null">
                  ( < {{ props.row.max }} )
                </span>
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
const columns_labo = [
  {align: 'left', name: 'title', label: 'ចំណងជើង', field: 'title'},
  {align: 'left', name: 'doctor', label: 'ពិនិត្យដោយ', field: 'doctor'},
];
const columns_labo_detail = [
  {align: 'left', name: 'type', label: 'TYPE', field: 'type'},
  {align: 'left', name: 'name', label: 'PARAMETER', field: 'name'},
  {align: 'left', name: 'result', label: 'RESULT', field: 'result'},
  {align: 'left', name: 'unit', label: 'UNIT', field: 'unit'},
  {align: 'left', name: 'reference', label: 'REFERENCE', field: 'reference'},
];
export default {
  name: "LaboEdit",
  data() {
    return {
      pagination: {
        rowsPerPage: 0
      },
      columns_labo,
      columns_labo_detail,
      labo_data: [],
      labo_detail_data: [],
      data1: {
        _id: '',
      },
      data2: {
        _id: '',
      },
    }
  },
  created() {
    let self = this;
    let vm1 = self.data1;
    let vm2 = self.data2;
    let id = self.$route.params.id
    self.$store.dispatch('labo/editLabo', id).then(async (data) => {
      vm1._id = data.data._id;
      vm2._id = data.data._id;
      self.labo_data.push(data.data)
      await self.$store.dispatch('labo/fetchLaboDetail', id).then((data) => {
        data.data.map((d) => {
          self.labo_detail_data.push(d);
        })
      });
    });
  },
  computed: {
    getDoctors() {
      return this.$store.getters['doctor/getDoctors'].map(function (x) {
        return x.doctor
      })
    }
  },
  methods: {
    updateLabo(data) {
      let self = this;
      self.$store.dispatch('labo/updateLabo', data).then(function (data) {
        if (data.status) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: data.message
          });
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: data.message
          })
        }
      });
    },
    updateLaboDetail(data) {
      let self = this;
      self.$store.dispatch('labo/updateLaboDetail', data).then(function (data) {
        if (data.status) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: data.message
          });
        } else {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: data.message
          })
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
