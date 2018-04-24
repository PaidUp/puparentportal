import { organizationService } from '@/services'
const module = {
  namespaced: true,
  state: {
    organizations: []
  },
  mutations: {
    setOrganizations (state, organizations) {
      state.organizations = organizations
    }
  },
  actions: {
    getOrganizations (context) {
      organizationService.getAll().then(organizations => {
        context.commit('setOrganizations', organizations)
      })
    }
  }
}

export default module
