<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">របាយការណ៍</div>
        <q-space/>
        <q-btn icon="add" flat round :to="{ name: 'blog_create' }"/>
      </q-card-section>
      <q-card-section>
        <GChart
          style="height: 500px"
          type="ColumnChart"
          :data="chartData"
          :options="chartOptions"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  //Editor
  import Editor from '@tinymce/tinymce-vue'
  import {GChart} from 'vue-google-charts'
  import Chart from 'chart.js';

  export default {
    name: 'PageIndex',
    components:{
      GChart,
      'editor': Editor
    },
    data(){
      return{
        chartData: [
          ['ឆ្នាំ', 'សរុប', 'ចំណូល', 'ចំណាយ', 'ចំណេញ'],
          ['២០២០', 900, 300, 500, 200],
        ],
        chartOptions: {
          chart: {
            title: 'សរុបរបាយការណ៍បុគ្គលិក',
          }
        },
        filter: '',
        pagination: {
          rowsPerPage: 0
        },
      }
    },
    async created() {
      let self = this;
      let route_meta = self.$router.currentRoute.meta;
      await self.$store.dispatch('active_route/updateCurrentRoute', route_meta)
    }
  }
</script>
