<template lang="pug">
  md-card(md-with-hover v-if="statusMapper")
    md-ripple(v-if="invoice.invoiceId" class="card-invoice")
      md-card-header
        .title {{ invoice.label }}
        .caption {{ paymetMethod }}
      md-card-content.card-content
        .status
          md-icon.md-size-c(:class="statusMapper.clazz") {{ statusMapper.icon }}
          .md-caption(v-html="statusMapper.status")
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
        .caption {{ statusMapper.subtext }}
      md-card-content.card-content
        .status
          md-icon.md-size-c(:class="statusMapper.clazz") {{ statusMapper.icon }}
          .md-caption(v-html="statusMapper.status")
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
  import { mapActions } from 'vuex'
  
  export default {
    props: {
      invoice: Object
    },
    components: {
      VCurrency
    },
    data () {
      return {
        statusMapper: null
      }
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
      }
    },
    async mounted () {
      const resp = await this.getInvoiceDesc(this.invoice.status)
      this.statusMapper = {
        icon: resp.key,
        clazz: resp.class,
        status: resp.desc,
        subtext: resp.subtext
      }
    },
    methods: {
      select () {
        this.$emit('select', this.invoice)
      },
      ...mapActions('commonModule', {
        getInvoiceDesc: 'getInvoiceDesc'
      }),
      getInvoiceStatusMapper () {
        return this.invoiceMapper[this.invoice.status] || { desc: '', key: '', class: [] }
      }
    }
  }
</script>
