<template>
  <div class="programs-page">
    <div class="details">
      <div class="pre-cards-title">Details</div>
      <div class="details-box">
        <pu-details-selects :programId="programId" @selectSeason="setSeason" @selectProgram="setProgram" :items="items"></pu-details-selects>
        <pu-details-totals :items="items"></pu-details-totals>
      </div>
    </div>
    <pu-products v-show="!programSelected" @programSelected="selectProgram" @setItems="setItems" :seasonId="seasonId" :programId="programId"></pu-products>
    <pu-players v-if="programSelected" :seasonId="seasonId" :productId="programId"></pu-players>
  </div>

</template>

<script>
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
    methods: {
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
