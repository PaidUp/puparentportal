<template>
  <div @click="click(parent)">
    <md-card class="card-person">
      <md-avatar class="md-large" v-if="avatar">
        <img :src="avatar" @error="showAvatar = false"/>
      </md-avatar>
      <md-icon v-else class="md-size-3x">account_circle</md-icon>
      <div class="name">{{parent.firstName}} {{parent.lastName}}</div>
      <div class="title-info">{{parent.email}}</div>
      <div class="title-info">{{parent.phone | formatPhone}}</div>
    </md-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    parent: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      avatar: null,
      parents: {}
    }
  },
  async mounted () {
    let url = await this.getAvatarUrl(this.parent._id)
    this.validateUrl(url).then(response => {
      this.avatar = response.data.validateUrl
    }).catch(reason => reason)
  },
  methods: {
    ...mapActions('commonModule', {
      validateUrl: 'validateUrl'
    }),
    ...mapActions('userModule', {
      getAvatarUrl: 'getAvatarUrl'
    }),
    click (parent) {
      this.$emit('click', parent)
    }
  }
}
</script>

