<template>
  <div class="profile-page md-elevation-4">
    <div class="main-box">
      <div class="title bold">Profile</div>
      <div class="content-box">
        <div class="centered">
          <md-avatar v-if="showAvatar" class="md-avatar-icon md-large md-elevation-4">
            <img :src="avatar" @error="showAvatar = false" />
          </md-avatar>
          <md-icon v-else class="md-size-2x ca1">account_circle</md-icon>
        </div>
        <update-avatar :url="url" @charged="uploadedAvatar"></update-avatar>
        <div class="names-box" :md-description="fullName">
          <md-field :class="{'md-invalid': $v.firstName.$error}">
            <label>First Name</label>
            <md-input v-model.trim="firstName" :disabled="!editName" @input="$v.firstName.$touch()"></md-input>
            <span class="md-error" v-if="!$v.firstName.required">{{ $t('validations.required', { field: 'First Name' }) }}</span>
          </md-field>
          <md-field :class="{'md-invalid': $v.lastName.$error}">
            <label>Last Name</label>
            <md-input v-model.trim="lastName" :disabled="!editName" @input="$v.lastName.$touch()"></md-input>
            <span class="md-error" v-if="!$v.lastName.required">{{ $t('validations.required', { field: 'Last Name' }) }}</span>
            <span @click="editName = true">
              <md-icon v-show="!editName">editable</md-icon>
            </span>
          </md-field>
        </div>
        <md-field>
          <label>Email</label>
          <md-input v-model="email" :disabled= "!editEmail"></md-input>
          <img v-if="user.facebookId" class="fb-icon" src="@/assets/facebook.png" />
        </md-field>
        <md-field v-show="!user.facebookId" :md-toggle-password="editPassword">
          <label>Password</label>
          <md-input v-model.trim="password" type="password" :disabled="!editPassword"></md-input>
          <span @click="editPassword = true" v-show="!editPassword">
            <md-icon>editable</md-icon>
          </span>
        </md-field>
        <md-field v-show="editPassword" :class="{'md-invalid': $v.cpassword.$error}" :md-toggle-password="editPassword">
          <label>Confirm Password</label>
          <md-input v-model.trim="cpassword" @input="$v.cpassword.$touch()" type="password"></md-input>
          <span class="md-error" v-if="!$v.cpassword.sameAsPassword">{{ $t('validations.identical', { field: 'Password' }) }}</span>
        </md-field>
        <md-field :class="{'md-invalid': $v.phone.$error}">
          <label>Phone Number</label>
          <md-input v-model.trim="phone" @input="$v.phone.$touch()" type="number" :disabled="!editPhone"></md-input>
          <span v-show="!editPhone" @click="editPhone = true">
            <md-icon>editable</md-icon>
          </span>
          <span class="md-error" v-if="!$v.phone.required">{{ $t('validations.required', { field: 'Phone' }) }}</span>
          <span class="md-error" v-if="!$v.phone.minLength">{{ $t('validations.min_length_num', { field: 'Phone', value: $v.phone.$params.minLength.min }) }}</span>
          <span class="md-error" v-if="!$v.phone.numeric">{{ $t('validations.numeric', { field: 'Phone' }) }} </span>
        </md-field>
        <div class="actions-box" v-show="showSaveButton">
          <md-button class="md-accent lblue" @click="reset" >CANCEL</md-button>
          <md-button class="md-accent lblue md-raised" @click="submmit" :disabled="disableSaveButton">SAVE</md-button>
        </div>
        <div class="upgrade-box" v-if="false && isParent">
          Upgrade your account if your are a Club Director to receive payments from parents
          and access the Scoreboard (PaidUp approval required).
          <md-button to="/upgrade" class="md-accent md-raised lblue upgrade-btn">UPGRADE TO CLUB DIRECTOR ACCOUNT</md-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import { required, email, minLength, sameAs, numeric } from 'vuelidate/lib/validators'
  import UpdateAvatar from '@/components/shared/UpdateAvatar.vue'
  import config from '@/config'
  import capitalize from '@/helpers/capitalize'
  export default {
    components: { UpdateAvatar },
    data: function () {
      return {
        url: config.api.user + '/avatar',
        showAvatar: true,
        firstName: '',
        lastName: '',
        editName: false,
        email: '',
        editEmail: false,
        password: null,
        cpassword: null,
        editPassword: false,
        phone: '',
        editPhone: false,
        submmited: false
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user',
        avatar: 'avatar'
      }),
      fullName () {
        this.firstName = capitalize(this.firstName)
        this.lastName = capitalize(this.lastName)
        return this
      },
      disableSaveButton () {
        return this.$v.$invalid || this.submmited
      },
      showSaveButton () {
        return this.editName || this.editEmail || this.editPassword || this.editPhone
      },
      isParent () {
        if (this.user && this.user.roles) return this.user.roles.includes('parent')
        return false
      }
    },
    mounted () {
      this.load()
    },
    watch: {
      user () {
        this.load()
      }
    },
    methods: {
      ...mapMutations('userModule', {
        reloadAvatar: 'reloadAvatar'
      }),
      ...mapActions('userModule', {
        update: 'update'
      }),
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
      uploadedAvatar () {
        this.showAvatar = true
        this.reloadAvatar()
      },
      reset () {
        this.load()
        this.editName = false
        this.editEmail = false
        this.password = null
        this.cpassword = null
        this.editPassword = false
        this.editPhone = false
        this.submmited = false
        this.$v.$reset()
      },
      submmit () {
        this.submmited = true
        let values = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          password: this.password
        }
        this.update({id: this.user._id, values}).then(res => {
          this.reset()
          this.setSuccess('You profile was updated succesfully')
        }).catch(reason => {
          this.reset()
          this.setWarning('Error, your profile wasn\'t update')
        })
      },
      load () {
        if (this.user) {
          this.firstName = this.user.firstName
          this.lastName = this.user.lastName
          this.email = this.user.email
          this.phone = this.user.phone
        }
      }
    },
    validations: {
      cpassword: {
        sameAsPassword: sameAs('password')
      },
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
