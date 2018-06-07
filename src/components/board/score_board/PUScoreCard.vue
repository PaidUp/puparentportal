<template>
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
          <div class="number">7</div>
        </div>
        <div>
          <div class="concept">
            Ineligible
          </div>
          <div class="number cred bolder">9</div>
        </div>
      </div>
      <div class="total">
        <div class="tot-title">Total</div>
        <div class="tot-number">${{total}}</div>
      </div>
      <div class="bars-with-hover">
        <div class="green" :style="width">
          <div class="hover">
            <div class="hover-title">Paid</div>
            <div class="hover-number">$38,000</div>
          </div>
        </div>
        <div class="gray">
          <div class="hover">
            <div class="hover-title">Lack</div>
            <div class="hover-number">$38,000</div>
          </div>
        </div>
        <div class="red">
          <div class="hover">
            <div class="hover-title">Overdue</div>
            <div class="hover-number">$38,000</div>
          </div>
        </div>
        <div class="blue">
          <div class="hover">
            <div class="hover-title">Some</div>
            <div class="hover-number">$38,000</div>
          </div>
        </div>
      </div>
    </div>
  </md-card>
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
      let players = Object.keys(this.item.players).length
      if (players === 1) return '1 player'
      return players + ' players'
    },
    total () {
      return numeral(this.item.total).format('0,0.00')
    }
  }
}
</script>

