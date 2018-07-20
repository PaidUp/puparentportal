<template lang="pug">
  md-card(md-with-hover)
    md-ripple(class="card-invoice")
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
            span.md-caption {{ $d(item.date, 'short') }}
          v-currency(:amount="item.price" clazz="total md-title")
      .actions(v-if="item.type === 'credit'")
        md-icon file_copy
        md-icon delete
        md-icon create
    
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
        if (this.item.paymentDetails) return this.item.paymentDetails.brand + '••••' + this.item.paymentDetails.last4
        return ''
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
