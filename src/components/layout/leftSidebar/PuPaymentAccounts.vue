<template lang="pug">
md-list-item(md-expand)
  span.md-list-item-text.ca1.bold Payment Accounts
  md-list(slot="md-expand")
    pu-item-account(:item="item" v-for="item in cards" :key="item.id")
    pu-item-account(:item="item" v-for="item in bankAccounts" :key="item.id")
    md-list-item(@click="showAddCardDialog=true")
      md-icon.add-icon add
      .md-list-item-text
        div Add New Card
    md-list-item
      md-icon.add-icon add
      .md-list-item-text
        div Add New Bank
  add-card-dialog(:showDialog="showAddCardDialog" @close="showAddCardDialog = false")
</template>
<script>
import PuItem from './PuItem.vue'
import PuItemAccount from './PuItemAccount.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import AddCardDialog from '@/components/shared/AddCardDialog.vue'

export default {
  components: { PuItem, PuItemAccount, AddCardDialog },
  data () {
    return {
      showAddCardDialog: false
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
    ...mapState('paymentModule', {
      cards: 'cards',
      bankAccounts: 'bankAccounts'
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
  mounted () {
    if (this.user && this.user.externalCustomerId) {
      this.listCards(this.user)
      this.listBanks(this.user)
    }
  },
  methods: {
    ...mapActions('paymentModule', {
      listCards: 'listCards',
      listBanks: 'listBanks'
    }),
    ...mapGetters('paymentModule', {
      paymentAccounts: 'paymentAccounts'
    })
  }
}
</script>

