<template lang="pug">
  .update-pic
    md-avatar.md-avatar-icon.md-large.md-elevation-4(v-if="image")
      img(:src="image")
    md-icon.md-size-3x.md-primary(v-else) account_circle
    md-button.md-accent.lblue.update-btn(@click="selectFile") ADD PROFILE PICTURE
    input(type="file" style="display:none" ref="file" accept="image/*" @change="onFileChange")
</template>
<script>
export default {
  props: {
    url: {
      type: String
    }
  },
  data () {
    return {
      image: null,
      file: null
    }
  },
  watch: {
    url () {
      if (this.url && this.file) {
        this.uploadFile()
      }
    }
  },
  methods: {
    selectFile () {
      this.$refs.file.click()
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }
      this.file = files[0]
      this.createImage(files[0])
    },
    createImage (file) {
      // let image = new Image()
      let reader = new FileReader()
      let vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
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
        this.$emit('uploaded', resp)
      })
    }
  }

}
</script>

