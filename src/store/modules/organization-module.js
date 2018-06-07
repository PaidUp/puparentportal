import { organizationService, commerceService } from '@/services'
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
    },
    getOrganization (context, organizationId) {
      return organizationService.getOrganization(organizationId)
    },
    getInvoices (context, { organizationId }) {
      return commerceService.invoicesByOrganization(organizationId)
    }
  }
}

export default module
