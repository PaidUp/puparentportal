import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const module = {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    uploadFile ({ commit }, { file, subject, comment }) {
      return graphqlClient.mutate({
        variables: { file, subject, comment },
        mutation: gql`
          mutation preOrderAssignment ($file: Upload!, $subject: String!, $comment: String!) {
            preOrderAssignment(file: $file, subject: $subject, comment: $comment) {
              filename
            }
          }
        `
      })
    }
  }
}

export default module
