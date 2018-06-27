<template lang="pug">
  div(:class="[clazz]") ${{value[0]}}.
    sup {{value[1]}}
</template>
<script>
import currency from '@/helpers/currency'

export default {
  props: {
    amount: Number,
    clazz: String
  },
  computed: {
    value () {
      return currency(this.amount).split('.')
    }
  }
}
</script>

