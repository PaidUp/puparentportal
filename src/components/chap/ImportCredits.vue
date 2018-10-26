<template>
  <div style="padding: 16px;">
    <div class="title">
      Import Credits
    </div>
    <br/>
    <md-field>
      <label>Select file</label>
      <md-file v-if="!submited" v-model="fileName" accept=".csv" @md-change="handleFileUpload" />
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
      url: config.api.broker + '/api/v1/broker/bulk/credit',
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
    ...mapActions('importCreditsModule', {
      uploadFile: 'uploadFile'
    }),
    handleFileUpload (fileList) {
      this.file = fileList[0]
    },
    cancel () {
      this.file = null
      this.fileName = null
    },
    upload () {
      this.submited = true
      this.uploadFile({file: this.file}).then(file => {
        this.fileName = null
        this.file = null
        this.submited = false
        this.setSuccess('An email was send to you account with the result of bulk credit import')
      }).catch(reason => {
        this.submited = false
        console.log('reason', reason)
      })
    }
  }

}
</script>

