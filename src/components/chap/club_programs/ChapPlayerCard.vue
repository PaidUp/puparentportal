<template>
		<md-card md-with-hover class="card-player-eligibility">
			<div class="top-box" @click="select">
				<md-avatar class="md-size-c">
					<img v-if="avatar" :src="avatar" alt="avatar">
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
            <md-menu-item v-if="!item.total" @click="confirm = true">
              DELETE
            </md-menu-item>
            <md-menu-item @click="edit">
              EDIT
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
      <md-dialog-confirm :md-active.sync="confirm" md-title="Delete Credit" md-content="Are you sure want to delete this player?" md-confirm-text="Delete" md-cancel-text="Cancel" @md-cancel="confirm = false" @md-confirm="remove" />

		</md-card>
</template>
<script>
import { mapActions } from 'vuex'
import { currency } from '@/helpers'
import { beneficiaryService } from '@/services'
export default {
  props: {
    item: Object
  },
  async mounted () {
    const url = await this.avatarUrl(this.item.id)
    this.validateUrl(url).then(response => {
      this.avatar = response.data.validateUrl
    }).catch(reason => reason)
  },
  data () {
    return {
      avatar: null,
      confirm: false
    }
  },
  computed: {
    total () {
      return currency(this.item.total)
    }
  },
  methods: {
    ...mapActions('playerModule', {
      avatarUrl: 'avatarUrl'
    }),
    ...mapActions('commonModule', {
      validateUrl: 'validateUrl'
    }),
    select () {
      this.$emit('select', this.item)
    },
    edit () {
      this.$emit('edit', this.item)
    },
    remove () {
      beneficiaryService.deleteBeneficiary(this.item.id).then(res => {
        this.$emit('deleted', this.item)
      })
    }
  }
}
</script>

