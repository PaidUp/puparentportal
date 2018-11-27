<template>
  <md-dialog :md-active.sync="showDialog" class="edit-parent-dialog small" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Add New Parent</div>
    </div>
    <div class="common-player-info">
      <md-icon class="md-size-3x ca1">account_circle</md-icon>
      <div class="name">
        
      </div>
      <div class="team">
        
      </div>
    </div>
    <div class="names-box">
      <md-field :class="{'md-invalid': $v.firstName.$error}">
        <label>First Name</label>
        <md-input v-model.trim="firstName" @input="$v.firstName.$touch()"></md-input>
        <span class="md-error" v-if="!$v.firstName.required">{{ $t('validations.required', { field: 'First Name' }) }}</span>
      </md-field>
      <md-field :class="{'md-invalid': $v.lastName.$error}">
        <label>Last Name</label>
        <md-input v-model.trim="lastName" @input="$v.lastName.$touch()"></md-input>
        <span class="md-error" v-if="!$v.lastName.required">{{ $t('validations.required', { field: 'Last Name' }) }}</span>
      </md-field>
    </div>
    <div class="field-box"> 
      <md-field :class="{'md-invalid': $v.email.$error}">
        <label>Email</label>
        <md-input v-model.trim="email" @input="$v.email.$touch()"></md-input>
        <span class="md-error" v-if="!$v.email.required">{{ $t('validations.required', { field: 'Email' }) }}</span>
        <span class="md-error" v-if="!$v.email.email">{{ $t('validations.email') }}</span>
      </md-field>
      <md-field :class="{'md-invalid': $v.phone.$error, 'md-focused': phoneFocus}">
        <label @click="alert('on focus')" for="phoneField">Phone</label>
        <!-- md-input v-model.trim="phone" @input="$v.phone.$touch()"></md-input-->
        <the-mask @focus.native="phoneFocus = true" @blur.native="phone.length === 0 ? phoneFocus = false : ''" id="phoneField" class="md-input" @input="$v.phone.$touch()" mask="+1(###) ###-####" v-model.trim="phone" type="tel" :masked="false" placeholder=""></the-mask>
        <span class="md-error" v-if="!$v.phone.required">{{ $t('validations.required', { field: 'Phone' }) }}</span>
        <span class="md-error" v-if="!$v.phone.minLength">{{ $t('validations.min_length_num', { field: 'Phone', value: $v.phone.$params.minLength.min }) }}</span>
        <span class="md-error" v-if="!$v.phone.numeric">{{ $t('validations.numeric', { field: 'Phone' }) }} </span>
      </md-field>
    </div>
    
    
    
    <div class="actions">
      <md-button :disabled="disableDeleteButton" @click="remove" class="md-accent lblue delete-btn">DELETE</md-button>
      <div>
        <md-button class="md-accent lblue" @click="close">CANCEL</md-button>
        <md-button class="md-accent lblue md-raised" :disabled="disableSaveButton" @click="save">SAVE</md-button>
      </div>
    </div>
    <v-pay-animation :animate="submited" :result="{}" @finish="close" />
  </md-dialog>
</template>

<script>
  import config from '@/config'
  import { mapState, mapActions } from 'vuex'
  import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import capitalize from '@/helpers/capitalize'
  export default {
    components: { VPayAnimation },
    props: {
      parent: Object,
      showDialog: Boolean
    },
    data () {
      return {
        url: `${config.api.organization}/beneficiary/avatar`,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: {},
        submited: false,
        deleteAction: false,
        avatar: null,
        phoneFocus: false
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      disableDeleteButton () {
        return this.numInvoices > 0
      },
      disableSaveButton () {
        return this.submited || this.$v.$invalid
      }
    },
    async mounted () {
  
    },
    methods: {
      ...mapActions('userModule', {
        getAvatarUrl: 'getAvatarUrl'
      }),
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization'
      }),
      ...mapActions('commonModule', {
        validateUrl: 'validateUrl'
      }),
      close () {
        this.$emit('close', true)
      },
      save () {
        this.submited = true
        this.update({
          id: this.player._id,
          values: {
            firstName: capitalize(this.firstName),
            lastName: capitalize(this.lastName)
          }
        }).then(player => {
          this.submited = false
          this.getBeneficiaries(this.user.email)
        }).catch(reason => {
          console.log(reason)
          this.submited = false
        })
      },
      remove () {
        this.submited = true
        this.deleteBeneficiary(this.player._id)
        .then(resp => {
          this.submited = false
          this.getBeneficiaries(this.user.email).then(resp => {
            this.$router.push({name: 'home'})
          })
        }).catch(reason => {
          console.log(reason)
          this.submited = false
        })
      }
    },
    validations: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        numeric,
        required,
        minLength: minLength(10)
      }
    }
  }
</script>
