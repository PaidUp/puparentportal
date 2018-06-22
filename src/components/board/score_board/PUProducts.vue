<template>
    <div class="programs">
      <div class="pre-cards-title">Programs</div>
      <div class="cards-layout">

        <pu-score-card @programSelected="selectProgram" v-for="item in itemsFiltered" :key="item.id" :item="item"></pu-score-card>

      </div>  
    </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import PuScoreCard from './PUScoreCard.vue'

  export default {
    components: { PuScoreCard },
    props: {
      seasonId: String,
      programId: String
    },
    data: function () {
      return {
        items: null
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
    methods: {
      ...mapActions('organizationModule', {
        getReducePrograms: 'getReducePrograms'
      }),
      getAll () {
        if (this.user && this.seasonId) {
          this.getReducePrograms({organizationId: this.user.organizationId, seasonId: this.seasonId}).then(items => {
            this.items = items
            this.$emit('setItems', this.itemsFiltered)
          })
        }
      },
      selectProgram (program) {
        this.$emit('programSelected', program)
      }
    },
    watch: {
      seasonId () {
        this.getAll()
      },
      programId () {
        this.getAll()
      }
    }
  }
</script>

