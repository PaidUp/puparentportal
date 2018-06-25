<template>
  <div class="programs-page">
    <div class="details">
      <div class="pre-cards-title">Details</div>
      <div class="details-box">
        <pu-details-selects :programId="programId" @selectSeason="setSeason" @selectProgram="setProgram" :items="items"></pu-details-selects>
        <pu-details-totals :items="itemsFiltered"></pu-details-totals>
      </div>
    </div>
    <pu-products v-if="!programSelected" @programSelected="selectProgram" :items="itemsFiltered"></pu-products>
    <pu-players v-if="programSelected" :seasonId="seasonId" :productId="programId"></pu-players>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import PuDetailsSelects from './score_board/PUDetailsSelects.vue'
  import PuDetailsTotals from './score_board/PUDetailsTotals.vue'
  import PuProducts from './score_board/PUProducts.vue'
  import PuPlayers from './score_board/PUPlayers.vue'

  export default {
    components: { PuDetailsSelects, PuDetailsTotals, PuProducts, PuPlayers },
    data: function () {
      return {
        items: null,
        programSelected: null,
        seasonId: null,
        programId: null
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      }),
      itemsFiltered () {
        if (this.programId) {
          let resp = {}
          resp[this.programId] = this.items[this.programId]
          return resp
        }
        return this.items
      }
    },
    watch: {
      seasonId () {
        this.getAll()
      },
      programId () {
        this.getAll()
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getReducePrograms: 'getReducePrograms'
      }),
      getAll () {
        if (this.user && this.seasonId) {
          this.getReducePrograms({organizationId: this.user.organizationId, seasonId: this.seasonId}).then(items => {
            this.items = items
          })
        }
      },
      setSeason (season) {
        this.programId = null
        this.seasonId = season
      },
      setProgram (program) {
        this.programId = program
      },
      setItems (items) {
        this.items = items
      },
      selectProgram (program) {
        this.programId = program.id
        this.programSelected = program
      }
    }
  }
</script>
