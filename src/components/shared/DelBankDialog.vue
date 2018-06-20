<template>
  <md-dialog :md-active.sync="showDialog" class="add-card-dialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Bank Details</div>
    </div>
    <div class="main-box">
      <md-field>
          <label>Bank Description*</label>
          <md-input v-model="bankDescription" disabled></md-input>
        </md-field>
      <md-field>
        <label>Name on Bank</label>
        <md-input v-model="bank.account_holder_name" disabled></md-input>
      </md-field>
      <md-field>
        <label>Country</label>
        <md-input v-model="bank.country" disabled></md-input>
      </md-field>
      <md-field>
        <label>Currency</label>
        <md-input v-model="bank.currency" disabled></md-input>
      </md-field>
    </div>
    <v-pay-animation :animate="submited" @finish="done" />
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog">Cancel</md-button>
      <md-button class="md-accent md-raised lblue" @click='remove' :disabled="submited">DELETE BANK</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VPayAnimation from '@/components/shared/VPayAnimation.vue'
import states from '@/util/states'
export default {
  props: {
    showDialog: Boolean,
    bank: Object
  },
  components: { VPayAnimation },
  data () {
    return {
      submited: false,
      states
    }
  },
  computed: {
    ...mapState('userModule', {
      user: 'user'
    }),
    bankDescription () {
      if (this.bank.last4) return `${this.bank.bank_name}••••${this.bank.last4}`
      return ''
    }
  },
  methods: {
    ...mapActions('paymentModule', {
      removeBank: 'removeBank',
      listBanks: 'listBanks',
      getInvoicesByPaymetMethod: 'getInvoicesByPaymetMethod'
    }),
    remove () {
      this.getInvoicesByPaymetMethod(this.bank.id).then(invoices => {
        this.submited = true
        if (invoices.length) {
          this.submited = false
          return this.$emit('close', { deleted: false })
        }
        this.removeBank({
          user: this.user,
          bankId: this.bank.id
        }).then(res => {
          this.submited = false
          this.listBanks(this.user)
        })
      })
    },
    done () {
      this.$emit('close', { deleted: true })
    },
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>