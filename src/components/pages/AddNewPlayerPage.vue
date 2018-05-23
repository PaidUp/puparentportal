<template lang="pug">
  .add-new-player-page.md-elevation-4
    .md-title New Player
    md-steppers(md-vertical md-linear md-dynamic-height :md-active-step.sync="active")
      md-step(id="step1" md-label="Player Info" :md-description="fullName" :md-done.sync="step1")
        .step-box
          .update-pic
            md-icon.md-size-3x.md-primary account_circle
            md-button.clblue.bold UPDATE PROFILE PICTURE
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
      md-step(id="step2" md-label="Second Step" md-description="Start typing below to search and click to choose your club")
        md-field.club-search-field
          label Club
          md-input(v-model.trim="filter")
        .clubs
          .club.md-elevation-2(:class="{ selected: organizationSelected._id === organization._id }" @click="selectOrganization(organization)" v-for="organization in filtered" :key="organization._id")
            img(:src="mediaUrl + organization._id + '.png'" alt="club")
            .title.cblue.bold {{ organization.businessName }}
            .location {{ organization.city }}, {{ organization.state }}
        md-button.lblue.md-accent(@click="cancel") CANCEL
        md-button.lblue.md-accent.md-raised(@click="cretePlayer" :disabled="processing || !organizationSelected._id") ADD PLAYER


</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { required } from 'vuelidate/lib/validators'
  import config from '@/config'

  export default {
    components: {},
    data: function () {
      return {
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
        return this.firstName + ' ' + this.lastName
      },
      filtered () {
        if (!this.filter || this.filter.length < 3) return []
        return this.organizations.filter(org => {
          return org.businessName.toUpperCase().includes(this.filter.toUpperCase())
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
          firstName: this.firstName,
          lastName: this.lastName,
          assigneesEmail: this.user.email,
          description: ''
        }
        this.create(body).then(player => {
          this.setSuccess('done')
          this.processing = false
          this.$router.push({
            name: 'history',
            params: { id: player._id }
          })
          this.getBeneficiaries(this.user.email)
        }).catch(reason => {
          this.setWarning('common.error')
          this.processing = false
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
