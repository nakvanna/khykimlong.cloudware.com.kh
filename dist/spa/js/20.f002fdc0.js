(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"5fe4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("q-card",[a("q-card-section",{staticClass:"row items-center q-pb-none"},[a("div",{staticClass:"text-h5 text-bold"},[t._v("ពិនិត្រអេកូ")]),a("q-space"),a("q-btn",{attrs:{size:"20px",icon:"add_circle_outline",flat:"",round:"",to:"/echo-note/create"}})],1),a("q-card-section",[a("q-table",{staticClass:"table-virtual-scroll",attrs:{data:t.getEchoNote,columns:t.columns,"row-key":"name",filter:t.filter,"virtual-scroll":"",pagination:t.pagination,"rows-per-page-options":[0],"virtual-scroll-sticky-size-start":48},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"top-right",fn:function(){return[a("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})]},proxy:!0},{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"_id",staticClass:"q-gutter-x-xs",attrs:{props:e}},[a("q-btn",{attrs:{flat:"",icon:"more_vert",dense:"",color:"grey",size:"12px"}},[a("q-menu",[a("q-list",{staticStyle:{"min-width":"100px"},attrs:{dense:""}},[a("q-item",{attrs:{clickable:"",to:"/echo-note/"+e.row._id+"/edit"}},[a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-edit",size:"15px"}})],1),a("q-item-section",[t._v("\n                        កែប្រែ\n                      ")]),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"keyboard_arrow_right",size:"15px"}})],1)],1),a("q-separator")],1)],1)],1)],1),a("q-td",{key:"photo",attrs:{props:e}},[a("q-avatar",{staticClass:"shadow-1",attrs:{size:"100px"}},[a("q-img",{attrs:{src:t.hostname+e.row.patient.photo}})],1)],1),a("q-td",{key:"kh_name",attrs:{props:e}},[t._v("\n              "+t._s(e.row.patient.kh_name)+"\n            ")]),a("q-td",{key:"title",attrs:{props:e}},[t._v("\n              "+t._s(e.row.title)+"\n            ")]),a("q-td",{key:"doctor",attrs:{props:e}},[t._v("\n              "+t._s(e.row.doctor)+"\n            ")]),a("q-td",{key:"createdAt",attrs:{props:e}},[t._v("\n              "+t._s(t.dateFormat(e.row.check_date))+"\n            ")])],1)]}}])})],1)],1)],1)},o=[],r=a("967e"),s=a.n(r),i=(a("96cf"),a("fa84")),c=a.n(i),l=a("bd4c"),d={name:"Echo",data:function(){return{hostname:"https://api.khykimlong.cloudware.com.kh/",filter:"",pagination:{rowsPerPage:0},columns:[{align:"left",name:"_id",field:"_id"},{align:"left",name:"photo",field:"photo"},{align:"left",name:"kh_name",label:"អ្នកជម្ងឺ",field:"kh_name",sortable:!0},{align:"left",name:"title",label:"ចំណងជើង",field:"title",sortable:!0},{align:"left",name:"doctor",label:"ពិនិត្យដោយ",field:"doctor",sortable:!0},{align:"left",name:"createdAt",label:"កាលបរិច្ឆេទ",field:"createdAt"}]}},computed:{getEchoNote:function(){return this.$store.getters["echo_note/getEchoNotes"]}},methods:{dateFormat:function(t){return l["b"].formatDate(t,"DD/MM/YYYY")},printEchoBaby:function(t){var e=this;return c()(s.a.mark((function a(){var n;return s.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e,n.$q.loading.show(),a.next=4,n.$store.dispatch("report/printEchoBaby",t).then((function(t){t.status&&setTimeout((function(){n.$q.loading.hide(),window.open(t.data.pdf,"_blank")}),1500)}));case 4:case"end":return a.stop()}}),a)})))()},downloadEchoBaby:function(t){var e=this;return c()(s.a.mark((function a(){var n;return s.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e,n.$q.loading.show(),a.next=4,n.$store.dispatch("report/downloadEchoBabyDocx",t).then((function(t){t.status?n.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"Successfully downloaded DOCX's file!"}):n.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"Error download DOCX's file!"}),n.$q.loading.hide()}));case 4:case"end":return a.stop()}}),a)})))()}}},p=d,u=a("2877"),f=a("eebe"),h=a.n(f),m=a("9989"),w=a("f09f"),q=a("a370"),b=a("2c91"),g=a("9c40"),_=a("eaac"),k=a("27f9"),y=a("0016"),v=a("bd08"),x=a("db86"),Q=a("4e73"),C=a("1c1c"),E=a("66e5"),$=a("4074"),S=a("eb85"),z=a("cb32"),D=a("068f"),B=Object(u["a"])(p,n,o,!1,null,"2eca68e2",null);e["default"]=B.exports;h()(B,"components",{QPage:m["a"],QCard:w["a"],QCardSection:q["a"],QSpace:b["a"],QBtn:g["a"],QTable:_["a"],QInput:k["a"],QIcon:y["a"],QTr:v["a"],QTd:x["a"],QMenu:Q["a"],QList:C["a"],QItem:E["a"],QItemSection:$["a"],QSeparator:S["a"],QAvatar:z["a"],QImg:D["a"]})}}]);