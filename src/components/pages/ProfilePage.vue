<template>
  <div class="profile-page md-elevation-4">
    <div class="main-box">
      <div class="title bold">Profile</div>
      <div class="content-box">
        <div class="centered">
          <md-avatar v-if="avatar" class="md-avatar-icon md-large md-elevation-4">
            <img :src="avatar" />
          </md-avatar>
          <md-icon v-else class="md-size-2x ca1">account_circle</md-icon>
        </div>
        <update-avatar :url="url" @charged="uploadedAvatar"></update-avatar>
        <div class="names-box">
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

        <md-field :class="{'md-invalid': $v.phone.$error, 'md-focused': phoneFocus}">
          <label for="phoneField">Phone Number</label>
          <the-mask :disabled="!editPhone" @focus.native="phoneFocus = true" @blur.native="phone.length === 0 ? phoneFocus = false : ''" id="phoneField" class="md-input" @input="$v.phone.$touch()" mask="(###) ###-####" v-model.trim="phone" type="tel" :masked="true" placeholder=""></the-mask>
          <span v-show="!editPhone" @click="editPhone = true">
            <md-icon>editable</md-icon>
          </span>
          <span class="md-error" v-if="!$v.phone.required">{{ $t('validations.required', { field: 'Phone' }) }}</span>          
          <span class="md-error" v-if="!$v.phone.minLength">{{ $t('validations.min_length_num', { field: 'Phone', value: 10 }) }}</span>
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
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import UpdateAvatar from '@/components/shared/UpdateAvatar.vue'
  import config from '@/config'
  export default {
    components: { UpdateAvatar },
    data: function () {
      return {
        phoneFocus: true,
        url: config.api.user + '/avatar',
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
        submmited: false,
        avatar: null
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      disableSaveButton () {
        return this.$v.$invalid || this.submmited
      },
      showSaveButton () {
        return this.editName || this.editEmail || this.editPassword || this.editPhone
      },
      isParent () {
        if (this.user && this.user.roles) return this.user.roles.indexOf('parent') > -1
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
      ...mapActions('userModule', {
        update: 'update',
        getAvatarUrl: 'getAvatarUrl'
      }),
      ...mapMutations('userModule', {
        reloadUser: 'reloadUser'
      }),
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
      ...mapActions('commonModule', {
        validateUrl: 'validateUrl'
      }),
      async uploadedAvatar () {
        let url = await this.getAvatarUrl(this.user._id)
        this.validateUrl(url).then(response => {
          this.avatar = response.data.validateUrl
          this.reloadUser()
        }).catch(reason => reason)
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
      async load () {
        if (this.user) {
          this.firstName = this.user.firstName
          this.lastName = this.user.lastName
          this.email = this.user.email
          this.phone = this.user.phone.replace(/\D/g, '').slice(-10)
          let url = await this.getAvatarUrl(this.user._id)
          this.validateUrl(url).then(response => {
            this.avatar = response.data.validateUrl
          }).catch(reason => reason)
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
        required,
        minLength: minLength(14)
      }

    }
  }
</script>
