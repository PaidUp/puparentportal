<template>
  <td><span>$</span>
    <input v-if="isEditable" type="number" class="custom-input" v-model="value">
    <span v-else>{{price}}</span>
  </td>
</template>
<script>
import currency from '@/helpers/currency'
export default {
  props: {
    item: Object
  },
  data () {
    return {
      value: null
    }
  },
  computed: {
    isEditable () {
      return (this.item.type === 'invoice' && (this.item.status === 'failed' || this.item.status === 'autopay')) || this.item.type === 'credit'
    },
    price () {
      return currency(this.item.price)
    }
  },
  mounted () {
    this.value = this.item.price
  },
  watch: {
    value () {
      this.$emit('change', this.value)
    }
  }
}
</script>

