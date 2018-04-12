<template>
  <md-step id="step6" md-label="Document Signature">
    <div class="docs-signature">
      <div class="doc-signature md-elevation-2 title cblue" @click="select('select 1')">Isotopes Baseball Club Code of Conduct Agreement 2019 & Financial Agreement 2019</div>
      <div class="doc-signature md-elevation-2 title cblue" @click="select('select 2')">Isotopes Baseball Club Code of Conduct Agreement 2019 & Financial Agreement 2019</div>
    </div>
  </md-step>
</template>
<script>
export default {
  props: {
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
