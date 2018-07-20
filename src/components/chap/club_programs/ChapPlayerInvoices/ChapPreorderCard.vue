<template lang="pug">
  md-card(md-with-hover)
    md-ripple(class="card-invoice")
      md-card-header
        .title {{ item.title }}
        .caption 
      md-card-content.card-content
        .status
          md-icon.md-size-c(:class="clazz") {{ icon }}
          .md-caption(v-html="status")
        .amount-details
          .details
            span.md-caption
            span.md-caption {{ $d(item.date, 'short') }}
          v-currency(:amount="item.price" clazz="total md-title")

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
      icon () {
        return this.getInvoiceStatusMapper().key
      },
      clazz () {
        return this.getInvoiceStatusMapper().class
      },
      status () {
        return this.getInvoiceStatusMapper().desc
      }
    },
    methods: {
      getInvoiceStatusMapper () {
        return this.invoiceMapper[this.item.status] || { desc: '', key: '', class: [] }
      }
    }
  }
</script>
