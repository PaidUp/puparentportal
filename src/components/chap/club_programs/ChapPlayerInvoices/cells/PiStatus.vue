<template>
  <td>
    <select v-if="item.type === 'invoice' && item.status === 'failed'" class="custom-select" v-model="status">
      <option value="failed">Failed</option>
      <option value="autopay">Autopay</option>
    </select>
    <span v-else>{{ capitalize(item.status) }}</span>
  </td>
</template>
<script>
import capitalize from '@/helpers/capitalize'

export default {
  props: {
    item: Object
  },
  data () {
    return {
      status: this.item.status
    }
  },
  watch: {
    status () {
      this.$emit('change', this.status)
    }
  },
  methods: {
    capitalize (value) {
      return capitalize(value)
    }
  }
}
</script>

