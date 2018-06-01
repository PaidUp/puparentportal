<template>
  <div class="upgrade-page md-elevation-4">
    <div class="md-title">
      Upgrade to Club Director Account
    </div>

    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">
      <md-step id="step1" md-label="Personal Info" :md-editable="false" :md-done.sync="step1">
        <div class="step-box" :md-description="upgradeData">
          <div class="additional-info">
            This information is required for us to verify your identity. This helps to keep everyone payments safe and meet government
            regulations.
          </div>
          <md-field>
            <label>Legal First Name</label>
            <md-input></md-input>
          </md-field>
          <div class="field-caption">Provide your name as it appears in legal documents to avoid delays in getting your deposits (e.g. Michael not Mike).</div>
          <md-field>
            <label>Legal Last Name</label>
            <md-input></md-input>
          </md-field>
          <md-datepicker>
            <label>Date of Birth</label>
          </md-datepicker>
          <md-field>
            <label>Social Security Number (SSN)</label>
            <md-input></md-input>
          </md-field>
          <md-field>
            <label>Address</label>
            <md-input></md-input>
          </md-field>
          <div class="address-info">
            <md-field>
              <label>City</label>
              <md-input></md-input>
            </md-field>
            <md-field>
              <label>State</label>
              <md-select name="state" id="state" md-dense>
                <md-option value="TX">TX</md-option>
                <md-option value="TX">TX</md-option>
                <md-option value="TX">TX</md-option>
                <md-option value="TX">TX</md-option>
              </md-select>
            </md-field>
            <md-field>
              <label>Zip</label>
              <md-input></md-input>
            </md-field>
          </div>

        </div>
        <md-button class="md-accent lblue" to="/profile">CANCEL</md-button>
        <md-button class="md-raised md-accent lblue" @click="setDone('step1', 'step2')">NEXT</md-button>
      </md-step>
      <md-step id="step2" md-label="Business Info" :md-editable="false" :md-done.sync="step2">
        <div class="step-box">
          <div class="additional-info">
            The Patriot Act require us to capture information about your business to prevent money laundering. Necessary information
            but standard. Not to worry.
          </div>
          <md-field>
            <label>Business Type</label>
            <md-select name="btype" id="btype" md-dense>
              <md-option value="Non-Profit">Non-Profit</md-option>
              <md-option value="Non-Profit">Non-Profit</md-option>
              <md-option value="Non-Profit">Non-Profit</md-option>
              <md-option value="Non-Profit">Non-Profit</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Legal Business Name</label>
            <md-input></md-input>
          </md-field>
          <div class="field-caption">Enter the legan name of hour Business exactly as it appears in your tax documentats to avoid any delay in your
            deposits.</div>
          <md-field :md-toggle-password="false">
            <label>Employee Identificator Number (EIN)</label>
            <md-input type="password"></md-input>
          </md-field>

        </div>
        <md-button class="md-accent lblue" to="/profile">CANCEL</md-button>
        <md-button class="md-raised md-accent lblue" @click="setDone('step2', 'step3')">NEXT</md-button>
      </md-step>
      <md-step id="step3" md-label="First Step" md-description="Optional" :md-editable="false" :md-done.sync="step3">
        <div class="step-box">
          <div class="additional-info">
           PaidUp will deposit your money (net or fees) into this banck account every 2 business days after we process a payment.
          </div>
          <md-field :md-toggle-password="false">
            <label>Bank Routing Number (ABA)</label>
            <md-input type="password"></md-input>
          </md-field>
          <md-field :md-toggle-password="false">
            <label>Bank Account Number (DDA)</label>
            <md-input type="password"></md-input>
          </md-field>
          <md-field :md-toggle-password="false">
            <label>Re-Enter Bank Account Number (DDA)</label>
            <md-input type="password"></md-input>
          </md-field>

        </div>
        <md-button class="md-accent lblue" to="/profile">CANCEL</md-button>
        <md-button class="md-raised md-accent lblue" @click="setDone('step2', 'step3')">UPGRADE ACCOUNT</md-button>
      </md-step>
    </md-steppers>
  </div>

</template>

<script>
  import capitalize from '@/helpers/capitalize'
  export default {
    data: function () {
      return {
        active: 'step1',
        step1: false,
        step2: false,
        step3: false
      }
    },
    methods: {
      setDone (id, index) {
        this[ id ] = true
        // next step
        if (index) {
          this.active = index
        }
      }
    }
  }
</script>
