<template>
  <div style="padding: 16px;">
    <div class="title">
      PreOrder Assignment
    </div>
    <br/>
    <md-field>
      <label>Select file</label>
      <md-file v-model="fileName" accept=".csv" @md-change="handleFileUpload" />
    </md-field>
    <md-button class="md-accent lblue" @click="cancel">CANCEL</md-button>
    <md-button :disabled="!fileName" @click="upload" class="md-accent lblue md-raised">UPLOAD</md-button>

  </div>
</template>
<script>
import { mapActions } from 'vuex'
import config from '@/config'
export default {
  data () {
    return {
      url: config.api.commerce + '/preorder/bulk',
      fileName: null,
      file: null
    }
  },
  methods: {
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setWarning: 'setWarning'
    }),
    handleFileUpload (fileList) {
      this.file = fileList[0]
    },
    cancel () {
      this.file = null
      this.fileName = null
    },
    upload () {
      let formData = new FormData()
      formData.append('file', this.file)
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
      }, reason => {
        console.log('reason', reason)
      })
    }
  }

}
</script>

