(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[25],{"56b8":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("q-card",[a("q-card-section",{staticClass:"row items-center q-pb-none"},[a("div",{staticClass:"text-h5 text-bold"},[t._v("ពិនិត្រឡាបូ")]),a("q-space"),a("q-btn",{attrs:{size:"20px",icon:"add_circle_outline",flat:"",round:"",to:"/labo/create"}})],1),a("q-card-section",[a("q-table",{staticClass:"table-virtual-scroll",attrs:{data:t.getLabos,columns:t.columns,"row-key":"name",filter:t.filter,"virtual-scroll":"",pagination:t.pagination,"rows-per-page-options":[0],"virtual-scroll-sticky-size-start":48},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"top-right",fn:function(){return[a("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})]},proxy:!0},{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"_id",staticClass:"q-gutter-x-xs",attrs:{props:e}},[a("q-btn",{attrs:{flat:"",icon:"more_vert",dense:"",color:"grey",size:"12px"}},[a("q-menu",[a("q-list",{staticStyle:{"min-width":"100px"},attrs:{dense:""}},[a("q-item",{attrs:{clickable:""},on:{click:function(a){return t.cashierLabo(e.row.patient._id)}}},[a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"money",size:"15px"}})],1),a("q-item-section",[t._v("\n                        គិតលុយ\n                      ")]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1),a("q-item",{attrs:{clickable:"",to:"/labo/"+e.row._id+"/edit"}},[a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-edit",size:"15px"}})],1),a("q-item-section",[t._v("\n                        បង្ហាញ & កែប្រែ\n                      ")]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1),a("q-separator"),a("q-item",{attrs:{clickable:""},on:{click:function(a){return t.printLabo(e.row._id)}}},[a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"print",size:"15px"}})],1),a("q-item-section",[t._v("\n                        បោះពុម្ព\n                      ")]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1),a("q-separator"),a("q-item",{attrs:{clickable:""},on:{click:function(a){return t.downloadLabo(e.row._id)}}},[a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"print",size:"15px"}})],1),a("q-item-section",[t._v("\n                        ទាញយកជា file docx\n                      ")]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1)],1)],1)],1)],1),a("q-td",{key:"photo",attrs:{props:e}},[a("q-avatar",{staticClass:"shadow-1",attrs:{size:"100px"}},[a("q-img",{attrs:{src:t.hostname+e.row.patient.photo}})],1)],1),a("q-td",{key:"kh_name",attrs:{props:e}},[t._v("\n              "+t._s(e.row.patient.kh_name)+"\n            ")]),a("q-td",{key:"title",attrs:{props:e}},[t._v("\n              "+t._s(e.row.title)+"\n            ")]),a("q-td",{key:"doctor",attrs:{props:e}},[t._v("\n              "+t._s(e.row.doctor)+"\n            ")]),a("q-td",{key:"pay_status",attrs:{props:e}},[e.row.pay_status?a("span",[t._v("បានគិតលុយ")]):a("span",[t._v("មិនទាន់គិតលុយ")])]),a("q-td",{key:"createdAt",attrs:{props:e}},[t._v("\n              "+t._s(t.dateFormat(e.row.createdAt))+"\n            ")])],1)]}}])})],1)],1),a("q-dialog",{attrs:{persistent:"","full-width":"","transition-show":"rotate","transition-hide":"rotate"},model:{value:t.fullWidthDialog,callback:function(e){t.fullWidthDialog=e},expression:"fullWidthDialog"}},[a("q-card",{staticClass:"my-card bg-grey-1",attrs:{flat:"",bordered:""}},[a("q-toolbar",[a("q-toolbar-title",[a("span",{staticClass:"text-weight-bold"},[t._v("អ្នកជម្ងឺចាកចេញ")])]),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1),a("q-card-section",[a("q-form",{ref:"addForm2",staticClass:"q-gutter-md",on:{submit:t.onSubmitPending}},[a("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[a("q-input",{staticClass:"col-3",attrs:{label:"ថ្ងៃលក់ចេញ",outlined:"",square:"",mask:"date",rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{on:{input:function(){return t.$refs.qDateProxy.hide()}},model:{value:t.data_pending.sale_date,callback:function(e){t.$set(t.data_pending,"sale_date",e)},expression:"data_pending.sale_date"}})],1)],1)]},proxy:!0}]),model:{value:t.data_pending.sale_date,callback:function(e){t.$set(t.data_pending,"sale_date",e)},expression:"data_pending.sale_date"}}),a("q-input",{staticClass:"col",attrs:{type:"textarea",rows:"1",outlined:"",label:"ចំណាំ",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data_pending.description,callback:function(e){t.$set(t.data_pending,"description",e)},expression:"data_pending.description"}})],1),a("q-table",{attrs:{separator:"cell",title:"បញ្ចីទំនិញ នឹងតម្លៃសរុប $"+(t.data_pending.amount=t.totalAmountPending),data:t.data_detail_pending,columns:t.columns_pending,pagination:t.pagination,"rows-per-page-options":[0],"hide-bottom":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"body",fn:function(e){return[a("q-tr",[a("q-td",[t._v("\n                  "+t._s(e.pageIndex+1)+"\n                ")]),a("q-td",{key:"name",staticStyle:{width:"300px"}},[a("q-select",{staticClass:"col",attrs:{"use-input":"","input-debounce":"0",behavior:"dialog",options:t.options_pending,square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមជ្រើសរើសចន្លោះ"}]},on:{filter:t.filterFnPending,input:function(a){return t.onSelectPending(e.rowIndex,e.row.product_obj)}},scopedSlots:t._u([{key:"no-option",fn:function(){return[a("q-item",[a("q-item-section",{staticClass:"text-grey"},[t._v("\n                          No results\n                        ")])],1)]},proxy:!0}],null,!0),model:{value:e.row.product_obj,callback:function(a){t.$set(e.row,"product_obj",a)},expression:"props.row.product_obj"}})],1),a("q-td",{staticStyle:{width:"200px"}},[a("q-input",{staticClass:"col",attrs:{readonly:"",type:"textarea",rows:"1",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:e.row.description,callback:function(a){t.$set(e.row,"description",a)},expression:"props.row.description"}})],1),a("q-td",[a("q-input",{staticClass:"col",attrs:{type:"number",min:"1",square:""},model:{value:e.row.sale_qty,callback:function(a){t.$set(e.row,"sale_qty",a)},expression:"props.row.sale_qty"}})],1),a("q-td",[a("q-input",{staticClass:"col",attrs:{type:"number",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:e.row.sale_price,callback:function(a){t.$set(e.row,"sale_price",a)},expression:"props.row.sale_price"}})],1),a("q-td",[a("span",{staticClass:"text-bold",staticStyle:{"font-size":"large"}},[t._v("\n                  $"+t._s(e.row.sale_qty*e.row.sale_price)+"\n                ")])]),a("q-td",[a("q-btn",{attrs:{outline:"",round:"",color:"negative",icon:"delete"},on:{click:function(a){return t.removeDataDetailPending(e.pageIndex)}}})],1)],1)]}}])}),a("q-separator",{attrs:{color:"orange",inset:""}}),a("q-btn",{staticClass:"col",attrs:{outline:"",color:"blue",icon:"add",label:"បន្ថែម"},on:{click:function(e){return t.addDataDetailPending()}}}),a("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[a("q-input",{staticClass:"col-3",attrs:{type:"number",label:"ថ្លៃជំពាក់",disable:"",square:""},model:{value:t.data.due_balance=t.getDueBalancePending,callback:function(e){t.$set(t.data,"due_balance = getDueBalancePending",e)},expression:"data.due_balance = getDueBalancePending"}})],1)],1)],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{staticStyle:{width:"150px",height:"35px"},attrs:{icon:"save",color:"primary",label:"រក្សារទុក"},on:{click:function(e){return t.$refs.addForm2.submit()}}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Save")])],1)],1)],1)],1),t._v("\n  "+t._s(t.is_store)+"\n")],1)},i=[],r=(a("8e6e"),a("8a81"),a("456d"),a("c47a")),o=a.n(r),s=(a("20d6"),a("551c"),a("ac6a"),a("cadf"),a("06db"),a("5df3"),a("967e")),l=a.n(s),c=(a("7f7f"),a("96cf"),a("fa84")),d=a.n(c),u=a("bd4c"),p=a("b06b");function _(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function f(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?_(Object(a),!0).forEach((function(e){o()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):_(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var b=[],m={name:"Labo",data:function(){return{is_store:!0,fullWidthDialog:!1,hostname:"https://api.khykimlong.cloudware.com.kh/",filter:"",pagination:{rowsPerPage:0},columns:[{align:"left",name:"_id",field:"_id"},{align:"left",name:"photo",field:"photo"},{align:"left",name:"kh_name",label:"អ្នកជម្ងឺ",field:"kh_name",sortable:!0},{align:"left",name:"title",label:"ចំណងជើង",field:"title",sortable:!0},{align:"left",name:"doctor",label:"ពិនិត្យដោយ",field:"doctor",sortable:!0},{align:"left",name:"pay_status",label:"គិតលុយ",field:"pay_status",sortable:!0},{align:"left",name:"createdAt",label:"កាលបរិច្ឆេទ",field:"createdAt"}],data_pending:{user:null,patient_obj:{label:"ឈ្មោះអ្នកជម្ងឺ"},patient:null,sale_status:"Pending",sale_date:null,description:"",amount:0,paid_amount:0,paid_balance:0,due_balance:0,due_amount:0},columns_pending:[{align:"left",name:"no",label:"ល.រ",field:"no",sortable:!0},{align:"left",name:"name",label:"ទំនិញ",field:"name",sortable:!0},{align:"left",name:"description",label:"ចំណាំ",field:"description",sortable:!0},{align:"left",name:"sale_qty",label:"ចំនួន",field:"sale_qty",sortable:!0},{align:"left",name:"sale_price",label:"តម្លៃលក់",field:"sale_price",sortable:!0},{align:"left",name:"total",label:"សរុប/មុខ",field:"total",sortable:!0},{align:"left",name:"option",label:"ដកចេញ",field:"option",sortable:!0}],data_detail_pending:[],data:{user:null,examine:this.$route.params.id,patient_obj:{label:"ឈ្មោះអ្នកជម្ងឺ"},patient:null,sale_status:"Stay",sale_date:null,description:"",amount:0,paid_amount:0,paid_balance:0,due_balance:0,due_amount:0},options_pending:b}},created:function(){var t=this;return d()(l.a.mark((function e(){var a;return l.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,e.next=3,a.$store.dispatch("stock/fetchStockDetailForSale").then((function(t){t.status&&(a.data_from_stock_detail_pending=t.data.map((function(t){return{label:t.product.name,description:t.product.description,stock_qty:t.stock_qty,sale_price:t.sale_price,buy_price:t.buy_price,invent_type:t.invent_type,product_id:t.product._id,stock_detail_id:t._id}})),a.$q.loading.hide())}));case 3:case"end":return e.stop()}}),e)})))()},computed:{getLabos:function(){return this.$store.getters["labo/getLabos"]},getDueBalancePending:function(){return this.totalAmountPending-this.data_pending.paid_balance},totalAmountPending:function(){var t=this,e=t.data_detail_pending.map((function(t){return{total:t.sale_qty*t.sale_price}})),a=0;return e.forEach((function(t){a+=t.total})),a}},methods:{onSubmitPending:function(){var t=this;return d()(l.a.mark((function e(){var a,n,i;return l.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t,n=a.data_pending,i=a.data_detail_pending,n.paid_amount=n.paid_balance,n.due_amount=n.due_balance,!a.is_store){e.next=10;break}return e.next=8,a.$store.dispatch("sale/storeSale",n).then(function(){var t=d()(l.a.mark((function t(e){var r,o;return l.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.status){t.next=6;break}return t.next=3,e.data._id;case 3:r=t.sent,o=i.map(function(){var t=d()(l.a.mark((function t(e){return l.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.sale_status=n.sale_status,e.sale=r,t.next=4,a.$store.dispatch("sale/storeSaleDetail",e);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Promise.all(o).then(d()(l.a.mark((function t(){return l.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.$store.dispatch("sale/fetchSaleAfterDetail",r).then(function(){var t=d()(l.a.mark((function t(e){return l.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.status&&(a.$q.loading.hide(),window.history.back());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}}),t)}))));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 8:e.next=11;break;case 10:a.$store.dispatch("sale/deleteSaleDetail",n._id).then(function(){var t=d()(l.a.mark((function t(e){return l.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.status){t.next=3;break}return t.next=3,a.$store.dispatch("sale/updateSale",n).then((function(t){if(t.status){var e=i.map(function(){var t=d()(l.a.mark((function t(e){return l.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.sale=n._id,e.sale_status=n.sale_status,t.next=4,a.$store.dispatch("sale/storeSaleDetail",e);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());Promise.all(e).then(d()(l.a.mark((function t(){return l.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.$store.dispatch("sale/fetchSaleAfterDetail",n._id).then(function(){var t=d()(l.a.mark((function t(e){return l.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.status&&(a.$q.loading.hide(),window.history.back());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}}),t)}))))}}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 11:case"end":return e.stop()}}),e)})))()},printLabo:function(t){var e=this;e.$q.loading.show(),e.$store.dispatch("report/printLabo",t).then((function(t){t.status&&setTimeout(d()(l.a.mark((function a(){return l.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(p["a"])(t.data.pdf);case 2:return a.next=4,e.$q.loading.hide();case 4:case"end":return a.stop()}}),a)}))),3e3)}))},downloadLabo:function(t){var e=this;return d()(l.a.mark((function a(){var n;return l.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e,n.$q.loading.show(),a.next=4,n.$store.dispatch("report/downloadLabo",t).then((function(t){t.status?n.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"Successfully downloaded DOCX's file!"}):n.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"Error download DOCX's file!"}),n.$q.loading.hide()}));case 4:case"end":return a.stop()}}),a)})))()},dateFormat:function(t){return u["b"].formatDate(t,"YYYY/MM/DD")},removeDataDetailPending:function(t){this.data_detail_pending.splice(t,1)},addDataDetailPending:function(){this.data_detail_pending.push({sale:null,stock_detail_id:null,invent_type:null,product:null,product_obj:null,description:"",sale_qty:1,buy_price:0,sale_price:0})},onSelectPending:function(t,e){var a=this.data_from_stock_detail_pending.findIndex((function(t){return t.label===e})),n=this.data_detail_pending[t],i=this.data_from_stock_detail_pending[a];n.description=i.description,n.product=i.product_id,n.sale_price=i.sale_price,n.buy_price=i.buy_price,n.stock_qty=i.stock_qty,n.invent_type=i.invent_type,n.stock_detail_id=i.stock_detail_id},cashierLabo:function(t){var e=this;e.data_pending.patient=t,e.$store.dispatch("sale/fetchSaleByPatient",t).then((function(t){t.data.length?(e.is_store=!1,e.data_pending=[],e.data_detail_pending=[],e.data_pending=t.data[0],e.data_pending.sale_date=e.dateFormat(t.data[0].sale_date),e.$store.dispatch("sale/fetchSaleDetailBySale",t.data[0]._id).then((function(t){e.data_detail_pending=t.data.map((function(t){return f(f({},t),{},{product_obj:{label:t.product.name,name:t.product.name,_id:t.product._id},product:t.product._id,invent_type:t.product.invent_type,description:t.product.description})}))}))):(e.is_store=!0,e.data_pending=[],e.data_detail_pending=[]),e.fullWidthDialog=!0}))},filterFnPending:function(t,e){var a=this;e(""!==t?function(){var e=t.toLowerCase();a.options_pending=a.data_from_stock_detail_pending.map((function(t){return t.label})).filter((function(t){return t.toLowerCase().indexOf(e)>-1}))}:function(){a.options_pending=a.data_from_stock_detail_pending.map((function(t){return t.label}))})}}},g=m,h=a("2877"),q=a("eebe"),w=a.n(q),y=a("9989"),v=a("f09f"),k=a("a370"),x=a("2c91"),D=a("9c40"),P=a("eaac"),S=a("27f9"),$=a("0016"),C=a("bd08"),Q=a("db86"),O=a("4e73"),j=a("1c1c"),z=a("66e5"),L=a("4074"),A=a("eb85"),F=a("cb32"),I=a("068f"),T=a("24e8"),B=a("65c6"),E=a("6ac5"),W=a("0378"),Y=a("7cbe"),M=a("52ee"),J=a("ddd8"),N=a("4b7e"),X=a("05c0"),G=a("7f67"),H=Object(h["a"])(g,n,i,!1,null,"6e0ff03b",null);e["default"]=H.exports;w()(H,"components",{QPage:y["a"],QCard:v["a"],QCardSection:k["a"],QSpace:x["a"],QBtn:D["a"],QTable:P["a"],QInput:S["a"],QIcon:$["a"],QTr:C["a"],QTd:Q["a"],QMenu:O["a"],QList:j["a"],QItem:z["a"],QItemSection:L["a"],QSeparator:A["a"],QAvatar:F["a"],QImg:I["a"],QDialog:T["a"],QToolbar:B["a"],QToolbarTitle:E["a"],QForm:W["a"],QPopupProxy:Y["a"],QDate:M["a"],QSelect:J["a"],QCardActions:N["a"],QTooltip:X["a"]}),w()(H,"directives",{ClosePopup:G["a"]})}}]);