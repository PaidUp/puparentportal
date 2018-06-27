<template>
  <div class="programs-page">
    <div class="details">
      <div class="pre-cards-title">Details</div>
      <div class="details-box">
        <pu-details-selects :items="items"></pu-details-selects>
        <pu-details-totals :items="itemsFiltered"></pu-details-totals>
      </div>
    </div>
    <pu-products v-if="!programSelected" :items="itemsFiltered"></pu-products>
    <pu-players v-if="programSelected && !playerSelected"></pu-players>
    <pu-player-invoices v-if="playerSelected"></pu-player-invoices>
  </div>

</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import PuDetailsSelects from './score_board/PUDetailsSelects.vue'
  import PuDetailsTotals from './score_board/PUDetailsTotals.vue'
  import PuProducts from './score_board/PUProducts.vue'
  import PuPlayers from './score_board/PUPlayers.vue'
  import PuPlayerInvoices from './score_board/PUPlayerInvoices.vue'

  export default {
    components: { PuDetailsSelects, PuDetailsTotals, PuProducts, PuPlayers, PuPlayerInvoices },
    data: function () {
      return {
        items: null
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      }),
      ...mapState('scoreboardModule', {
        playerSelected: 'playerSelected',
        programSelected: 'programSelected',
        seasonSelected: 'seasonSelected'
      }),
      itemsFiltered () {
        // console.log('this.programSelected: ', this.programSelected)
        if (this.programSelected) {
          let resp = {}
          resp[this.programSelected] = this.items[this.programSelected]
          return resp
        }
        return this.items
      }
    },
    mounted () {
      if (this.user && this.user.organizationId) {
        this.getOrganization(this.user.organizationId).then(organization => {
          this.setOrganization(organization)
        })
      }
    },
    destroyed () {
      this.reset()
    },
    watch: {
      user () {
        if (this.user && this.user.organizationId) {
          this.getOrganization(this.user.organizationId).then(organization => {
            this.setOrganization(organization)
          })
        }
      },
      seasonSelected () {
        this.getAll()
      },
      programSelected () {
        this.getAll()
        this.setPlayerSelected()
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization'
      }),
      ...mapActions('scoreboardModule', {
        getReducePrograms: 'getReducePrograms',
        setPlayerSelected: 'setPlayerSelected'
      }),
      ...mapMutations('scoreboardModule', {
        setOrganization: 'setOrganization',
        setPlayerSelected: 'setPlayerSelected',
        reset: 'reset'
      }),
      getAll () {
        if (this.user && this.seasonSelected) {
          this.getReducePrograms().then(items => {
            this.items = items
          })
        }
      },
      setItems (items) {
        this.items = items
      }
    }
  }
</script>
