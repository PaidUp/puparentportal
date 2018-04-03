<template>
  <div class="payments-page md-elevation-4">
    <div class="md-title">
      Make/Schedule Payment
    </div>
    <!-- md-linear -->
    <md-steppers md-vertical md-dynamic-height :md-active-step.sync="active">
      <md-step id="step1" md-label="Player" md-description="Choose a player or add a new one" :md-done.sync="step1">
        <div class="players">
          <div class="player md-elevation-2" @click="setDone('step1', 'step2')">
            <md-avatar class="md-elevation-4">
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="name md-body-2">Enzo Fernandez</div>
            <div class="team md-caption">Isotopes Baseball Club</div>
          </div>
          <div class="player md-elevation-2" @click="setDone('step1', 'step2')">
            <md-avatar class="md-elevation-4">
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="name md-body-2">Enzo Fernandez</div>
            <div class="team md-caption">Isotopes Baseball Club</div>
          </div>
          <div class="player md-elevation-2" @click="setDone('step1', 'step2')">
            <md-avatar class="md-elevation-4">
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="name md-body-2">Enzo Fernandez</div>
            <div class="team md-caption">Isotopes Baseball Club</div>
          </div>
        </div>
        <md-button class="lblue md-accent md-raised">ADD NEW PLAYER</md-button>
        <md-button class="lblue md-accent">CANCEL</md-button>
      </md-step>

      <md-step id="step2" md-label="Program" :md-done.sync="step2">
        <div class="programs">
          <div class="program md-elevation-2 md-body-2" @click="setDone('step2', 'step3')">12U Red Premier</div>
          <div class="program md-elevation-2 md-body-2" @click="setDone('step2', 'step3')">13U Redgional</div>
          <div class="program md-elevation-2 md-body-2" @click="setDone('step2', 'step3')">16U Elite</div>
          <div class="program md-elevation-2 md-body-2" @click="setDone('step2', 'step3')">Summer Clinics sessions</div>
        </div>
        <div class="step-actions">
          <md-button class="lblue md-accent">CANCEL</md-button>
        </div>
      </md-step>

      <md-step id="step3" md-label="Payment Account" :md-done.sync="step3">
        <div class="payment-accounts">
          <div class="account md-elevation-2" @click="setDone('step1', 'step2')">
            <md-icon class="md-size-2x">account_balance</md-icon>
            <div class="name md-body-2">Felipe Fernandez</div>
            <div class="card-details md-caption">Visa ****12332</div>
            <div class="card-details md-caption">Exp. 11/21</div>
          </div>
          <div class="account md-elevation-2" @click="setDone('step1', 'step2')">
            <md-icon class="md-size-2x">account_balance</md-icon>
            <div class="name md-body-2">Felipe Fernandez</div>
            <div class="card-details md-caption">Visa ****12332</div>
            <div class="card-details md-caption">Exp. 11/21</div>
          </div>
          <div class="account md-elevation-2" @click="setDone('step1', 'step2')">
            <md-icon class="md-size-2x">account_balance</md-icon>
            <div class="name md-body-2">Felipe Fernandez</div>
            <div class="card-details md-caption">Visa ****12332</div>
            <div class="card-details md-caption">Exp. 11/21</div>
          </div>
        </div>
        <md-button class="lblue md-accent md-raised">ADD NEW CARD</md-button>
        <md-button class="lblue md-accent md-raised">ADD NEW BANK</md-button>
        <md-button class="lblue md-accent">CANCEL</md-button>
      </md-step>

      <md-step id="step4" md-label="Payment Plan" md-description="If you need a custom payment plan, please email support@getpaidup.com or call (855) 764-3232">
        <div class="payment-plans">
          <div class="payment-plan md-elevation-2" @click="setDone('step4', 'step5')">
            <div class="md-subheading">Dues Payments in Full
              <br> ($100 Discount)</div>
            <div>
              <div class="md-title">$1,400.00</div>
              <div class="md-caption">1 installment</div>
              <div class="md-caption">$1,400 PaiUp by Today</div>
              <div class="md-caption">$900 PaiUp by March 1, 2019</div>
            </div>
          </div>
          <div class="payment-plan md-elevation-2" @click="setDone('step4', 'step5')">
            <div class="md-subheading ">Dues Payment in Full</div>
            <div>
              <div class="md-title">$1,400.00</div>
              <div class="md-caption">1 installment</div>
            </div>
          </div>
          <div class="payment-single md-elevation-2" @click="setDone('step4', 'step5')">
            <div>
              <div class="title cgray bold">Dues - Payment 1</div>
              <div class="caption">Visa ****3432</div>
            </div>
            <div class="details">
              <div class="icon-side">
                <md-icon class="cred md-size-c">today</md-icon>
                <div class="caption cred">OVERDUE</div>
              </div>
              <div class="amount-side">
                <div class="caption cred">CHARGED TODAY</div>
                <div class="caption">02-02-2018</div>
                <div class="number-big cred">$300.
                  <sup>00</sup>
                </div>
              </div>
            </div>
            <div class="actions">
              <md-button class="lblue md-accent">EDIT</md-button>
            </div>
          </div>
          <div class="payment-single md-elevation-2" @click="setDone('step4', 'step5')">
            <div>
              <div class="title cgray bold">Dues - Payment 2</div>
              <div class="caption">Visa ****3432</div>
            </div>
            <div class="details">
              <div class="icon-side">
                <md-icon class="cblue md-size-c">today</md-icon>
                <div class="caption">DUE</div>
              </div>
              <div class="amount-side">
                <div class="caption">02-02-2018</div>
                <div class="number-big cgreen">$300.
                  <sup>00</sup>
                </div>
              </div>
            </div>
            <div class="actions">
              <md-button class="lblue md-accent">EDIT</md-button>
            </div>
          </div>
        </div>
        <md-button class="lblue md-accent md-raised">ACEPT PAYMENT PLAN</md-button>
        <md-button class="lblue md-accent">CANCEL</md-button>
      </md-step>
      <md-step id="step5" md-label="Additional Info">
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
        <md-button class="lblue md-accent md-raised">NEXT</md-button>
        <md-button class="lblue md-accent">CANCEL</md-button>
      </md-step>
      <md-step id="step6" md-label="Document Signature">
        <div class="docs-signature">
          <div class="doc-signature md-elevation-2 title cblue" @click="setDone('step6', 'step7')">Isotopes Baseball Club Code of Conduct Agreement 2019 & Financial Agreement 2019</div>
          <div class="doc-signature md-elevation-2 title cblue" @click="setDone('step6', 'step7')">Isotopes Baseball Club Code of Conduct Agreement 2019 & Financial Agreement 2019</div>
        </div>
      </md-step>
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
    </md-steppers>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    components: {},
    data: function () {
      return {
        active: 'step1',
        step1: false,
        step2: false,
        step3: false,
        check1: false,
        check2: false,
        check3: false,
        selectedDate: null
      }
    },
    methods: {
      setDone (id, index) {
        this[ id ] = true
        if (index) {
          this.active = index
        }
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
