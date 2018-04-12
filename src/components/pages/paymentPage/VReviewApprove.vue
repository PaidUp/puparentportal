<template>
  <md-step id="step7" md-label="Review &amp; Approve">
    <div class="review-checks">
      <md-checkbox v-model="check1" class="">
        I authorize PaiUp to charge me
        <span class="cgreen">
          <b>$600</b>
        </span>
        <b>today</b> on my Visa****2323
      </md-checkbox>
      <md-checkbox v-model="check2" class="">
        I authorize PaiUp to setup the remaining
        <span class="cgreen">
          <b>$900</b>
        </span>
        <b>on autopay</b> on the dates and amount in the payment plan I selected
      </md-checkbox>
      <md-checkbox v-model="check3" class="">
        I agree that PaidUp cannot modify or cancel any payments without approval from the club
      </md-checkbox>
    </div>
    <md-button class="lblue md-accent md-raised">AUTHORIZE PAYMENTS</md-button>
    <md-button class="lblue md-accent">CANCEL</md-button>
  </md-step>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      check1: false,
      check2: false,
      check3: false
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
