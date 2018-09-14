<template>
		<md-card md-with-hover class="card-player-eligibility">
			<div class="top-box" @click="selectPlayer">
				<md-avatar class="md-size-c">
					<img v-if="showAvatar" @error="showAvatar = false" :src="avatar" alt="avatar">
					<md-icon v-else class="md-size-2x ca1"> account_circle </md-icon>
				</md-avatar>
				<div class="name">{{ item.firstName }} {{ item.lastName }}</div>
				<div class="eligibility cred">{{item.overdue ? 'Ineligible' : '&nbsp;'}}</div>
				<div class="total-label">Total</div>
				<div class="total-amount">${{total}}</div>
			</div>



      <div class="actions">
        <md-menu md-size="small" md-direction="top-start">
          <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
            <md-icon>more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item>
              DELETE
            </md-menu-item>
            <md-menu-item>
              DUPLICATE
            </md-menu-item>
            <md-menu-item>
              EDIT
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>



			<div v-if="false" class="bars-with-hover">
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
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import currency from '@/helpers/currency'
export default {
  props: {
    item: Object
  },
  mounted () {
    this.avatarUrl(this.item.id).then(res => {
      this.avatar = res
    })
  },
  data () {
    return {
      avatar: null,
      showAvatar: true
    }
  },
  computed: {
    total () {
      return currency(this.item.total)
    },
    paid () {
      return currency(this.item.paid)
    },
    paidWidth () {
      return `width: ${(this.item.paid / this.item.total) * 100}%`
    },
    unpaid () {
      return currency(this.item.unpaid)
    },
    unpaidWidth () {
      return `width: ${(this.item.unpaid / this.item.total) * 100}%`
    },
    overdue () {
      return currency(this.item.overdue)
    },
    overdueWidth () {
      return `width: ${(this.item.overdue / this.item.total) * 100}%`
    },
    other () {
      return currency(this.item.other)
    },
    otherWidth () {
      return `width: ${(this.item.other / this.item.total) * 100}%`
    }
  },
  methods: {
    ...mapActions('playerModule', {
      avatarUrl: 'avatarUrl'
    }),
    ...mapActions('playerInvoicesModule', {
      loadParents: 'loadParents'
    }),
    ...mapMutations('clubprogramsModule', {
      setPlayerSelected: 'setPlayerSelected'
    }),
    ...mapActions('clubprogramsModule', {
      getReducePrograms: 'getReducePrograms'
    }),
    ...mapMutations('playerInvoicesModule', {
      setBeneficiary: 'setBeneficiary'
    }),
    selectPlayer () {
      this.setPlayerSelected(this.item.id)
      this.getReducePrograms()
      this.loadParents(this.item)
      this.setBeneficiary(this.item)
    }
  }
}
</script>

