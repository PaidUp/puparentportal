let reduceCardService

class ReduceCardService {
  reduceInvoices (invoices) {
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

  reduceInvoicePlayers (invoices, beneficiaries) {
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

  reduceCredits (credits, items) {
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

  reduceCreditPlayers (credits, items, beneficiaries) {
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

  reducePreorders (preorders, items) {
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

  reducePreorderPlayers (preorders, items, beneficiaries) {
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
}

reduceCardService = new ReduceCardService()
export default reduceCardService
