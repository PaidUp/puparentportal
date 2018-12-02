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
      submit: 'LOGIN',
      forgot_password: 'Forgot Password?',
      sign_fb: 'Sign in with Facebook',
      login_fb: 'LOGIN WITH FACEBOOK',
      dont_have_account: 'Don′t have an account?',
      sign_up: 'Sign Up'
    },
    signup: {
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      password: 'Password',
      confirm_password: 'Confirm Password',
      phone: 'Phone Number',
      create: 'CREATE ACCOUNT',
      login: 'Login',
      already_have_account: 'Already have an account?',
      terms: {
        agree: 'I agree with PaidUp′s',
        ts: 'Terms of Service',
        pp: 'Privacy Policy',
        and: 'and',
        stripe: 'Stripe′s Connected Account Agreement'
      }
    },
    main: {
      welcome: 'Welcome'
    },
    payment: {
      done: 'Thank you for your payment',
      update: 'Your invoice was updated successfully'
    },
    left_side_bar: {
      del_card_success: 'Your card was deleted successfully',
      del_bank_success: 'Your bank account was deleted successfully',
      verify_bank_success: 'Your bank account was verified successfully',
      del_card_fail: 'Cannot delete card, Change all unpaid invoices to a new payment method and try again',
      del_bank_fail: 'Cannot delete bank account, Change all unpaid invoices to a new payment method and try again'
    },
    new_player: {
      done: 'Player added successfully.'
    }
  },
  module: {
    user: {
      invalid_email: 'Please enter valid login credentials.',
      invalid_password: 'Please enter valid login credentials.',
      email_address_in_use: 'The specified email address is already in use',
      is_facebook_account: 'This a facebook account.',
      expired: 'Your session has expired'
    },
    payment: {
      add_card_success: 'Your card was added successfully',
      add_bank_success: 'Your bank account was added successfully',
      add_bank_fail: 'Fail adding your bank account'
    }
  },
  validations: {
    agree: 'Please agree to the Terms of Service and Privacy Policy.',
    form: 'Please enter valid login credentials.',
    phone: 'Phone number is required.',
    email: 'Must be a valid email',
    required: '{field} is required',
    numeric: '{field} is numeric',
    min_length: '{field} must have at least {value} letters.',
    min_length_num: '{field} must have at least {value} digits.',
    identical: '{field} must be identical.'
  }
}

export default dict
