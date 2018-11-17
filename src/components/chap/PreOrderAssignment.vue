<template>
  <div style="padding: 16px;">
    <div class="title">
      PreOrder Assignment
    </div>
    <md-tabs class="tabs-lblue" @md-changed="loadFiles">
      <md-tab id="tab-upload" md-label="Upload">
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
      </md-tab>
      <md-tab id="tab-files" md-label="Files">
        <div v-if="!rows.length">
          <div class="tab-toolbar">
            <md-button @click="loadFiles('tab-files')" class="lblue md-accent md-raised md-dens md-icon-button">
              <md-icon>refresh</md-icon>
            </md-button>
          </div>
          <md-table class="custom-table" md-card>
            <md-table-row>
              <md-table-head >Rows</md-table-head>
              <md-table-head>File Name</md-table-head>
              <md-table-head>Date</md-table-head>
              <md-table-head>Key</md-table-head>
            </md-table-row>

            <md-table-row class="pointer" v-for="row in files" :key="row._id" @click="loadRows(row.keyFile)">
              <md-table-cell md-numeric>{{row.rows}}</md-table-cell>
              <md-table-cell>{{row.fileName}}</md-table-cell>
              <md-table-cell>{{row.onUpload}}</md-table-cell>
              <md-table-cell>{{row.keyFile}}</md-table-cell>
            </md-table-row>

          </md-table>
        </div>
        <div v-else>
          <div class="tab-toolbar">
            <md-button @click="setRows([])" class="lblue md-accent md-raised md-dens md-icon-button">
              <md-icon>arrow_back</md-icon>
            </md-button>
            <md-button @click="loadRows(key)" class="lblue md-accent md-raised md-dens md-icon-button">
              <md-icon>refresh</md-icon>
            </md-button>
          </div>
          <md-table class="custom-table" md-card>
            <md-table-row>
              <md-table-head md-numeric>Row</md-table-head>
              <md-table-head>Status</md-table-head>
              <md-table-head>Organization</md-table-head>
              <md-table-head>Player</md-table-head>
              <md-table-head>Parent</md-table-head>
              <md-table-head>userStatus</md-table-head>
              <md-table-head>beneficiaryStatus</md-table-head>
              <md-table-head>preorderStatus</md-table-head>
              <md-table-head>zdCreateUserStatus</md-table-head>
              <md-table-head>zdTicketsCreateStatus</md-table-head>
            </md-table-row>

            <md-table-row v-for="row in rows" :key="row._id">
              <md-table-cell md-numeric>{{row.row}}</md-table-cell>
              <md-table-cell>{{row.status}}</md-table-cell>
              <md-table-cell>{{row.organizationName}}</md-table-cell>
              <md-table-cell>{{`${row.beneficiaryFirstName} ${row.beneficiaryLastName}`}}</md-table-cell>
              <md-table-cell>{{`${row.parentFirstName} ${row.parentLastName}`}}</md-table-cell>
              <md-table-cell>{{row.userStatus}}</md-table-cell>
              <md-table-cell>{{row.beneficiaryStatus}}</md-table-cell>
              <md-table-cell>{{row.preorderStatus}}</md-table-cell>
              <md-table-cell>{{row.zdCreateUserStatus}}</md-table-cell>
              <md-table-cell>{{row.zdTicketsCreateStatus}}</md-table-cell>
            </md-table-row>

          </md-table>
        </div>


      </md-tab>
    </md-tabs>
    
    

  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import VueTrix from 'vue-trix'
export default {
  components: { VueTrix },
  data () {
    return {
      comment: '',
      subject: '',
      fileName: null,
      file: null,
      submited: false,
      key: ''
    }
  },
  computed: {
    ...mapState('preorderAssignmentModule', {
      files: 'files',
      rows: 'rows'
    }),
    ...mapState('userModule', {
      user: 'user'
    })
  },
  methods: {
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setWarning: 'setWarning'
    }),
    ...mapMutations('preorderAssignmentModule', {
      setRows: 'setRows'
    }),
    ...mapActions('preorderAssignmentModule', {
      uploadFile: 'uploadFile',
      fetchFiles: 'fetchFiles',
      fetchFileRows: 'fetchFileRows'
    }),
    loadFiles (tabId) {
      if (tabId === 'tab-files') {
        this.fetchFiles(this.user.email)
      }
    },
    loadRows (key) {
      this.key = key
      this.fetchFileRows(key)
    },
    upload () {
      this.submited = true
      this.uploadFile({file: this.file, subject: this.subject, comment: this.comment}).then(file => {
        this.fileName = null
        this.file = null
        this.setSuccess('An email was send to you account with the result of bulk preorders assignment ')
        this.submited = false
      }).catch(reason => {
        this.submited = false
        console.log('reason', reason)
      })
    },
    handleFileUpload (fileList) {
      this.file = fileList[0]
    },
    cancel () {
      this.file = null
    }
  }

}
</script>

