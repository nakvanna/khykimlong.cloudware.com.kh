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
          title="ព័ត៌មានទូទៅ"
          :data="labo_setting_data"
          :columns="columns_default"
          :rows-per-page-options="[0]"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="type" :props="props">
                {{ props.row.type }}
                <q-popup-edit v-model="props.row.type">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select @keyup.enter.stop
                              outlined
                              v-model="props.row.type"
                              label="ប្រភេទ"
                              :options="['HEMATOLOGY', 'LEUCOCYTAIRE', 'BIOCHIMIE', 'SÉROLOGIE']"
                              square>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboSetting({id:$route.params.id,data:{type:props.row.type}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="name" :props="props">
                {{ props.row.name }}
                <q-popup-edit v-model="props.row.name">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.name" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboSetting({id:$route.params.id,data:{name:props.row.name}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="value" :props="props">
                {{ props.row.value }}
                <q-popup-edit v-model="props.row.value">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.value" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboSetting({id:$route.params.id,data:{value:props.row.value}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="superscript" :props="props">
                {{ props.row.superscript }}
                <q-popup-edit v-model="props.row.superscript">
                  <template v-slot="{ initialValue, superscript, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.superscript" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboSetting({id:$route.params.id,data:{superscript:props.row.superscript}})"
                               :disable="initialValue === superscript"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="unit" :props="props">
                {{ props.row.unit }}
                <q-popup-edit v-model="props.row.unit">
                  <template v-slot="{ initialValue, unit, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.unit" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboSetting({id:$route.params.id,data:{unit:props.row.unit}})"
                               :disable="initialValue === unit"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="min" :props="props">
                {{ props.row.min }}
                <q-popup-edit v-model="props.row.min">
                  <template v-slot="{ initialValue, min, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.min" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboSetting({id:$route.params.id,data:{min:props.row.min}})"
                               :disable="initialValue === min"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
              </q-td>
              <q-td key="max" :props="props">
                {{ props.row.max }}
                <q-popup-edit v-model="props.row.max">
                  <template v-slot="{ initialValue, max, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="props.row.max" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateLaboSetting({id:$route.params.id,data:{max:props.row.max}})"
                               :disable="initialValue === max"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
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
    name: "LaboSettingEdit",
    data() {
      return {
        columns_default: [
          {align: 'left', name: 'type', label: 'ប្រភេទ', field: 'type'},
          {align: 'left', name: 'name', label: 'ឈ្មោះ', field: 'name'},
          {align: 'left', name: 'value', label: 'តម្លៃពីមុខ', field: 'value'},
          {align: 'left', name: 'superscript', label: 'តម្លៃស្វ័យគុណ', field: 'superscript'},
          {align: 'left', name: 'unit', label: 'ឯកតា', field: 'unit'},
          {align: 'left', name: 'min', label: 'តម្លៃ', field: 'min'},
          {align: 'left', name: 'max', label: 'តម្លៃ', field: 'max'},
        ],
        labo_setting_data: []
      }
    },
    async created() {
      let self = this;
      self.$store.dispatch('labo_setting/editLaboSetting', self.$route.params.id).then(function (res) {
        self.labo_setting_data = [];
        self.labo_setting_data.push(res.data);
      })
    },
    methods: {
      updateLaboSetting(data){
        let self = this;
        self.$store.dispatch('labo_setting/updateLaboSetting', data).then(function (data) {
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
        })
      },
    }
  }
</script>

<style scoped>

</style>
