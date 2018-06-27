const module = {
  namespaced: true,
  state: {
    invoiceMapper: {
      autopay: { desc: 'AUTOPAY', key: 'today', class: 'cgray' },
      paidup: { desc: 'PAIDUP', key: 'check_circle', class: '' },
      credited: { desc: 'CREDIT APPLIED', subtext: 'Club Credit', key: 'check_circle', class: '' },
      partially_refunded: { desc: 'PARTIALLY<BR/>REFUNDED', subtext: '', key: 'check_circle', class: 'cblue' },
      paid: { desc: 'PAID', key: 'check_circle', subtext: 'Paid Directly to Club', class: '' },
      failed: { desc: 'FAILED', key: 'check_circle', class: 'cred' },
      submitted: { desc: 'ACH SUBMITTED', key: 'check_circle', subtext: '', class: '' },
      discount: { desc: 'DISCOUNT', key: 'check_circle', subtext: 'Club Discount', class: 'cblue' }
    }
  },
  mutations: {
  }
}

export default module
