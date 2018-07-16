<template>
  <div class="fees-calculator-page">
    <div class="padded-main-box md-elevation-4">
      <div class="title">
        Fees Calculator
      </div>
      <div class="title-info">
        Use this tool to help you determine the new price for parents.
      </div>
      <div class="calc-body">
        <div class="fields-box">
          <md-field>
            <label>Original Price</label>
            <span class="md-prefix">$</span>
            <md-input></md-input>
          </md-field>
          <md-field>
            <label>Collection Period</label>
            <md-input></md-input>
            <span class="md-helper-text">Number of installments parents can pay the balance</span>
          </md-field>
        </div>
        <div class="radios-box">
          <div class="radio-box">
            <div class="title-info bold">PaidUp Fee</div>
            <div class="cgray">3.5% per trasaction</div>
            <div class="caption">Cost of the PaidUp service</div>

            <div class="title-info bold radio-label">PaidUp Fee Paid By</div>
            <md-radio v-model="radio1" value="club" class="lblue">Club</md-radio>
            <md-radio v-model="radio1" value="parent" class="lblue">Parent</md-radio>
          </div>
          <div class="radio-box">
            <div class="title-info bold">Processing Fee</div>
            <div class="cgray">2.9% + $0.30 per trasaction</div>
            <div class="caption">Cost of processing online debit and credit cards</div>

            <div class="title-info bold radio-label">Processing Fee Paid By</div>
            <md-radio v-model="radio2" value="club" class="lblue">Club</md-radio>
            <md-radio v-model="radio2" value="parent" class="lblue">Parent</md-radio>
          </div>
        </div>
        <div class="title-info bold">New price</div>
        <div class="new-price">$2,604</div>
        <div class="caption">Price you should charge parents</div>
        <div class="caption">(rounded up to the nearest $5)</div>
        <div class="prices-box">
          <div class="centered">
            <div class="title-info bold">Net Deposit</div>
            <div class="price">$2,604.55</div>
          </div>
          <div class="centered">
            <div class="title-info bold">PaidUp Fee</div>
            <div class="price">$24</div>
          </div>
          <div class="centered">
            <div class="title-info bold">Processing Fee</div>
            <div class="price">$88</div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        radio1: 'club',
        radio2: 'parent'
      }
    },
    methods: {}
  }
</script>
