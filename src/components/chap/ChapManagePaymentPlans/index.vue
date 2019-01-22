<template>
  <!-- DETAILS -->
  <div>
    <div class="details">
      <div v-if="false" class="pre-cards-title">Details</div>
      <div class="details-box">
        <div class="details-selects">
          <md-field>
            <label>Group Id</label>
            <md-input v-model="groupId"></md-input>
          </md-field>
          <md-field :class="{'md-invalid': $v.paymentPlanName.$error}">
            <label>Payment Plan Name</label>
            <md-input v-model="paymentPlanName" @input="$v.paymentPlanName.$touch()"></md-input>
            <span class="md-error" v-if="!$v.paymentPlanName.required">{{ $t('validations.required', { field: 'Plan Name' }) }}</span>
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
              <md-option value="bank,card">Cards & Banks</md-option>
              <md-option value="card">Cards</md-option>
              <md-option value="bank">Banks</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="details-numbers">
          <div>
            <div class="concept">Total</div>
            <div class="title-big">${{totals.total | currency}}</div>
          </div>
          <div>
            <div class="concept">Paid</div>
            <div class="title-big green">${{totals.paid | currency}}</div>
          </div>
          <div>
            <div class="concept">Unpaid</div>
            <div class="title-big gray">${{totals.unpaid | currency}}</div>
          </div>
          <div>
            <div class="concept">Others</div>
            <div class="title-big blue">${{totals.others | currency}}</div>
          </div>
        </div>
        



      </div>
    </div>
    <br/>

    <!-- # CARDS -->
    <div class="cards-layout">
      <md-card md-with-hover class="card-invoice2" v-for="box in boxes" :key="box.description + box.dateCharge">
        <md-card-header>
          <div class="title cgray">{{ box.description }}</div>
        </md-card-header>
        <md-card-content>
          <div class="status">
            <md-icon class="md-size-c" :class="invoiceMapper[box.status].class">{{invoiceMapper[box.status].key}}</md-icon>
            <div class="md-caption">{{invoiceMapper[box.status].desc}}</div>
          </div>
          <div class="amount-details">
            <div class="details">
              <span class="md-caption">{{box.dateCharge | localFormatDate}}</span>
            </div>
            <v-currency :amount="box.amount" clazz="total md-title"></v-currency>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>file_copy</md-icon>
          </md-button>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
      <div class="md-card-add-circle">
        <md-button @click="showDialog = true" class="md-fab lblue">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>

    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="$emit('cancel')" >CANCEL</md-button>
      <md-button v-if="false" class="md-accent lblue md-raised">UPDATE</md-button>
      <md-button :disabled="disableBtn" @click="save" class="md-accent lblue md-raised">SAVE</md-button>
    </md-dialog-actions>

    <add-invoice-modal :showDialog="showDialog" @close="showDialog = false" @add="add"></add-invoice-modal>
    <v-pay-animation :animate="submit" :result="result" @finish="close"/>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import VCurrency from '@/components/shared/VCurrency.vue'
import AddInvoiceModal from './addInvoiceModal'
import { planService } from '@/services'
import VPayAnimation from '@/components/shared/VPayAnimation.vue'

function sortBoxes (boxA, boxB) {
  return boxA.dateCharge.getTime() - boxB.dateCharge.getTime()
}

export default {
  components: { VCurrency, AddInvoiceModal, VPayAnimation },
  data () {
    return {
      groupId: '',
      showDialog: false,
      customPaymentPlan: false,
      paymentPlanName: '',
      acceptedPaymentAccounts: 'bank,card',
      credits: [],
      dues: [],
      submit: false,
      result: null
    }
  },
  computed: {
    ...mapState('commonModule', {
      invoiceMapper: 'invoiceMapper'
    }),
    ...mapState('clubprogramsModule', {
      programSelected: 'programSelected'
    }),
    disableBtn () {
      return this.$v.$invalid || this.boxes.length < 1
    },
    boxes () {
      let boxes = this.dues.concat(this.credits)
      return boxes.sort(sortBoxes)
    },
    totals () {
      return this.boxes.reduce((curr, val) => {
        curr.total = curr.total + val.amount
        if (val.status === 'autopay') curr.unpaid = curr.unpaid + val.amount
        else if (val.status === 'paid' || val.status === 'credited') curr.paid = curr.paid + val.amount
        else curr.others = curr.others + val.amount
        return curr
      }, {total: 0, paid: 0, unpaid: 0, others: 0})
    }
  },
  methods: {
    add (box) {
      if (box.status === 'autopay') {
        this.dues.push(box)
      } else {
        this.credits.push(box)
      }
      this.showDialog = false
    },
    save () {
      const credits = this.credits.map(credit => {
        credit.dateCharge = this.$moment.removeTimeZone(credit.dateCharge).toDate()
        return credit
      }).sort(sortBoxes)
      const dues = this.dues.map(due => {
        due.dateCharge = this.$moment.removeTimeZone(due.dateCharge).toDate()
        due.maxDateCharge = this.$moment.removeTimeZone(due.maxDateCharge).toDate()
        return due
      }).sort(sortBoxes)

      console.log('dues: ', dues)
      console.log('credits: ', credits)

      this.submit = true
      const params = {
        key: this.paymentPlanName.replace(/\s/g, '_'),
        groupId: this.groupId,
        description: this.paymentPlanName,
        paymentMethods: this.acceptedPaymentAccounts.split(','),
        visible: !this.customPaymentPlan,
        status: 'active',
        credits,
        dues,
        productId: this.programSelected
      }
      planService.create(params).then(response => {
        this.result = response
        this.submit = false
      }).catch(reason => {
        this.submit = false
        console.log('reason: ', reason)
      })
    },
    close () {
      this.$emit('added', this.result)
    }
  },
  validations: {
    paymentPlanName: {
      required
    }
  }
}
</script>

