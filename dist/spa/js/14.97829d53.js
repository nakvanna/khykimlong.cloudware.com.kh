(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{"638c":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-page",[e("q-card-section",[e("q-form",{ref:"addForm",staticClass:"q-gutter-md",on:{submit:t.onSubmit}},[e("q-card",{staticClass:"my-card bg-grey-1",attrs:{flat:"",bordered:""}},[e("q-card-section",[e("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[e("q-input",{staticClass:"col",attrs:{outlined:"",label:"ចំណងជើង",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data.title,callback:function(a){t.$set(t.data,"title",a)},expression:"data.title"}}),e("q-select",{staticClass:"col-2",attrs:{outlined:"",options:["Tun Cham Roeun","Nak Vanna"],label:"Author",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data.auth,callback:function(a){t.$set(t.data,"auth",a)},expression:"data.auth"}})],1),e("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[e("q-input",{staticClass:"col",attrs:{type:"textarea",autogrow:"",outlined:"",label:"ពិពណនា",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data.description,callback:function(a){t.$set(t.data,"description",a)},expression:"data.description"}}),e("q-select",{staticClass:"col-1",attrs:{outlined:"",options:[{label:"Publish",value:!0},{label:"Private",value:!1}],label:"Is publish?",square:"","lazy-rules":"",rules:[function(t){return!!t||"សូមបំពេញចន្លោះ"}]},model:{value:t.data.isPublish,callback:function(a){t.$set(t.data,"isPublish",a)},expression:"data.isPublish"}})],1),e("div",{staticClass:"row q-gutter-x-sm q-mb-sm"},[e("editor",{staticStyle:{width:"100%"},attrs:{"api-key":"2k96ej1mruarg9ku9fc8r5l22ufujvqu76zai34ohzuf79wu",init:t.editorInit},model:{value:t.data.content,callback:function(a){t.$set(t.data,"content",a)},expression:"data.content"}})],1)]),e("q-card-actions",{attrs:{align:"center"}},[e("q-btn",{staticClass:"full-width",attrs:{color:"primary",label:"រក្សារទុក"},on:{click:function(a){return t.$refs.addForm.submit()}}},[e("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[t._v("Save")])],1)],1)],1)],1)],1)],1)},l=[],i=e("ca72"),n={name:"AddDocument",components:{Editor:i["a"]},data:function(){return{editorInit:{height:500,menubar:!0,images_upload_url:"http://localhost:3000/file-upload",automatic_uploads:!0,images_reuse_filename:!0,relative_urls:!1,remove_script_host:!1,convert_urls:!0,plugins:["print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons"],toolbar:"undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment"},data:{title:"",description:"",content:"",isPublish:{label:"Publish",value:!0},auth:"Nak Vanna"}}},methods:{onSubmit:function(){var t=this;t.data.isPublished=t.data.isPublish.value,t.$store.dispatch("document/storeDocument",t.data)}}},r=n,o=e("2877"),c=e("eebe"),u=e.n(c),d=e("9989"),m=e("a370"),p=e("0378"),b=e("f09f"),h=e("27f9"),f=e("ddd8"),v=e("4b7e"),g=e("9c40"),q=e("05c0"),k=Object(o["a"])(r,s,l,!1,null,"2ad07e6a",null);a["default"]=k.exports;u()(k,"components",{QPage:d["a"],QCardSection:m["a"],QForm:p["a"],QCard:b["a"],QInput:h["a"],QSelect:f["a"],QCardActions:v["a"],QBtn:g["a"],QTooltip:q["a"]})}}]);