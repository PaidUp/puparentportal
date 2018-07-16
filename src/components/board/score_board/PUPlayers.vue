<template>
  <div class="program-players" v-if="items">
		<md-tabs class="tabs-lblue">
			<md-tab id="tab-player" md-label="Players" >
        <div class="cards-layout">
				  <pu-player-card :item="item" v-for="item in items" :key="item.id"></pu-player-card>
        </div>
			</md-tab>
			<md-tab id="tab-plans" md-label="Program Payment Plans">
				<pu-product-plans></pu-product-plans>
			</md-tab>
		</md-tabs>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PuPlayerCard from './PUPlayerCard.vue'
import PuProductPlans from './PUProductPlans.vue'
export default {
  components: { PuPlayerCard, PuProductPlans },
  mounted () {
    this.getAll()
  },
  data () {
    return {
      items: null
    }
  },
  computed: {
    ...mapState('scoreboardModule', {
      programSelected: 'programSelected',
      seasonSelected: 'seasonSelected'
    })
  },
  watch: {
    programSelected () {
      this.getAll()
    }
  },
  methods: {
    ...mapActions('scoreboardModule', {
      getReducePlayers: 'getReducePlayers'
    }),
    getAll () {
      this.getReducePlayers().then(items => {
        this.items = items
      })
    }
  }
}
</script>

