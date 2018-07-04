<template>
  <div class="details-numbers">
    <div>
      <div class="concept">Total</div>
      <div class="title-big">${{format(totals.total)}}</div>
    </div>
    <div>
      <div class="concept">Paid</div>
      <div class="title-big green">${{format(totals.paid)}}</div>
    </div>
    <div>
      <div class="concept">Unpaid</div>
      <div class="title-big gray">${{format(totals.unpaid)}}</div>
    </div>
    <div>
      <div class="concept">Overdue</div>
      <div class="title-big red">${{format(totals.overdue)}}</div>
    </div>
    <div>
      <div class="concept">Others</div>
      <div class="title-big blue">${{format(totals.other)}}</div>
    </div>
  </div>
</template>
<script>
import currency from '@/helpers/currency'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      totals: {}
    }
  },
  computed: {
    ...mapState('clubprogramsModule', {
      items: 'items'
    })
  },
  watch: {
    items () {
      let resp = {
        total: 0,
        paid: 0,
        unpaid: 0,
        overdue: 0,
        other: 0
      }
      for (let key in this.items) {
        resp.total = resp.total + this.items[key].total
        resp.paid = resp.paid + this.items[key].paid
        resp.unpaid = resp.unpaid + this.items[key].unpaid
        resp.overdue = resp.overdue + this.items[key].overdue
        resp.other = resp.other + this.items[key].other
      }
      this.totals = resp
    }
  },
  methods: {
    format (value) {
      return currency(value)
    }
  }
}
</script>

