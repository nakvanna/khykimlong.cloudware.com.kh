<template>
  <q-page>
    <q-card-section>
      <span class="text-h6 text-bold">ពត៍មានរបស់៖ {{ data.patient }}</span>
    </q-card-section>
    <q-card-section>
      <q-table
        separator="cell"
        title="ព័ត៌មានពិនិត្យ"
        :data="echo_data"
        :columns="columns_echo"
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
                             @click="updateEcho({id:data._id,data:{title:props.row.title}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="description" :props="props">
              <span class="text-h5">{{ props.row.description }}</span>
              <q-popup-edit v-model="props.row.description">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input rows="2" type="textarea" @keyup.enter.stop v-model="props.row.description" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateEcho({id:data._id,data:{description:props.row.description}})"
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
                             @click="updateEcho({id:data._id,data:{doctor:props.row.doctor}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-select>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="check_date" :props="props">
              <span class="text-h5">{{ props.row.check_date }}</span>
              <q-popup-edit v-model="props.row.check_date">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop autofocus dense label="ថ្ងៃពិនិត្យ" outlined square
                           v-model="data.check_date" mask="date"
                           :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="data.check_date" @input="() => $refs.qDateProxy.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateEcho({id:data._id,data:{check_date:props.row.check_date}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-page>
</template>

<script>
import {date} from "quasar";

export default {
  name: "EchoNoteEdit",
  data() {
    return {
      echo_data: [],
      data: {
        _id: null,
        title: null,
        description: null,
        doctor: null,
        check_date: null,
        patient: null,
      },
      columns_echo: [
        {align: 'left', name: 'title', label: 'ចំណងជើង', field: 'title'},
        {align: 'left', name: 'description', label: 'ចំណាំ', field: 'description'},
        {align: 'left', name: 'doctor', label: 'ពិនិត្យដោយ', field: 'doctor'},
        {align: 'left', name: 'check_date', label: 'កាលបរិច្ឆេទ', field: 'check_date'},
      ]
    }
  },
  computed: {
    getDoctors() {
      return this.$store.getters['doctor/getDoctors'].map(function (x) {
        return x.doctor
      })
    }
  },
  created() {
    let self = this;
    self.$store.dispatch('echo_note/editEchoNote', self.$route.params.id).then((res) => {
      self.data.check_date = self.dateFormat(res.data.check_date);
      self.data.title = res.data.title;
      self.data.description = res.data.description;
      self.data.doctor = res.data.doctor;
      self.data.patient = res.data.patient.kh_name;
      self.data._id = res.data._id;
      self.echo_data = [];
      self.echo_data.push(self.data);
    })
  },
  methods: {
    dateFormat(val) {
      return date.formatDate(val, 'YYYY/MM/DD')
    },
    updateEcho(data) {
      console.log(data);
    }
  }
}
</script>

<style scoped>

</style>
