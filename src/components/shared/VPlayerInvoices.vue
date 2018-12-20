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
            span.md-caption {{chargeDate}}
          v-currency(:amount="invoice.price" clazz="total md-title")
      md-card-actions
        md-button.md-accent.lblue(@click="select") {{ nameButton }}

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
            span.md-caption {{chargeDate}}
          v-currency(:amount="invoice.price" clazz="total md-title")
      md-card-actions
        md-button.md-accent.lblue(v-if=false)

</template>

<script>
  import VCurrency from '@/components/shared/VCurrency.vue'
  import { mapState } from 'vuex'
  
  export default {
    props: {
      invoice: Object
    },
    components: {
      VCurrency
    },
    computed: {
      ...mapState('commonModule', {
        invoiceMapper: 'invoiceMapper'
      }),
      nameButton () {
        if (this.invoice.status === 'autopay') return 'Edit'
        else if (this.invoice.status === 'failed') return 'Fix'
        else return 'View'
      },
      paymetMethod () {
        return this.invoice.paymentDetails.brand + '••••' + this.invoice.paymentDetails.last4
      },
      chargeDate () {
        if (this.invoice.invoiceId) {
          return this.invoice.attempts.reduce((curr, att) => {
            if (att.object === 'charge' && att.status === 'succeeded') {
              curr = this.$moment.formatDate(att.created)
            }
            return curr
          }, this.$moment.formatDate(this.invoice.dateCharge))
        }
        if (this.invoice.memoId) return this.$moment.formatDate(this.invoice.createOn)
        return this.$moment.formatDate()
      },
      icon () {
        return this.getInvoiceStatusMapper().key
      },
      clazz () {
        return this.getInvoiceStatusMapper().class
      },
      status () {
        return this.getInvoiceStatusMapper().desc
      },
      subtext () {
        return this.getInvoiceStatusMapper().subtext
      }
    },
    methods: {
      select () {
        this.$emit('select', this.invoice)
      },
      getInvoiceStatusMapper () {
        return this.invoiceMapper[this.invoice.status] || { desc: '', key: '', class: [] }
      }
    }
  }
</script>
