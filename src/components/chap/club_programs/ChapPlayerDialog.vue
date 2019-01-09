<template>
  <md-dialog :md-active.sync="showDialog" class="edit-player-dialog small" :md-close-on-esc="false" :md-click-outside-to-close="false">
    <div class="dialog-header white-dialog-header">
      <div class="title">Player Details</div>
    </div>
    <div class="common-player-info">
      <md-icon class="md-size-2x ca1">account_circle</md-icon>
      <div class="name">
        {{ organization.businessName }}
      </div>
      <div class="team">
        {{ organization.city }}, {{ organization.state }}
      </div>
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
      <div></div>
      <div>
        <md-button class="md-accent lblue" @click="close">CANCEL</md-button>
        <md-button v-if="player" class="md-accent lblue md-raised" :disabled="disableSaveButton" @click="update">UPDATE</md-button>
        <md-button v-else class="md-accent lblue md-raised" :disabled="disableSaveButton" @click="save">SAVE</md-button>
      </div>
    </div>
    <v-pay-animation :animate="submited" :result="playerEdited" @finish="close" />
  </md-dialog>
</template>

<script>
  import { mapState } from 'vuex'
  import { required } from 'vuelidate/lib/validators'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import capitalize from '@/helpers/capitalize'
  import { beneficiaryService } from '@/services'
  export default {
    components: { VPayAnimation },
    props: {
      player: Object,
      showDialog: Boolean
    },
    data () {
      return {
        firstName: this.player ? capitalize(this.player.firstName) : '',
        lastName: this.player ? capitalize(this.player.lastName) : '',
        submited: false,
        deleteAction: false,
        playerEdited: null
      }
    },
    computed: {
      ...mapState('clubprogramsModule', {
        organization: 'organization',
        programSelected: 'programSelected'
      }),
      fullName () {
        this.firstName = capitalize(this.firstName)
        this.lastName = capitalize(this.lastName)
        return this
      },
      disableDeleteButton () {
        return true
      },
      disableSaveButton () {
        return this.submited || this.$v.$invalid || this.playerEdited !== null
      },
      disableUpdateButton () {
        return this.submited || this.$v.$invalid || this.playerEdited !== null
      }
    },
    watch: {
      showDialog () {
        if (!this.showDialog) {
          this.submited = false
          this.deleteAction = false
          this.playerEdited = null
          this.firstName = ''
          this.lastName = ''
          this.$v.$reset()
        }
      },
      player () {
        if (this.player) {
          this.firstName = capitalize(this.player.firstName)
          this.lastName = capitalize(this.player.lastName)
        }
      }
    },
    mounted () {
    },
    methods: {
      close () {
        this.$emit('completed', this.playerEdited)
      },
      async save () {
        try {
          this.submited = true
          this.playerEdited = await beneficiaryService.create({
            organizationId: this.organization._id,
            organizationName: this.organization.businessName,
            firstName: capitalize(this.firstName),
            lastName: capitalize(this.lastName),
            programs: this.programSelected
          })
          this.submited = false
        } catch (error) {
          console.log(error)
          this.submited = false
        }
      },
      async update () {
        try {
          this.submited = true
          this.playerEdited = await beneficiaryService.update(
            this.player.id,
            {
              firstName: capitalize(this.firstName),
              lastName: capitalize(this.lastName)
            }
          )
          this.submited = false
        } catch (error) {
          console.log(error)
          this.submited = false
        }
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
