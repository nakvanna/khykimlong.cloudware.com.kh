(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[41],{a710:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-page",{attrs:{padding:""}},[e("q-card",[e("q-card-section",{staticClass:"row items-center q-pb-none"},[e("div",{staticClass:"text-h5 text-bold"},[t._v("របាយការណ៍ចំណេញ-ខាតនៃការលក់")]),e("q-space"),e("div",{staticClass:"q-pb-lg q-pr-md"},[e("q-btn-dropdown",{attrs:{push:"",split:"",color:"cyan","no-caps":""},scopedSlots:t._u([{key:"label",fn:function(){return[e("div",{staticClass:"row items-center no-wrap"},[e("q-icon",{attrs:{left:"",name:"event",size:"lg"}}),e("div",{staticClass:"text-center"},[t._v("\n                ជ្រើសរើស"),e("br"),t._v("កាលបរិច្ឆេទ\n              ")])],1)]},proxy:!0}])},[e("q-list",[e("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return t.onItemClick(1)}}},[e("q-item-section",[e("q-item-label",[t._v("Yesterday")]),e("q-item-label",{attrs:{caption:""}},[t._v("ជ្រើសរើសម្សិលមិញ")])],1),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"info",color:"amber"}})],1)],1),e("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return t.onItemClick(2)}}},[e("q-item-section",[e("q-item-label",[t._v("Last week")]),e("q-item-label",{attrs:{caption:""}},[t._v("ជ្រើសរើស៧ថ្ងៃមុន")])],1),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"info",color:"amber"}})],1)],1),e("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return t.onItemClick(3)}}},[e("q-item-section",[e("q-item-label",[t._v("Last month")]),e("q-item-label",{attrs:{caption:""}},[t._v("ជ្រើសរើសខែមុន")])],1),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"info",color:"amber"}})],1)],1),e("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return t.onItemClick(4)}}},[e("q-item-section",[e("q-item-label",[t._v("Last year")]),e("q-item-label",{attrs:{caption:""}},[t._v("ជ្រើសរើសឆ្នាំមុន")])],1),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"info",color:"amber"}})],1)],1)],1)],1)],1),e("div",{staticClass:"row q-gutter-x-sm"},[e("q-input",{staticClass:"col",attrs:{label:"ថ្ងៃទិញចូល",outlined:"",square:"",mask:"date",rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[e("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[e("q-popup-proxy",{ref:"qDateProxyStart",attrs:{"transition-show":"scale","transition-hide":"scale"}},[e("q-date",{on:{input:function(a){return t.getStartDate()}},model:{value:t.data.start_date,callback:function(a){t.$set(t.data,"start_date",a)},expression:"data.start_date"}})],1)],1)]},proxy:!0}]),model:{value:t.data.start_date,callback:function(a){t.$set(t.data,"start_date",a)},expression:"data.start_date"}}),e("q-input",{staticClass:"col",attrs:{label:"ថ្ងៃលក់ចេញ",outlined:"",square:"",mask:"date",rules:["date"]},on:{change:function(a){return t.getEndDate()}},scopedSlots:t._u([{key:"append",fn:function(){return[e("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[e("q-popup-proxy",{ref:"qDateProxyEnd",attrs:{"transition-show":"scale","transition-hide":"scale"}},[e("q-date",{on:{input:function(a){return t.getEndDate()}},model:{value:t.data.end_date,callback:function(a){t.$set(t.data,"end_date",a)},expression:"data.end_date"}})],1)],1)]},proxy:!0}]),model:{value:t.data.end_date,callback:function(a){t.$set(t.data,"end_date",a)},expression:"data.end_date"}})],1)],1),e("q-card-section",[e("div",{staticClass:"row q-gutter-x-sm"},[e("q-card",{staticClass:"col my-card text-white",staticStyle:{cursor:"pointer",background:"radial-gradient(circle, #E5CA44 0%, #505353 100%)"},on:{click:function(a){return t.$router.push({path:"/import-report"})}}},[e("q-card-section",[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"text-h3 text-bold"},[t._v(t._s(t.totalStockAmount.toFixed(2))+" "),e("span",{staticClass:"text-h6"},[t._v("ដុល្លា")])]),e("div",{staticClass:"text-subtitle2"},[t._v("ថ្លៃទិញ")])]),e("q-card-actions",[e("q-icon",{attrs:{size:"50px",name:"local_atm"}})],1)],1)])],1),e("q-card",{staticClass:"col my-card text-white",staticStyle:{cursor:"pointer",background:"radial-gradient(circle, #1C9C64 0%, #505353 100%)"},on:{click:function(a){return t.$router.push({path:"/sale-report"})}}},[e("q-card-section",[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"text-h3 text-bold"},[t._v(t._s(t.totalSaleAmount.toFixed(2))+" "),e("span",{staticClass:"text-h6"},[t._v("ដុល្លា")])]),e("div",{staticClass:"text-subtitle2"},[t._v("ថ្លៃលក់")])]),e("q-card-actions",[e("q-icon",{attrs:{size:"50px",name:"local_atm"}})],1)],1)])],1),e("q-card",{staticClass:"col my-card text-white",style:t.profitOrLose<0?t.LoseStyle:t.ProfitStyle,on:{click:function(a){t.tab="empty-stock"}}},[e("q-card-section",[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"text-h3 text-bold"},[t._v(t._s(parseFloat(t.profitOrLose).toFixed(2))+" "),e("span",{staticClass:"text-h6"},[t._v("ដុល្លា")])]),e("div",{staticClass:"text-subtitle2"},[t._v("ចំណេញ-ខាត")])]),e("q-card-actions",[e("q-icon",{attrs:{size:"50px",name:"local_atm"}})],1)],1)])],1)],1)])],1)],1)},n=[],r=e("967e"),o=e.n(r),i=(e("96cf"),e("fa84")),c=e.n(i),l=e("bd4c"),d={name:"ProfitAndLose",data:function(){return{data:{start_date:this.formatDate(l["b"].subtractFromDate(new Date,{month:1})),end_date:this.formatDate(new Date)},LoseStyle:"background: radial-gradient(circle, #F15451 0%, #505353 100%)",ProfitStyle:"background: radial-gradient(circle, #294EF9 0%, #505353 100%)"}},computed:{getStock:function(){return this.$store.getters["stock/getStocksByDate"].filter((function(t){return"Receive"===t.purchase_status&&0!==t.amount}))},getSale:function(){return this.$store.getters["sale/getSalesByDate"].filter((function(t){return"Receive"===t.sale_status&&0!==t.amount}))},totalStockAmount:function(){var t=0;return this.getStock.map((function(a){t+=a.amount})),t},totalSaleAmount:function(){var t=0;return this.getSale.map((function(a){t+=a.amount})),t},profitOrLose:function(){return this.totalSaleAmount-this.totalStockAmount}},created:function(){var t=this;return c()(o.a.mark((function a(){return o.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.$q.loading.show(),a.next=3,t.$store.dispatch("stock/fetchStockByDate",t.data);case 3:return a.next=5,t.$store.dispatch("sale/fetchSaleByDate",t.data);case 5:t.$q.loading.hide();case 6:case"end":return a.stop()}}),a)})))()},methods:{formatDate:function(t){return l["b"].formatDate(t,"YYYY-MM-DD")},formatDateToString:function(t){return l["b"].formatDate(t,"DD-MMM-YYYY")},onItemClick:function(t){1===t?this.data.start_date=this.formatDate(l["b"].subtractFromDate(new Date,{days:1})):2===t?this.data.start_date=this.formatDate(l["b"].subtractFromDate(new Date,{days:7})):3===t?this.data.start_date=this.formatDate(l["b"].subtractFromDate(new Date,{month:1})):4===t&&(this.data.start_date=this.formatDate(l["b"].subtractFromDate(new Date,{year:1}))),this.getStartDate()},getStartDate:function(){var t=this;return c()(o.a.mark((function a(){return o.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.$q.loading.show(),t.$refs.qDateProxyStart.hide(),a.next=4,t.$store.dispatch("stock/fetchStockByDate",t.data);case 4:return a.next=6,t.$store.dispatch("sale/fetchSaleByDate",t.data);case 6:t.$q.loading.hide();case 7:case"end":return a.stop()}}),a)})))()},getEndDate:function(){var t=this;return c()(o.a.mark((function a(){return o.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.$q.loading.show(),t.$refs.qDateProxyEnd.hide(),a.next=4,t.$store.dispatch("stock/fetchStockByDate",t.data);case 4:return a.next=6,t.$store.dispatch("sale/fetchSaleByDate",t.data);case 6:t.$q.loading.hide();case 7:case"end":return a.stop()}}),a)})))()}}},u=d,p=e("2877"),m=e("eebe"),f=e.n(m),h=e("9989"),q=e("f09f"),v=e("a370"),b=e("2c91"),_=e("f20b"),x=e("0016"),k=e("1c1c"),D=e("66e5"),w=e("4074"),C=e("0170"),y=e("27f9"),g=e("7cbe"),S=e("52ee"),$=e("4b7e"),Q=e("7f67"),F=Object(p["a"])(u,s,n,!1,null,"bb6864f8",null);a["default"]=F.exports;f()(F,"components",{QPage:h["a"],QCard:q["a"],QCardSection:v["a"],QSpace:b["a"],QBtnDropdown:_["a"],QIcon:x["a"],QList:k["a"],QItem:D["a"],QItemSection:w["a"],QItemLabel:C["a"],QInput:y["a"],QPopupProxy:g["a"],QDate:S["a"],QCardActions:$["a"]}),f()(F,"directives",{ClosePopup:Q["a"]})}}]);