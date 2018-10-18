<template>
    <div class="programs">
      <div class="pre-cards-title">Programs</div>
      <div class="cards-layout">

        <chap-product-card v-for="item in items" :key="item.id" :item="item" @select="select"></chap-product-card>

      </div>  
    </div>
</template>
<script>
  import ChapProductCard from './ChapProductCard.vue'
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: { ChapProductCard },
    props: {
      items: Object
    },
    data: function () {
      return {
      }
    },
    computed: {
      ...mapState('clubprogramsModule', {
        organization: 'organization'
      })
    },
    watch: {
      organization () {
        if (this.$route.params.program) {
          this.setProgramSelected(this.$route.params.program)
        }
      }
    },
    methods: {
      ...mapMutations('clubprogramsModule', {
        setProgramSelected: 'setProgramSelected'
      }),
      select (program) {
        this.setProgramSelected(program.id)
      }
    }
  }
</script>

