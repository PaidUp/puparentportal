<template>
  <div class="program-players" v-if="items">
		<md-tabs class="tabs-lblue">
			<md-tab id="tab-player" md-label="Players" >
        <div class="cards-layout">
				  <chap-player-card :item="item" v-for="item in items" :key="item.id" @edit="selectPlayerEdit" @select="selectPlayer" @deleted="getAll"></chap-player-card>

          <div class="md-card-add-circle">
            <md-button @click="showPlayerDialog = true" class="md-fab lblue">
              <md-icon>add</md-icon>
            </md-button>
          </div>
        </div>
			</md-tab>
			
      <md-tab id="tab-plans" v-if="false" md-label="Program Payment Plans">
				<chap-product-plans></chap-product-plans>
			</md-tab>

			<md-tab id="tab-download" md-label="Downloads" >
        <div class="tab-toolbar">
          <md-button class="lblue md-accent md-raised">
            <download-excel :fetch= "players" :fields="reportFields" type= "csv" name= "players.csv">
              Player and Parent Info
              <md-icon>cloud_download</md-icon>
            </download-excel>
          </md-button>
        </div>
        
			</md-tab>

		</md-tabs>
    <chap-player-dialog :player="playerToEdit" @completed="getAll" :showDialog="showPlayerDialog" ></chap-player-dialog>
	</div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ChapPlayerCard from './ChapPlayerCard.vue'
import ChapProductPlans from './ChapProductPlans.vue'
import ChapPlayerDialog from './ChapPlayerDialog.vue'
export default {
  components: { ChapPlayerCard, ChapProductPlans, ChapPlayerDialog },
  mounted () {
    this.getAll()
  },
  data () {
    return {
      showPlayerDialog: false,
      playerToEdit: null,
      items: null,
      reportFields: {
        beneficiaryFirstName: 'beneficiaryFirstName',
        beneficiaryLastName: 'beneficiaryLastName',
        parentEmail: 'parentEmail',
        parentPhoneNumber: 'parentPhoneNumber',
        parentFirstName: 'parentFirstName',
        parentLastName: 'parentLastName',
        productName: 'productName',
        organization: 'organization',
        season: 'season'
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
    emailParents () {
      let emails = []
      Object.keys(this.items).forEach(key => {
        const beneficiary = this.items[key]
        emails = emails.concat(beneficiary.assigneesEmail)
      })
      return emails
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
    ...mapActions('userModule', {
      getParentsByEmailsObj: 'getParentsByEmailsObj'
    }),
    selectPlayer (player) {
      this.setPlayerSelected(player.id)
      this.getReducePrograms()
      this.loadParents(player)
      this.setBeneficiary(player)
    },
    selectPlayerEdit (player) {
      this.playerToEdit = player
      this.showPlayerDialog = true
    },
    getAll () {
      this.showPlayerDialog = false
      this.playerToEdit = null
      this.getReducePlayers().then(items => {
        this.items = items
      })
    },
    async players () {
      const parents = await this.getParentsByEmailsObj(this.emailParents)
      return Object.keys(this.items).reduce((curr, key) => {
        const beneficiary = this.items[key]
        beneficiary.assigneesEmail.forEach(email => {
          const parent = parents[email]
          curr.push({
            beneficiaryFirstName: beneficiary.firstName,
            beneficiaryLastName: beneficiary.lastName,
            parentEmail: email,
            parentPhoneNumber: parent ? parent.phone : '',
            parentFirstName: parent ? parent.firstName : '',
            parentLastName: parent ? parent.lastName : '',
            productName: this.programSelectedName,
            organization: this.organization.businessName,
            season: this.seasonSelectedName
          })
        })
        return curr
      }, [])
    }
  }
}
</script>

