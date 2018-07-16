<template>
    <div class="programs">
      <div class="pre-cards-title">Programs</div>
      <div class="cards-layout">

        <chap-product-card v-for="item in items" :key="item.id" :item="item"></chap-product-card>

      </div>  
    </div>
</template>
<script>
  import ChapProductCard from './ChapProductCard.vue'

  export default {
    components: { ChapProductCard },
    props: {
      items: Object
    },
    data: function () {
      return {
      }
    },
    methods: {
    }
  }
</script>

