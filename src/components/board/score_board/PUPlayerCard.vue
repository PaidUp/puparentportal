<template>
  <div>
		<md-card md-with-hover class="card-player-eligibility">
			<div class="top-box">
				<md-avatar class="md-size-c">
					<img v-if="avatar" :src="avatar" alt="avatar">
					<md-icon v-else class="md-size-2x ca1"> account_circle </md-icon>
				</md-avatar>
				<div class="name">{{ item.firstName }} {{ item.lastName }}</div>
				<div class="eligibility cred">{{item.overdue ? 'Inelegible' : '&nbsp;'}}</div>
				<div class="total-label">Total</div>
				<div class="total-amount">${{total}}</div>
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
		</md-card>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
import numeral from 'numeral'
export default {
  props: {
    item: Object
  },
  mounted () {
    this.getAvatar(this.item.id).then(res => {
      this.avatar = res
    })
  },
  data () {
    return {
      avatar: null
    }
  },
  computed: {
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
    ...mapActions('playerModule', {
      getAvatar: 'getAvatar'
    })
  }
}
</script>

