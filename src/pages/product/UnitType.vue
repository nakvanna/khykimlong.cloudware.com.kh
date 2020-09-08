<template>
  <q-dialog v-model="isShow" full-width position="top">
    <q-card>
      <q-bar>
        <h6>បន្ថែមឯកតាទំនិញ</h6>
        <q-space/>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          ref="addForm"
        >
          <q-input
            autofocus
            class="col"
            outlined
            v-model="data.name"
            label="ឈ្មោះឯកតា"
            square
            lazy-rules
            :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
          />
        </q-form>
        <div class="row">
          <div class="col" align="right">
            <q-btn dense icon="save" label="រក្សាទុក" color="primary" @click="$refs.addForm.submit()">
              <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "UnitType",
  data() {
    return {
      isShow: false,
      data: {
        name: '',
      }
    }
  },
  methods: {
    onSubmit() {
      let self = this;
      self.$q.loading.show();
      self.$store.dispatch('product/storeUnitType', self.data).then(async function (data) {
        if (data.status) {
          self.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: data.message
          });
          self.isShow = false;
          await self.$store.dispatch('product/fetchUnitType');
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
    },
    show() {
      this.isShow = true;
    }
  }
}
</script>

<style scoped>

</style>
