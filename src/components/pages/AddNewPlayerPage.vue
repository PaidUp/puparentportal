<template>
  <div class="add-new-player-page md-elevation-4">
    <div class="md-title">
      Add New Player
    </div>
    <md-steppers md-vertical md-linear md-dynamic-height :md-active-step.sync="active">
      <md-step id="step1" md-label="Player Info" :md-description="fullName" :md-done.sync="step1">
        <div class="step-box">
          <div class="update-pic">
            <md-icon class="md-size-3x md-primary">account_circle</md-icon>
            <div>
              <md-button class="clblue bold">UPDATE PROFILE PICTURE</md-button>
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
          <md-button class="lblue md-accent md-raised" :disabled="nextStep1" @click="setDone('step1', 'step2')">NEXT</md-button>
          <md-button class="lblue md-accent" @click="cancel">CANCEL</md-button>
        </div>
      </md-step>
      <md-step id="step2" md-label="Second Step" md-description="Start typing below to search and choose your club">
        <md-field class="club-search-field">
          <label>Club</label>
          <md-input v-model.trim="filter"></md-input>
        </md-field>
        <div class="clubs">
          <div class="club md-elevation-2" :class="{ selected: organizationSelected._id === organization._id }" @click="selectOrganization(organization)" v-for="organization in filtered" :key="organization._id">
            <img src="@/assets/ntxbanditos.png" alt="club">
            <div class="title cblue bold">{{ organization.businessName }}</div>
            <div class="location">{{ organization.city }}, {{ organization.state }}</div>
          </div>
        </div>
        <md-button class="lblue md-accent md-raised" @click="cretePlayer" :disabled="processing || !organizationSelected._id">ADD PLAYER</md-button>
        <md-button class="lblue md-accent" @click="cancel">CANCEL</md-button>
      </md-step>

    </md-steppers>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { required } from 'vuelidate/lib/validators'

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
        processing: false
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
        if (!this.filter) return this.organizations
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
