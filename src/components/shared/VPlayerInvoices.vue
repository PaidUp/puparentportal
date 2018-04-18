<template lang="pug">
  md-card(md-with-hover)
    md-ripple(v-if="invoice.invoiceId")
      md-card-header
        .md-subheading {{ invoice.label }}
        .md-subhead {{ paymetMethod }}
      md-card-content.card-content
        .status
          md-icon.md-size-2x(:class="clazz") {{ icon }}
          .md-caption(v-html="status")
        .amount-details
          .details
            span.md-caption {{ invoice.invoiceId }}
            br
            span.md-caption {{ $d(chargeDate, 'short') }}
          v-currency(:amount="invoice.price" clazz="total md-title")
      md-card-actions
        md-button.md-accent Fix

    md-ripple(v-if="invoice.memoId")
      md-card-header
        .md-subheading {{ invoice.label }}
        .md-subhead {{ invoice.description }}
      md-card-content.card-content
        .status
          md-icon.md-size-2x(:class="clazz") {{ icon }}
          .md-caption(v-html="status")
        .amount-details
          .details
            span.md-caption {{ invoice.memoId }}
            br
            span.md-caption {{ $d(chargeDate, 'short') }}
          v-currency(:amount="invoice.price" clazz="total md-title")
      md-card-actions
        md-button.md-accent Fix

</template>

<script>
  import VCurrency from '@/components/shared/VCurrency.vue'

  const opt = {
    autopay: { key: 'today', class: 'cgray' },
    paidup: { key: 'check_circle', class: '' },
    credited: { key: 'check_circle', class: 'cblue' },
    partially_refunded: { key: 'check_circle', class: 'cblue' },
    paid: { key: 'check_circle', class: '' },
    failed: { key: 'check_circle', class: 'cred' }
  }
  
  export default {
    props: {
      invoice: Object
    },
    components: {
      VCurrency
    },
    computed: {
      paymetMethod () {
        return this.invoice.paymentDetails.brand + '••••' + this.invoice.paymentDetails.last4
      },
      chargeDate () {
        if (this.invoice.invoiceId) return new Date(this.invoice.dataCharge)
        if (this.invoice.memoId) return new Date(this.invoice.createOn)
        return new Date()
      },
      icon () {
        return opt[this.invoice.status] ? opt[this.invoice.status].key : ''
      },
      clazz () {
        return opt[this.invoice.status] ? [opt[this.invoice.status].class] : []
      },
      status () {
        return this.invoice.status.toUpperCase().replace('_', '<br/>')
      }
    }
  }
</script>
