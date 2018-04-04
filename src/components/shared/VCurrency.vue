<template>
  <div :class="[clazz]">${{value[0]}}.<sup>{{value[1]}}</sup></div>
</template>
<script>
import numeral from 'numeral'

export default {
  props: {
    amount: Number,
    clazz: String
  },
  computed: {
    value () {
      return numeral(this.amount).format('0,0.00').split('.')
    }
  }
}
</script>

