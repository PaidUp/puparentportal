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
        <label for="phoneField">Phone</label>
        <!-- md-input v-model.trim="phone" @input="$v.phone.$touch()"></md-input-->
        <the-mask @focus.native="phoneFocus = true" @blur.native="phone.length === 0 ? phoneFocus = false : ''" id="phoneField" class="md-input" @input="$v.phone.$touch()" mask="(###) ###-####" v-model.trim="phone" type="tel" :masked="true" placeholder=""></the-mask>
        <span class="md-error" v-if="!$v.phone.minLength">{{ $t('validations.min_length_num', { field: 'Phone', value: 10 }) }}</span>
      </md-field>
    </div>
    
    
    
    <div class="actions">
      <div>
        <md-button class="md-accent lblue" @click="close(null)">CANCEL</md-button>
        <md-button class="md-accent lblue md-raised" :disabled="disableSaveButton" @click="save">SAVE</md-button>
      </div>
    </div>
    <v-pay-animation :animate="submited" :result="userCreated" @finish="completed" />
  </md-dialog>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  export default {
    components: { VPayAnimation },
    props: {
      beneficiary: Object,
      showDialog: Boolean
    },
    data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        submited: false,
        deleteAction: false,
        phoneFocus: false,
        userCreated: null
      }
    },
    watch: {
      showDialog () {
        if (!this.showDialog) {
          this.reset()
        }
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('clubprogramsModule', {
        organization: 'organization'
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
        createUser: 'createUser'
      }),
      ...mapActions('commonModule', {
        validateUrl: 'validateUrl'
      }),
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
      completed () {
        const usr = JSON.parse(JSON.stringify(this.userCreated))
        this.$emit('completed', usr)
      },
      close () {
        this.$emit('close')
      },
      reset () {
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.phone = ''
        this.userCreated = null
        this.$v.$reset()
      },
      save () {
        this.submited = true
        const params = {
          beneficiaryId: this.beneficiary._id,
          user: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone ? `1${this.phone.replace(/\D/g, '').slice(-10)}` : ''
          }
        }
        this.createUser(params).then(res => {
          this.submited = false
          this.setSuccess('Parent created successfully')
          this.userCreated = res.data.userCreate
        }).catch(err => {
          this.submited = false
          const message = (err.message && err.message.indexOf('The specified email address is already in use') > -1) ? 'module.user.email_address_in_use' : 'common.error.default'
          this.setWarning(message)
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
        minLength: minLength(14)
      }
    }
  }
</script>
