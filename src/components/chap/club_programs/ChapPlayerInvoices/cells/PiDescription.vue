<template>
  <td><input type="text" class="custom-input" v-model="value"></td>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      value: this.item.title
    }
  },
  watch: {
    value () {
      this.$emit('change', this.value)
    }
  }
}
</script>

  