const dict = {
  common: {
    error: {
      default: 'contact us'
    }
  },
  message: {
    hello: 'Hello'
  },
  component: {
    header: {
      default: 'header section',
      logout: 'Logout'
    },
    footer: {
      default: 'footer section'
    },
    login: {
      email: 'Email',
      password: 'Password',
      remember_me: 'Remember Me',
      submit: 'Login',
      forgot_password: 'Forgot Password?',
      sign_fb: 'Sign in with Facebook',
      dont_have_account: 'Don′t have an account',
      sign_up: 'Sign Up'
    },
    main: {
      welcome: 'Welcome'
    }
  },
  module: {
    user: {
      invalid_email: 'This email is not registered.',
      invalid_password: 'Invalid password.',
      email_address_in_use: 'The specified email address is already in use',
      is_facebook_account: 'This a facebook account.',
      expired: 'Your session has expired'
    },
    payment: {
      add_card_success: 'Your card was added successfully',
      add_bank_success: 'Your bank account was added successfully',
      add_bank_fail: 'Fail adding your bank account'
    }
  }
}

export default dict
