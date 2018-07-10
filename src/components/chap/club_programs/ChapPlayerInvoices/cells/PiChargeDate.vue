<template>
  <td><md-datepicker v-if="item.type === 'invoice'" v-model="value"></md-datepicker>
    <span v-else> {{ $d(item.date, 'short') }} </span>
  </td>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      value: this.item.date
    }
  },
  watch: {
    value () {
      this.$emit('change', this.value)
    }
  }
}
</script>

