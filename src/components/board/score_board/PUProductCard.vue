<template>
  <div @click="selectProgram">
    <md-card md-with-hover>
      <div>
        <div class="title">{{item.name}}</div>
        <div class="caption">{{this.players}}</div>
      </div>
      <div class="main-box">
        <div class="eligibility-box">
          <div>
            <div class="concept">
              Eligible
            </div>
            <div class="number">{{elegible}}</div>
          </div>
          <div>
            <div class="concept">
              Ineligible
            </div>
            <div class="number cred bolder">{{item.inelegible.size}}</div>
          </div>
        </div>
        <div class="total">
          <div class="tot-title">Total</div>
          <div class="tot-number">${{total}}</div>
        </div>
        <div class="bars-with-hover">
          <div class="green" :style="paidWidth">
            <div class="hover">
              <div class="hover-title">Paid</div>
              <div class="hover-number">${{paid}}</div>
            </div>
          </div>
          <div class="gray" :style="unpaidWidth">
            <div class="hover">
              <div class="hover-title">Unpaid</div>
              <div class="hover-number">${{unpaid}}</div>
            </div>
          </div>
          <div class="red" :style="overdueWidth">
            <div class="hover">
              <div class="hover-title">Overdue</div>
              <div class="hover-number">${{overdue}}</div>
            </div>
          </div>
          <div class="blue" :style="otherWidth">
            <div class="hover">
              <div class="hover-title">Other</div>
              <div class="hover-number">${{other}}</div>
            </div>
          </div>
        </div>
      </div>
    </md-card>
  </div>
</template>
<script>
import numeral from 'numeral'
export default {
  props: {
    item: Object
  },
  data () {
    return {
      width: 'width: 10%'
    }
  },
  computed: {
    players () {
      let players = this.item.players.size
      if (players === 1) return '1 player'
      return players + ' players'
    },
    elegible () {
      return this.item.players.size - this.item.inelegible.size
    },
    total () {
      return numeral(this.item.total).format('0,0.00')
    },
    paid () {
      return numeral(this.item.paid).format('0,0.00')
    },
    paidWidth () {
      return `width: ${(this.item.paid / this.item.total) * 100}%`
    },
    unpaid () {
      return numeral(this.item.unpaid).format('0,0.00')
    },
    unpaidWidth () {
      return `width: ${(this.item.unpaid / this.item.total) * 100}%`
    },
    overdue () {
      return numeral(this.item.overdue).format('0,0.00')
    },
    overdueWidth () {
      return `width: ${(this.item.overdue / this.item.total) * 100}%`
    },
    other () {
      return numeral(this.item.other).format('0,0.00')
    },
    otherWidth () {
      return `width: ${(this.item.other / this.item.total) * 100}%`
    }

  },
  methods: {
    selectProgram () {
      this.$emit('programSelected', this.item)
    }
  }
}
</script>

