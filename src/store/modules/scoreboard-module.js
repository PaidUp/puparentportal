import { organizationService, commerceService, productService } from '@/services'

let beneficiaries

function reduceInvoices (invoices) {
  return invoices.reduce((val, current) => {
    let prd = val[current.productId]
    if (prd) {
      prd.total = prd.total + current.price
      prd.players.add(current.beneficiaryId)
    } else {
      prd = {
        id: current.productId,
        name: current.productName,
        total: current.price,
        paid: 0,
        unpaid: 0,
        overdue: 0,
        other: 0,
        players: new Set(),
        inelegible: new Set()
      }
      prd.players.add(current.beneficiaryId)
      val[current.productId] = prd
    }
    if (current.status === 'paidup' || current.status === 'submitted') {
      prd.paid = prd.paid + current.price
    } else if (current.status === 'autopay') {
      prd.unpaid = prd.unpaid + current.price
    } else if (current.status === 'failed') {
      prd.inelegible.add(current.beneficiaryId)
      prd.overdue = prd.overdue + current.price
    } else if (current.status === 'void' || current.status === 'disabled') {
      prd.other = prd.other + current.price
    }
    return val
  }, {})
}

function reduceInvoicePlayers (invoices) {
  return invoices.reduce((val, current) => {
    let prd = val[current.beneficiaryId]
    if (prd) {
      prd.total = prd.total + current.price
    } else {
      const beneficiary = beneficiaries[current.beneficiaryId]
      prd = {
        id: current.beneficiaryId,
        firstName: beneficiary ? beneficiary.firstName : '',
        lastName: beneficiary ? beneficiary.lastName : '',
        total: current.price,
        paid: 0,
        unpaid: 0,
        overdue: 0,
        other: 0
      }
      val[current.beneficiaryId] = prd
    }
    if (current.status === 'paidup' || current.status === 'submitted') {
      prd.paid = prd.paid + current.price
    } else if (current.status === 'autopay') {
      prd.unpaid = prd.unpaid + current.price
    } else if (current.status === 'failed') {
      prd.overdue = prd.overdue + current.price
    } else if (current.status === 'void' || current.status === 'disabled') {
      prd.other = prd.other + current.price
    }
    return val
  }, {})
}

function reduceCredits (credits, items) {
  return credits.reduce((val, current) => {
    let prd = val[current.productId]
    if (prd) {
      prd.total = prd.total + current.price
      prd.players.add(current.beneficiaryId)
    } else {
      prd = {
        id: current.productId,
        name: current.productName,
        total: current.price,
        paid: 0,
        unpaid: 0,
        overdue: 0,
        other: 0,
        players: new Set(),
        inelegible: new Set()
      }
      prd.players.add(current.beneficiaryId)
      val[current.productId] = prd
    }
    if (current.status === 'paid' || current.status === 'credited') {
      prd.paid = prd.paid + current.price
    } else if (current.status === 'discount' || current.status === 'refunded') {
      prd.other = prd.other + current.price
    }
    return val
  }, items)
}

function reduceCreditPlayers (credits, items) {
  return credits.reduce((val, current) => {
    let prd = val[current.beneficiaryId]
    const beneficiary = beneficiaries[current.beneficiaryId]
    if (prd) {
      prd.total = prd.total + current.price
    } else {
      prd = {
        id: current.beneficiaryId,
        firstName: beneficiary ? beneficiary.firstName : '',
        lastName: beneficiary ? beneficiary.lastName : '',
        total: current.price,
        paid: 0,
        unpaid: 0,
        overdue: 0,
        other: 0
      }
      val[current.beneficiaryId] = prd
    }
    if (current.status === 'paid' || current.status === 'credited') {
      prd.paid = prd.paid + current.price
    } else if (current.status === 'discount' || current.status === 'refunded') {
      prd.other = prd.other + current.price
    }
    return val
  }, items)
}

function reducePreorders (preorders, items) {
  const today = new Date().getTime()
  return preorders.reduce((val, current) => {
    let prd = val[current.productId]
    if (current.planId && current.dues) {
      current.dues.forEach(due => {
        if (prd) {
          prd.total = prd.total + due.amount
          prd.players.add(current.beneficiaryId)
        } else {
          prd = {
            id: current.productId,
            name: current.productName,
            total: due.amount,
            paid: 0,
            unpaid: 0,
            overdue: 0,
            other: 0,
            players: new Set(),
            inelegible: new Set()
          }
          prd.players.add(current.beneficiaryId)
          val[current.productId] = prd
        }
        let dateCharge = new Date(due.dateCharge).getTime()
        if (today < dateCharge) {
          prd.unpaid = prd.unpaid + due.amount
        } else {
          prd.inelegible.add(current.beneficiaryId)
          prd.overdue = prd.overdue + due.amount
        }
      })
    }
    return val
  }, items)
}

function reducePreorderPlayers (preorders, items) {
  const today = new Date().getTime()
  return preorders.reduce((val, current) => {
    let prd = val[current.beneficiaryId]
    const beneficiary = beneficiaries[current.beneficiaryId]
    if (current.planId && current.dues) {
      current.dues.forEach(due => {
        if (prd) {
          prd.total = prd.total + due.amount
        } else {
          prd = {
            id: current.beneficiaryId,
            firstName: beneficiary ? beneficiary.firstName : '',
            lastName: beneficiary ? beneficiary.lastName : '',
            total: due.amount,
            paid: 0,
            unpaid: 0,
            overdue: 0,
            other: 0
          }
          val[current.beneficiaryId] = prd
        }
        let dateCharge = new Date(due.dateCharge).getTime()
        if (today < dateCharge) {
          prd.unpaid = prd.unpaid + due.amount
        } else {
          prd.overdue = prd.overdue + due.amount
        }
      })
    }
    return val
  }, items)
}

const module = {
  namespaced: true,
  state: {
    playerSelected: null,
    programSelected: null,
    seasonSelected: null,
    organization: null
  },
  mutations: {
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
    }
  },
  actions: {
    getReducePrograms (context) {
      let organizationId = context.state.organization._id
      let seasonId = context.state.seasonSelected
      return Promise.all([
        commerceService.invoicesByOrganization(organizationId, seasonId),
        commerceService.creditsByOrganization(organizationId, seasonId),
        commerceService.preordersByOrganization(organizationId, seasonId)
      ]).then(values => {
        let items = reduceInvoices(values[0])
        reduceCredits(values[1], items)
        reducePreorders(values[2], items)
        return items
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
        beneficiaries = values[0].reduce((val, curr) => {
          val[curr._id] = curr
          return val
        }, {})
        let items = reduceInvoicePlayers(values[1])
        reduceCreditPlayers(values[2], items)
        reducePreorderPlayers(values[3], items)
        return items
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
