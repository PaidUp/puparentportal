<template>
  <td>
    <div v-if="item.type === 'invoice'" class="col-chips">
      <md-chip class="lblue" md-deletable>Dues</md-chip>
      <md-button class="md-icon-button md-dense md-accent lblue">
        <md-icon>add_circle_outline</md-icon>
      </md-button>
    </div>
  </td>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>

