<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated height-hint="55">
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
        <q-toolbar-title>
          <q-img width="150px" src="../assets/cloudware-logo.png"/>
        </q-toolbar-title>
        <q-space/>

        <q-btn
          v-if="$q.screen.gt.xs"
          @click="$router.currentRoute.path !== '/stock-report' ? $router.push({path: '/stock-report'}) : ''"
          dense flat round size="md" icon="notifications">
          <q-badge v-show="getLittleStock.length + getEmptyStock.length > 0" color="red" floating>
            {{ getLittleStock.length + getEmptyStock.length }}
          </q-badge>
        </q-btn>

        <q-btn-dropdown
          icon="account_circle"
          flat
        >
          <div class="row no-wrap q-pa-md">

            <div class="column items-center">
              <q-avatar size="72px">
                <q-img src="https://cdn.quasar.dev/img/boy-avatar.png"/>
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ $store.state.auth.user.name }}</div>
              <div class="q-mb-xs">{{ $store.state.auth.user.email }}</div>

              <q-btn
                @click="logout"
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
              />
              <q-btn
                :to="`user/${$store.state.auth.user._id}/update`"
                color="red"
                label="Change password"
                size="sm"
                flat
                v-close-popup
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="250"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item :active="getActive=== item.to" v-for="(item, i) in menu_item" :to="'/'+item.to" clickable v-ripple
                  exact :key="i">
            <q-item-section avatar>
              <q-icon :name="item.icon"/>
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-expansion-item
            expand-separator
            icon="pie_chart"
            label="របាយការណ៍"
          >
            <q-list class="q-pl-lg" padding>
              <q-item v-for="(item, i) in menu_report" :to="item.to" clickable v-ripple exact :key="'report'+i">
                <q-item-section avatar>
                  <q-icon name="content_paste"/>
                </q-item-section>
                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-separator/>
          <q-item :active="getActive=== 'labo-setting'" to="/labo-setting" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              កំណត់ឡាបូ
            </q-item-section>
          </q-item>
          <q-item @click="viewInstructions" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="fas fa-chalkboard-teacher"/>
            </q-item-section>
            <q-item-section>
              សៀវភៅណែនាំ
            </q-item-section>
          </q-item>
          <q-item to="/user/manager" clickable v-ripple exact>
            <q-item-section avatar>
              <q-icon name="fas fa-person-booth"/>
            </q-item-section>
            <q-item-section>
              គ្រប់គ្រង់អ្នកប្រើប្រាស់
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {LocalStorage} from 'quasar'

const user_id = LocalStorage.getItem('user_info');
const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome'
];

export default {
  name: 'MyLayout',
  data() {
    return {
      drawer: false,
      miniState: true,
      text: '',
      options: null,
      filteredOptions: [],
      leftDrawerOpen: false,
      menu: 'home',
      mobileData: true,
      bluetooth: false,
      user_type: '',
      menu_item: [
        {label: 'ទំព័រដើម', to: '', icon: 'home'},
        {label: 'កន្លែងគិតលុយ', to: 'cashiers', icon: 'fas fa-file-invoice-dollar'},
        {label: 'ទំនិញ', to: 'product', icon: 'fas fa-boxes'},
        {label: 'ទិញចូល', to: 'stock', icon: 'fas fa-warehouse'},
        {label: 'គ្រូពេទ្យចេញថ្នាំ', to: 'sale', icon: 'fas fa-cart-plus'},
        {label: 'បុគ្គលិក', to: 'staff', icon: 'fas fa-user-nurse'},
        {label: 'អ្នកជម្ងឺ', to: 'patient', icon: 'fas fa-user-edit'},
        // {label: 'ពិនិត្យអេកូ', to: 'echo', icon: 'fas fa-desktop'},
        {label: 'កត់ចំណាំអេកូ', to: 'echo-note', icon: 'fas fa-desktop'},
        {label: 'ពិនិត្យឡាបូ', to: 'labo', icon: 'fas fa-vial'},
        {label: 'ចំណូលផ្សេងៗ', to: 'income', icon: 'attach_money'},
        {label: 'ចំណាយផ្សេងៗ', to: 'expanse', icon: 'money_off'},
        {label: 'បន្ទប់ព្យាបាល', to: 'room', icon: 'fas fa-person-booth'},
        {label: 'សម្រាកព្យាបាល', to: 'examine', icon: 'fas fa-procedures'},
      ],
      menu_report: [
        {label: 'ស្តុកទំនិញ', to: '/stock-report'},
        {label: 'ទិញទំនិញ', to: '/import-report'},
        {label: 'លក់ទំនិញ', to: '/sale-report'},
        {label: 'ប្រាក់ខែបុគ្គលិក', to: '/staff-salary-report'},
        {label: 'ចំណូលផ្សេងៗ', to: '/income-report'},
        {label: 'ចំណាយផ្សេងៗ', to: '/expense-report'},
        {label: 'ខាត-ចំណេញ', to: '/profit-and-lose-report'},
      ]
    }
  },
  computed: {
    getActive() {
      return this.$route.meta
    },
    getDefaultStock() {
      let items = [];
      let total_stock = this.$store.getters['stock/getStockDetailForReport'].filter(function (f) {
        return f.purchase_status === 'Receive';
      });
      total_stock.map(function (d) {
        const index = items.findIndex((e) => e.pro_name === d.product.name);
        if (index === -1) {
          items.push({
            pro_name: d.product.name,
            pro_description: d.product.description,
            invent_type: d.invent_type,
            pro_type: d.product.type,
            pro_alert: d.product.stock_alert,
            stock_qty: d.stock_qty,
            unit: d.product.unit,
          })
        } else {
          items[index].stock_qty += d.stock_qty;
        }
      });
      return items;
    },
    getLittleStock() {
      return this.getDefaultStock.filter(function (f) {
        return f.stock_qty > 0 && f.stock_qty <= f.pro_alert;
      });
    },
    getEmptyStock() {
      return this.getDefaultStock.filter(function (f) {
        return f.stock_qty === 0;
      });
    },
  },
  methods: {
    viewInstructions() {
      // window.open('http://localhost:9000/files/hospital-guide-book.pdf','_blank')
      window.open('https://api.khykimlong.cloudware.com.kh/files/hospital-guide-book.pdf', '_blank')
    },
    filter(val, update) {
      if (this.options === null) {
        // load data
        setTimeout(() => {
          this.options = stringOptions
          this.$refs.search.filter('')
        }, 2000)
        update()
        return
      }

      if (val === '') {
        update(() => {
          this.filteredOptions = this.options.map(op => ({label: op}))
        })
        return
      }

      update(() => {
        this.filteredOptions = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...this.options
            .filter(op => op.toLowerCase().includes(val.toLowerCase()))
            .map(op => ({label: op}))
        ]
      })
    },
    logout() {
      LocalStorage.remove('userInfo');
      this.$router.push('/login')
    },
  },
  async created() {
    let self = this;
    let user_info = LocalStorage.getItem('userInfo');
    self.$q.loading.show();
    await self.$store.dispatch('auth/updateUserData', user_info);
    let route_meta = self.$router.currentRoute.meta;
    await self.$store.dispatch('active_route/updateCurrentRoute', route_meta)
    await self.$store.dispatch('blog/fetchBlog')
    await self.$store.dispatch('address_book/fetchProvince')
    await self.$store.dispatch('address_book/fetchDistrict')
    await self.$store.dispatch('address_book/fetchCommune')
    await self.$store.dispatch('address_book/fetchVillage')
    await self.$store.dispatch('address_book/fetchAddressBook')
    await self.$store.dispatch('staff/fetchStaff')
    await self.$store.dispatch('patient/fetchPatient')
    await self.$store.dispatch('labo/fetchLabo');
    await self.$store.dispatch('echo_setting/fetchEchoSetting');
    await self.$store.dispatch('echo/fetchEcho');
    await self.$store.dispatch('echo/fetchEchoBaby');
    await self.$store.dispatch('room/fetchRoom');
    await self.$store.dispatch('product/fetchProductType');
    await self.$store.dispatch('product/fetchUnitType');
    await self.$store.dispatch('examine/fetchExamine');
    await self.$store.dispatch('product/fetchProduct');
    await self.$store.dispatch('supplier/fetchSupplier');
    await self.$store.dispatch('stock/fetchStock');
    await self.$store.dispatch('sale/fetchSale');
    await self.$store.dispatch('stock/fetchStockDetailForReport');
    await self.$store.dispatch('doctor/fetchDoctor');
    await self.$store.dispatch('echo_note/fetchEchoNote');
    await self.$store.dispatch('ex_ill/fetchExIll');
    self.$q.loading.hide();
  }
}
</script>
