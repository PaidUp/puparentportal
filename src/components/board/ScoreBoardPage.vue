<template>
  <div class="programs-page">
    <pu-breadcrums></pu-breadcrums>
    <div class="details">
      <div class="pre-cards-title">Details</div>
      <div class="details-box">
        <pu-details-selects></pu-details-selects>
        <pu-details-totals></pu-details-totals>
      </div>
    </div>
    <pu-products v-if="!programSelected" :items="items"></pu-products>
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
  import PuBreadcrums from './score_board/PUBreadcrums.vue'

  export default {
    components: { PuDetailsSelects, PuDetailsTotals, PuProducts, PuPlayers, PuPlayerInvoices, PuBreadcrums },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      }),
      ...mapState('scoreboardModule', {
        items: 'items',
        playerSelected: 'playerSelected',
        programSelected: 'programSelected',
        seasonSelected: 'seasonSelected'
      })
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
      },
      playerSelected () {
        this.getAll()
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
          this.getReducePrograms()
        }
      }
    }
  }
</script>
