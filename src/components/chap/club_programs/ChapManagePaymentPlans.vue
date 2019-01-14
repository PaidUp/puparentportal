<template>
  <!-- DETAILS -->
<div>
  <div class="details">
    <div v-if="false" class="pre-cards-title">Details</div>
    <div class="details-box">
      <div class="details-selects">
        <md-field>
          <label>Payment Plan Name</label>
          <md-input v-model="paymentPlanName"></md-input>
        </md-field>
        <md-field>
          <label>Custom Payment Plan</label>
          <md-select v-model="customPaymentPlan">
            <md-option value="true">Yes</md-option>
            <md-option value="false">No</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Accepted Payments Accounts</label>
          <md-select v-model="acceptedPaymentAccounts">
            <md-option value="card">Cards</md-option>
            <md-option value="bank">Banks</md-option>
            <md-option value="bc">Cards & Banks</md-option>
          </md-select>
        </md-field>
      </div>
      <div class="details-numbers">
        <div>
          <div class="concept">Total</div>
          <div class="title-big">$0</div>
        </div>
        <div v-if="false">
          <div class="concept">Overdue</div>
          <div class="title-big red">$1233</div>
        </div>
      </div>
    </div>
  </div>

  <!-- # CARDS -->
  <div class="cards-layout">
    <div class="md-card-add-circle">
      <md-button class="md-fab lblue">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  </div>

  <div class="actions">
    <div></div>
    <div>
      <md-button class="md-accent lblue" >CANCEL</md-button>
      <md-button class="md-accent lblue md-raised">UPDATE</md-button>
      <md-button class="md-accent lblue md-raised">SAVE</md-button>
    </div>
  </div>

</div>
</template>
<script>
export default {
  data () {
    return {
      customPaymentPlan: false,
      paymentPlanName: '',
      acceptedPaymentAccounts: 'card'
    }
  }
}
</script>

