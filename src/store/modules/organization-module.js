import { organizationService, commerceService } from '@/services'
const module = {
  namespaced: true,
  state: {
    organization: null,
    organizations: [],
    plans: {}
  },
  mutations: {
    setOrganizations (state, organizations) {
      state.organizations = organizations
    },
    setOrganization (state, organization) {
      state.organization = organization
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
    loadOrganization (context, organizationId) {
      organizationService.getOrganization(organizationId)
      .then(organization => {
        context.commit('setOrganization', organization)
      })
    },
    getInvoices (context, { organizationId }) {
      return commerceService.invoicesByOrganization(organizationId)
    },
    getCredits (context, { organizationId }) {
      return commerceService.creditsByOrganization(organizationId)
    },
    getPreorders (context, { organizationId }) {
      return commerceService.preordersByOrganization(organizationId)
    }
  }
}

export default module
