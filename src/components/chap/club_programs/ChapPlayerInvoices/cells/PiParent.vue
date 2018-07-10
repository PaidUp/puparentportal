<template>
  <td>
    <div v-if="item.user && parents">
      <select name="parent-s" class="custom-select" v-model="item.user.userEmail">
        <option v-for="parent in parents" :key="parent._id" :value="parent.email">{{ parent.firstName + ' ' + parent.lastName }}</option>
      </select>
    </div>
  </td>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    item: Object
  },
  computed: {
    ...mapState('playerInvoicesModule', {
      parents: 'parents'
    })
  }
}
</script>

