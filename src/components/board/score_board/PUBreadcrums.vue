<template>
  <div class="breadcrums-box">
      <md-icon>arrow_back</md-icon>
      <div @click="setProgramSelected()">{{ seasonSelectedName }}</div>
      <md-icon v-if="programSelectedName">keyboard_arrow_right</md-icon>
      <div @click="setPlayerSelected()" v-if="programSelectedName">{{ programSelectedName }}</div>
      <md-icon v-if="playerSelectedName">keyboard_arrow_right</md-icon>
      <div v-if="playerSelectedName">{{ playerSelectedName }}</div>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('scoreboardModule', {
      seasonSelectedName: 'seasonSelectedName',
      programSelectedName: 'programSelectedName',
      playerSelectedName: 'playerSelectedName'
    })
  },
  methods: {
    ...mapMutations('scoreboardModule', {
      setPlayerSelected: 'setPlayerSelected',
      setProgramSelected: 'setProgramSelected'
    })
  }
}
</script>

