<template lang="pug">
  md-step(id="step1" md-label="Player" md-description="Choose a player or add a new one" :md-done.sync="step")
    .players
      .player.md-elevation-2(@click="select('@@@Param')")
        md-avatar.md-elevation-4
          img(src="@/assets/avatar.jpg")
        .name.md-body-2 Enzo Fernandez
        .team.md-caption Isotopes Baseball Club
    md-button.lblue.md-accent.md-raised ADD NEW PLAYER
    md-button.lblue.md-accent CANCEL
</template>
<script>
// import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    step: Boolean
  },
  data () {
    return {
      player: null
    }
  },
  computed: {
    // ...mapState('paymentModule', {
    //   step1: 'step1'
    // })
  },
  methods: {
    // ...mapMutations('paymentModule', {
    //   setDone: 'setDone'
    // })
    select (param) {
      console.log('param: ', param)
      this.$emit('select', param)
    }
  }
}
</script>
