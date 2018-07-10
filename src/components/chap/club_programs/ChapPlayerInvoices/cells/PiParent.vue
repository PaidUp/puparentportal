<template>
  <td>
    <div v-if="item.user && parents">
      <select name="parent-s" class="custom-select" v-model="value">
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
  data () {
    return {
      value: this.item.user ? this.item.user.userEmail : null
    }
  },
  computed: {
    ...mapState('playerInvoicesModule', {
      parents: 'parents'
    })
  },
  watch: {
    value () {
      this.parents.forEach(parent => {
        if (parent.email === this.value) {
          this.$emit('change', {
            userId: parent._id,
            userFirstName: parent.firstName,
            userLastName: parent.lastName,
            userEmail: parent.email
          })
        }
      })
    }
  }
}
</script>

