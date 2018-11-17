import graphqlClient from '@/util/graphql'
import gql from 'graphql-tag'

const module = {
  namespaced: true,
  state: {
    files: [],
    rows: []
  },
  mutations: {
    setFiles (state, files) {
      state.files = files
    },
    setRows (state, rows) {
      state.rows = rows
    }
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
    },
    async fetchFiles ({ commit }, email) {
      const response = await graphqlClient.query({
        query: gql`query preorderAssignmentFiles($email: String!) {
          preorderAssignmentFiles(email: $email) {
            _id
            rows
            rowsFailed
            keyFile
            fileName
            user
            onUpload
          }
        }`,
        variables: { email }
      })
      commit('setFiles', response.data.preorderAssignmentFiles)
    },
    async fetchFileRows ({ commit }, keyFile) {
      const response = await graphqlClient.query({
        query: gql`query preorderAssignmentRows($keyFile: String!) {
          preorderAssignmentRows(keyFile: $keyFile) {
            _id
            row
            status
            organizationName
            beneficiaryFirstName
            beneficiaryLastName
            parentFirstName
            parentLastName
            parentEmail
            userStatus
            beneficiaryStatus
            preorderStatus
            zdCreateUserStatus
            zdTicketsCreateStatus
            createOn
          }
        }`,
        variables: { keyFile }
      })
      commit('setRows', response.data.preorderAssignmentRows)
    }
  }
}

export default module
