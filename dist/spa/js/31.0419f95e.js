(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[31],{"8e51":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-page",{attrs:{padding:""}},[e("q-card",[e("q-card-section",{staticClass:"row items-center q-pb-none"},[e("div",{staticClass:"text-h5 text-bold"},[t._v("អ្នកជម្ងឺ")]),e("q-space"),e("q-btn",{attrs:{size:"20px",icon:"add_circle_outline",flat:"",round:"",to:"/patient/create"}})],1),e("q-card-section",[e("q-table",{staticClass:"table-virtual-scroll",attrs:{data:t.getPatients,columns:t.columns,"row-key":"name",filter:t.filter,"virtual-scroll":"",pagination:t.pagination,"rows-per-page-options":[0],"virtual-scroll-sticky-size-start":48},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"top-right",fn:function(){return[e("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:t._u([{key:"append",fn:function(){return[e("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.filter,callback:function(a){t.filter=a},expression:"filter"}})]},proxy:!0},{key:"body",fn:function(a){return[e("q-tr",{attrs:{props:a}},[e("q-td",{key:"_id",staticClass:"q-gutter-x-xs",attrs:{props:a}},[e("q-btn",{attrs:{flat:"",icon:"more_vert",dense:"",color:"grey",size:"12px"}},[e("q-menu",[e("q-list",{staticStyle:{"min-width":"100px"},attrs:{dense:""}},[e("q-item",{attrs:{clickable:"",to:"/patient/"+a.row._id+"/history"}},[e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"fas fa-eye",size:"15px"}})],1),e("q-item-section",[t._v("\n                        ឆែកប្រវត្តិអ្នកជម្ងឺ\n                      ")]),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1),e("q-separator"),e("q-item",{attrs:{clickable:""},on:{click:function(e){return t.showDetail(a.row._id)}}},[e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"fas fa-edit",size:"15px"}})],1),e("q-item-section",[t._v("\n                        ពិនិត្យអម\n                      ")]),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1),e("q-separator"),e("q-item",{attrs:{clickable:"",to:"/patient/"+a.row._id+"/edit"}},[e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"fas fa-edit",size:"15px"}})],1),e("q-item-section",[t._v("\n                        កែប្រែ\n                      ")]),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1),e("q-separator"),e("q-item",{attrs:{clickable:""},on:{click:function(e){return t.printPatient(a.row._id)}}},[e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"print",size:"15px"}})],1),e("q-item-section",[t._v("\n                        បោះពុម្ភ\n                      ")]),e("q-item-section",{attrs:{side:""}},[e("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1)],1)],1)],1)],1),e("q-td",{key:"thumbnail",attrs:{props:a}},[e("q-avatar",{staticClass:"shadow-1",attrs:{size:"100px"}},[e("q-img",{attrs:{src:a.row.hostname+a.row.photo}})],1)],1),e("q-td",{key:"kh_name",attrs:{props:a}},[t._v("\n              "+t._s(a.row.kh_name)+"\n            ")]),e("q-td",{key:"lt_name",attrs:{props:a}},[t._v("\n              "+t._s(a.row.lt_name)+"\n            ")]),e("q-td",{key:"gender",attrs:{props:a}},[t._v("\n              "+t._s(a.row.gender)+"\n            ")]),e("q-td",{key:"age",attrs:{props:a}},[t._v("\n              "+t._s(a.row.age)+"\n            ")]),e("q-td",{key:"phone",attrs:{props:a}},[t._v("\n              "+t._s(a.row.phone)+"\n            ")])],1)]}}])})],1)],1),e("q-dialog",{attrs:{"full-width":""},model:{value:t.dialog_show,callback:function(a){t.dialog_show=a},expression:"dialog_show"}},[e("q-card",[e("q-card-section",[e("div",{staticClass:"text-h6"},[t._v("បន្ថែមថ្មី+")])]),e("q-card-section",{staticClass:"q-pt-none"},[e("q-card-section",[e("q-form",{ref:"addForm",staticClass:"q-gutter-md",on:{submit:t.onSubmit}},[e("q-card",{staticClass:"my-card bg-grey-1",attrs:{flat:"",bordered:""}},[e("q-card-section",[e("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[e("q-item-label",{staticClass:"col q-my-sm"},[t._v("\n                    ពិនិត្យអម\n                  ")])],1),e("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[e("q-input",{staticClass:"col-md-8 col-xs-12",attrs:{outlined:"",label:"រោគវិនិច្ឆ័យ",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data_detail.diagnosis,callback:function(a){t.$set(t.data_detail,"diagnosis",a)},expression:"data_detail.diagnosis"}}),e("q-input",{staticClass:"col-md col-xs-12",attrs:{label:"ថ្ងៃចូលពិនិត្យ",outlined:"",square:"",mask:"date",rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[e("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[e("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[e("q-date",{on:{input:function(){return t.$refs.qDateProxy.hide()}},model:{value:t.data_detail.date,callback:function(a){t.$set(t.data_detail,"date",a)},expression:"data_detail.date"}})],1)],1)]},proxy:!0}]),model:{value:t.data_detail.date,callback:function(a){t.$set(t.data_detail,"date",a)},expression:"data_detail.date"}})],1),e("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[e("q-input",{staticClass:"col-md-3 col-xs-12",attrs:{outlined:"",label:"TA",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data_detail.ta,callback:function(a){t.$set(t.data_detail,"ta",a)},expression:"data_detail.ta"}}),e("q-input",{staticClass:"col-md-3 col-xs-12",attrs:{outlined:"",label:"T0",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data_detail.t,callback:function(a){t.$set(t.data_detail,"t",a)},expression:"data_detail.t"}}),e("q-input",{staticClass:"col-md-3 col-xs-12",attrs:{outlined:"",label:"SPO2",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data_detail.spo,callback:function(a){t.$set(t.data_detail,"spo",a)},expression:"data_detail.spo"}}),e("q-input",{staticClass:"col-md col-xs-12",attrs:{outlined:"",label:"Poules",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data_detail.poules,callback:function(a){t.$set(t.data_detail,"poules",a)},expression:"data_detail.poules"}})],1),e("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[e("q-input",{staticClass:"col",attrs:{rows:"3",outlined:"",label:"ចំណាំ",type:"textarea",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data_detail.note,callback:function(a){t.$set(t.data_detail,"note",a)},expression:"data_detail.note"}})],1)]),e("q-card-actions",{attrs:{align:"right"}},[e("q-btn",{staticStyle:{width:"150px",height:"40px"},attrs:{icon:"save",color:"primary",label:"រក្សារទុក"},on:{click:function(a){return t.$refs.addForm.submit()}}},[e("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Save")])],1)],1)],1)],1)],1)],1)],1)],1)],1)},i=[],n=e("967e"),o=e.n(n),r=(e("96cf"),e("fa84")),l=e.n(r),d=(e("43b1"),{name:"Patient",data:function(){return{filter:"",pagination:{rowsPerPage:0},columns:[{align:"left",name:"_id",field:"_id"},{align:"left",name:"thumbnail",field:"thumbnail"},{align:"left",name:"kh_name",label:"ឈ្មោះខ្មែរ",field:"kh_name",sortable:!0},{align:"left",name:"lt_name",label:"ឈ្មោះឡាតាំង",field:"lt_name",sortable:!0},{align:"left",name:"gender",label:"ភេទ",field:"gender",sortable:!0},{align:"left",name:"age",label:"អាយុ",field:"age",sortable:!0},{align:"left",name:"phone",label:"លេខទូរសព្ទ",field:"phone",sortable:!0}],dialog_show:!1,data_detail:{diagnosis:null,ta:null,t:null,spo:null,poules:null,note:null,date:null,patient:null}}},computed:{getPatients:function(){return this.$store.getters["patient/getPatient"]}},methods:{printPatient:function(t){var a=this;a.$q.loading.show(),a.$store.dispatch("report/printPatient",t).then((function(t){t.status&&setTimeout((function(){a.$q.loading.hide(),window.open(t.data.pdf,"_blank")}),3e3)}))},showDetail:function(t){var a=this;a.data_detail.patient=t,a.dialog_show=!0},onSubmit:function(){var t=this;return l()(o.a.mark((function a(){var e;return o.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e=t,e.$q.loading.show(),a.next=4,e.$store.dispatch("patient/storePatientDetail",e.data_detail).then((function(t){t.status?(e.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:t.message}),e.$q.loading.hide(),e.dialog_show=!1):e.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:t.message})}));case 4:case"end":return a.stop()}}),a)})))()}}}),c=d,u=e("2877"),p=e("eebe"),m=e.n(p),q=e("9989"),f=e("f09f"),_=e("a370"),b=e("2c91"),g=e("9c40"),h=e("eaac"),w=e("27f9"),x=e("0016"),v=e("bd08"),y=e("db86"),k=e("4e73"),C=e("1c1c"),Q=e("66e5"),$=e("4074"),z=e("eb85"),P=e("cb32"),S=e("068f"),D=e("24e8"),T=e("0378"),I=e("0170"),A=e("7cbe"),F=e("52ee"),J=e("4b7e"),L=e("05c0"),O=Object(u["a"])(c,s,i,!1,null,"1e9bf0ec",null);a["default"]=O.exports;m()(O,"components",{QPage:q["a"],QCard:f["a"],QCardSection:_["a"],QSpace:b["a"],QBtn:g["a"],QTable:h["a"],QInput:w["a"],QIcon:x["a"],QTr:v["a"],QTd:y["a"],QMenu:k["a"],QList:C["a"],QItem:Q["a"],QItemSection:$["a"],QSeparator:z["a"],QAvatar:P["a"],QImg:S["a"],QDialog:D["a"],QForm:T["a"],QItemLabel:I["a"],QPopupProxy:A["a"],QDate:F["a"],QCardActions:J["a"],QTooltip:L["a"]})}}]);