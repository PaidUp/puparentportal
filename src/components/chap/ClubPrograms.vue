<template>
  <div class="programs-page">
    <chap-breadcrums></chap-breadcrums>
    <div class="details-prog">
      <div class="pre-cards-title">Details</div>
      <div class="details-box">
        <chap-details-selects></chap-details-selects>
        <chap-details-totals></chap-details-totals>
      </div>
    </div>
    <chap-products v-if="!programSelected" :items="items"></chap-products>
    <chap-players v-if="programSelected && !playerSelected"></chap-players>
    <chap-player-invoices v-if="playerSelected"></chap-player-invoices>
  </div>

</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import ChapDetailsSelects from './club_programs/ChapDetailsSelects.vue'
  import ChapDetailsTotals from './club_programs/ChapDetailsTotals.vue'
  import ChapProducts from './club_programs/ChapProducts.vue'
  import ChapPlayers from './club_programs/ChapPlayers.vue'
  import ChapPlayerInvoices from './club_programs/ChapPlayerInvoices.vue'
  import ChapBreadcrums from './club_programs/ChapBreadcrums.vue'

  export default {
    components: { ChapDetailsSelects, ChapDetailsTotals, ChapProducts, ChapPlayers, ChapPlayerInvoices, ChapBreadcrums },
    computed: {
      ...mapState('clubprogramsModule', {
        items: 'items',
        playerSelected: 'playerSelected',
        programSelected: 'programSelected',
        seasonSelected: 'seasonSelected'
      })
    },
    mounted () {
      this.getOrganization(this.$route.params.id).then(organization => {
        this.setOrganization(organization)
      })
    },
    destroyed () {
      this.reset()
    },
    watch: {
      seasonSelected () {
        this.getAll()
      },
      programSelected () {
        if (this.programSelected) {
          this.loadProduct(this.programSelected)
        }
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
      ...mapActions('clubprogramsModule', {
        loadProduct: 'loadProduct',
        getReducePrograms: 'getReducePrograms'
      }),
      ...mapMutations('clubprogramsModule', {
        setOrganization: 'setOrganization',
        reset: 'reset'
      }),
      getAll () {
        if (this.seasonSelected) {
          this.getReducePrograms()
        }
      }
    }
  }
</script>
