<template lang="pug">
  md-card(md-with-hover)
    md-ripple(v-if="invoice.invoiceId" class="card-invoice")
      md-card-header
        .title {{ invoice.label }}
        .caption {{ paymetMethod }}
      md-card-content.card-content
        .status
          md-icon.md-size-c(:class="clazz") {{ icon }}
          .md-caption(v-html="status")
        .amount-details
          .details
            span.md-caption {{ invoice.invoiceId }}
            br
            span.md-caption {{ $d(chargeDate, 'short') }}
          v-currency(:amount="invoice.price" clazz="total md-title")
      md-card-actions
        md-button.md-accent(@click="select") {{ nameButton }}

    md-ripple(v-if="invoice.memoId" class="card-invoice")
      md-card-header
        .title {{ invoice.label }}
        .caption {{ subtext }}
      md-card-content.card-content
        .status
          md-icon.md-size-c(:class="clazz") {{ icon }}
          .md-caption(v-html="status")
        .amount-details
          .details
            span.md-caption {{ invoice.memoId }}
            br
            span.md-caption {{ $d(chargeDate, 'short') }}
          v-currency(:amount="invoice.price" clazz="total md-title")
      md-card-actions
        md-button.md-accent(v-if=false)

</template>

<script>
  import VCurrency from '@/components/shared/VCurrency.vue'

  const opt = {
    autopay: { desc: 'AUTOPAY', key: 'today', class: 'cgray' },
    paidup: { desc: 'PAIDUP', key: 'check_circle', class: '' },
    credited: { desc: 'CREDIT APPLIED', subtext: 'Club Credit', key: 'check_circle', class: '' },
    partially_refunded: { desc: 'PARTIALLY<BR/>REFUNDED', subtext: '', key: 'check_circle', class: 'cblue' },
    paid: { desc: 'PAID', key: 'check_circle', subtext: 'Paid Directly to Club', class: '' },
    failed: { desc: 'FAILED', key: 'check_circle', class: 'cred' },
    submitted: { desc: 'ACH SUBMITTED', key: 'check_circle', subtext: '', class: '' },
    discount: { desc: 'DISCOUNT', key: 'check_circle', subtext: 'Club Discount', class: 'cblue' }
  }
  
  export default {
    props: {
      invoice: Object
    },
    components: {
      VCurrency
    },
    computed: {
      nameButton () {
        if (this.invoice.status === 'autopay') return 'Edit'
        else if (this.invoice.status === 'failed') return 'Fix'
        else return 'View'
      },
      paymetMethod () {
        return this.invoice.paymentDetails.brand + '••••' + this.invoice.paymentDetails.last4
      },
      chargeDate () {
        if (this.invoice.invoiceId) return new Date(this.invoice.dateCharge)
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
        return opt[this.invoice.status].desc
      },
      subtext () {
        return opt[this.invoice.status].subtext
      }
    },
    methods: {
      select () {
        this.$emit('select', this.invoice)
      }
    }
  }
</script>
