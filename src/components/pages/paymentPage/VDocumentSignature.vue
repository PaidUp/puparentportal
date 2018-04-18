<template>
  <md-step :id="stepId" md-label="Document Signature" md-description="N/A" :md-editable="false" :md-done.sync="step">
    <div class="docs-signature">
      <div class="doc-signature md-elevation-2 title cblue" @click="select('select 1')">Isotopes Baseball Club Code of Conduct Agreement 2019 & Financial Agreement 2019</div>
      <div class="doc-signature md-elevation-2 title cblue" @click="select('select 2')">Isotopes Baseball Club Code of Conduct Agreement 2019 & Financial Agreement 2019</div>
    </div>
  </md-step>
</template>
<script>
export default {
  props: {
    stepId: {
      type: String,
      required: true
    },
    step: Boolean
  },
  data () {
    return {
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
