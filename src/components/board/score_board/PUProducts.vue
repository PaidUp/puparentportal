<template>
    <div class="programs">
      <div class="pre-cards-title">Programs</div>
      <div class="cards-layout">

        <pu-score-card @programSelected="selectProgram" v-for="item in items" :key="item.id" :item="item"></pu-score-card>

      </div>  
    </div>
</template>
<script>
  import PuScoreCard from './PUScoreCard.vue'

  export default {
    components: { PuScoreCard },
    props: {
      items: Object
    },
    data: function () {
      return {
      }
    },
    methods: {
      selectProgram (program) {
        this.$emit('programSelected', program)
      }
    }
  }
</script>

