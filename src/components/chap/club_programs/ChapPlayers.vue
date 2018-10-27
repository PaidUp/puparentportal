<template>
  <div class="program-players" v-if="items">
		<md-tabs class="tabs-lblue">
			<md-tab id="tab-player" md-label="Players" >
        <div class="tab-toolbar">
          <download-excel :data= "players" :fields="reportFields" type= "csv" name= "players.csv">
            <md-button class="lblue md-accent md-raised md-dens md-icon-button">
              <md-icon>cloud_download</md-icon>
            </md-button>
          </download-excel>
          
        </div>
        <div class="cards-layout">
				  <chap-player-card :item="item" v-for="item in items" :key="item.id" @select="selectPlayer"></chap-player-card>
        </div>
			</md-tab>
			<md-tab id="tab-plans" md-label="Program Payment Plans">
				<chap-product-plans></chap-product-plans>
			</md-tab>
		</md-tabs>
	</div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ChapPlayerCard from './ChapPlayerCard.vue'
import ChapProductPlans from './ChapProductPlans.vue'
export default {
  components: { ChapPlayerCard, ChapProductPlans },
  mounted () {
    this.getAll()
  },
  data () {
    return {
      items: null,
      reportFields: {
        organization: 'organization',
        beneficiaryFirstName: 'beneficiaryFirstName',
        beneficiaryLastName: 'beneficiaryLastName',
        season: 'season',
        product: 'product'
      }
    }
  },
  computed: {
    ...mapGetters('clubprogramsModule', {
      seasonSelectedName: 'seasonSelectedName',
      programSelectedName: 'programSelectedName',
      playerSelectedName: 'playerSelectedName'
    }),
    ...mapState('clubprogramsModule', {
      organization: 'organization',
      programSelected: 'programSelected',
      seasonSelected: 'seasonSelected'
    }),
    players () {
      return Object.keys(this.items).map(key => {
        const beneficiary = this.items[key]
        return {
          beneficiaryFirstName: beneficiary.firstName,
          beneficiaryLastName: beneficiary.lastName,
          organization: this.organization.businessName,
          season: this.seasonSelectedName,
          product: this.programSelectedName
        }
      })
    }
  },
  watch: {
    programSelected () {
      this.getAll()
    },
    items () {
      if (this.items && this.$route.params.player) {
        const player = this.items[this.$route.params.player]
        if (player) this.selectPlayer(player)
        this.$route.params.player = null
      }
    }
  },
  methods: {
    ...mapActions('clubprogramsModule', {
      getReducePlayers: 'getReducePlayers',
      getReducePrograms: 'getReducePrograms'
    }),
    ...mapMutations('clubprogramsModule', {
      setPlayerSelected: 'setPlayerSelected'
    }),
    ...mapMutations('playerInvoicesModule', {
      setBeneficiary: 'setBeneficiary'
    }),
    ...mapActions('playerInvoicesModule', {
      loadParents: 'loadParents'
    }),
    selectPlayer (player) {
      this.setPlayerSelected(player.id)
      this.getReducePrograms()
      this.loadParents(player)
      this.setBeneficiary(player)
    },
    getAll () {
      this.getReducePlayers().then(items => {
        console.log('items: ', items)
        this.items = items
      })
    }
  }
}
</script>

