(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"5f19":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticClass:"q-mx-xl q-my-md"},[a("q-card-actions",{attrs:{align:"center"}},[a("q-btn",{directives:[{name:"go-back",rawName:"v-go-back.single",modifiers:{single:!0}}],staticClass:"full-width",attrs:{color:"grey",icon:"keyboard_backspace"}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("ថយក្រោយ")])],1)],1),a("q-card-section",[a("q-card",{staticClass:"my-card bg-grey-1",attrs:{flat:"",bordered:""}},[a("q-card-section",[a("div",{staticClass:"column q-gutter-x-sm q-mb-sm"},[a("div",{staticClass:"col self-center"},[a("q-avatar",{attrs:{size:"200px"}},[a("q-img",{attrs:{src:""+t.data.hostname+t.data.thumbnail}})],1),a("q-icon",{attrs:{name:"edit",color:"primary",size:"25px"}},[a("q-popup-edit",{model:{value:t.photo_prev,callback:function(e){t.photo_prev=e},expression:"photo_prev"}},[a("q-file",{staticStyle:{width:"300px"},attrs:{label:"ជ្រើសរើសរូបភាព",outlined:"",square:"",accept:"image/*",dense:"","lazy-rules":"",rules:[function(t){return!!t||"សូមជ្រើសរើស"}]},on:{input:t.photoFn},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{attrs:{name:"attach_file"}})]},proxy:!0}]),model:{value:t.photo_prev,callback:function(e){t.photo_prev=e},expression:"photo_prev"}})],1)],1)],1),a("div",{staticClass:"col"},[a("div",{staticClass:"text-h6"},[t._v("\n              "+t._s(t.data.title)+"\n              "),a("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.initialValue,n=e.value,i=(e.emitValue,e.validate,e.set),s=e.cancel;return[a("q-input",{attrs:{dense:"",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[a("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),s(t)}}}),a("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:o===n},on:{click:[function(t){return t.stopPropagation(),i(t)},function(e){return t.updateBlog({id:t.$route.params.id,data:{title:t.data.title}})}]}})]},proxy:!0}],null,!0),model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}})]}}]),model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}}),a("q-icon",{attrs:{name:"edit",color:"primary"}})],1),a("div",{staticClass:"text-subtitle2"},[t._v(t._s(t.data.createdAt)+"\n            ")]),a("div",{staticClass:"text-subtitle2"},[t._v("By: "+t._s(t.data.auth)+"\n              "),a("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.initialValue,n=e.value,i=(e.emitValue,e.validate,e.set),s=e.cancel;return[a("q-select",{attrs:{options:["Tun Cham Roeun","Nak Vanna"],dense:"",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[a("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),s(t)}}}),a("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:o===n},on:{click:[function(t){return t.stopPropagation(),i(t)},function(e){return t.updateBlog({id:t.$route.params.id,data:{auth:t.data.auth}})}]}})]},proxy:!0}],null,!0),model:{value:t.data.auth,callback:function(e){t.$set(t.data,"auth",e)},expression:"data.auth"}})]}}]),model:{value:t.data.auth,callback:function(e){t.$set(t.data,"auth",e)},expression:"data.auth"}}),a("q-icon",{attrs:{name:"edit",color:"primary"}})],1),a("div",{staticClass:"text-subtitle2"},[t._v("Tags: "+t._s(t.data.tags.join(", "))+"\n              "),a("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.initialValue,n=e.value,i=(e.emitValue,e.validate,e.set),s=e.cancel;return[a("q-select",{attrs:{"use-input":"","use-chips":"",multiple:"","hide-dropdown-icon":"","input-debounce":"0","new-value-mode":"add-unique",dense:"",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[a("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),s(t)}}}),a("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:o===n},on:{click:[function(t){return t.stopPropagation(),i(t)},function(e){return t.updateBlog({id:t.$route.params.id,data:{tags:t.data.tags}})}]}})]},proxy:!0}],null,!0),model:{value:t.data.tags,callback:function(e){t.$set(t.data,"tags",e)},expression:"data.tags"}})]}}]),model:{value:t.data.tags,callback:function(e){t.$set(t.data,"tags",e)},expression:"data.tags"}}),a("q-icon",{attrs:{name:"edit",color:"primary"}})],1),a("div",{staticClass:"text-subtitle2"},[t._v("Category: "+t._s(t.data.category)+"\n              "),a("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.initialValue,n=e.value,i=(e.emitValue,e.validate,e.set),s=e.cancel;return[a("q-select",{attrs:{options:["JavaScript","Flutter","Ubuntu","Quasar"],dense:"",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[a("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),s(t)}}}),a("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:o===n},on:{click:[function(t){return t.stopPropagation(),i(t)},function(e){return t.updateBlog({id:t.$route.params.id,data:{category:t.data.category}})}]}})]},proxy:!0}],null,!0),model:{value:t.data.category,callback:function(e){t.$set(t.data,"category",e)},expression:"data.category"}})]}}]),model:{value:t.data.category,callback:function(e){t.$set(t.data,"category",e)},expression:"data.category"}}),a("q-icon",{attrs:{name:"edit",color:"primary"}})],1),a("div",{staticClass:"text-subtitle2"},[t._v("\n              Visibility: "+t._s(t.data.isPublish.value?"Published":"Private")+"\n              "),a("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.initialValue,n=e.value,i=(e.emitValue,e.validate,e.set),s=e.cancel;return[a("q-select",{attrs:{options:[{label:"Publish",value:!0},{label:"Private",value:!1}],dense:"",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[a("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),s(t)}}}),a("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:o===n},on:{click:[function(t){return t.stopPropagation(),i(t)},function(e){return t.updateBlog({id:t.$route.params.id,data:{isPublish:t.data.isPublish}})}]}})]},proxy:!0}],null,!0),model:{value:t.data.isPublish,callback:function(e){t.$set(t.data,"isPublish",e)},expression:"data.isPublish"}})]}}]),model:{value:t.data.isPublish,callback:function(e){t.$set(t.data,"isPublish",e)},expression:"data.isPublish"}}),a("q-icon",{attrs:{name:"edit",color:"primary"}})],1),a("q-separator",{staticClass:"q-my-md"}),a("div",{staticClass:"text-subtitle2"},[t._v("\n              Description: "+t._s(t.data.description)+"\n              "),a("q-popup-edit",{scopedSlots:t._u([{key:"default",fn:function(e){var o=e.initialValue,n=e.value,i=(e.emitValue,e.validate,e.set),s=e.cancel;return[a("q-input",{attrs:{type:"textarea",autogrow:"",dense:"",autofocus:""},on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation()}},scopedSlots:t._u([{key:"after",fn:function(){return[a("q-btn",{attrs:{flat:"",dense:"",color:"negative",icon:"cancel"},on:{click:function(t){return t.stopPropagation(),s(t)}}}),a("q-btn",{attrs:{flat:"",dense:"",color:"positive",icon:"check_circle",disable:o===n},on:{click:[function(t){return t.stopPropagation(),i(t)},function(e){return t.updateBlog({id:t.$route.params.id,data:{description:t.data.description}})}]}})]},proxy:!0}],null,!0),model:{value:t.data.description,callback:function(e){t.$set(t.data,"description",e)},expression:"data.description"}})]}}]),model:{value:t.data.description,callback:function(e){t.$set(t.data,"description",e)},expression:"data.description"}}),a("q-icon",{attrs:{name:"edit",color:"primary"}})],1),a("q-separator",{staticClass:"q-my-md"}),a("q-icon",{attrs:{name:"edit",color:"primary",size:"30px"},on:{click:function(e){t.dialog=!0}}}),a("div",{domProps:{innerHTML:t._s(t.data.content)}})],1)])]),a("q-dialog",{attrs:{persistent:"",maximized:t.maximizedToggle,"transition-show":"slide-up","transition-hide":"slide-down"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("q-card",[a("q-bar",[a("q-space"),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Close")])],1)],1),a("q-card-section",[a("editor",{staticStyle:{width:"100%"},attrs:{"api-key":"qfbij8u6mn9gkgrw02lw40uqey8cj07cyg70tkjzi51aaa82",init:t.editorInit},model:{value:t.data.content,callback:function(e){t.$set(t.data,"content",e)},expression:"data.content"}})],1),a("q-card-actions",{attrs:{align:"center"}},[a("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"រក្សារទុក"},on:{click:function(e){return t.updateBlogContent({id:t.$route.params.id,data:{content:t.data.content}})}}},[a("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Save")])],1)],1)],1)],1)],1)],1)],1)},n=[],i=a("967e"),s=a.n(i),r=(a("96cf"),a("fa84")),l=a.n(r),c=a("ca72"),u=a("c197"),d=a.n(u),p=(a("6b2c"),{name:"EditBlog",components:{Editor:c["a"]},data:function(){return{content:"Hi",dialog:!1,maximizedToggle:!0,editorInit:{max_height:650,menubar:!0,images_upload_url:"http://localhost:3000/file-upload",automatic_uploads:!0,images_reuse_filename:!0,relative_urls:!1,remove_script_host:!1,convert_urls:!0,plugins:["autoresize print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample code table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons"],toolbar:"code undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment"},formData:new FormData,dataPhoto:new FormData,photo_prev:null,data:{title:"",content_id:"",thumbnail:"",hostname:"http://localhost:3000/",category:"JavaScript",description:"",content:"",isPublish:{label:"Publish",value:!0},tags:[],auth:"Tun Cham Roeun",createdAt:null}}},methods:{photoFn:function(t){var e=this;e.dataPhoto.set("id",e.$route.params.id),e.dataPhoto.set("thumbnail",t);var a=new FileReader;a.readAsDataURL(t),a.onload=function(){e.data.thumbnail=a.result,e.data.hostname=""},e.updateBlogThumbnail(e.dataPhoto)},updateBlogThumbnail:function(t){var e=this;e.$store.dispatch("blog/updateBlogThumbnail",t).then((function(t){t.status?e.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:t.message}):e.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:t.message})}))},onSubmit:function(){var t=this,e=JSON.stringify(t.data);t.formData.set("data",e),t.$store.dispatch("blog/storeBlog",t.formData).then((function(e){e.status?(t.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:e.message}),t.isShow=!1):t.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:e.message})}))},updateBlog:function(t){var e=this;e.$store.dispatch("blog/updateBlog",t).then((function(t){t.status?e.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:t.message}):e.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:t.message})}))},updateBlogContent:function(t){var e=this;e.$store.dispatch("blog/updateBlogContent",t).then((function(t){t.status?e.$q.notify({color:"green-4",textColor:"white",icon:"cloud_done",message:t.message}):e.$q.notify({color:"red-5",textColor:"white",icon:"warning",message:t.message})}))},factoryFnUploadPhoto:function(t){var e=this;e.formData.set("thumbnail",t[0])}},created:function(){var t=this;return l()(s.a.mark((function e(){var a,o;return s.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,o=a.$router.currentRoute.meta,e.next=4,a.$store.dispatch("active_route/updateCurrentRoute",o);case 4:a.$store.dispatch("blog/editBlog",t.$route.params.id).then((function(t){a.data.title=t.data.title,a.data.hostname="http://localhost:3000/",a.data.thumbnail=t.data.thumbnail,a.data.category=t.data.category,a.data.description=t.data.description,a.data.isPublish=t.data.isPublish?{label:"Publish",value:!0}:{label:"Private",value:!1},a.data.tags=t.data.tags,a.data.auth=t.data.auth,a.data.createdAt=t.data.createdAt})),a.$store.dispatch("blog/fetchContentByBlog",t.$route.params.id).then((function(t){a.data.content=t.data.content,a.data.content_id=t.data._id}));case 6:case"end":return e.stop()}}),e)})))()},updated:function(){d.a.highlightAll()}}),f=p,m=a("2877"),g=a("eebe"),h=a.n(g),b=a("f09f"),v=a("4b7e"),y=a("9c40"),k=a("05c0"),q=a("a370"),_=a("cb32"),x=a("068f"),w=a("0016"),P=a("42a1"),C=a("7d53"),$=a("27f9"),S=a("ddd8"),B=a("eb85"),Q=a("24e8"),V=a("d847"),z=a("2c91"),E=a("2eeb"),T=a("7f67"),D=Object(m["a"])(f,o,n,!1,null,"bb83f82c",null);e["default"]=D.exports;h()(D,"components",{QCard:b["a"],QCardActions:v["a"],QBtn:y["a"],QTooltip:k["a"],QCardSection:q["a"],QAvatar:_["a"],QImg:x["a"],QIcon:w["a"],QPopupEdit:P["a"],QFile:C["a"],QInput:$["a"],QSelect:S["a"],QSeparator:B["a"],QDialog:Q["a"],QBar:V["a"],QSpace:z["a"]}),h()(D,"directives",{GoBack:E["a"],ClosePopup:T["a"]})}}]);