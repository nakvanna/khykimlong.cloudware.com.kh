(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{b2c5:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-page",{staticClass:"flex flex-center",staticStyle:{"background-image":"url(../statics/login-bg.jpg)","background-position":"center","background-repeat":"no-repeat","background-size":"cover"},attrs:{padding:""}},[e("q-card",{directives:[{name:"show",rawName:"v-show",value:0===t.waiting,expression:"waiting === 0"}],staticClass:"my-card bg-grey"},[e("q-card-section",[e("div",{staticClass:"row flex-center q-gutter-xl"},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.$q.platform.is.mobile,expression:"!$q.platform.is.mobile"}],staticClass:"col"},[e("q-avatar",{attrs:{size:"400px",square:""}},[e("img",{attrs:{src:"https://gawvs.in//assets/img/login.png"}})])],1),e("div",{staticClass:"col text-center"},[e("q-avatar",{attrs:{square:"",size:"200px"}},[e("img",{attrs:{src:"https://cdn4.iconfinder.com/data/icons/ios7-active-basic/512/user_access-512.png"}})]),e("q-form",{on:{submit:t.onSubmit}},[e("q-input",{attrs:{"lazy-rules":"",autofocus:"",rules:[function(t){return!!t||"Please enter your email"}],dark:"",filled:"","bottom-slots":"",label:"E-mail"},scopedSlots:t._u([{key:"prepend",fn:function(){return[e("q-icon",{attrs:{name:"person"}})]},proxy:!0},{key:"append",fn:function(){return[e("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(a){t.data.email=""}}})]},proxy:!0}]),model:{value:t.data.email,callback:function(a){t.$set(t.data,"email",a)},expression:"data.email"}}),e("q-input",{attrs:{"lazy-rules":"",rules:[function(t){return!!t||"Please enter your password"}],type:"password",dark:"",filled:"","bottom-slots":"",label:"Password"},scopedSlots:t._u([{key:"prepend",fn:function(){return[e("q-icon",{attrs:{name:"vpn_key"}})]},proxy:!0},{key:"append",fn:function(){return[e("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(a){t.data.password=""}}})]},proxy:!0}]),model:{value:t.data.password,callback:function(a){t.$set(t.data,"password",a)},expression:"data.password"}}),e("q-btn",{staticStyle:{width:"400px"},attrs:{type:"submit",unelevated:"",rounded:"",color:"primary",label:"Login"}})],1)],1)])])],1),e("q-card",{directives:[{name:"show",rawName:"v-show",value:0!==t.waiting,expression:"waiting !== 0"}],staticClass:"q-pa-lg text-center my-card bg-transparent"},[e("span",{staticClass:"text-h3"},[t._v("រកចាំដើម្បីចូលម្ដងទៀត ")]),e("br"),e("span",{staticClass:"text-h1"},[t._v("\n      "+t._s(t.waiting)+"\n    ")])])],1)},s=[],o=e("18d6"),r={name:"Login",data:function(){return{isPwd:!0,data:{email:"",password:""},err_num:0,waiting:0}},created:function(){var t=o["a"].getItem("count_down");null!==t&&(this.$q.loading.show(),this.countDownTimer(t))},methods:{onSubmit:function(){var t=this;t.$q.loading.show(),t.$store.dispatch("auth/login",t.data).then((function(a){a.status?(t.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:"ប្រតិបត្តិការណ៍ជោគជ័យ"}),t.$router.push("/"),t.$q.loading.hide()):(t.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"សូមព្យាយាមម្ដងទៀត!"}),t.$q.loading.hide(),t.err_num+=1,t.onThirdError(t.err_num)),a||t.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"Please check input again!"})}))},onThirdError:function(t){var a=this;4===t&&(a.$q.loading.show(),this.countDownTimer(20))},countDownTimer:function(t){var a=this;this.waiting=t,t>0?setTimeout((function(){t-=1,o["a"].set("count_down",t),a.countDownTimer(o["a"].getItem("count_down"))}),1e3):(this.$q.loading.hide(),this.err_num=0)}}},i=r,c=e("2877"),l=e("eebe"),u=e.n(l),d=e("9989"),p=e("f09f"),m=e("a370"),w=e("cb32"),g=e("0378"),f=e("27f9"),h=e("0016"),v=e("9c40"),b=Object(c["a"])(i,n,s,!1,null,"1c48ff42",null);a["default"]=b.exports;u()(b,"components",{QPage:d["a"],QCard:p["a"],QCardSection:m["a"],QAvatar:w["a"],QForm:g["a"],QInput:f["a"],QIcon:h["a"],QBtn:v["a"]})}}]);