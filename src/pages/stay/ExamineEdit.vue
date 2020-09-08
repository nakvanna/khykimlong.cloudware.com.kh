<template>
  <q-page>
    <q-card-section>
      <span class="text-h4">ពត៍មានរបស់៖ {{ data.patient.kh_name }}</span>
    </q-card-section>
    <q-card-section>
      <q-table
        separator="cell"
        title="ព័ត៌មានទូទៅ"
        :data="exa_data"
        :columns="columns_default"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="room" :props="props">
              {{ props.row.room.label }}
              <q-popup-edit v-model="props.row.room">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-select @keyup.enter.stop
                            outlined
                            v-model="props.row.room"
                            label="បន្ទប់"
                            :options="getRooms"
                            square>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateRoom({id:data._id,data:{room:props.row.room.value, status: props.row.room.status}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-select>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="reason" :props="props">
              {{ props.row.reason }}
              <q-popup-edit v-model="props.row.reason">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.reason" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{reason:props.row.reason}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="his_reaction" :props="props">
              {{ props.row.his_reaction }}
              <q-popup-edit v-model="props.row.his_reaction">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.his_reaction" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{his_reaction:props.row.his_reaction}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="his_ill" :props="props">
              {{ props.row.his_ill }}
              <q-popup-edit v-model="props.row.his_ill">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.his_ill" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{his_ill:props.row.his_ill}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="ex_ill" :props="props">
              {{ props.row.ex_ill }}
              <q-popup-edit v-model="props.row.ex_ill">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-select @keyup.enter.stop
                            v-model="props.row.ex_ill"
                            label="បន្ទប់"
                            square
                            outlined
                            use-input
                            use-chips
                            multiple
                            input-debounce="0"
                            @new-value="createValue"
                            :options="Object.freeze(ex_illOptions)"
                            @filter="filterFn"
                            lazy-rules
                            :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  >
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{ex_ill:props.row.ex_ill}})"
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
        :data="exa_data"
        :columns="columns_default1"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="ex_ill" :props="props">
              {{ props.row.ex_ill }}
              <q-popup-edit v-model="props.row.ex_ill">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-select @keyup.enter.stop
                            v-model="props.row.ex_ill"
                            label="អតិតកាលជម្ងឺ"
                            square
                            outlined
                            use-input
                            use-chips
                            multiple
                            input-debounce="0"
                            @new-value="createValue"
                            :options="Object.freeze(ex_illOptions)"
                            @filter="filterFn"
                            lazy-rules
                            :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                  >
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{ex_ill:props.row.ex_ill}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-select>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="gen_status" :props="props">
              {{ props.row.gen_status }}
              <q-popup-edit v-model="props.row.gen_status">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.gen_status" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{gen_status:props.row.gen_status}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="heat" :props="props">
              {{ props.row.heat }}
              <q-popup-edit v-model="props.row.heat">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.heat" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{heat:props.row.heat}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="blood_pressure" :props="props">
              {{ props.row.blood_pressure }}
              <q-popup-edit v-model="props.row.blood_pressure">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.blood_pressure" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{blood_pressure:props.row.blood_pressure}})"
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
    <q-card-section>
      <q-table
        separator="cell"
        :data="exa_data"
        :columns="columns_default2"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="spo" :props="props">
              {{ props.row.spo }}
              <q-popup-edit v-model="props.row.spo">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.spo" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{spo:props.row.spo}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="weight" :props="props">
              {{ props.row.weight }}
              <q-popup-edit v-model="props.row.weight">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.weight" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{weight:props.row.weight}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="signal_ill" :props="props">
              {{ props.row.signal_ill }}
              <q-popup-edit v-model="props.row.signal_ill">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.signal_ill" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{signal_ill:props.row.signal_ill}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="mark_ill" :props="props">
              {{ props.row.mark_ill }}
              <q-popup-edit v-model="props.row.mark_ill">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.mark_ill" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{mark_ill:props.row.mark_ill}})"
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
    <q-card-section>
      <q-table
        separator="cell"
        :data="exa_data"
        :columns="columns_default3"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="diagnose_in" :props="props">
              {{ props.row.diagnose_in }}
              <q-popup-edit v-model="props.row.diagnose_in">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.diagnose_in" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{diagnose_in:props.row.diagnose_in}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="check_at" :props="props">
              {{ props.row.check_at }}
              <q-popup-edit v-model="props.row.check_at">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.check_at" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{check_at:props.row.check_at}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="diagnose_out" :props="props">
              {{ props.row.diagnose_out }}
              <q-popup-edit v-model="props.row.diagnose_out">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop v-model="props.row.diagnose_out" dense autofocus>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{diagnose_out:props.row.diagnose_out}})"
                             :disable="initialValue === value"/>
                    </template>
                  </q-input>
                </template>
              </q-popup-edit>
            </q-td>
            <q-td key="exa_date" :props="props">
              {{ props.row.exa_date }}
              <q-popup-edit v-model="props.row.exa_date">
                <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                  <q-input @keyup.enter.stop autofocus dense class="col" label="ថ្ងៃពិនិត្យ" outlined square
                           v-model="data.exa_date" mask="date"
                           :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="data.exa_date" @input="() => $refs.qDateProxy.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:after>
                      <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                      <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                             @click="updateExamine({id:data._id,data:{exa_date:props.row.exa_date}})"
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
  name: "ExamineEdit",
  data() {
    return {
      exa_data: [],
      data: {
        _id: null,
        blood_pressure: null,
        check_at: null,
        diagnose_in: null,
        diagnose_out: null,
        ex_ill: null,
        exa_date: null,
        gen_status: null,
        heat: null,
        his_ill: null,
        his_reaction: null,
        is_stay: true,
        mark_ill: null,
        patient: {kh_name: null},
        pulse: null,
        reason: null,
        room: null,
        signal_ill: null,
        spo: null,
        weight: null,
      },
      columns_default: [
        {align: 'left', name: 'room', label: 'បន្ទប់', field: 'room'},
        {align: 'left', name: 'reason', label: 'មូលហេតុ', field: 'reason'},
        {align: 'left', name: 'his_reaction', label: 'ប្រវត្តិប្រតិកម្ម', field: 'his_reaction'},
        {align: 'left', name: 'his_ill', label: 'ប្រវត្តិជម្ងឺ', field: 'his_ill'},
      ],
      columns_default1: [
        {align: 'left', name: 'ex_ill', label: 'អតិតកាលជម្ងឺ', field: 'ex_ill'},
        {align: 'left', name: 'gen_status', label: 'សភាពទូទៅ', field: 'gen_status'},
        {align: 'left', name: 'heat', label: 'កំដៅ', field: 'heat'},
        {align: 'left', name: 'blood_pressure', label: 'សម្ពាធឈាម', field: 'blood_pressure'},
      ],
      columns_default2: [
        {align: 'left', name: 'spo', label: 'SPO2', field: 'spo'},
        {align: 'left', name: 'weight', label: 'ទំងន់', field: 'weight'},
        {align: 'left', name: 'signal_ill', label: 'សញ្ញាតំអូញ', field: 'signal_ill'},
        {align: 'left', name: 'mark_ill', label: 'រូបសញ្ញា', field: 'mark_ill'},

      ],
      columns_default3: [
        {align: 'left', name: 'diagnose_in', label: 'រោគវិនិច្ឆ័យចូល', field: 'diagnose_in'},
        {align: 'left', name: 'check_at', label: 'ការពិនិត្យអម', field: 'check_at'},
        {align: 'left', name: 'diagnose_out', label: 'រោគវិនិច្ឆ័យចេញ', field: 'diagnose_out'},
        {align: 'left', name: 'exa_date', label: 'កាលបរិច្ឆេទ', field: 'exa_date'},
      ],
      old_room_id: null,
      ex_illOptions: this.getExIlls,
    }
  },
  computed: {
    getRooms() {
      return this.$store.getters['room/getFreeRoom'].map((x) => {
        return {
          label: x.name,
          status: x.status,
          value: x._id
        }
      })
    },
    getExIlls() {
      return this.$store.getters['ex_ill/getExIlls'].map((m) => {
        return m.ex_ill;
      });
    },
  },
  async created() {
    let self = this;
    let vm = self.data;
    await self.$store.dispatch('examine/fetchExamineByID', self.$route.params.id).then(function (f) {
      self.old_room_id = f.data.room._id;
      vm._id = f.data._id;
      vm.patient = f.data.patient;
      vm.blood_pressure = f.data.blood_pressure;
      vm.check_at = f.data.check_at;
      vm.diagnose_in = f.data.diagnose_in;
      vm.diagnose_out = f.data.diagnose_out;
      vm.ex_ill = f.data.ex_ill;
      vm.exa_date = self.dateFormat(f.data.exa_date);
      vm.gen_status = f.data.gen_status;
      vm.heat = f.data.heat;
      vm.his_ill = f.data.his_ill;
      vm.his_reaction = f.data.his_reaction;
      vm.is_stay = f.data.is_stay;
      vm.mark_ill = f.data.mark_ill;
      vm.reason = f.data.reason;
      vm.room = {label: f.data.room.name, status: f.data.room.status, value: f.data.room._id};
      vm.signal_ill = f.data.signal_ill;
      vm.spo = f.data.spo;
      vm.weight = f.data.weight;
      self.exa_data = [];
      self.exa_data.push(vm)
    });
  },
  methods: {
    dateFormat(val) {
      return date.formatDate(val, 'YYYY/MM/DD')
    },
    updateExamine(data) {
      console.log(data)
      let self = this;
      self.$store.dispatch('examine/updateExamine', data).then(function (data) {
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
    async updateRoom(data) {
      let self = this;
      console.log(data.data.room, self.old_room_id)
      await self.$store.dispatch('room/updateToggle', {_id: self.old_room_id, status: false});
      await self.$store.dispatch('room/updateToggle', {_id: data.data.room, status: true});
      self.old_room_id = data.data.room;
      await self.updateExamine(data);
    },
    createValue(val, done) {
      if (val.length > 2) {
        if (!stringOptions.includes(val)) {
          done(val, 'add-unique')
        }
      }
    },
    filterFn(val, update) {
      update(() => {
        if (val === '') {
          this.ex_illOptions = this.getExIlls
        } else {
          const needle = val.toLowerCase()
          this.ex_illOptions = this.getExIlls.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
