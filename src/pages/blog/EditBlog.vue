 <template>
  <q-card class="q-mx-xl q-my-md">
    <q-card-actions align="center">
      <q-btn class="full-width" color="grey" icon="keyboard_backspace" v-go-back.single>
        <q-tooltip content-class="bg-white text-primary">ថយក្រោយ</q-tooltip>
      </q-btn>
    </q-card-actions>
    <q-card-section>
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="column q-gutter-x-sm q-mb-sm">
            <div class="col self-center">
              <q-avatar size="200px">
                <q-img :src="`${data.hostname}${data.thumbnail}`"/>
              </q-avatar>
              <q-icon name="edit" color="primary" size="25px">
                <q-popup-edit v-model="photo_prev">
                  <q-file style="width: 300px"
                          label="ជ្រើសរើសរូបភាព"
                          outlined
                          v-model="photo_prev"
                          square
                          accept="image/*"
                          dense
                          @input="photoFn"
                          lazy-rules
                          :rules="[ val => !!val || 'សូមជ្រើសរើស']">
                    <template v-slot:prepend>
                      <q-icon name="attach_file"/>
                    </template>
                  </q-file>
                </q-popup-edit>
              </q-icon>
            </div>
            <div class="col">
              <div class="text-h6">
                {{data.title}}
                <q-popup-edit v-model="data.title">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input @keyup.enter.stop v-model="data.title" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateBlog({id:$route.params.id,data:{title:data.title}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
                <q-icon name="edit" color="primary"/>
              </div>
              <div class="text-subtitle2">{{data.createdAt}}
              </div>
              <div class="text-subtitle2">By: {{data.auth}}
                <q-popup-edit v-model="data.auth">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      :options="['Tun Cham Roeun','Nak Vanna']"
                      @keyup.enter.stop v-model="data.auth" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateBlog({id:$route.params.id,data:{auth:data.auth}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
                <q-icon name="edit" color="primary"/>
              </div>
              <div class="text-subtitle2">Tags: {{data.tags.join(', ')}}
                <q-popup-edit v-model="data.tags">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      use-input
                      use-chips
                      multiple
                      hide-dropdown-icon
                      input-debounce="0"
                      new-value-mode="add-unique"
                      @keyup.enter.stop v-model="data.tags" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateBlog({id:$route.params.id,data:{tags:data.tags}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
                <q-icon name="edit" color="primary"/>
              </div>
              <div class="text-subtitle2">Category: {{data.category}}
                <q-popup-edit v-model="data.category">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      :options="['JavaScript','Flutter','Ubuntu','Quasar']"
                      @keyup.enter.stop v-model="data.category" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateBlog({id:$route.params.id,data:{category:data.category}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
                <q-icon name="edit" color="primary"/>
              </div>
              <div class="text-subtitle2">
                Visibility: {{data.isPublish.value?'Published':'Private'}}
                <q-popup-edit v-model="data.isPublish">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-select
                      :options="[{label:'Publish',value:true},{label:'Private',value:false}]"
                      @keyup.enter.stop v-model="data.isPublish" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateBlog({id:$route.params.id,data:{isPublish:data.isPublish}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-select>
                  </template>
                </q-popup-edit>
                <q-icon name="edit" color="primary"/>
              </div>
              <q-separator class="q-my-md"/>
              <div class="text-subtitle2">
                Description: {{data.description}}
                <q-popup-edit v-model="data.description">
                  <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                    <q-input type="textarea" autogrow @keyup.enter.stop v-model="data.description" dense autofocus>
                      <template v-slot:after>
                        <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                        <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"
                               @click="updateBlog({id:$route.params.id,data:{description:data.description}})"
                               :disable="initialValue === value"/>
                      </template>
                    </q-input>
                  </template>
                </q-popup-edit>
                <q-icon name="edit" color="primary"/>
              </div>
              <q-separator class="q-my-md"/>
              <q-icon name="edit" color="primary" size="30px" @click="dialog = true"/>
              <div v-html="data.content"/>
            </div>
          </div>
        </q-card-section>
        <q-dialog
          v-model="dialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card>
            <q-bar>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>

            <q-card-section>
              <editor
                style="width: 100%"
                api-key="qfbij8u6mn9gkgrw02lw40uqey8cj07cyg70tkjzi51aaa82"
                v-model="data.content"
                :init="editorInit"
              />
            </q-card-section>
            <q-card-actions align="center">
              <q-btn class="full-width" color="primary" label="រក្សារទុក" @click="updateBlogContent({id:$route.params.id,data:{content:data.content}})">
                <q-tooltip content-class="bg-white text-primary">Save</q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script>
  import Editor from '@tinymce/tinymce-vue'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism-coy.css'
  export default {
    name: "EditBlog",
    components: {Editor},
    data() {
      return {
        content: 'Hi',
        dialog: false,
        maximizedToggle: true,
        editorInit: {
          max_height:650,
          menubar: true,
          images_upload_url: 'http://localhost:3000/file-upload',
          automatic_uploads: true,
          images_reuse_filename: true,
          relative_urls: false,
          remove_script_host: false,
          convert_urls: true,
          plugins: [
            'autoresize print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample code table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons'
          ],
          toolbar:
            'code undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment'
        },
        formData: new FormData(),
        dataPhoto: new FormData(),
        photo_prev: null,
        data: {
          title: '',
          content_id: '',
          thumbnail: '',
          hostname: 'http://localhost:3000/',
          category: 'JavaScript',
          description: '',
          content: '',
          isPublish: {label: 'Publish', value: true},
          tags: [],
          auth: 'Tun Cham Roeun',
          createdAt: null,
        }
      }
    },
    methods: {
      photoFn(value) {
        let self = this;
        self.dataPhoto.set('id', self.$route.params.id);
        self.dataPhoto.set('thumbnail', value);
        let reader = new FileReader();
        reader.readAsDataURL(value);
        reader.onload = function () {
          self.data.thumbnail = reader.result;
          self.data.hostname = '';
        };
        self.updateBlogThumbnail(self.dataPhoto)
      },
      updateBlogThumbnail(data) {
        let self = this;
        self.$store.dispatch('blog/updateBlogThumbnail', data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
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
      updateBlog(data) {
        let self = this;
        self.$store.dispatch('blog/updateBlog', data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
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
      updateBlogContent(data) {
        let self = this;
        self.$store.dispatch('blog/updateBlogContent', data).then(function (data) {
          if (data.status) {
            self.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: data.message
            });
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
      self.$store.dispatch('blog/editBlog', this.$route.params.id).then(function (data) {
        self.data.title = data.data.title;
        self.data.hostname = 'http://localhost:3000/';
        self.data.thumbnail = data.data.thumbnail;
        self.data.category = data.data.category;
        self.data.description = data.data.description;
        self.data.isPublish = data.data.isPublish ? {label: 'Publish', value: true} : {label: 'Private', value: false};
        self.data.tags = data.data.tags;
        self.data.auth = data.data.auth;
        self.data.createdAt = data.data.createdAt;
      })
      self.$store.dispatch('blog/fetchContentByBlog', this.$route.params.id).then(function (data) {
        self.data.content = data.data.content;
        self.data.content_id = data.data._id;
      })
    },
    updated() {
      Prism.highlightAll();
    }
  }
</script>

<style scoped>

</style>
