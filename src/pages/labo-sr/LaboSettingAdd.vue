<template>
  <q-page>
    <q-card>
      <q-card-actions align="left">
        <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
          <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
        </q-btn>
      </q-card-actions>
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
                  ប្រភេទ
                </q-item-label>
                <q-item-label class="col q-my-sm">
                  Parameter
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-select class="col"
                          outlined
                          v-model="data.type"
                          label="ភេទ"
                          :options="['HEMATOLOGY', 'LEUCOCYTAIRE', 'BIOCHIMIE', 'SÉROLOGIE']"
                          square
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើសចន្លោះ']">
                </q-select>
                <q-input
                  class="col"
                  outlined
                  v-model="data.name"
                  label="ឈ្មោះ"
                  square
                  lazy-rules
                  :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
                />
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-item-label class="q-my-sm">
                  តម្លៃ
                </q-item-label>
              </div>
              <div class="row q-gutter-x-sm q-mb-sm">
                <q-input class="col-md col-xs-12 q-pb-xs"
                  outlined
                  v-model="data.value"
                  label="តម្លៃពីមុខ"
                  square
                />
                <q-input class="col-md col-xs-12 q-pb-xs"
                  outlined
                  v-model="data.superscript"
                  label="តម្លៃស្វ័យគុណ"
                  square
                />
                <q-input class="col-md col-xs-12 q-pb-xs"
                  outlined
                  v-model="data.unit"
                  label="នៅក្នុងមួយឯកត្តា"
                  square
                />
                <q-input class="col-md col-xs-12 q-pb-xs"
                  outlined
                  v-model="data.min"
                  label="តម្លៃតូច"
                  square
                />
                <q-input class="col-md col-xs-12 q-pb-xs"
                  outlined
                  v-model="data.max"
                  label="តម្លៃធំ"
                  square
                />
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn icon="save" style="width: 150px; height: 50px" color="primary" label="រក្សារទុក" @click="$refs.addForm.submit()">
                <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    name: "LaboSettingAdd",
    data() {
      return {
        data: {
          type: '',
          name: '',
          value: '',
          superscript: '',
          unit: '',
          min: '',
          max: '',
          result: 0
        }
      }
    },
    methods: {
      onSubmit() {
        let self = this;
        self.$q.loading.show();
        self.$store.dispatch('labo_setting/storeLaboSetting', self.data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.isShow = false;
            self.$q.loading.hide();
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
