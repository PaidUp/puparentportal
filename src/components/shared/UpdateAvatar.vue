<template>
  <div>
    <md-button class="md-accent lblue update-btn" @click="selectFile">UPDATE PROFILE PICTURE</md-button>
    <input type="file" style="display:none" ref="file" accept="image/*" v-uploader/>
  </div>
</template>
<script>
import Uploader from '@/directives/uploader'
export default {
  directives: {
    Uploader
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      file: null
    }
  },
  watch: {
    file () {
      if (this.file) {
        this.uploadFile()
      }
    }
  },
  methods: {
    selectFile () {
      this.$refs.file.click()
    },
    uploadFile () {
      let formData = new FormData()
      formData.append('avatar', this.file)
      this.$http.post(this.url, formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        },
        before: request => {
          this.request = request
        }
      }).then(resp => {
        this.$emit('charged', resp)
      })
    }
  }

}
</script>

