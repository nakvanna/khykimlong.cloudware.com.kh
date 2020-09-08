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

        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  export default {
    name: "LaboSettingEdit",
    data(){
      return {
        labo_setting_data: []
      }
    }
  }
</script>

<style scoped>

</style>
