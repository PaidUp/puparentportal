import { organizationService, commerceService, productService, reduceDataCardService } from '@/services'

const module = {
  namespaced: true,
  state: {
    items: null,
    programs: null,
    playerSelected: null,
    programSelected: null,
    seasonSelected: null,
    organization: null,
    beneficiaries: null
  },
  getters: {
    seasonSelectedName (state) {
      let name = ''
      if (state.organization && state.seasonSelected) {
        state.organization.seasons.forEach(season => {
          if (season._id === state.seasonSelected) name = season.name
        })
      }
      return name
    },
    programSelectedName (state) {
      let name = ''
      if (state.programSelected) {
        state.programs.forEach(program => {
          if (program.id === state.programSelected) {
            name = program.name
          }
        })
      }
      return name
    },
    playerSelectedName (state) {
      let name = ''
      if (state.playerSelected && state.beneficiaries) {
        name = `${state.beneficiaries[state.playerSelected].firstName} ${state.beneficiaries[state.playerSelected].lastName}`
      }
      return name
    }
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    },
    setPrograms (state, programs) {
      state.programs = programs
    },
    setPlayerSelected (state, player) {
      state.playerSelected = player
    },
    setProgramSelected (state, program) {
      state.programSelected = program
    },
    setSeasonSelected (state, season) {
      state.seasonSelected = season
    },
    setOrganization (state, organization) {
      state.organization = organization
    },
    setBeneficiaries (state, beneficiaries) {
      state.beneficiaries = beneficiaries
    },
    reset (state) {
      state.playerSelected = null
      state.programSelected = null
      state.seasonSelected = null
      state.organization = null
    }
  },
  actions: {
    getReducePrograms (context) {
      let organizationId = context.state.organization._id
      let seasonId = context.state.seasonSelected
      let productId = context.state.programSelected
      let beneficiaryId = context.state.playerSelected
      return Promise.all([
        commerceService.invoicesByOrganization(organizationId, seasonId, productId, beneficiaryId),
        commerceService.creditsByOrganization(organizationId, seasonId, productId, beneficiaryId),
        commerceService.preordersByOrganization(organizationId, seasonId, productId, beneficiaryId)
      ]).then(values => {
        let items = reduceDataCardService.reduceInvoices(values[0])
        reduceDataCardService.reduceCredits(values[1], items)
        reduceDataCardService.reducePreorders(values[2], items)
        context.commit('setItems', items)
        if (!productId && !beneficiaryId) {
          let programs = []
          for (let key in items) {
            programs.push(items[key])
          }
          context.commit('setPrograms', programs)
        }
      })
    },
    getReducePlayers (context) {
      let organizationId = context.state.organization._id
      let seasonId = context.state.seasonSelected
      let productId = context.state.programSelected
      return Promise.all([
        organizationService.getBeneficiaries(organizationId),
        commerceService.invoicesByOrganization(organizationId, seasonId, productId),
        commerceService.creditsByOrganization(organizationId, seasonId, productId),
        commerceService.preordersByOrganization(organizationId, seasonId, productId)
      ]).then(values => {
        let beneficiaries = values[0].reduce((val, curr) => {
          val[curr._id] = curr
          return val
        }, {})
        context.commit('setBeneficiaries', beneficiaries)
        let items = reduceDataCardService.reduceInvoicePlayers(values[1], beneficiaries)
        reduceDataCardService.reduceCreditPlayers(values[2], items, beneficiaries)
        reduceDataCardService.reducePreorderPlayers(values[3], items, beneficiaries)
        return items
      })
    },
    getReducePlayerInvoices (context) {
      let organizationId = context.state.organization._id
      let seasonId = context.state.seasonSelected
      let productId = context.state.programSelected
      let beneficiaryId = context.state.playerSelected
      return Promise.all([
        commerceService.invoicesByOrganization(organizationId, seasonId, productId, beneficiaryId),
        commerceService.creditsByOrganization(organizationId, seasonId, productId, beneficiaryId),
        commerceService.preordersByOrganization(organizationId, seasonId, productId, beneficiaryId)
      ]).then(values => {
        let resp = []
        values[0].forEach(val => {
          resp.push({
            id: val._id,
            title: val.label,
            seq: val.invoiceId,
            date: new Date(val.dateCharge),
            price: val.price,
            status: val.status
          })
        })
        values[1].forEach(val => {
          resp.push({
            id: val._id,
            title: val.label,
            seq: val.memoId,
            date: new Date(val.createOn),
            price: val.price,
            status: val.status
          })
        })
        let today = new Date().getTime()
        values[2].forEach(val => {
          if (!val.dues) return
          val.dues.forEach(due => {
            let dateCharge = new Date(due.dateCharge)
            let status = 'due'
            if (today > dateCharge.getTime()) {
              status = 'overdue'
            }
            resp.push({
              id: due._id,
              title: due.description,
              seq: '',
              date: dateCharge,
              price: due.amount,
              status: status
            })
          })
        })
        return resp
      })
    },
    getPlans (context, productId) {
      return productService.getPlans(productId).then(values => {
        return values.reduce((val, curr) => {
          let amount = 0
          if (curr.dues) { curr.dues.forEach(due => { amount = amount + due.amount }) }
          if (curr.credits) { curr.dues.forEach(crd => { amount = amount + crd.amount }) }
          val.push({
            id: curr._id,
            description: curr.description,
            amount,
            installments: curr.dues.length
          })
          return val
        }, [])
      })
    }
  }
}

export default module
