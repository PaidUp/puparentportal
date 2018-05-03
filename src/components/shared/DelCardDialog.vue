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
        <md-field>
          <label>City</label>
          <md-input v-model="card.address_city" disabled></md-input>
        </md-field>
        <md-field>
          <label>State</label>
          <md-select v-model="card.address_state" name="state" id="state" md-dense disabled>
            <md-option v-for="state in states" :key="state.abbreviation" :value="state.abbreviation">{{ state.name }}</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Zip*</label>
          <md-input v-model="card.address_zip" disabled></md-input>
        </md-field>
      </div>
    </div>
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog">Cancel</md-button>
      <md-button class="md-accent md-raised lblue" @click='remove' :disabled="submited">DELETE CARD</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    showDialog: Boolean,
    card: Object
  },
  data () {
    return {
      submited: false,
      states: [
        {
          'name': 'Alabama',
          'abbreviation': 'AL'
        },
        {
          'name': 'Alaska',
          'abbreviation': 'AK'
        },
        {
          'name': 'American Samoa',
          'abbreviation': 'AS'
        },
        {
          'name': 'Arizona',
          'abbreviation': 'AZ'
        },
        {
          'name': 'Arkansas',
          'abbreviation': 'AR'
        },
        {
          'name': 'California',
          'abbreviation': 'CA'
        },
        {
          'name': 'Colorado',
          'abbreviation': 'CO'
        },
        {
          'name': 'Connecticut',
          'abbreviation': 'CT'
        },
        {
          'name': 'Delaware',
          'abbreviation': 'DE'
        },
        {
          'name': 'District Of Columbia',
          'abbreviation': 'DC'
        },
        {
          'name': 'Federated States Of Micronesia',
          'abbreviation': 'FM'
        },
        {
          'name': 'Florida',
          'abbreviation': 'FL'
        },
        {
          'name': 'Georgia',
          'abbreviation': 'GA'
        },
        {
          'name': 'Guam',
          'abbreviation': 'GU'
        },
        {
          'name': 'Hawaii',
          'abbreviation': 'HI'
        },
        {
          'name': 'Idaho',
          'abbreviation': 'ID'
        },
        {
          'name': 'Illinois',
          'abbreviation': 'IL'
        },
        {
          'name': 'Indiana',
          'abbreviation': 'IN'
        },
        {
          'name': 'Iowa',
          'abbreviation': 'IA'
        },
        {
          'name': 'Kansas',
          'abbreviation': 'KS'
        },
        {
          'name': 'Kentucky',
          'abbreviation': 'KY'
        },
        {
          'name': 'Louisiana',
          'abbreviation': 'LA'
        },
        {
          'name': 'Maine',
          'abbreviation': 'ME'
        },
        {
          'name': 'Marshall Islands',
          'abbreviation': 'MH'
        },
        {
          'name': 'Maryland',
          'abbreviation': 'MD'
        },
        {
          'name': 'Massachusetts',
          'abbreviation': 'MA'
        },
        {
          'name': 'Michigan',
          'abbreviation': 'MI'
        },
        {
          'name': 'Minnesota',
          'abbreviation': 'MN'
        },
        {
          'name': 'Mississippi',
          'abbreviation': 'MS'
        },
        {
          'name': 'Missouri',
          'abbreviation': 'MO'
        },
        {
          'name': 'Montana',
          'abbreviation': 'MT'
        },
        {
          'name': 'Nebraska',
          'abbreviation': 'NE'
        },
        {
          'name': 'Nevada',
          'abbreviation': 'NV'
        },
        {
          'name': 'New Hampshire',
          'abbreviation': 'NH'
        },
        {
          'name': 'New Jersey',
          'abbreviation': 'NJ'
        },
        {
          'name': 'New Mexico',
          'abbreviation': 'NM'
        },
        {
          'name': 'New York',
          'abbreviation': 'NY'
        },
        {
          'name': 'North Carolina',
          'abbreviation': 'NC'
        },
        {
          'name': 'North Dakota',
          'abbreviation': 'ND'
        },
        {
          'name': 'Northern Mariana Islands',
          'abbreviation': 'MP'
        },
        {
          'name': 'Ohio',
          'abbreviation': 'OH'
        },
        {
          'name': 'Oklahoma',
          'abbreviation': 'OK'
        },
        {
          'name': 'Oregon',
          'abbreviation': 'OR'
        },
        {
          'name': 'Palau',
          'abbreviation': 'PW'
        },
        {
          'name': 'Pennsylvania',
          'abbreviation': 'PA'
        },
        {
          'name': 'Puerto Rico',
          'abbreviation': 'PR'
        },
        {
          'name': 'Rhode Island',
          'abbreviation': 'RI'
        },
        {
          'name': 'South Carolina',
          'abbreviation': 'SC'
        },
        {
          'name': 'South Dakota',
          'abbreviation': 'SD'
        },
        {
          'name': 'Tennessee',
          'abbreviation': 'TN'
        },
        {
          'name': 'Texas',
          'abbreviation': 'TX'
        },
        {
          'name': 'Utah',
          'abbreviation': 'UT'
        },
        {
          'name': 'Vermont',
          'abbreviation': 'VT'
        },
        {
          'name': 'Virgin Islands',
          'abbreviation': 'VI'
        },
        {
          'name': 'Virginia',
          'abbreviation': 'VA'
        },
        {
          'name': 'Washington',
          'abbreviation': 'WA'
        },
        {
          'name': 'West Virginia',
          'abbreviation': 'WV'
        },
        {
          'name': 'Wisconsin',
          'abbreviation': 'WI'
        },
        {
          'name': 'Wyoming',
          'abbreviation': 'WY'
        }
      ]
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
          this.$emit('close', res)
        })
      })
    },
    done (status) {
      this.complete = status
    },
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>

