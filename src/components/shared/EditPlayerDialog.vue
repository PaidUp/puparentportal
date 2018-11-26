<template>
  <md-dialog :md-active.sync="showDialog" class="edit-player-dialog small" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Player Details</div>
    </div>
    <div class="common-player-info">
      <md-avatar v-if="avatar" class="md-large">
        <img :src="avatar" alt="avatar">
      </md-avatar>
      <md-icon v-else class="md-size-2x ca1">account_circle</md-icon>
      <div class="name">
        {{ player.organizationName }}
      </div>
      <div class="team">
        {{ organization.city }}, {{ organization.state }}
      </div>
      <update-avatar :url="url" @charged="setAvatar"></update-avatar>
    </div>
    <div class="names-box" :md-description="fullName">
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
  import { required } from 'vuelidate/lib/validators'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import UpdateAvatar from '@/components/shared/UpdateAvatar.vue'
  import capitalize from '@/helpers/capitalize'
  export default {
    components: { VPayAnimation, UpdateAvatar },
    props: {
      player: Object,
      showDialog: Boolean,
      numInvoices: Number
    },
    data () {
      return {
        url: `${config.api.organization}/beneficiary/avatar/${this.player._id}`,
        firstName: capitalize(this.player.firstName),
        lastName: capitalize(this.player.lastName),
        organization: {},
        submited: false,
        deleteAction: false,
        avatar: null
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      fullName () {
        this.firstName = capitalize(this.firstName)
        this.lastName = capitalize(this.lastName)
        return this
      },
      disableDeleteButton () {
        return this.numInvoices > 0
      },
      disableSaveButton () {
        return this.submited || this.$v.$invalid
      }
    },
    async mounted () {
      if (this.player) {
        let url = await this.avatarUrl(this.player._id)
        this.validateUrl(url).then(response => {
          this.avatar = response.data.validateUrl
        }).catch(reason => reason)
        this.getOrganization(this.player.organizationId)
        .then(organization => {
          this.organization = organization
        }, reason => {})
      }
    },
    methods: {
      ...mapActions('playerModule', {
        update: 'update',
        getBeneficiaries: 'getBeneficiaries',
        deleteBeneficiary: 'deleteBeneficiary',
        avatarUrl: 'avatarUrl'
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
      },
      setAvatar () {
        const url = `${config.media.beneficiary.url}avatar/${this.player._id}.png?a=${Math.random()}`
        this.avatar = url
        this.$emit('avatarChanged', url)
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
