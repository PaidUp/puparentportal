<template>
  <md-step :id="stepId" md-label="Additional Info" :md-description="description" :md-editable="false" :md-done.sync="step">
    <div class="additional-info-box">
      <md-field>
        <label>Desired Position</label>
        <md-input></md-input>
      </md-field>
      <md-datepicker>
        <label>Select date</label>
      </md-datepicker>
      <md-field>
        <label for="usize">Uniform Size</label>
        <md-select name="usize" id="usize">
          <md-option value="s">Small</md-option>
          <md-option value="m">Medium</md-option>
          <md-option value="l">Large</md-option>
        </md-select>
      </md-field>
    </div>
    <md-button class="lblue md-accent">CANCEL</md-button>
    <md-button class="lblue md-accent md-raised" @click="select('add custom unfo')">NEXT</md-button>
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
    description () {
      return this.step ? 'N/A' : ''
    }
  },
  methods: {
    select (param) {
      this.$emit('select', param)
    }
  }
}
</script>
