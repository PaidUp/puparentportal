const module = {
  namespaced: true,
  state: {
    invoiceMapper: {
      autopay: { desc: 'AUTOPAY', key: 'today', class: 'cgray' },
      paidup: { desc: 'PAIDUP', key: 'check_circle', class: 'cgreen' },
      credited: { desc: 'CREDIT APPLIED', subtext: 'Club Credit', key: 'check_circle', class: 'cgreen' },
      refunded: { desc: 'REFUNDED', subtext: '', key: 'check_circle', class: 'cblue' },
      paid: { desc: 'PAID TO CLUB', key: 'check_circle', subtext: 'Paid Directly to Club', class: 'cgreen' },
      failed: { desc: 'FAILED', key: 'check_circle', class: 'cred' },
      submitted: { desc: 'ACH SUBMITTED', key: 'check_circle', subtext: '', class: 'cgreen' },
      discount: { desc: 'DISCOUNT', key: 'check_circle', subtext: 'Club Discount', class: 'cblue' },
      due: { desc: 'DUE', key: 'today', subtext: 'New Invoice', class: 'cyellow' },
      overdue: { desc: 'OVERDUE', key: 'note_add', subtext: 'New Invoice', class: 'cred' }
    }
  },
  mutations: {
  }
}

export default module
