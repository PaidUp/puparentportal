<template>
  <md-card md-with-hover class="card-invoice2">
    <md-card-header>
      <div class="title cgray">{{ item.title }}</div>
      <div class="caption">{{ subtext }}</div>
    </md-card-header>
    <md-card-content>
      <div class="status">
        <md-icon class="md-size-c cred" :class="clazz">{{ icon }}</md-icon>
        <div class="md-caption" v-html="status"></div>
      </div>
      <div class="amount-details">
        <div class="details">
          <span class="md-caption">{{ $d(item.date, 'short') }}</span>
        </div>
        <v-currency :amount="item.price" clazz="total md-title"></v-currency>
      </div>
    </md-card-content>
    <md-card-actions>
      <!-- Important do not delete this tag -->
      &nbsp;
    </md-card-actions>
  </md-card>

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
      },
      subtext () {
        return this.getInvoiceStatusMapper().subtext
      }
    },
    methods: {
      getInvoiceStatusMapper () {
        return this.invoiceMapper[this.item.status] || { desc: '', key: '', class: [] }
      }
    }
  }
</script>
