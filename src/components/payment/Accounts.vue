<template lang="pug">
  keep-alive
    section 
      ul
        li(v-for="account in paymentAccounts") {{account}}
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
    ...mapGetters('paymentModule', {
      paymentAccounts: 'paymentAccounts'
    })
  },
  watch: {
    user () {
      if (this.user && this.user.externalCustomerId) {
        this.listCards(this.user)
        this.listBanks(this.user)
      }
    }
  },
  components: {},
  mounted () {
    if (this.user && this.user.externalCustomerId) {
      this.listCards(this.user)
      this.listBanks(this.user)
    }
  },
  methods: {
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setDanger: 'setDanger'
    }),
    ...mapActions('paymentModule', {
      listCards: 'listCards',
      listBanks: 'listBanks'
    })
  }
}
</script>

<style>
</style>