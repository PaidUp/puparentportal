<template lang="pug">
md-list-item(:to="item.to")
  md-avatar.md-size-c(v-if="avatar")
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
import { mapActions } from 'vuex'
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
    const url = `${config.media.beneficiary.url}avatar/${this.item.id}.png?a=${Math.random()}`
    this.validateUrl(url).then(response => {
      this.avatar = response.data.validateUrl
    }).catch(reason => reason)
  },
  computed: {
  },
  watch: {
    item () {
      const url = `${config.media.beneficiary.url}avatar/${this.item.id}.png?a=${Math.random()}`
      this.validateUrl(url).then(response => {
        this.avatar = response.data.validateUrl
      }).catch(reason => reason)
    }
  },
  methods: {
    ...mapActions('commonModule', {
      validateUrl: 'validateUrl'
    })
  }
}
</script>
