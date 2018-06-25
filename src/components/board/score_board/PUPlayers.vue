<template>
  <div class="program-players">
		<md-tabs class="tabs-lblue">
			<md-tab id="tab-player" md-label="Players">
        <div class="cards-layout">
				  <pu-player-card :item="item" v-for="item in items" :key="item.id"></pu-player-card>
        </div>
			</md-tab>
			<md-tab id="tab-plans" md-label="Program Payment Plans">
				<div class="cards-layout">
					<md-card md-with-hover class="card-payment-plan">
						<div class="title">
							Dues - Installments
						</div>
						<div class="body">
							<div class="number-big cgreen">$3.250.00</div>
							<div class="title-info">2 Installments</div>
							<div class="title-info">Nov 15, 2018 - Mar 1, 2019</div>
						</div>
						<div class="actions">
							<md-button class="md-icon-button">
								<md-icon>visibility</md-icon>
							</md-button>
							<md-menu md-size="small" md-direction="top-start">
								<md-button class="md-icon-button md-accent lblue" md-menu-trigger>
									<md-icon>more_vert</md-icon>
								</md-button>
								<md-menu-content>
									<md-menu-item @click="cannotDeleteAlert = true">
										DELETE
									</md-menu-item>
									<md-menu-item @click="confirmDeleteAlert = true">
										DUPLICATE
									</md-menu-item>
									<md-menu-item @click="btnData = 'click 1'">
										EDIT
									</md-menu-item>
								</md-menu-content>
							</md-menu>
						</div>
					</md-card>
					<md-card md-with-hover class="card-payment-plan">
						<div class="title">
							Dues - Installments (Salt Lake travel)
						</div>
						<div class="body">
							<div class="number-big cgreen">$3.250.00</div>
							<div class="title-info">2 Installments</div>
							<div class="title-info">Nov 15, 2018 - Mar 1, 2019</div>
						</div>
						<div class="actions">
							<md-button class="md-icon-button">
								<md-icon>visibility_off</md-icon>
							</md-button>
							<md-menu md-size="small" md-direction="top-start">
								<md-button class="md-icon-button md-accent lblue" md-menu-trigger>
									<md-icon>more_vert</md-icon>
								</md-button>
								<md-menu-content>
									<md-menu-item @click="cannotDeleteAlert = true">
										DELETE
									</md-menu-item>
									<md-menu-item @click="confirmDeleteAlert = true">
										DUPLICATE
									</md-menu-item>
									<md-menu-item @click="btnData = 'click 1'">
										EDIT
									</md-menu-item>
								</md-menu-content>
							</md-menu>

						</div>
					</md-card>
				</div>
			</md-tab>
		</md-tabs>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PuPlayerCard from './PUPlayerCard.vue'
export default {
  components: { PuPlayerCard },
  props: {
    seasonId: String,
    productId: String
  },
  mounted () {
    this.getAll()
  },
  data () {
    return {
      items: null
    }
  },
  computed: {
    ...mapState('userModule', {
      'user': 'user'
    })
  },
  methods: {
    ...mapActions('organizationModule', {
      getReducePlayers: 'getReducePlayers'
    }),
    getAll () {
      this.getReducePlayers({organizationId: this.user.organizationId, seasonId: this.seasonId, productId: this.productId}).then(items => {
        this.items = items
      })
    }
  }
}
</script>

