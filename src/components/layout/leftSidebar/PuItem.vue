<template lang="pug">
md-list-item(:to="item.to")
  md-avatar.md-large(v-if="avatar")
    img(:src="avatar")
  md-icon(v-else class="md-size-2x ca1") account_circle  
  .md-list-item-text
    div
      span {{ item.title }}
      br
      span.caption {{ item.description }}
  span.notification-number(v-if="item.notification") {{ item.notification }}
</template>
<script>
import config from '@/config'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      avatar: null
    }
  },
  mounted () {
    this.loadAvatar()
  },
  watch: {
    item () {
      this.loadAvatar()
    }
  },
  methods: {
    loadAvatar () {
      let urlPath = `${config.media.beneficiary.url}avatar/${this.item.id}.png?a=${Math.random()}`
      console.log(urlPath)
      this.$http.get(urlPath)
      .then(resp => {
        this.avatar = resp.url
      }).catch(reason => {
      })
    }
  }
}
</script>
