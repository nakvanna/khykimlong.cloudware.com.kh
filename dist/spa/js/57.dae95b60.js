(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[57],{a08b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("q-card-actions",{attrs:{align:"left"}},[a("q-btn",{directives:[{name:"go-back",rawName:"v-go-back.single",modifiers:{single:!0}}],staticStyle:{width:"150px"},attrs:{color:"red",icon:"reply",label:"ត្រឡប់ក្រោយ"}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("ថយក្រោយ")])],1)],1),a("q-card-section",{directives:[{name:"show",rawName:"v-show",value:t.is_stay,expression:"is_stay"}]},[a("q-list",{staticClass:"rounded-borders",attrs:{bordered:""}},[a("q-expansion-item",{attrs:{"expand-separator":"",duration:1e3,label:"បន្ថែមថ្នាំ",caption:"សម្រាប់អ្នកជម្ងឺស្នាក់នៅក្នុងបន្ទាប់"},model:{value:t.expand,callback:function(e){t.expand=e},expression:"expand"}},[a("q-card",{staticClass:"my-card bg-grey-1",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("q-form",{ref:"addForm",staticClass:"q-gutter-md",on:{submit:t.onSubmit}},[a("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[a("q-input",{staticClass:"col-3",attrs:{label:"ថ្ងៃលក់ចេញ",outlined:"",square:"",mask:"date",rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{ref:"qSubDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{on:{input:function(){return t.$refs.qSubDateProxy.hide()}},model:{value:t.data.sale_date,callback:function(e){t.$set(t.data,"sale_date",e)},expression:"data.sale_date"}})],1)],1)]},proxy:!0}]),model:{value:t.data.sale_date,callback:function(e){t.$set(t.data,"sale_date",e)},expression:"data.sale_date"}}),a("q-input",{staticClass:"col",attrs:{type:"textarea",rows:"1",outlined:"",label:"ចំណាំ",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data.description,callback:function(e){t.$set(t.data,"description",e)},expression:"data.description"}})],1),a("q-table",{attrs:{separator:"cell",title:"បញ្ចីថ្នាំ នឹងតម្លៃសរុប $"+(t.data.amount=t.totalAmount),data:t.data_detail,columns:t.columns,pagination:t.pagination,"rows-per-page-options":[0],"hide-bottom":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"body",fn:function(e){return[a("q-tr",[a("q-td",[t._v("\n                      "+t._s(e.pageIndex+1)+"\n                    ")]),a("q-td",{key:"name",staticStyle:{width:"300px"}},[a("q-select",{staticClass:"col",attrs:{"use-input":"","input-debounce":"0",behavior:"dialog",options:t.options,square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមជ្រើសរើសចន្លោះ"}]},on:{filter:t.filterFn,input:function(a){return t.onSelect(e.rowIndex,e.row.product_obj)}},scopedSlots:t._u([{key:"no-option",fn:function(){return[a("q-item",[a("q-item-section",{staticClass:"text-grey"},[t._v("\n                              No results\n                            ")])],1)]},proxy:!0}],null,!0),model:{value:e.row.product_obj,callback:function(a){t.$set(e.row,"product_obj",a)},expression:"props.row.product_obj"}})],1),a("q-td",{staticStyle:{width:"200px"}},[a("q-input",{staticClass:"col",attrs:{readonly:"",type:"textarea",rows:"1",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:e.row.description,callback:function(a){t.$set(e.row,"description",a)},expression:"props.row.description"}})],1),a("q-td",[a("q-input",{staticClass:"col",attrs:{type:"number",min:"1",max:e.row.stock_qty,square:"","lazy-rules":"",rules:[function(t){return t<=e.row.stock_qty||"សូមបំពេញចន្លោះ"}]},model:{value:e.row.sale_qty,callback:function(a){t.$set(e.row,"sale_qty",a)},expression:"props.row.sale_qty"}})],1),a("q-td",[a("q-input",{staticClass:"col",attrs:{type:"number",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:e.row.sale_price,callback:function(a){t.$set(e.row,"sale_price",a)},expression:"props.row.sale_price"}})],1),a("q-td",[a("span",{staticClass:"text-bold",staticStyle:{"font-size":"large"}},[t._v("\n                  $"+t._s(e.row.sale_qty*e.row.sale_price)+"\n                ")])]),a("q-td",[a("q-btn",{attrs:{outline:"",round:"",color:"negative",icon:"delete"},on:{click:function(a){return t.removeDataDetail(e.pageIndex)}}})],1)],1)]}}])}),a("q-separator",{attrs:{color:"orange",inset:""}}),a("q-btn",{staticClass:"col",attrs:{outline:"",color:"blue",icon:"add",label:"បន្ថែម"},on:{click:function(e){return t.addDataDetail()}}}),a("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[a("q-input",{staticClass:"col-3",attrs:{type:"number",label:"ថ្លៃជំពាក់",disable:"",square:""},model:{value:t.data.due_balance=t.getDueBalance,callback:function(e){t.$set(t.data,"due_balance = getDueBalance",e)},expression:"data.due_balance = getDueBalance"}})],1)],1)],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{staticStyle:{width:"100px",height:"35px"},attrs:{icon:"save",color:"primary",label:"រក្សារទុក"},on:{click:function(e){t.confirm=!0}}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Save")])],1)],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.confirm,callback:function(e){t.confirm=e},expression:"confirm"}},[a("q-card",[a("q-card-section",{staticClass:"row items-center"},[a("q-avatar",{attrs:{icon:"info",color:"primary","text-color":"white"}}),a("span",{staticClass:"q-ml-sm text-h6"},[t._v("តើអ្នកប្រាកដហើយមែនទេ?")])],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"ទេ",color:"negative"}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"បាទ/ចាស",color:"primary"},on:{click:function(e){return t.$refs.addForm.submit()}}})],1)],1)],1)],1)],1)],1),a("q-card-section",[a("q-table",{staticClass:"table-virtual-scroll-stock",attrs:{title:"ប្រវត្តិនៃការព្យាបាល "+t.data.patient_obj.label,data:t.getSaleByExamine,columns:t.columns_stay,"row-key":"_id",filter:t.filter,"virtual-scroll":"",pagination:t.pagination,"rows-per-page-options":[0],"virtual-scroll-sticky-size-start":48},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"top-right",fn:function(){return[a("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})]},proxy:!0},{key:"body",fn:function(e){return[a("q-tr",{staticClass:"cursor-pointer",attrs:{props:e},on:{click:function(a){return t.$router.push({path:"/sale/"+e.row._id+"/view"})}}},[a("q-td",{key:"amount",staticClass:"q-gutter-x-xs",attrs:{props:e}},[a("span",{staticClass:"text-bold text-primary"},[t._v("$"+t._s(e.row.amount))])]),a("q-td",{key:"paid_amount",staticClass:"q-gutter-x-xs",attrs:{props:e}},[a("span",{staticClass:"text-bold text-warning"},[t._v("$"+t._s(e.row.paid_amount))])]),a("q-td",{key:"due_amount",staticClass:"q-gutter-x-xs",attrs:{props:e}},[a("span",{staticClass:"text-bold text-negative"},[t._v("$"+t._s(e.row.due_amount))])]),a("q-td",{key:"description",staticClass:"q-gutter-x-xs",attrs:{props:e}},[a("q-input",{staticClass:"col",attrs:{readonly:"",type:"textarea",rows:"2",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:e.row.description,callback:function(a){t.$set(e.row,"description",a)},expression:"props.row.description"}})],1),a("q-td",{key:"sale_date",staticClass:"q-gutter-x-xs",attrs:{props:e}},[a("span",{staticClass:"text-bold"},[t._v(t._s(t.dateFormat(e.row.sale_date)))])])],1)]}}])})],1),a("q-card-actions",[a("div",{staticClass:"text-h5 text-left text-bold"},[t._v("\n      តម្លៃត្រូវបង់: $"+t._s(t.totalToPay.toFixed(2))+"\n    ")]),a("q-space"),a("q-btn",{directives:[{name:"show",rawName:"v-show",value:t.is_stay,expression:"is_stay"}],staticStyle:{height:"35px"},attrs:{icon:"attach_money",color:"primary",label:"គិតលុយ/ចាកចេញ"},on:{click:function(e){t.fullWidthDialog=!0}}})],1),a("q-dialog",{attrs:{persistent:"","full-width":"","transition-show":"rotate","transition-hide":"rotate"},model:{value:t.fullWidthDialog,callback:function(e){t.fullWidthDialog=e},expression:"fullWidthDialog"}},[a("q-card",{staticClass:"my-card bg-grey-1",attrs:{flat:"",bordered:""}},[a("q-toolbar",[a("q-toolbar-title",[a("span",{staticClass:"text-weight-bold"},[t._v("អ្នកជម្ងឺចាកចេញ")])]),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1),a("q-card-section",[a("q-form",{ref:"addForm2",staticClass:"q-gutter-md",on:{submit:t.onSubmitPending}},[a("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[a("q-input",{staticClass:"col-3",attrs:{label:"ថ្ងៃលក់ចេញ",outlined:"",square:"",mask:"date",rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{on:{input:function(){return t.$refs.qDateProxy.hide()}},model:{value:t.data_pending.sale_date,callback:function(e){t.$set(t.data_pending,"sale_date",e)},expression:"data_pending.sale_date"}})],1)],1)]},proxy:!0}]),model:{value:t.data_pending.sale_date,callback:function(e){t.$set(t.data_pending,"sale_date",e)},expression:"data_pending.sale_date"}}),a("q-input",{staticClass:"col",attrs:{type:"textarea",rows:"1",outlined:"",label:"ចំណាំ",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data_pending.description,callback:function(e){t.$set(t.data_pending,"description",e)},expression:"data_pending.description"}})],1),a("q-table",{attrs:{separator:"cell",title:"បញ្ចីទំនិញ នឹងតម្លៃសរុប $"+(t.data_pending.amount=t.totalAmountPending),data:t.data_detail_pending,columns:t.columns_pending,pagination:t.pagination,"rows-per-page-options":[0],"hide-bottom":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"body",fn:function(e){return[a("q-tr",[a("q-td",[t._v("\n                  "+t._s(e.pageIndex+1)+"\n                ")]),a("q-td",{key:"name",staticStyle:{width:"300px"}},[a("q-select",{staticClass:"col",attrs:{"use-input":"","input-debounce":"0",behavior:"dialog",options:t.options_pending,square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមជ្រើសរើសចន្លោះ"}]},on:{filter:t.filterFnPending,input:function(a){return t.onSelectPending(e.rowIndex,e.row.product_obj)}},scopedSlots:t._u([{key:"no-option",fn:function(){return[a("q-item",[a("q-item-section",{staticClass:"text-grey"},[t._v("\n                          No results\n                        ")])],1)]},proxy:!0}],null,!0),model:{value:e.row.product_obj,callback:function(a){t.$set(e.row,"product_obj",a)},expression:"props.row.product_obj"}})],1),a("q-td",{staticStyle:{width:"200px"}},[a("q-input",{staticClass:"col",attrs:{readonly:"",type:"textarea",rows:"1",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:e.row.description,callback:function(a){t.$set(e.row,"description",a)},expression:"props.row.description"}})],1),a("q-td",[a("q-input",{staticClass:"col",attrs:{type:"number",min:"1",square:""},model:{value:e.row.sale_qty,callback:function(a){t.$set(e.row,"sale_qty",a)},expression:"props.row.sale_qty"}})],1),a("q-td",[a("q-input",{staticClass:"col",attrs:{type:"number",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:e.row.sale_price,callback:function(a){t.$set(e.row,"sale_price",a)},expression:"props.row.sale_price"}})],1),a("q-td",[a("span",{staticClass:"text-bold",staticStyle:{"font-size":"large"}},[t._v("\n                  $"+t._s(e.row.sale_qty*e.row.sale_price)+"\n                ")])]),a("q-td",[a("q-btn",{attrs:{outline:"",round:"",color:"negative",icon:"delete"},on:{click:function(a){return t.removeDataDetailPending(e.pageIndex)}}})],1)],1)]}}])}),a("q-separator",{attrs:{color:"orange",inset:""}}),a("q-btn",{staticClass:"col",attrs:{outline:"",color:"blue",icon:"add",label:"បន្ថែម"},on:{click:function(e){return t.addDataDetailPending()}}}),a("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[a("q-input",{staticClass:"col-3",attrs:{type:"number",label:"ថ្លៃជំពាក់",disable:"",square:""},model:{value:t.data.due_balance=t.getDueBalancePending,callback:function(e){t.$set(t.data,"due_balance = getDueBalancePending",e)},expression:"data.due_balance = getDueBalancePending"}})],1)],1)],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{staticStyle:{width:"150px",height:"35px"},attrs:{icon:"save",color:"primary",label:"រក្សារទុក"},on:{click:function(e){t.confirm_2=!0}}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Save")])],1)],1)],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.confirm_2,callback:function(e){t.confirm_2=e},expression:"confirm_2"}},[a("q-card",[a("q-card-section",{staticClass:"row items-center"},[a("q-avatar",{attrs:{icon:"info",color:"primary","text-color":"white"}}),a("span",{staticClass:"q-ml-sm text-h6"},[t._v("តើអ្នកប្រាកដហើយមែនទេ?")])],1),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"ទេ",color:"negative"}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"បាទ/ចាស",color:"primary"},on:{click:function(e){return t.$refs.addForm2.submit()}}})],1)],1)],1)],1)},i=[],o=(a("0dbc"),a("5b54"),a("2bf3"),a("b7dd"),a("950c"),a("52b5")),r=a.n(o),s=(a("d946"),a("1a43"),a("c1c3"),a("549c")),l=a.n(s),c=a("eb34"),d=a("caca"),u=[],p=[],_={name:"ExamineSale",data:function(){return{is_stay:!1,expand:!1,confirm:!1,confirm_2:!1,fullWidthDialog:!1,filter:"",pagination:{rowsPerPage:0},data_from_stock_detail:u,options:u,data_from_stock_detail_pending:p,options_pending:p,data_detail:[],data_detail_pending:[],data:{user:null,examine:this.$route.params.id,patient_obj:{label:"ឈ្មោះអ្នកជម្ងឺ"},patient:null,sale_status:"Stay",sale_date:null,description:"",amount:0,paid_amount:0,paid_balance:0,due_balance:0,due_amount:0},data_pending:{user:null,patient_obj:{label:"ឈ្មោះអ្នកជម្ងឺ"},patient:null,sale_status:"Pending",sale_date:null,description:"",amount:0,paid_amount:0,paid_balance:0,due_balance:0,due_amount:0},room_id:null,examination:{patient:null,is_stay:!0,createdAt:null},columns:[{align:"left",name:"no",label:"ល.រ",field:"no",sortable:!0},{align:"left",name:"name",label:"ទំនិញ",field:"name",sortable:!0},{align:"left",name:"description",label:"ចំណាំ",field:"description",sortable:!0},{align:"left",name:"sale_qty",label:"ចំនួន",field:"sale_qty",sortable:!0},{align:"left",name:"sale_price",label:"តម្លៃលក់",field:"sale_price",sortable:!0},{align:"left",name:"total",label:"សរុប/មុខ",field:"total",sortable:!0},{align:"left",name:"option",label:"ដកចេញ",field:"option",sortable:!0}],columns_pending:[{align:"left",name:"no",label:"ល.រ",field:"no",sortable:!0},{align:"left",name:"name",label:"ទំនិញ",field:"name",sortable:!0},{align:"left",name:"description",label:"ចំណាំ",field:"description",sortable:!0},{align:"left",name:"sale_qty",label:"ចំនួន",field:"sale_qty",sortable:!0},{align:"left",name:"sale_price",label:"តម្លៃលក់",field:"sale_price",sortable:!0},{align:"left",name:"total",label:"សរុប/មុខ",field:"total",sortable:!0},{align:"left",name:"option",label:"ដកចេញ",field:"option",sortable:!0}],columns_stay:[{align:"left",name:"amount",label:"សរុប",field:"amount",sortable:!0},{align:"left",name:"paid_amount",label:"ថ្លៃចំណាយ",field:"paid_amount",sortable:!0},{align:"left",name:"due_amount",label:"ថ្លៃជំពាក់",field:"due_amount",sortable:!0},{align:"left",name:"description",label:"ចំណាំ",field:"description",sortable:!0},{align:"left",name:"sale_date",label:"កាលបរិច្ឆេទ",field:"sale_date",sortable:!0}]}},created:function(){var t=this;return l()(r.a.mark((function e(){var a;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,a.data.user=d["a"].getItem("userInfo")["user_info"]._id,a.$q.loading.show(),e.next=5,a.$store.dispatch("stock/fetchStockDetailForSale").then((function(t){t.status&&(a.data_from_stock_detail_pending=t.data.map((function(t){return{label:t.product.name,description:t.product.description,stock_qty:t.stock_qty,sale_price:t.sale_price,buy_price:t.buy_price,invent_type:t.invent_type,product_id:t.product._id,stock_detail_id:t._id}})),a.$q.loading.hide())}));case 5:return e.next=7,a.$store.dispatch("stock/fetchStockDetailForSale").then((function(t){var e=[];t.status&&(t.data.map((function(t){var n=e.findIndex((function(e){return e.pro_name===t.product.name}));-1===n?e.push({pro_name:t.product.name,label:"Service"===t.invent_type?t.product.name:t.product.name+t.stock_qty,description:t.product.description,stock_qty:t.stock_qty,sale_price:t.sale_price,buy_price:t.buy_price,invent_type:t.invent_type,product_id:t.product._id,stock_detail_id:t._id}):(e[n].stock_qty+=t.stock_qty,e[n].label="Service"===t.invent_type?t.product.name:t.product.name+e[n].stock_qty,t.stock_qty<=0&&(e[n].stock_detail_id=t._id)),a.data_from_stock_detail=e})),a.$q.loading.hide())}));case 7:return e.next=9,a.$store.dispatch("examine/fetchExamineByID",a.$route.params.id).then((function(t){a.is_stay=t.data.is_stay,a.room_id=t.data.room._id,a.examination={patient:t.data.patient._id,createdAt:t.data.createdAt},a.data.patient_obj={label:t.data.patient.kh_name,_id:t.data.patient._id},a.data_pending.patient_obj={label:t.data.patient.kh_name,_id:t.data.patient._id}}));case 9:return e.next=11,a.$store.dispatch("sale/fetchSaleByExamination",a.$route.params.id);case 11:case"end":return e.stop()}}),e)})))()},computed:{getSaleByExamine:function(){return this.$store.getters["sale/getSalesByExamined"]},totalToPay:function(){var t=0;return this.getSaleByExamine.map((function(e){t+=e.amount})),t},totalAmount:function(){var t=this,e=t.data_detail.map((function(t){return{total:t.sale_qty*t.sale_price}})),a=0;return e.forEach((function(t){a+=t.total})),a},getDueBalance:function(){return this.totalAmount-this.data.paid_balance},totalAmountPending:function(){var t=this,e=t.data_detail_pending.map((function(t){return{total:t.sale_qty*t.sale_price}})),a=0;return e.forEach((function(t){a+=t.total})),a},getDueBalancePending:function(){return this.totalAmountPending-this.data_pending.paid_balance}},methods:{dateFormat:function(t){return c["b"].formatDate(t,"DD/MM/YYYY")},onSubmit:function(){var t=this;return l()(r.a.mark((function e(){var a,n,i;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,a.$q.loading.show(),n=a.data,i=a.data_detail,n.patient=n.patient_obj._id,n.paid_amount=n.paid_balance,n.due_amount=n.due_balance,e.next=9,a.$store.dispatch("sale/storeSale",n).then(function(){var t=l()(r.a.mark((function t(e){var o,s;return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.status){t.next=6;break}return t.next=3,e.data._id;case 3:o=t.sent,s=i.map(function(){var t=l()(r.a.mark((function t(e){return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.sale_status=n.sale_status,e.sale=o,t.next=4,a.$store.dispatch("sale/storeSaleDetail",e);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Promise.all(s).then(l()(r.a.mark((function t(){return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.$store.dispatch("sale/fetchSaleByExamination",a.$route.params.id).then(function(){var t=l()(r.a.mark((function t(e){return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.status){t.next=5;break}return t.next=3,a.$store.dispatch("stock/fetchStockDetailForReport");case 3:a.expand=!1,a.$q.loading.hide();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}}),t)}))));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 9:case"end":return e.stop()}}),e)})))()},onSelect:function(t,e){var a=this.data_from_stock_detail.findIndex((function(t){return t.label===e})),n=this.data_detail[t],i=this.data_from_stock_detail[a];n.description=i.description,n.product=i.product_id,n.sale_price=i.sale_price,n.buy_price=i.buy_price,n.stock_qty=i.stock_qty,n.invent_type=i.invent_type,n.stock_detail_id=i.stock_detail_id},onSelectPending:function(t,e){var a=this.data_from_stock_detail_pending.findIndex((function(t){return t.label===e})),n=this.data_detail_pending[t],i=this.data_from_stock_detail_pending[a];n.description=i.description,n.product=i.product_id,n.sale_price=i.sale_price,n.buy_price=i.buy_price,n.stock_qty=i.stock_qty,n.invent_type=i.invent_type,n.stock_detail_id=i.stock_detail_id},removeDataDetail:function(t){this.data_detail.splice(t,1)},addDataDetail:function(){this.data_detail.push({sale:null,stock_detail_id:null,invent_type:null,product:null,product_obj:null,description:"",sale_qty:1,buy_price:0,sale_price:0})},onSubmitPending:function(){var t=this;return l()(r.a.mark((function e(){var a,n,i;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,a.$q.loading.show(),n=a.data_pending,i=a.data_detail_pending,n.patient=n.patient_obj._id,n.paid_amount=n.paid_balance,n.due_amount=n.due_balance,e.next=9,a.$store.dispatch("sale/storeSale",n).then(function(){var t=l()(r.a.mark((function t(e){var o,s;return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log(e),!e.status){t.next=7;break}return t.next=4,e.data._id;case 4:o=t.sent,s=i.map(function(){var t=l()(r.a.mark((function t(e){return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.sale_status=n.sale_status,e.sale=o,t.next=4,a.$store.dispatch("sale/storeSaleDetail",e);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Promise.all(s).then(l()(r.a.mark((function t(){return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.$store.dispatch("sale/fetchSaleAfterDetail",o).then(function(){var t=l()(r.a.mark((function t(e){return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log(e),!e.status){t.next=8;break}return t.next=4,a.$store.dispatch("stock/fetchStockDetailForReport");case 4:return t.next=6,a.$store.dispatch("examine/updateStayExamine",{examine_id:a.$route.params.id,room_id:a.room_id});case 6:a.$q.loading.hide(),window.history.back();case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 2:case"end":return t.stop()}}),t)}))));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 9:case"end":return e.stop()}}),e)})))()},removeDataDetailPending:function(t){this.data_detail_pending.splice(t,1)},addDataDetailPending:function(){this.data_detail_pending.push({sale:null,stock_detail_id:null,invent_type:null,product:null,product_obj:null,description:"",sale_qty:1,buy_price:0,sale_price:0})},filterFn:function(t,e){var a=this;e(""!==t?function(){var e=t.toLowerCase();a.options=a.data_from_stock_detail.map((function(t){return t.label})).filter((function(t){return t.toLowerCase().indexOf(e)>-1}))}:function(){a.options=a.data_from_stock_detail.map((function(t){return t.label}))})},filterFnPending:function(t,e){var a=this;e(""!==t?function(){var e=t.toLowerCase();a.options_pending=a.data_from_stock_detail_pending.map((function(t){return t.label})).filter((function(t){return t.toLowerCase().indexOf(e)>-1}))}:function(){a.options_pending=a.data_from_stock_detail_pending.map((function(t){return t.label}))})}}},f=_,m=a("a6c2"),b=a("63c1"),g=a.n(b),q=a("505d"),y=a("84df"),h=a("ef9c"),x=a("3676"),v=a("7006"),w=a("692f"),k=a("953d"),S=a("5ce7"),C=a("3548"),$=a("a3be"),D=a("19dc"),P=a("5142"),Q=a("7213"),j=a("3846"),B=a("3bc2"),I=a("7b08"),F=a("f636"),z=a("e0e9"),E=a("6c44"),A=a("3f5f"),N=a("ec6d"),T=a("d6e3"),L=a("dc01"),W=a("66cf"),Y=a("309f"),O=a("406f"),J=a("f6b1"),M=Object(m["a"])(f,n,i,!1,null,"99912c7e",null);e["default"]=M.exports;g()(M,"components",{QPage:q["a"],QCardActions:y["a"],QBtn:h["a"],QTooltip:x["a"],QCardSection:v["a"],QList:w["a"],QExpansionItem:k["a"],QCard:S["a"],QForm:C["a"],QInput:$["a"],QIcon:D["a"],QPopupProxy:P["a"],QDate:Q["a"],QTable:j["a"],QTr:B["a"],QTd:I["a"],QSelect:F["a"],QItem:z["a"],QItemSection:E["a"],QSeparator:A["a"],QDialog:N["a"],QAvatar:T["a"],QSpace:L["a"],QToolbar:W["a"],QToolbarTitle:Y["a"]}),g()(M,"directives",{GoBack:O["a"],ClosePopup:J["a"]})}}]);