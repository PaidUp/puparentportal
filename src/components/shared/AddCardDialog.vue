<template>
  <md-dialog :md-active.sync="showDialog" class="add-card-dialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Add New Card</div>
    </div>
    <div class="main-box">
      <div class="field-info">Credit or Debit Card*</div>
      <pu-card :class="{'stripe-card':true, complete: complete}" @done="done" @token="animation = false" :details="details"  :submited="submited" />
   
      <md-field :class="{'md-invalid': $v.details.name.$error}">
        <label>Name on Card</label>
        <md-input v-model.trim="details.name" @input="$v.details.name.$touch()"></md-input>
        <span class="md-error" v-if="!$v.details.name.required">{{ $t('validations.required', { field: 'Name' }) }}</span>        
      </md-field>
      <md-field :class="{'md-invalid': $v.details.address_line1.$error}">
        <label>Address</label>
        <md-input v-model.trim="details.address_line1" @input="$v.details.address_line1.$touch()"></md-input>
        <span class="md-error" v-if="!$v.details.address_line1.required">{{ $t('validations.required', { field: 'Address' }) }}</span>        
      </md-field>
      <div class="address-info no-zip">
        <md-field :class="{'md-invalid': $v.details.address_city.$error}">
          <label>City</label>
          <md-input v-model.trim="details.address_city" @input="$v.details.address_city.$touch()"></md-input>
          <span class="md-error" v-if="!$v.details.address_city.required">{{ $t('validations.required', { field: 'City' }) }}</span>          
        </md-field>
        <md-autocomplete v-model="details.address_state" @input="$v.details.address_state.$touch()" name="state" id="state" :md-options="['Arizona', 'New York', 'Texas', 'Delware', 'California']" md-dense>
          <label>State</label>
        </md-autocomplete>
        <!-- <md-field :class="{'md-invalid': $v.details.address_state.$error}">
          <label>State</label>
          <md-select v-model="details.address_state" @input="$v.details.address_state.$touch()" name="state" id="state" md-dense>
            <md-option v-for="state in states" :key="state.abbreviation" :value="state.abbreviation">{{ state.name }}</md-option>
          </md-select>
          <span class="md-error" v-if="!$v.details.address_state.required">{{ $t('validations.required', { field: 'State' }) }}</span>
        </md-field> -->
      </div>
    </div>
    <v-pay-animation :animate="animation" @finish="closeDialog" />
    <md-dialog-actions>
      <md-button class="md-accent lblue" @click="closeDialog">Cancel</md-button>
      <md-button class="md-accent md-raised lblue" @click='submited = !submited' :disabled="disabled">ADD NEW CARD</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import config from '@/config'
  import PuCard from '@/components/shared/payment/PuCard.vue'
  import { required } from 'vuelidate/lib/validators'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import states from '@/util/states'
  
export default {
    props: {
      showDialog: Boolean
    },
    components: { PuCard, VPayAnimation },
    data () {
      return {
        publicKey: config.stripe.publicKey,
        complete: false,
        details: {
          name: '',
          address_line1: '',
          address_city: '',
          address_state: '',
          address_country: 'US'
        },
        submited: false,
        states,
        animation: false
      }
    },
    watch: {
      submited () {
        if (this.submited) this.animation = true
      }
    },
    methods: {
      done (status) {
        this.complete = status
      },
      closeDialog () {
        this.reset()
        this.$emit('close')
      },
      reset () {
        this.$v.details.$reset()
        this.complete = false
        this.details = {
          name: '',
          address_line1: '',
          address_city: '',
          address_state: '',
          address_country: 'US'
        }
        this.submited = false
      }
    },
    computed: {
      disabled () {
        return !this.complete || this.$v.details.$invalid || this.submited
      }
    },
    validations: {
      details: {
        name: {
          required
        },
        address_line1: {
          required
        },
        address_state: {
          required
        },
        address_city: {
          required
        }
      }
    }

}
</script>

