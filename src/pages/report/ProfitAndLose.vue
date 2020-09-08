<template>
  <q-page padding>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-bold">របាយការណ៍ចំណេញ-ខាតនៃការលក់</div>
        <q-space/>
        <div class="q-pb-lg q-pr-md">
          <q-btn-dropdown
            push
            split
            color="cyan"
            no-caps
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-icon left name="event" size="lg"/>
                <div class="text-center">
                  ជ្រើសរើស<br>កាលបរិច្ឆេទ
                </div>
              </div>
            </template>

            <q-list>
              <q-item clickable v-close-popup @click="onItemClick(1)">
                <q-item-section>
                  <q-item-label>Yesterday</q-item-label>
                  <q-item-label caption>ជ្រើសរើសម្សិលមិញ</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick(2)">
                <q-item-section>
                  <q-item-label>Last week</q-item-label>
                  <q-item-label caption>ជ្រើសរើស៧ថ្ងៃមុន</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick(3)">
                <q-item-section>
                  <q-item-label>Last month</q-item-label>
                  <q-item-label caption>ជ្រើសរើសខែមុន</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick(4)">
                <q-item-section>
                  <q-item-label>Last year</q-item-label>
                  <q-item-label caption>ជ្រើសរើសឆ្នាំមុន</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="row q-gutter-x-sm">
          <q-input class="col" label="ថ្ងៃទិញចូល" outlined square v-model="data.start_date" mask="date"
                   :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyStart" transition-show="scale" transition-hide="scale">
                  <q-date v-model="data.start_date" @input="getStartDate()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input @change="getEndDate()" class="col" label="ថ្ងៃលក់ចេញ" outlined square v-model="data.end_date"
                   mask="date"
                   :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyEnd" transition-show="scale" transition-hide="scale">
                  <q-date v-model="data.end_date" @input="getEndDate()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-x-sm">
          <q-card
            @click="$router.push({path: '/import-report'})"
            class="col my-card text-white"
            style="cursor: pointer; background: radial-gradient(circle, #E5CA44 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">{{totalStockAmount.toFixed(2)}} <span class="text-h6">ដុល្លា</span></div>
                  <div class="text-subtitle2">ថ្លៃទិញ</div>
                </div>
                <q-card-actions>
                  <q-icon size="50px" name="local_atm"/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            @click="$router.push({path: '/sale-report'})"
            class="col my-card text-white"
            style="cursor: pointer; background: radial-gradient(circle, #1C9C64 0%, #505353 100%)"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">{{totalSaleAmount.toFixed(2)}} <span class="text-h6">ដុល្លា</span></div>
                  <div class="text-subtitle2">ថ្លៃលក់</div>
                </div>
                <q-card-actions>
                  <q-icon size="50px" name="local_atm"/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
          <q-card
            @click="tab = 'empty-stock'"
            class="col my-card text-white"
            :style= "profitOrLose < 0 ? LoseStyle: ProfitStyle"
          >
            <q-card-section>
              <div class="row">
                <div class="col">
                  <div class="text-h3 text-bold">{{parseFloat(profitOrLose).toFixed(2)}} <span class="text-h6">ដុល្លា</span></div>
                  <div class="text-subtitle2">ចំណេញ-ខាត</div>
                </div>
                <q-card-actions>
                  <q-icon size="50px" name="local_atm"/>
                </q-card-actions>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
  import {date} from "quasar";

  export default {
    name: "ProfitAndLose",
    data(){
      return {
        data: {
          start_date: this.formatDate(date.subtractFromDate(new Date(), {month: 1})),
          end_date: this.formatDate(new Date()),
        },
        LoseStyle: "background: radial-gradient(circle, #F15451 0%, #505353 100%)",
        ProfitStyle: "background: radial-gradient(circle, #294EF9 0%, #505353 100%)",
      }
    },
    computed: {
      getStock() {
        return this.$store.getters['stock/getStocksByDate'].filter((d) => {
          return d.purchase_status === 'Receive' && d.amount !== 0
        });
      },
      getSale() {
        return this.$store.getters['sale/getSalesByDate'].filter((d) => {
          return d.sale_status === 'Receive' && d.amount !== 0
        });
      },
      totalStockAmount(){
        let total = 0;
        this.getStock.map(function (m) {
          total += m.amount;
        });
        return total;
      },
      totalSaleAmount(){
        let total = 0;
        this.getSale.map(function (m) {
          total += m.amount;
        });
        return total;
      },
      profitOrLose(){
        return this.totalSaleAmount - this.totalStockAmount;
      }
    },
    async created() {
      this.$q.loading.show();
      await this.$store.dispatch('stock/fetchStockByDate', this.data);
      await this.$store.dispatch('sale/fetchSaleByDate', this.data);
      this.$q.loading.hide();
    },
    methods: {
      formatDate(timeStamp) {
        return date.formatDate(timeStamp, 'YYYY-MM-DD')
      },
      formatDateToString(timeStamp) {
        return date.formatDate(timeStamp, 'DD-MMM-YYYY')
      },
      onItemClick(selection){
        if(selection === 1){
          this.data.start_date = this.formatDate(date.subtractFromDate(new Date(), {days: 1}));
        } else if (selection === 2){
          this.data.start_date = this.formatDate(date.subtractFromDate(new Date(), {days: 7}));
        }else if (selection === 3){
          this.data.start_date = this.formatDate(date.subtractFromDate(new Date(), {month: 1}));
        }else if(selection === 4){
          this.data.start_date = this.formatDate(date.subtractFromDate(new Date(), {year: 1}));
        }
        this.getStartDate();
      },
      async getStartDate() {
        this.$q.loading.show();
        this.$refs.qDateProxyStart.hide()
        await this.$store.dispatch('stock/fetchStockByDate', this.data);
        await this.$store.dispatch('sale/fetchSaleByDate', this.data);
        this.$q.loading.hide();
      },
      async getEndDate() {
        this.$q.loading.show();
        this.$refs.qDateProxyEnd.hide()
        await this.$store.dispatch('stock/fetchStockByDate', this.data);
        await this.$store.dispatch('sale/fetchSaleByDate', this.data);
        this.$q.loading.hide();
      }
    }
  }
</script>

<style scoped>

</style>
