import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const module = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    uploadFile ({ commit }, { file }) {
      return graphqlClient.mutate({
        variables: { file },
        mutation: gql`
          mutation importCredits ($file: Upload!) {
            importCredits(file: $file) {
              filename
            }
          }
        `
      })
    }
  }
}

export default module
