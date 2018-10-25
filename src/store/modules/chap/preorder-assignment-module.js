import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const module = {
  namespaced: true,
  state: {
    response: {}
  },
  mutations: {
    setResponse (state, response) {
      state.response = response
    }
  },
  actions: {
    async uploadFile ({ commit }, file) {
      const response = await graphqlClient.mutate({
        variables: {
          file
        },
        mutation: gql`
          mutation($file: Upload!) {
            preOrderAssignment(file: $file) {
              filename
            }
          }
        `
      })
      commit('setResponse', response.data.File)
    }
  }
}

export default module
