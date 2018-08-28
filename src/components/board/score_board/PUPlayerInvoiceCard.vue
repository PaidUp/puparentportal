<template>
  <md-card>
    <div class="title">{{ item.title }}</div>
    <div class="caption">{{ subtext }}</div>
    <div class="card-content">
      <div class="status">
        <md-icon class="md-size-c" :class="clazz"> {{icon}} </md-icon>
        <div class="md-caption">{{status}}</div>
      </div>
      <div class="amount-details">
        <div class="detail">
          <span class="md-caption">
            {{ item.seq }}
          </span>
          <br>
          <span class="md-caption">
            {{ $d(item.chargeDate || item.date, 'short') }}
          </span>
        </div>
        <v-currency :amount="item.price" clazz="total md-title"></v-currency>
      </div>
    </div>
  </md-card>
</template>
<script>
import { mapState } from 'vuex'
import VCurrency from '@/components/shared/VCurrency.vue'
export default {
  components: { VCurrency },
  props: {
    item: Object
  },
  data () {
    return {
      mapper: { desc: '', key: '', class: [] }
    }
  },
  mounted () {
    this.mapper = this.getInvoiceStatusMapper()
  },
  computed: {
    ...mapState('commonModule', {
      invoiceMapper: 'invoiceMapper'
    }),
    icon () {
      return this.mapper.key
    },
    clazz () {
      return this.mapper.class
    },
    status () {
      return this.mapper.desc
    },
    subtext () {
      return this.mapper.subtext
    }
  },
  methods: {
    getInvoiceStatusMapper () {
      let resp = this.invoiceMapper[this.item.status] || { desc: '', key: '', class: [] }
      return resp
    }
  }
}
</script>

