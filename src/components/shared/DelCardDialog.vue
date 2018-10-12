<template>
  <md-dialog :md-active.sync="showDialog" class="add-card-dialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Card Details</div>
    </div>
    <div class="main-box">
      <md-field>
          <label>Credit or Debit Card*</label>
          <md-input v-model="cardDescription" disabled></md-input>
        </md-field>
      <md-field>
        <label>Name on Card</label>
        <md-input v-model="card.name" disabled></md-input>
      </md-field>
      <md-field>
        <label>Address</label>
        <md-input v-model="card.address_line1" disabled></md-input>
      </md-field>
      <div class="address-info">
        <div>
          <md-field>
            <label>City</label>
            <md-input v-model="card.address_city" disabled></md-input>
          </md-field>
        </div>
        <div>
          <md-field>
            <label>State</label>
            <md-select v-model="card.address_state" name="state" id="state" md-dense disabled>
              <md-option v-for="state in states" :key="state.abbreviation" :value="state.abbreviation">{{ state.name }}</md-option>
            </md-select>
          </md-field>
        </div>
        <div>
          <md-field>
            <label>Zip*</label>
            <md-input v-model="card.address_zip" disabled></md-input>
          </md-field>
        </div>
      </div>
    </div>
    <v-pay-animation :animate="submited" :result="{}" @finish="done" />
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog">Cancel</md-button>
      <md-button class="md-accent md-raised lblue" @click='remove' :disabled="submited">DELETE CARD</md-button>
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
    card: Object
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
    cardDescription () {
      if (this.card.last4) return `${this.card.brand}••••${this.card.last4} ${(this.card.exp_month / 100).toFixed(2).slice(-2)}/${this.card.exp_year.toString().slice(-2)}`
      return ''
    }
  },
  methods: {
    ...mapActions('paymentModule', {
      removeCard: 'removeCard',
      listCards: 'listCards',
      getInvoicesByPaymetMethod: 'getInvoicesByPaymetMethod'
    }),
    remove () {
      this.getInvoicesByPaymetMethod(this.card.id).then(invoices => {
        this.submited = true
        if (invoices.length) {
          this.submited = false
          return this.$emit('close', { deleted: false })
        }
        this.removeCard({
          user: this.user,
          cardId: this.card.id
        }).then(res => {
          this.submited = false
          this.listCards(this.user)
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

