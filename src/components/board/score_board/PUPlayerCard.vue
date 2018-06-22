<template>
  <div>
		<md-card md-with-hover class="card-player-eligibility">
			<div class="top-box">
				<md-avatar class="md-size-c">
					<img src="@/assets/avatar.jpg" alt="avatar">
				</md-avatar>
				<div class="name">{{ item.firstName }} {{ item.lastName }}</div>
				<div class="eligibility cred">Inelegible</div>
				<div class="total-label">Total</div>
				<div class="total-amount">${{format(item.total)}}</div>
			</div>
			<div class="bars-with-hover">
				<div class="green">
					<div class="hover">
						<div class="hover-title">Paid</div>
						<div class="hover-number">${{format(item.paid)}}</div>
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
		</md-card>
	</div>
</template>
<script>
import numeral from 'numeral'
export default {
  props: {
    item: Object
  },
  mounted () {
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    format (value) {
      return numeral(value).format('0,0.00')
    }
  }
}
</script>

