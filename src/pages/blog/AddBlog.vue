<template>
  <q-card class="q-mx-xl q-my-md">
    <q-card-actions align="center">
      <q-btn class="full-width" color="grey" icon="keyboard_backspace" v-go-back.single>
        <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
      </q-btn>
    </q-card-actions>
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
                v-model="data.category"
                :options="['JavaScript','Flutter','Ubuntu','Quasar']"
                label="ប្រភេទ"
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
              <q-select
                class="col"
                label="Tags"
                outlined
                v-model="data.tags"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add-unique"
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
            <div class="row q-gutter-x-sm q-mb-sm">
              <q-uploader
                :factory="factoryFnUploadPhoto"
                class="col"
                accept="image/*"
                hide-upload-btn
                label="ដាក់រូបភាព"
                color="grey"
                square
                flat
                bordered
                style="max-width: 300px"
                auto-upload
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
  </q-card>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'

  export default {
    name: "AddBlog",
    components: {Editor},
    data() {
      return {
        content: 'Hi',
        dialog: false,
        maximizedToggle: true,
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
        formData: new FormData(),
        data: {
          title: '',
          thumbnail: '',
          hostname: 'http://localhost:3000/',
          category: 'JavaScript',
          description: '',
          content: '',
          isPublish: {label: 'Publish', value: true},
          tags: [],
          auth: 'Tun Cham Roeun',
        }
      }
    },
    methods: {
      onSubmit() {
        let self = this;
        let postData = JSON.stringify(self.data);
        self.formData.set("data", postData);
        self.$store.dispatch('blog/storeBlog', self.formData).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
            self.isShow = false
          } else {
            self.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: data.message
            })
          }
        })
      },
      factoryFnUploadPhoto(file) {
        let self = this;
        self.formData.set('thumbnail', file[0]);
      }
    },
    async created() {
      let self = this;
      let route_meta = self.$router.currentRoute.meta;
      await self.$store.dispatch('active_route/updateCurrentRoute', route_meta)
    }
  }
</script>

<style scoped>

</style>
