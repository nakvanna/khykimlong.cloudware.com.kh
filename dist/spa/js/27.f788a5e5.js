(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{"4f91":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-page",[o("q-card",[o("q-card-actions",{attrs:{align:"left"}},[o("q-btn",{directives:[{name:"go-back",rawName:"v-go-back.single",modifiers:{single:!0}}],staticStyle:{width:"150px"},attrs:{color:"red",icon:"reply",label:"ត្រឡប់ក្រោយ"}},[o("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("ថយក្រោយ")])],1)],1),o("q-card-section",[o("q-table",{attrs:{separator:"cell",title:"ព័ត៌មានពិនិត្យ",data:t.labo_data,columns:t.columns_labo,"rows-per-page-options":[0],"hide-bottom":""},scopedSlots:t._u([{key:"body",fn:function(e){return[o("q-tr",{attrs:{props:e}},[o("q-td",{key:"title",attrs:{props:e}},[o("span",{staticClass:"text-h5"},[t._v(t._s(e.row.title))]),o("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(a){var n=a.initialValue,r=a.value,s=(a.emitValue,a.validate,a.set),l=a.cancel;return[o("q-input",{attrs:{dense:"",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[o("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),l(t)}}}),o("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:n===r},on:{click:[function(t){return t.stopPropagation(),s(t)},function(o){return t.updateLabo({id:t.data1._id,data:{title:e.row.title}})}]}})]},proxy:!0}],null,!0),model:{value:e.row.title,callback:function(o){t.$set(e.row,"title",o)},expression:"props.row.title"}})]}}],null,!0),model:{value:e.row.title,callback:function(o){t.$set(e.row,"title",o)},expression:"props.row.title"}})],1),o("q-td",{key:"doctor",attrs:{props:e}},[o("span",{staticClass:"text-h5"},[t._v(t._s(e.row.doctor))]),o("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(a){var n=a.initialValue,r=a.value,s=(a.emitValue,a.validate,a.set),l=a.cancel;return[o("q-select",{attrs:{outlined:"",label:"គ្រូពេទ្យ",options:t.getDoctors,square:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[o("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),l(t)}}}),o("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:n===r},on:{click:[function(t){return t.stopPropagation(),s(t)},function(o){return t.updateLabo({id:t.data1._id,data:{doctor:e.row.doctor}})}]}})]},proxy:!0}],null,!0),model:{value:e.row.doctor,callback:function(o){t.$set(e.row,"doctor",o)},expression:"props.row.doctor"}})]}}],null,!0),model:{value:e.row.doctor,callback:function(o){t.$set(e.row,"doctor",o)},expression:"props.row.doctor"}})],1)],1)]}}])})],1),o("q-card-section",[o("q-table",{attrs:{separator:"cell",title:"ព័ត៌មានពិនិត្យ",data:t.labo_detail_data,columns:t.columns_labo_detail,"rows-per-page-options":[0],pagination:t.pagination,"hide-bottom":""},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"body",fn:function(e){return[o("q-tr",{attrs:{props:e}},[o("q-td",{key:"type",attrs:{props:e}},[o("span",{staticClass:"text-h6"},[t._v(t._s(e.row.type))])]),o("q-td",{key:"name",attrs:{props:e}},[o("span",{staticClass:"text-h6"},[t._v(t._s(e.row.name))])]),o("q-td",{key:"result",attrs:{props:e}},["HEMATOLOGY"===e.row.type?o("span",{staticClass:"text-h6",class:e.row.result>=e.row.min&&e.row.result<=e.row.max?"text-green":"text-red"},[t._v("\n                "+t._s(e.row.result)+"\n              ")]):t._e(),"LEUCOCYTAIRE"===e.row.type?o("span",{staticClass:"text-h6",class:e.row.result>=e.row.min&&e.row.result<=e.row.max?"text-green":"text-red"},[t._v("\n                "+t._s(e.row.result)+"\n              ")]):t._e(),o("span",["BIOCHIMIE"===e.row.type&&null!==e.row.min?o("span",{staticClass:"text-h6",class:e.row.result>=e.row.min&&e.row.result<=e.row.max?"text-green":"text-red"},[t._v("\n                "+t._s(e.row.result)+"\n                ")]):t._e(),"BIOCHIMIE"===e.row.type&&null===e.row.min?o("span",{staticClass:"text-h6",class:e.row.result<=e.row.max?"text-green":"text-red"},[t._v("\n                "+t._s(e.row.result)+"\n                ")]):t._e()]),"SÉROLOGIE"===e.row.type?o("span",{staticClass:"text-h6",class:"Negative"===e.row.result?"text-green":"text-red"},[t._v("\n                "+t._s(e.row.result)+"\n              ")]):t._e(),o("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(a){var n=a.initialValue,r=a.value,s=(a.emitValue,a.validate,a.set),l=a.cancel;return[o("q-select",{directives:[{name:"show",rawName:"v-show",value:"SÉROLOGIE"===e.row.type,expression:"props.row.type === 'SÉROLOGIE'"}],attrs:{"use-input":"",outlined:"",label:"ជ្រើសរើស អាស័យដ្ឋាន",options:["Negative","Positive"],square:""},scopedSlots:t._u([{key:"after",fn:function(){return[o("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),l(t)}}}),o("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:n===r},on:{click:[function(t){return t.stopPropagation(),s(t)},function(o){return t.updateLaboDetail({id:e.row._id,data:{result:e.row.result}})}]}})]},proxy:!0}],null,!0),model:{value:e.row.result,callback:function(o){t.$set(e.row,"result",o)},expression:"props.row.result"}}),o("q-input",{directives:[{name:"show",rawName:"v-show",value:"SÉROLOGIE"!==e.row.type,expression:"props.row.type !== 'SÉROLOGIE'"}],attrs:{dense:"",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[o("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),l(t)}}}),o("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:n===r},on:{click:[function(t){return t.stopPropagation(),s(t)},function(o){return t.updateLaboDetail({id:e.row._id,data:{result:e.row.result}})}]}})]},proxy:!0}],null,!0),model:{value:e.row.result,callback:function(o){t.$set(e.row,"result",o)},expression:"props.row.result"}})]}}],null,!0),model:{value:e.row.result,callback:function(o){t.$set(e.row,"result",o)},expression:"props.row.result"}})],1),o("q-td",{key:"unit",attrs:{props:e}},[o("span",{staticClass:"text-h6"},[t._v(t._s(e.row.value)+" "),o("sup",[t._v(" "+t._s(e.row.superscript)+" ")]),t._v(" "+t._s(e.row.unit))])]),o("q-td",{key:"reference",attrs:{props:e}},["HEMATOLOGY"===e.row.type?o("span",{staticClass:"text-h6"},[t._v("\n                ( N: "+t._s(e.row.min)+" - "+t._s(e.row.max)+" )\n              ")]):t._e(),"LEUCOCYTAIRE"===e.row.type?o("span",{staticClass:"text-h6"},[t._v("\n                ( N: "+t._s(e.row.min)+" - "+t._s(e.row.max)+" )\n              ")]):t._e(),o("span",["BIOCHIMIE"===e.row.type&&null!==e.row.min?o("span",{staticClass:"text-h6"},[t._v("\n                ( N: "+t._s(e.row.min)+" - "+t._s(e.row.max)+" )\n              ")]):t._e(),"BIOCHIMIE"===e.row.type&&null===e.row.min?o("span",{staticClass:"text-h6"},[t._v("\n                ( < "+t._s(e.row.max)+" )\n              ")]):t._e()])])],1)]}}])})],1)],1)],1)},n=[],r=o("967e"),s=o.n(r),l=(o("96cf"),o("fa84")),i=o.n(l),c=[{align:"left",name:"title",label:"ចំណងជើង",field:"title"},{align:"left",name:"doctor",label:"ពិនិត្យដោយ",field:"doctor"}],u=[{align:"left",name:"type",label:"TYPE",field:"type"},{align:"left",name:"name",label:"PARAMETER",field:"name"},{align:"left",name:"result",label:"RESULT",field:"result"},{align:"left",name:"unit",label:"UNIT",field:"unit"},{align:"left",name:"reference",label:"REFERENCE",field:"reference"}],p={name:"LaboEdit",data:function(){return{pagination:{rowsPerPage:0},columns_labo:c,columns_labo_detail:u,labo_data:[],labo_detail_data:[],data1:{_id:""},data2:{_id:""}}},created:function(){var t=this,e=t.data1,o=t.data2,a=t.$route.params.id;t.$store.dispatch("labo/editLabo",a).then(function(){var n=i()(s.a.mark((function n(r){return s.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e._id=r.data._id,o._id=r.data._id,t.labo_data.push(r.data),n.next=5,t.$store.dispatch("labo/fetchLaboDetail",a).then((function(e){e.data.map((function(e){t.labo_detail_data.push(e)}))}));case 5:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}())},computed:{getDoctors:function(){return this.$store.getters["doctor/getDoctors"].map((function(t){return t.doctor}))}},methods:{updateLabo:function(t){var e=this;e.$store.dispatch("labo/updateLabo",t).then((function(t){t.status?e.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:t.message}):e.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:t.message})}))},updateLaboDetail:function(t){var e=this;e.$store.dispatch("labo/updateLaboDetail",t).then((function(t){t.status?e.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:t.message}):e.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:t.message})}))}}},d=p,f=o("2877"),w=o("eebe"),_=o.n(w),b=o("9989"),m=o("f09f"),y=o("4b7e"),g=o("9c40"),v=o("05c0"),x=o("a370"),k=o("eaac"),h=o("bd08"),q=o("db86"),C=o("42a1"),E=o("27f9"),O=o("ddd8"),I=o("2eeb"),L=Object(f["a"])(d,a,n,!1,null,"bfd34446",null);e["default"]=L.exports;_()(L,"components",{QPage:b["a"],QCard:m["a"],QCardActions:y["a"],QBtn:g["a"],QTooltip:v["a"],QCardSection:x["a"],QTable:k["a"],QTr:h["a"],QTd:q["a"],QPopupEdit:C["a"],QInput:E["a"],QSelect:O["a"]}),_()(L,"directives",{GoBack:I["a"]})}}]);