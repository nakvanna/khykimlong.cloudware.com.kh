(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"6ddb":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("q-card",[a("q-card-section",{staticClass:"row items-center q-pb-none"},[a("div",{staticClass:"text-h6"},[t._v("ការណែនាំ")]),a("q-space"),a("q-btn",{attrs:{icon:"add",flat:"",round:"",to:"/blog/create"}})],1),a("q-card-section",[a("q-table",{staticClass:"table-virtual-scroll",attrs:{data:t.getDocument,columns:t.columns,"row-key":"name",filter:t.filter,"virtual-scroll":"",pagination:t.pagination,"rows-per-page-options":[0],"virtual-scroll-sticky-size-start":48},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"_id",staticClass:"q-gutter-x-xs",attrs:{props:e}},[a("q-btn",{attrs:{size:"10px",flat:"",round:"",color:"grey",dense:"",icon:"fas fa-eye",to:"/documents/"+e.row._id+"/edit"}})],1),a("q-td",{key:"title",attrs:{props:e}},[t._v("\n              "+t._s(e.row.title)+"\n            ")]),a("q-td",{key:"auth",attrs:{props:e}},[t._v("\n              "+t._s(e.row.auth)+"\n            ")]),a("q-td",{key:"isPublished",attrs:{props:e}},[t._v("\n              "+t._s(e.row.isPublished)+"\n            ")]),a("q-td",{key:"createdAt",attrs:{props:e}},[t._v("\n              "+t._s(e.row.createdAt)+"\n            ")])],1)]}}])})],1)],1)],1)},r=[],s=a("967e"),i=a.n(s),o=(a("96cf"),a("fa84")),l=a.n(o),c={name:"Document",data:function(){return{getDocument:[],filter:"",pagination:{rowsPerPage:0},columns:[{align:"left",name:"_id",field:"_id"},{align:"left",name:"title",label:"Title",field:"title",sortable:!0},{align:"left",name:"auth",label:"Author",field:"auth"},{align:"left",name:"isPublished",label:"Published",field:"isPublished"},{align:"left",name:"createdAt",label:"Date",field:"createdAt"}]}},created:function(){var t=this;return l()(i.a.mark((function e(){var a;return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,e.next=3,a.$store.dispatch("document/fetchDocument").then((function(t){a.getDocument=t.data}));case 3:case"end":return e.stop()}}),e)})))()}},d=c,u=a("2877"),p=a("eebe"),f=a.n(p),b=a("9989"),m=a("f09f"),g=a("a370"),h=a("2c91"),w=a("9c40"),q=a("eaac"),_=a("bd08"),v=a("db86"),k=Object(u["a"])(d,n,r,!1,null,"a6785d06",null);e["default"]=k.exports;f()(k,"components",{QPage:b["a"],QCard:m["a"],QCardSection:g["a"],QSpace:h["a"],QBtn:w["a"],QTable:q["a"],QTr:_["a"],QTd:v["a"]})}}]);