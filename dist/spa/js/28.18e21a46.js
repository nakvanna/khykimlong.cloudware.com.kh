(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[28],{"9dee":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("q-card",[a("q-card-section",{staticClass:"row items-center q-pb-none"},[a("div",{staticClass:"text-h6"},[e._v("ការកំណត់")]),a("q-space"),a("q-btn",{attrs:{icon:"add",flat:"",round:"",to:"/labo-setting/create"}})],1),a("q-card-section",[a("q-table",{staticClass:"table-virtual-scroll",attrs:{data:e.getLaboSettings,columns:e.columns,"row-key":"name",filter:e.filter,"virtual-scroll":"",pagination:e.pagination,"rows-per-page-options":[0],"virtual-scroll-sticky-size-start":48},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"top-right",fn:function(){return[a("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]},proxy:!0},{key:"body",fn:function(t){return[a("q-tr",{attrs:{props:t}},[a("q-td",{key:"_id",staticClass:"q-gutter-x-xs",attrs:{props:t}},[a("q-btn",{attrs:{size:"10px",flat:"",round:"",color:"grey",dense:"",icon:"fas fa-edit",to:"/labo-setting/"+t.row._id+"/edit"}})],1),a("q-td",{key:"type",attrs:{props:t}},[e._v("\n              "+e._s(t.row.type)+"\n            ")]),a("q-td",{key:"name",attrs:{props:t}},[e._v("\n              "+e._s(t.row.name)+"\n            ")]),a("q-td",{key:"value",attrs:{props:t}},[e._v("\n              "+e._s(t.row.value)),a("sup",[e._v(e._s(t.row.superscript))]),e._v(e._s(t.row.unit)+"\n            ")]),a("q-td",{key:"reference",attrs:{props:t}},["HEMATOLOGY"===t.row.type?a("span",[e._v("\n                (N: "+e._s(t.row.min.toFixed(2))+" - "+e._s(t.row.max.toFixed(2))+" )\n              ")]):e._e(),"LEUCOCYTAIRE"===t.row.type?a("span",[e._v("\n                (N: "+e._s(t.row.min.toFixed(2))+" - "+e._s(t.row.max.toFixed(2))+" )\n              ")]):e._e(),"BIOCHIMIE"===t.row.type?a("span",[null===t.row.min?a("span",[e._v("(<"+e._s(t.row.max.toFixed(2))+" )")]):a("span",[e._v("(N: "+e._s(t.row.min.toFixed(2))+" - "+e._s(t.row.max.toFixed(2))+" )")])]):e._e()])],1)]}}])})],1)],1)],1)},r=[],o={name:"LaboSetting",data:function(){return{filter:"",pagination:{rowsPerPage:0},columns:[{align:"left",name:"_id",field:"_id"},{align:"left",name:"type",label:"ប្រភេទ",field:"type",sortable:!0},{align:"left",name:"name",label:"ឈ្មោះ",field:"name",sortable:!0},{align:"left",name:"value",label:"ឯកតា",field:"value",sortable:!0},{align:"left",name:"reference",label:"តម្លៃ",field:"reference",sortable:!0}]}},computed:{getLaboSettings:function(){return this.$store.getters["labo_setting/getLaboSetting"]}},created:function(){var e=this;e.$store.dispatch("labo_setting/fetchLaboSetting")}},s=o,i=a("2877"),l=a("eebe"),c=a.n(l),p=a("9989"),d=a("f09f"),u=a("a370"),f=a("2c91"),_=a("9c40"),b=a("eaac"),g=a("27f9"),m=a("0016"),w=a("bd08"),v=a("db86"),y=Object(i["a"])(s,n,r,!1,null,"16aedd68",null);t["default"]=y.exports;c()(y,"components",{QPage:p["a"],QCard:d["a"],QCardSection:u["a"],QSpace:f["a"],QBtn:_["a"],QTable:b["a"],QInput:g["a"],QIcon:m["a"],QTr:w["a"],QTd:v["a"]})}}]);