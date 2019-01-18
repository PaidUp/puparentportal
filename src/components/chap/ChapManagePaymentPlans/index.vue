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
            <div class="title-big">${{100 | currency}}</div>
          </div>
          <div>
            <div class="concept">Paid</div>
            <div class="title-big green">${{100 | currency}}</div>
          </div>
          <div>
            <div class="concept">Unpaid</div>
            <div class="title-big gray">${{100 | currency}}</div>
          </div>
          <div>
            <div class="concept">Overdue</div>
            <div class="title-big red">${{100 | currency}}</div>
          </div>
          <div>
            <div class="concept">Others</div>
            <div class="title-big blue">${{100 | currency}}</div>
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
              <span class="md-caption">{{$moment.formatDate(box.dateCharge)}}</span>
            </div>
            <v-currency :amount="433.00" clazz="total md-title"></v-currency>
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
      <md-button class="md-accent lblue" >CANCEL</md-button>
      <md-button class="md-accent lblue md-raised">UPDATE</md-button>
      <md-button class="md-accent lblue md-raised">SAVE</md-button>
    </md-dialog-actions>

    <add-invoice-modal :showDialog="showDialog" @close="showDialog = false" @add="add"></add-invoice-modal>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required, decimal } from 'vuelidate/lib/validators'
import VCurrency from '@/components/shared/VCurrency.vue'
import addInvoiceModal from './addInvoiceModal'
export default {
  components: { VCurrency, addInvoiceModal },
  data () {
    return {
      showDialog: false,
      customPaymentPlan: false,
      paymentPlanName: '',
      acceptedPaymentAccounts: 'card',
      credits: [],
      dues: []
    }
  },
  computed: {
    ...mapState('commonModule', {
      invoiceMapper: 'invoiceMapper'
    }),
    boxes () {
      let boxes = this.dues.concat(this.credits)
      return boxes.sort((boxA, boxB) => {
        if (this.$moment(boxA.dateCharge).isBefore(boxB.dateCharge)) return -1
        return 1
      })
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
    }
  },
  validations () {
    if (this.status === 'autopay') {
      return {
        description: {
          required
        },
        amount: {
          required, decimal
        },
        dateCharge: {
          required
        },
        maxDateCharge: {
          required
        },
        status: {
          required
        }
      }
    }
    return {
      label: {
        required
      },
      amount: {
        required, decimal
      },
      dateCharge: {
        required
      },
      status: {
        required
      }
    }
  }
}
</script>

