<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-subheading">{{ invoice.label }}</div>
        <div class="md-subhead">{{ paymetMethod }}</div>
      </md-card-header>
      <md-card-content class="card-content">
        <div class="status">
          <md-icon class="md-size-2x">check_circle</md-icon>
          <div class="md-caption">
            {{ invoice.status }}
          </div>
        </div>
        <div class="amount-details">
          <div class="details">
            <span class="md-caption">{{ invoice.invoiceId }}</span>
            <br>
            <span class="md-caption">{{ $d(chargeDate, 'short') }}</span>
          </div>
          <v-currency :amount="invoice.price" clazz="total md-title" />
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-accent">Fix</md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
  import VCurrency from '@/components/shared/VCurrency.vue'
  export default {
    props: {
      invoice: Object
    },
    components: {
      VCurrency
    },
    computed: {
      paymetMethod () {
        return this.invoice.paymentDetails.brand + '****' + this.invoice.paymentDetails.last4
      },
      chargeDate () {
        return this.invoice.dataCharge
      }
    }
  }
</script>
