<template>
  <q-page>
    <q-card-actions align="left">
      <q-btn style="width: 150px" color="red" icon="reply" label="ត្រឡប់ក្រោយ" v-go-back.single>
        <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
      </q-btn>
    </q-card-actions>
    <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
          <div class="row q-gutter-x-sm q-mb-sm">
            <q-input
              class="col"
              v-model="data.name"
              outlined
              label="ឈ្មោះបន្ទប់"
              square
              lazy-rules
              :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn icon="save" style="width: 150px; height: 50px" color="primary" label="រក្សារទុក"
               @click="$refs.addForm.submit()">
          <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    name: "RoomAdd",
    data() {
      return {
        data: {
          name: '',
          status: false
        }
      }
    },
    methods: {
      onSubmit() {
        let self = this;
        self.$q.loading.show();
        self.$store.dispatch('room/storeRoom', self.data).then(function (res) {
          self.$q.loading.hide();
          window.history.back();
        });
      }
    }
  }
</script>

<style scoped>

</style>
