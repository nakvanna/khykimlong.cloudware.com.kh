(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{"2d55":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-page",{attrs:{padding:""}},[o("q-card",[o("q-card-actions",{attrs:{align:"left"}},[o("q-btn",{directives:[{name:"go-back",rawName:"v-go-back.single",modifiers:{single:!0}}],staticStyle:{width:"150px"},attrs:{color:"red",icon:"reply",label:"ត្រឡប់ក្រោយ"}},[o("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("ថយក្រោយ")])],1)],1),o("q-card-section",[o("q-form",{ref:"addForm",staticClass:"q-gutter-md",on:{submit:t.onSubmit}},[o("q-card",{staticClass:"my-card bg-grey-1",attrs:{flat:"",bordered:""}},[o("q-card-section",[o("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[o("q-item-label",{staticClass:"col q-my-sm"},[t._v("\n                ពត៍មានអ្នកជម្ងឺ\n              ")])],1),o("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[o("q-select",{staticClass:"col-md col-xs-12",attrs:{outlined:"",label:"ឈ្មោះអ្នកជម្ងឺ",options:t.getPatients,square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមជ្រើសរើសចន្លោះ"}]},on:{input:t.patientSelected},model:{value:t.data.patient_obj,callback:function(e){t.$set(t.data,"patient_obj",e)},expression:"data.patient_obj"}}),o("q-input",{staticClass:"col-md col-xs-12",attrs:{outlined:"",label:"ចំណងជើង",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}}),o("q-input",{staticClass:"col-md col-xs-12",attrs:{label:"ថ្ងៃពិនិត្យ",outlined:"",square:"",mask:"date",rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[o("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[o("q-popup-proxy",{ref:"qDateProxyCheck",attrs:{"transition-show":"scale","transition-hide":"scale"}},[o("q-date",{on:{input:function(){return t.$refs.qDateProxyCheck.hide()}},model:{value:t.data.check_date,callback:function(e){t.$set(t.data,"check_date",e)},expression:"data.check_date"}})],1)],1)]},proxy:!0}]),model:{value:t.data.check_date,callback:function(e){t.$set(t.data,"check_date",e)},expression:"data.check_date"}}),o("q-select",{staticClass:"col-md col-xs-12",attrs:{outlined:"",label:"គ្រូទេព្យ",rules:[function(t){return!!t||"សូមជ្រើសរើសចន្លោះ"}],options:Object.freeze(t.doctorOptions),"use-input":""},on:{filter:t.filterFn},scopedSlots:t._u([{key:"append",fn:function(){return[o("q-btn",{attrs:{round:"",dense:"",flat:"",icon:"add"}},[o("q-popup-edit",{ref:"addCurrency",attrs:{title:"បន្ថែមគ្រូទេព្យ"},model:{value:t.doctor.doctor,callback:function(e){t.$set(t.doctor,"doctor",e)},expression:"doctor.doctor"}},[o("q-form",{ref:"formAddDoctor",on:{submit:t.storeDoctor}},[o("div",{staticClass:"row"},[o("q-input",{attrs:{label:"ឈ្មោះគ្រូទេព្យ",dense:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.doctor.doctor,callback:function(e){t.$set(t.doctor,"doctor",e)},expression:"doctor.doctor"}})],1),o("div",{staticClass:"row"},[o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",color:"negative",flat:"",label:"បិទ","no-caps":""}}),o("q-space"),o("q-btn",{attrs:{dense:"",color:"primary",flat:"",label:"បន្ថែម","no-caps":""},on:{click:function(e){return t.$refs.formAddDoctor.submit()}}})],1)])],1)],1)]},proxy:!0}]),model:{value:t.data.doctor,callback:function(e){t.$set(t.data,"doctor",e)},expression:"data.doctor"}})],1),o("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[o("q-input",{staticClass:"col-md col-xs-12",attrs:{outlined:"",label:"ចំណាំ",type:"textarea",rows:"3",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data.description,callback:function(e){t.$set(t.data,"description",e)},expression:"data.description"}})],1)]),o("q-card-actions",{attrs:{align:"right"}},[o("q-btn",{staticStyle:{width:"150px",height:"50px"},attrs:{icon:"save",color:"primary",label:"រក្សារទុក"},on:{click:function(e){return t.$refs.addForm.submit()}}},[o("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Save")])],1)],1)],1)],1)],1)],1)],1)},r=[],n=o("eb34"),s={name:"EchoNoteAdd",data:function(){return{data:{patient_obj:null,patient:null,title:null,description:null,check_date:null},doctor:{doctor:null},doctorOptions:this.getDoctors}},computed:{getPatients:function(){var t=this;return t.$store.getters["patient/getPatient"].map((function(t){return{label:"".concat(t.kh_name,", ភេទ ").concat(t.gender,", អាយុ ").concat(t.age,", Tel: ").concat(t.phone),value:t._id}}))},getDoctors:function(){return this.$store.getters["doctor/getDoctors"].map((function(t){return t.doctor}))}},methods:{onSubmit:function(){var t=this;t.$q.loading.show(),t.$store.dispatch("echo_note/storeEchoNote",t.data).then((function(e){e.status?(t.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:e.message}),window.history.back(),t.$q.loading.hide()):t.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:e.message})}))},dateFormat:function(t){return n["b"].formatDate(t,"DD/MM/YYYY")},filterFn:function(t,e){var o=this;e((function(){if(""===t)o.doctorOptions=o.getDoctors;else{var e=t.toLowerCase();o.doctorOptions=o.getDoctors.filter((function(t){return t.toLowerCase().indexOf(e)>-1}))}}))},storeDoctor:function(){var t=this;t.$store.dispatch("doctor/storeDoctor",t.doctor).then((function(e){e.status?(t.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:e.message}),t.data.doctor=e.data.doctor,t.doctor.doctor=null):t.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:e.message})}))},patientSelected:function(t){this.data.patient=t.value}}},c=s,i=o("a6c2"),l=o("63c1"),d=o.n(l),u=o("505d"),p=o("5ce7"),f=o("84df"),m=o("ef9c"),b=o("3676"),q=o("7006"),g=o("3548"),h=o("dc7c"),v=o("f636"),x=o("a3be"),w=o("19dc"),k=o("5142"),y=o("7213"),C=o("4a24"),_=o("dc01"),$=o("406f"),D=o("f6b1"),Q=Object(i["a"])(c,a,r,!1,null,"4b4099c3",null);e["default"]=Q.exports;d()(Q,"components",{QPage:u["a"],QCard:p["a"],QCardActions:f["a"],QBtn:m["a"],QTooltip:b["a"],QCardSection:q["a"],QForm:g["a"],QItemLabel:h["a"],QSelect:v["a"],QInput:x["a"],QIcon:w["a"],QPopupProxy:k["a"],QDate:y["a"],QPopupEdit:C["a"],QSpace:_["a"]}),d()(Q,"directives",{GoBack:$["a"],ClosePopup:D["a"]})}}]);