<template lang="pug">
  md-card(md-with-hover)
    md-ripple(v-if="item.type === 'invoice'" class="card-invoice")
      md-card-header
        .title {{ item.title }}
        .caption {{ paymetMethod }}
      md-card-content.card-content
        .status
          md-icon.md-size-c(:class="clazz") {{ icon }}
          .md-caption(v-html="status")
        .amount-details
          .details
            span.md-caption {{ item.seq }}
            br
            span.md-caption {{ $d(chargeDate, 'short') }}
          v-currency(:amount="item.price" clazz="total md-title")
      br
      .actions
        md-icon money_off
        md-icon file_copy
        md-icon delete
        md-icon create

    md-ripple(v-else-if="item.type === 'credit'" class="card-invoice")
      md-card-header
        .title {{ item.label }}
        .caption {{ subtext }}
      md-card-content.card-content
        .status
          md-icon.md-size-c(:class="clazz") {{ icon }}
          .md-caption(v-html="status")
        .amount-details
          .details
            span.md-caption {{ item.seq }}
            br
            span.md-caption {{ $d(chargeDate, 'short') }}
          v-currency(:amount="item.price" clazz="total md-title")
      md-card-actions
        md-button.md-accent.lblue(v-if=false)
    md-ripple(v-else) {{item}}

</template>

<script>
  import VCurrency from '@/components/shared/VCurrency.vue'
  import { mapState } from 'vuex'
  
  export default {
    props: {
      item: Object
    },
    components: {
      VCurrency
    },
    mounted () {
      console.log(this.invoice)
    },
    computed: {
      ...mapState('commonModule', {
        invoiceMapper: 'invoiceMapper'
      }),
      nameButton () {
        if (this.item.status === 'autopay') return 'Edit'
        else if (this.item.status === 'failed') return 'Fix'
        else return 'View'
      },
      paymetMethod () {
        return this.item.paymentDetails.brand + '••••' + this.item.paymentDetails.last4
      },
      chargeDate () {
        if (this.item.type === 'invoce') return new Date(this.item.date)
        if (this.item.type === 'credit') return new Date(this.item.date)
        return new Date()
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
        this.$emit('select', this.item)
      },
      getInvoiceStatusMapper () {
        return this.invoiceMapper[this.item.status] || { desc: '', key: '', class: [] }
      }
    }
  }
</script>
