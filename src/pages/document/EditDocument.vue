<template>
  <q-page>
    <q-card-section>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        ref="addForm"
      >
        <q-card flat bordered class="my-card bg-grey-1">
          <q-card-section>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col"
                outlined
                v-model="data.title"
                label="ចំណងជើង"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-select
                class="col-2"
                outlined
                v-model="data.auth"
                :options="['Tun Cham Roeun','Nak Vanna']"
                label="Author"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-input
                class="col"
                type="textarea"
                autogrow
                outlined
                v-model="data.description"
                label="ពិពណនា"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
              <q-select
                class="col-1"
                outlined
                v-model="data.isPublish"
                :options="[{label:'Publish',value:true},{label:'Private',value:false}]"
                label="Is publish?"
                square
                lazy-rules
                :rules="[ val => !!val || 'សូមបំពេញចន្លោះ']"
              />
            </div>
            <div class="row q-gutter-x-sm q-mb-sm">
              <editor
                style="width: 100%"
                api-key="2k96ej1mruarg9ku9fc8r5l22ufujvqu76zai34ohzuf79wu"
                v-model="data.content"
                :init="editorInit"
              />
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn class="full-width" color="primary" label="រក្សារទុក" @click="$refs.addForm.submit()">
              <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </q-card-section>
  </q-page>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue';
  export default {
    name: "EditDocument",
    components: {Editor},
    data(){
      return {
        editorInit: {
          height: 500,
          menubar: true,
          images_upload_url: 'http://localhost:3000/file-upload',
          automatic_uploads: true,
          images_reuse_filename: true,
          relative_urls: false,
          remove_script_host: false,
          convert_urls: true,
          plugins: [
            'print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
          ],
          toolbar:
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment'
        },
        data: {
          _id: '',
          title: '',
          description: '',
          content: '',
          isPublish: {label: 'Publish', value: true},
          auth: 'Nak Vanna',
        },
      }
    },
    async created(){
      let self = this;
      self.$q.loading.show();
      await self.$store.dispatch('document/editDocument', self.$route.params.id).then(function(res){
        self.data._id = res.data._id;
        self.data.title = res.data.title;
        self.data.description = res.data.description;
        self.data.content = res.data.content;
        self.data.auth = res.data.auth;
        self.data.isPublish = {label:res.data.isPublished === true? 'Publish': 'Private', value:res.data.isPublished};
        self.$q.loading.hide();
      })
    },
    methods: {
      onSubmit(){
        let self = this;
        self.$q.loading.show();
        self.data.isPublished = self.data.isPublish.value;
        self.$store.dispatch('document/updateDocument', self.data).then((res)=>{
          if (res.status){
            self.$q.loading.hide();
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
