<template lang="pug">
  .add-new-player-page.md-elevation-4
    .md-title New Player
    md-steppers(md-vertical md-linear md-dynamic-height :md-active-step.sync="active")
      md-step(id="step1" md-label="Player Info" :md-description="fullName" :md-done.sync="step1")
        .step-box
          create-avatar(:url="apiUrl" @uploaded="reloadBeneficiares")
          .names-box
            md-field(:class="{'md-invalid': $v.firstName.$error}")
              label First Name
              md-input(v-model.trim="firstName" @input="$v.firstName.$touch()")
              span.md-error(v-if="!$v.firstName.required") {{ $t('validations.required', { field: 'First Name' }) }}
            md-field(:class="{'md-invalid': $v.lastName.$error}")
              label Last Name
              md-input(v-model.trim="lastName" @input="$v.lastName.$touch()")
              span.md-error(v-if="!$v.lastName.required") {{ $t('validations.required', { field: 'Last Name' }) }}
          md-button.lblue.md-accent(@click="cancel") Cancel
          md-button.lblue.md-accent.md-raised(:disabled="nextStep1" @click="setDone('step1', 'step2')") NEXT
      md-step(id="step2" md-label="Choose Club" md-description="Start typing below to search and click to choose your club")
        md-field.club-search-field
          label Club
          md-input(v-model.trim="filter")
        .cards-layout.clubs
          .md-card.club-card(:class="{ selected: organizationSelected._id === organization._id }" @click="selectOrganization(organization)" v-for="organization in filtered" :key="organization._id")
            img(:src="mediaUrl + organization._id + '.png'" alt="club")
            div.centered
              .title.cblue.bold {{ organization.businessName }}
              .location {{ organization.city }}, {{ organization.state }}
        md-button.lblue.md-accent(@click="cancel") CANCEL
        md-button.lblue.md-accent.md-raised(@click="cretePlayer" :disabled="processing || !organizationSelected._id") ADD PLAYER
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { required } from 'vuelidate/lib/validators'
  import config from '@/config'
  import CreateAvatar from '@/components/shared/CreateAvatar.vue'
  import capitalize from '@/helpers/capitalize'

  export default {
    components: { CreateAvatar },
    data: function () {
      return {
        apiUrl: null,
        playerId: '',
        active: 'step1',
        step1: false,
        step2: false,
        firstName: '',
        lastName: '',
        organizationSelected: {},
        filter: '',
        processing: false,
        mediaUrl: config.media.organization.url + 'logo/'
      }
    },
    mounted () {
      this.getOrganizations()
    },
    computed: {
      ...mapState('organizationModule', {
        organizations: 'organizations'
      }),
      ...mapState('userModule', {
        user: 'user'
      }),
      fullName () {
        this.firstName = capitalize(this.firstName)
        this.lastName = capitalize(this.lastName)
        return this.firstName + ' ' + this.lastName
      },
      filtered () {
        if (!this.filter || this.filter.length < 3) return []
        return this.organizations.filter(org => {
          return (org.businessName.toUpperCase().indexOf(this.filter.toUpperCase()) > -1) && (org.status === 'active')
        })
      },
      nextStep1 () {
        if (this.firstName && this.lastName) return false
        return true
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganizations: 'getOrganizations'
      }),
      ...mapActions('playerModule', {
        create: 'create',
        getBeneficiaries: 'getBeneficiaries'
      }),
      ...mapActions('messageModule', {
        setWarning: 'setWarning',
        setSuccess: 'setSuccess'
      }),
      setDone (id, index) {
        this[ id ] = true
        if (index) {
          this.active = index
        }
      },
      selectOrganization (organization) {
        this.organizationSelected = organization
      },
      cretePlayer () {
        this.processing = true
        let body = {
          organizationId: this.organizationSelected._id,
          organizationName: this.organizationSelected.businessName,
          firstName: capitalize(this.firstName),
          lastName: capitalize(this.lastName),
          assigneesEmail: this.user.email,
          description: ''
        }
        this.create(body).then(player => {
          this.setSuccess('component.new_player.done')
          this.playerId = player._id
          this.apiUrl = `${config.api.organization}/beneficiary/avatar/${player._id}`
        }).catch(reason => {
          this.setWarning('common.error.default')
          this.processing = false
        })
      },
      reloadBeneficiares () {
        this.getBeneficiaries(this.user.email).then(bn => {
          this.processing = false
          this.$router.push({
            name: 'history',
            params: { id: this.playerId }
          })
        })
      },
      cancel () {
        this.$router.push({
          name: 'home'
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
