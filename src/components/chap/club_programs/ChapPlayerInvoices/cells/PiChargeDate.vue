<template>
  <td><md-datepicker v-if="item.type === 'invoice'" v-model="item.date"></md-datepicker>
    <span v-else> {{ $d(item.date, 'short') }} </span>
  </td>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>

