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
import numeral from 'numeral'
export default {
  props: {
    items: Object
  },
  data () {
    return {
      totals: {}
    }
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
        console.log(this.items[key])
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
      return numeral(value).format('0,0.00')
    }
  }
}
</script>

