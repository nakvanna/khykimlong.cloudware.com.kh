(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"91c4":function(t,e,a){t.exports=a.p+"img/cloudware-logo.8aa6c3b6.png"},a185:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-layout",{attrs:{view:"hHh Lpr lff"}},[r("q-header",{attrs:{elevated:"","height-hint":"55"}},[r("q-toolbar",{staticClass:"q-py-sm q-px-md"},[r("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"menu"},on:{click:function(e){t.drawer=!t.drawer}}}),r("q-toolbar-title",[r("q-img",{attrs:{width:"150px",src:a("91c4")}})],1),r("q-space"),t.$q.screen.gt.xs?r("q-btn",{attrs:{dense:"",flat:"",round:"",size:"md",icon:"notifications"},on:{click:function(e){"/stock-report"!==t.$router.currentRoute.path&&t.$router.push({path:"/stock-report"})}}},[r("q-badge",{directives:[{name:"show",rawName:"v-show",value:t.getLittleStock.length+t.getEmptyStock.length>0,expression:"getLittleStock.length + getEmptyStock.length > 0"}],attrs:{color:"red",floating:""}},[t._v("\n          "+t._s(t.getLittleStock.length+t.getEmptyStock.length)+"\n        ")])],1):t._e(),r("q-btn-dropdown",{attrs:{icon:"account_circle",flat:""}},[r("div",{staticClass:"row no-wrap q-pa-md"},[r("div",{staticClass:"column items-center"},[r("q-avatar",{attrs:{size:"72px"}},[r("q-img",{attrs:{src:"https://cdn.quasar.dev/img/boy-avatar.png"}})],1),r("div",{staticClass:"text-subtitle1 q-mt-md q-mb-xs"},[t._v(t._s(t.$store.state.auth.user.name))]),r("div",{staticClass:"q-mb-xs"},[t._v(t._s(t.$store.state.auth.user.email))]),r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{color:"primary",label:"Logout",push:"",size:"sm"},on:{click:t.logout}}),r("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{to:"user/"+t.$store.state.auth.user._id+"/update",color:"red",label:"Change password",size:"sm",flat:""}})],1)])])],1)],1),r("q-drawer",{attrs:{"show-if-above":"",mini:t.miniState,width:250,breakpoint:500,bordered:"","content-class":"bg-grey-3"},on:{mouseover:function(e){t.miniState=!1},mouseout:function(e){t.miniState=!0}},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("q-scroll-area",{staticClass:"fit"},[r("q-list",{attrs:{padding:""}},[t._l(t.menu_item,(function(e,a){return r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:a,attrs:{active:t.getActive===e.to,to:"/"+e.to,clickable:"",exact:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:e.icon}})],1),r("q-item-section",[t._v("\n            "+t._s(e.label)+"\n          ")])],1)})),r("q-separator"),r("q-expansion-item",{attrs:{"expand-separator":"",icon:"pie_chart",label:"របាយការណ៍"}},[r("q-list",{staticClass:"q-pl-lg",attrs:{padding:""}},t._l(t.menu_report,(function(e,a){return r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:"report"+a,attrs:{to:e.to,clickable:"",exact:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"content_paste"}})],1),r("q-item-section",[t._v("\n                "+t._s(e.label)+"\n              ")])],1)})),1)],1),r("q-separator"),r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{active:"labo-setting"===t.getActive,to:"/labo-setting",clickable:"",exact:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"settings"}})],1),r("q-item-section",[t._v("\n            កំណត់ឡាបូ\n          ")])],1),r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:"",exact:""},on:{click:t.viewInstructions}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"fas fa-chalkboard-teacher"}})],1),r("q-item-section",[t._v("\n            សៀវភៅណែនាំ\n          ")])],1),r("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{to:"/user/manager",clickable:"",exact:""}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"fas fa-person-booth"}})],1),r("q-item-section",[t._v("\n            គ្រប់គ្រង់អ្នកប្រើប្រាស់\n          ")])],1)],2)],1)],1),r("q-page-container",[r("router-view")],1)],1)},o=[],n=a("52b5"),s=a.n(n),c=(a("c1c3"),a("549c")),i=a.n(c),l=(a("a0c4"),a("e9de"),a("7efb")),p=a.n(l),u=(a("9ec6"),a("1a43"),a("d946"),a("caca")),d=(u["a"].getItem("user_info"),["quasarframework/quasar","quasarframework/quasar-awesome"]),f={name:"MyLayout",data:function(){return{drawer:!1,miniState:!0,text:"",options:null,filteredOptions:[],leftDrawerOpen:!1,menu:"home",mobileData:!0,bluetooth:!1,user_type:"",menu_item:[{label:"ទំព័រដើម",to:"",icon:"home"},{label:"កន្លែងគិតលុយ",to:"cashiers",icon:"fas fa-file-invoice-dollar"},{label:"ទំនិញ",to:"product",icon:"fas fa-boxes"},{label:"ទិញចូល",to:"stock",icon:"fas fa-warehouse"},{label:"គ្រូពេទ្យចេញថ្នាំ",to:"sale",icon:"fas fa-cart-plus"},{label:"បុគ្គលិក",to:"staff",icon:"fas fa-user-nurse"},{label:"អ្នកជម្ងឺ",to:"patient",icon:"fas fa-user-edit"},{label:"កត់ចំណាំអេកូ",to:"echo-note",icon:"fas fa-desktop"},{label:"ពិនិត្យឡាបូ",to:"labo",icon:"fas fa-vial"},{label:"ចំណូលផ្សេងៗ",to:"income",icon:"attach_money"},{label:"ចំណាយផ្សេងៗ",to:"expanse",icon:"money_off"},{label:"បន្ទប់ព្យាបាល",to:"room",icon:"fas fa-person-booth"},{label:"សម្រាកព្យាបាល",to:"examine",icon:"fas fa-procedures"}],menu_report:[{label:"ស្តុកទំនិញ",to:"/stock-report"},{label:"ទិញទំនិញ",to:"/import-report"},{label:"លក់ទំនិញ",to:"/sale-report"},{label:"ប្រាក់ខែបុគ្គលិក",to:"/staff-salary-report"},{label:"ចំណូលផ្សេងៗ",to:"/income-report"},{label:"ចំណាយផ្សេងៗ",to:"/expense-report"},{label:"ខាត-ចំណេញ",to:"/profit-and-lose-report"}]}},computed:{getActive:function(){return this.$route.meta},getDefaultStock:function(){var t=[],e=this.$store.getters["stock/getStockDetailForReport"].filter((function(t){return"Receive"===t.purchase_status}));return e.map((function(e){var a=t.findIndex((function(t){return t.pro_name===e.product.name}));-1===a?t.push({pro_name:e.product.name,pro_description:e.product.description,invent_type:e.invent_type,pro_type:e.product.type,pro_alert:e.product.stock_alert,stock_qty:e.stock_qty,unit:e.product.unit}):t[a].stock_qty+=e.stock_qty})),t},getLittleStock:function(){return this.getDefaultStock.filter((function(t){return t.stock_qty>0&&t.stock_qty<=t.pro_alert}))},getEmptyStock:function(){return this.getDefaultStock.filter((function(t){return 0===t.stock_qty}))}},methods:{viewInstructions:function(){window.open("https://api.khykimlong.cloudware.com.kh/files/hospital-guide-book.pdf","_blank")},filter:function(t,e){var a=this;if(null===this.options)return setTimeout((function(){a.options=d,a.$refs.search.filter("")}),2e3),void e();e(""!==t?function(){a.filteredOptions=[{label:t,type:"In this repository"},{label:t,type:"All GitHub"}].concat(p()(a.options.filter((function(e){return e.toLowerCase().includes(t.toLowerCase())})).map((function(t){return{label:t}}))))}:function(){a.filteredOptions=a.options.map((function(t){return{label:t}}))})},logout:function(){u["a"].remove("userInfo"),this.$router.push("/login")}},created:function(){var t=this;return i()(s.a.mark((function e(){var a,r,o;return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,r=u["a"].getItem("userInfo"),a.$q.loading.show(),e.next=5,a.$store.dispatch("auth/updateUserData",r);case 5:return o=a.$router.currentRoute.meta,e.next=8,a.$store.dispatch("active_route/updateCurrentRoute",o);case 8:return e.next=10,a.$store.dispatch("blog/fetchBlog");case 10:return e.next=12,a.$store.dispatch("address_book/fetchProvince");case 12:return e.next=14,a.$store.dispatch("address_book/fetchDistrict");case 14:return e.next=16,a.$store.dispatch("address_book/fetchCommune");case 16:return e.next=18,a.$store.dispatch("address_book/fetchVillage");case 18:return e.next=20,a.$store.dispatch("address_book/fetchAddressBook");case 20:return e.next=22,a.$store.dispatch("staff/fetchStaff");case 22:return e.next=24,a.$store.dispatch("patient/fetchPatient");case 24:return e.next=26,a.$store.dispatch("labo/fetchLabo");case 26:return e.next=28,a.$store.dispatch("echo_setting/fetchEchoSetting");case 28:return e.next=30,a.$store.dispatch("echo/fetchEcho");case 30:return e.next=32,a.$store.dispatch("echo/fetchEchoBaby");case 32:return e.next=34,a.$store.dispatch("room/fetchRoom");case 34:return e.next=36,a.$store.dispatch("product/fetchProductType");case 36:return e.next=38,a.$store.dispatch("product/fetchUnitType");case 38:return e.next=40,a.$store.dispatch("examine/fetchExamine");case 40:return e.next=42,a.$store.dispatch("product/fetchProduct");case 42:return e.next=44,a.$store.dispatch("supplier/fetchSupplier");case 44:return e.next=46,a.$store.dispatch("stock/fetchStock");case 46:return e.next=48,a.$store.dispatch("sale/fetchSale");case 48:return e.next=50,a.$store.dispatch("stock/fetchStockDetailForReport");case 50:return e.next=52,a.$store.dispatch("doctor/fetchDoctor");case 52:return e.next=54,a.$store.dispatch("echo_note/fetchEchoNote");case 54:return e.next=56,a.$store.dispatch("ex_ill/fetchExIll");case 56:a.$q.loading.hide();case 57:case"end":return e.stop()}}),e)})))()}},h=f,m=a("a6c2"),b=a("63c1"),v=a.n(b),q=a("f624"),g=a("8738"),k=a("66cf"),_=a("ef9c"),x=a("309f"),w=a("0798"),$=a("dc01"),y=a("ec38"),S=a("edd5"),Q=a("d6e3"),C=a("5cc9"),I=a("b51c"),D=a("692f"),E=a("e0e9"),L=a("6c44"),N=a("19dc"),R=a("3f5f"),A=a("953d"),B=a("ddc7"),P=a("f6b1"),T=a("a561"),O=Object(m["a"])(h,r,o,!1,null,null,null);e["default"]=O.exports;v()(O,"components",{QLayout:q["a"],QHeader:g["a"],QToolbar:k["a"],QBtn:_["a"],QToolbarTitle:x["a"],QImg:w["a"],QSpace:$["a"],QBadge:y["a"],QBtnDropdown:S["a"],QAvatar:Q["a"],QDrawer:C["a"],QScrollArea:I["a"],QList:D["a"],QItem:E["a"],QItemSection:L["a"],QIcon:N["a"],QSeparator:R["a"],QExpansionItem:A["a"],QPageContainer:B["a"]}),v()(O,"directives",{ClosePopup:P["a"],Ripple:T["a"]})}}]);