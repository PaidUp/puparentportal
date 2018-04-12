<template lang="pug">
  md-step(id="step2" md-label="Program" :md-done.sync="step")
    .programs
      .program.md-elevation-2.md-body-2(@click="select('program1')") 12U Red Premier
      .program.md-elevation-2.md-body-2(@click="select('program2')") 13U Redgional
      .program.md-elevation-2.md-body-2(@click="select('program3')") 16U Elite
      .program.md-elevation-2.md-body-2(@click="select('program4')") Summer Clinics sessions
    .step-actions
      md-button.lblue.md-accent CANCEL
</template>
<script>
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

  },
  methods: {
    select (param) {
      this.$emit('select', param)
    }
  }
}
</script>
