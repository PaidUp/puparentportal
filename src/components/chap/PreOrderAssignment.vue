<template>
  <div style="padding: 16px;">
    <div class="title">
      PreOrder Assignment
    </div>
    <md-field>
      <label>Subject</label>
          <md-input v-model="subject"></md-input>
      </md-field>
    <h3>Comment</h3>
    <VueTrix name="comment" v-model="comment" />
    <br/>
    <md-field>
      <label>Select file</label>
      <md-file v-if="!submited" v-model="fileName" accept=".csv" @md-change="handleFileUpload" />
    </md-field>
    <md-button class="md-accent lblue" @click="cancel">CANCEL</md-button>
    <md-button :disabled="!fileName || !subject.trim().length" @click="upload" class="md-accent lblue md-raised">UPLOAD</md-button>

  </div>
</template>
<script>
import { mapActions } from 'vuex'
import config from '@/config'
import VueTrix from 'vue-trix'
export default {
  components: { VueTrix },
  data () {
    return {
      comment: '',
      subject: '',
      url: config.api.commerce + '/preorder/bulk',
      fileName: null,
      file: null,
      submited: false
    }
  },
  methods: {
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setWarning: 'setWarning'
    }),
    ...mapActions('preorderAssignmentModule', {
      uploadFile: 'uploadFile'
    }),
    upload () {
      this.submited = true
      this.uploadFile(this.file)
    },
    handleFileUpload (fileList) {
      this.file = fileList[0]
    },
    cancel () {
      this.file = null
    },
    upload1 () {
      this.submited = true
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('comment', this.comment)
      formData.append('subject', this.subject)
      this.$http.post(this.url, formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        },
        before: request => {
          this.request = request
        }
      }).then(resp => {
        this.fileName = null
        this.file = null
        this.setSuccess('An email was send to you account with the result of bulk preorders assignment ')
        this.submited = false
      }, reason => {
        this.submited = false
        console.log('reason', reason)
      })
    }
  }

}
</script>

