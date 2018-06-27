<template>
    <div class="programs">
      <div class="pre-cards-title">Programs</div>
      <div class="cards-layout">

        <pu-product-card v-for="item in items" :key="item.id" :item="item"></pu-product-card>

      </div>  
    </div>
</template>
<script>
  import PuProductCard from './PUProductCard.vue'

  export default {
    components: { PuProductCard },
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

