<template>
  <md-dialog :md-active.sync="showDialog" class="edit-player-dialog small" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Player Details</div>
    </div>
    <div class="common-player-info">
      <md-avatar class="md-large">
        <img src="@/assets/avatar.jpg" alt="avatar">
      </md-avatar>
      <div class="name">
        {{ player.organizationName }}
      </div>
      <div class="team">
        {{ organization.city }}, {{ organization.state }}
      </div>
      <md-button class="md-accent lblue update-pic">UPDATE PROFILE PICTURE</md-button>
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
    <div class="actions">
      <md-button :disabled="disableDeleteButton" class="md-accent lblue delete-btn">DELETE</md-button>
      <div>
        <md-button class="md-accent lblue" @click="close">CANCEL</md-button>
        <md-button class="md-accent lblue md-raised" :disabled="disableSaveButton" @click="save">SAVE</md-button>
      </div>
    </div>
    <v-pay-animation :animate="submited" @finish="close" />
  </md-dialog>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { required } from 'vuelidate/lib/validators'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  export default {
    components: { VPayAnimation },
    props: {
      player: Object,
      showDialog: Boolean,
      numInvoices: Number
    },
    data () {
      return {
        firstName: this.player.firstName,
        lastName: this.player.lastName,
        organization: {},
        submited: false
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
    mounted () {
      if (this.player) {
        this.getOrganization(this.player.organizationId)
        .then(organization => {
          this.organization = organization
        }).catch(reason => {
          console.log(reason)
        })
      }
    },
    methods: {
      ...mapActions('playerModule', {
        update: 'update',
        getBeneficiaries: 'getBeneficiaries'
      }),
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization'
      }),
      close () {
        this.$emit('close', true)
      },
      save () {
        this.submited = true
        this.update({
          id: this.player._id,
          values: {
            firstName: this.firstName,
            lastName: this.lastName
          }
        }).then(player => {
          this.submited = false
          this.getBeneficiaries(this.user.email)
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
      }
    }
  }
</script>
