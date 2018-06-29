<template lang="pug">
md-list-item(md-expand :md-expanded.sync="expand")
  span.md-list-item-text.ca1.bold Payment Accounts
  md-list(slot="md-expand")
    pu-item-account(:item="item" v-for="item in cards" :key="item.id" @closed="" @click="selectCard(item)")
    pu-item-account(:item="item" v-for="item in bankAccounts" :key="item.id" @closed="" @click="selectBank(item)")
    md-list-item(@click="showAddCardDialog=true")
      md-icon.add-icon add
      .md-list-item-text
        div Add New Card
    pu-bank(type="item")
  add-card-dialog(:showDialog="showAddCardDialog" @close="showAddCardDialog = false")
  del-card-dialog(:card="cardSelected" :showDialog="showDelCardDialog" @close="close")
  del-bank-dialog(:bank="bankSelected" :showDialog="showDelBankDialog" @close="closeBankDialog")
</template>
<script>
import PuItem from './PuItem.vue'
import PuItemAccount from './PuItemAccount.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import AddCardDialog from '@/components/shared/AddCardDialog.vue'
import DelCardDialog from '@/components/shared/DelCardDialog.vue'
import DelBankDialog from '@/components/shared/DelBankDialog.vue'
import PuBank from '@/components/shared/payment/PuBank.vue'

export default {
  components: { PuItem, PuItemAccount, AddCardDialog, DelCardDialog, DelBankDialog, PuBank },
  data () {
    return {
      showAddCardDialog: false,
      showDelCardDialog: false,
      showDelBankDialog: false,
      bankSelected: {},
      cardSelected: {},
      expand: this.expanded
    }
  },
  props: {
    expanded: {
      type: Boolean,
      default: true
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
    ...mapActions('messageModule', {
      setSuccess: 'setSuccess',
      setWarning: 'setWarning'
    }),
    ...mapGetters('paymentModule', {
      paymentAccounts: 'paymentAccounts'
    }),
    selectCard (card) {
      this.showDelCardDialog = true
      this.cardSelected = card
    },
    selectBank (bank) {
      this.showDelBankDialog = true
      this.bankSelected = bank
    },
    close (status) {
      this.showDelCardDialog = false
      if (status) {
        if (status.deleted) {
          return this.setSuccess('component.left_side_bar.del_card_success')
        }
        return this.setWarning('component.left_side_bar.del_card_fail')
      }
    },
    closeBankDialog (status) {
      this.showDelBankDialog = false
      if (status) {
        if (status.deleted) {
          return this.setSuccess('component.left_side_bar.del_bank_success')
        }
        return this.setWarning('component.left_side_bar.del_bank_fail')
      }
    }
  }
}
</script>

