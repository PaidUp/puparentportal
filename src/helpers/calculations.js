import mathjs from 'mathjs'

function round (num) {
  return mathjs.round(num, 2)
}

function card (product, due) {
  const cardFee = product.processingFees.cardFee / 100
  const cardFeeFlat = product.processingFees.cardFeeFlat
  const paidUpFee = product.collectionFees.fee / 100
  const paidUpFeeFlat = product.collectionFees.feeFlat
  const basePrice = due.amount

  let result = {
    paidupFee: 0,
    processingFee: 0,
    price: 0,
    totalFee: 0
  }

  result.price = round(cardFeeFlat + (basePrice / (1 - cardFee)))
  result.paidupFee = round(basePrice * paidUpFee + paidUpFeeFlat)
  result.processingFee = round(result.price * cardFee + cardFeeFlat)
  result.totalFee = round(result.paidupFee + result.processingFee)
  return result
}

function bank (product, due) {
  // const achFeeCap = product.processingFees.achFeeCap
  const achFee = (product.processingFees.achFee / 100)
  const achFeeFlat = product.processingFees.achFeeFlat
  const paidUpFee = product.collectionFees.fee / 100
  const paidUpFeeFlat = product.collectionFees.feeFlat
  const basePrice = due.amount

  let result = {
    paidupFee: 0,
    processingFee: 0,
    price: 0,
    totalFee: 0
  }

  result.price = round(basePrice)
  result.processingFee = round(result.price * achFee + achFeeFlat)
  result.paidupFee = round(((basePrice * paidUpFee) + paidUpFeeFlat) - result.processingFee)
  result.totalFee = round(result.paidupFee + result.processingFee)

  return result
}

export default class Calculations {
  static exec (product, due) {
    let result
    if (due.account.object === 'card') {
      result = card(product, due)
    } else if (due.account.object === 'bank_account') {
      result = bank(product, due)
    }
    return result
  }
}
