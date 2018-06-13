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
    getInvoices (context, { organizationId, seasonId }) {
      return commerceService.invoicesByOrganization(organizationId, seasonId)
    },
    getCredits (context, { organizationId, seasonId }) {
      return commerceService.creditsByOrganization(organizationId, seasonId)
    },
    getPreorders (context, { organizationId, seasonId }) {
      return commerceService.preordersByOrganization(organizationId, seasonId)
    }
  }
}

export default module
