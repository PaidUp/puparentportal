<template>
  <td>
    <div v-if="item.type === 'invoice'" class="col-actions">
      <md-button v-if="item.status === 'failed' || item.status === 'autopay'" @click="$emit('update')" class="md-icon-button md-dense md-accent lblue">
        <md-icon>save</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue">
        <md-icon>refresh</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue">
        <md-icon>file_copy</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue">
        <md-icon>delete</md-icon>
      </md-button>
    </div>
    <div v-if="item.type === 'credit'" class="col-actions">
      <md-button class="md-icon-button md-dense md-accent lblue">
        <md-icon>save</md-icon>
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

