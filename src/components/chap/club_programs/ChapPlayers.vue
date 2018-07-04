<template>
  <div class="program-players" v-if="items">
		<md-tabs class="tabs-lblue">
			<md-tab id="tab-player" md-label="Players" >
        <div class="cards-layout">
				  <chap-player-card :item="item" v-for="item in items" :key="item.id"></chap-player-card>
        </div>
			</md-tab>
			<md-tab id="tab-plans" md-label="Program Payment Plans">
				<chap-product-plans></chap-product-plans>
			</md-tab>
		</md-tabs>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ChapPlayerCard from './ChapPlayerCard.vue'
import ChapProductPlans from './ChapProductPlans.vue'
export default {
  components: { ChapPlayerCard, ChapProductPlans },
  mounted () {
    this.getAll()
  },
  data () {
    return {
      items: null
    }
  },
  computed: {
    ...mapState('clubprogramsModule', {
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
    ...mapActions('clubprogramsModule', {
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

