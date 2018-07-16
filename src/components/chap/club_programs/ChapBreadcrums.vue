<template>
  <div class="breadcrums-box">
      <md-icon>arrow_back</md-icon>

      <div v-if="organization" @click="toSeasons">{{ organization.businessName }}</div>
      <md-icon v-if="organization">keyboard_arrow_right</md-icon>

      <div @click="setProgramSelected()">{{ seasonSelectedName }}</div>
      <md-icon v-if="programSelectedName">keyboard_arrow_right</md-icon>
      <div @click="setPlayerSelected()" v-if="programSelectedName">{{ programSelectedName }}</div>
      <md-icon v-if="playerSelectedName">keyboard_arrow_right</md-icon>
      <div v-if="playerSelectedName">{{ playerSelectedName }}</div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('clubprogramsModule', {
      seasonSelectedName: 'seasonSelectedName',
      programSelectedName: 'programSelectedName',
      playerSelectedName: 'playerSelectedName'
    }),
    ...mapState('clubprogramsModule', {
      organization: 'organization'
    })
  },
  methods: {
    ...mapMutations('clubprogramsModule', {
      setPlayerSelected: 'setPlayerSelected',
      setProgramSelected: 'setProgramSelected'
    }),
    toSeasons () {
      this.$router.push({
        name: 'seasons',
        params: {
          id: this.$route.params.id
        }
      })
    }
  }
}
</script>

