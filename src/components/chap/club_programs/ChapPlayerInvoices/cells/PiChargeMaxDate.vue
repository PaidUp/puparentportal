<template>
  <td><md-datepicker v-if="item.type === 'invoice'" v-model="item.maxDate"></md-datepicker>
    <span v-else-if="item.type === 'preorder'"> {{ $d(item.date, 'short') }} </span>
    <span v-else> - </span>
  </td>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>

