<template>
  <td>
    <md-datepicker v-if="isEditable" v-model="value"></md-datepicker>
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
  computed: {
    isEditable () {
      return this.item.type === 'invoice' && (this.item.status === 'failed' || this.item.status === 'autopay')
    }
  },
  watch: {
    value () {
      this.$emit('change', this.value)
    }
  }
}
</script>

