import Trae from '@/services/trae-service'
import config from '@/config'
import gql from 'graphql-tag'
import graphqlClient from '@/util/graphql'

const trae = new Trae(config.api.user)

class UserService {
  login (params) {
    let p = {
      email: params.email,
      password: params.password,
      rememberMe: params.rememberMe
    }
    return trae
      .post('/login/email', p)
  }

  current () {
    return trae
      .get('/current')
  }

  logout () {
    return trae
      .delete('/logout').then(resp => {
        window.location.reload(true)
        return resp
      })
  }

  fbLogin (fbResponse) {
    return trae
      .post('/login/fb', fbResponse)
  }

  update (id, values) {
    return trae
      .put('/', { id, values })
  }

  recovery (email, token, password) {
    return trae
      .put('/recovery', { email, token, password })
  }

  getByEmail (email) {
    return trae
      .get('/email/' + email)
  }

  reset (email) {
    return trae
      .put('/reset', { email })
  }

  verifyResetToken (token) {
    return trae
      .get(`/reset/${token}`)
  }

  async getUsersByEmails (emails) {
    const response = await graphqlClient.query({
      query: gql`query getUsersByEmails($emails: [String]!) {
          getUsersByEmails(emails: $emails) {
            _id
            firstName
            lastName
            email
            phone,
            externalCustomerId
            roles,
            pendingSignup
          }
        }`,
      variables: { emails }
    })
    return response.data.getUsersByEmails
  }
}

export const userService = new UserService()
// export default userService
