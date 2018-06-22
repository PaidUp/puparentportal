<template>
    <div class="programs">
      <div class="pre-cards-title">Programs</div>
      <div class="cards-layout">

        <pu-score-card @programSelected="selectProgram" v-for="item in itemsFiltered" :key="item.id" :item="item"></pu-score-card>

      </div>  
    </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import PuScoreCard from './PUScoreCard.vue'

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

  export default {
    components: { PuScoreCard },
    props: {
      seasonId: String,
      programId: String
    },
    data: function () {
      return {
        items: null
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      }),
      itemsFiltered () {
        if (this.programId) {
          let resp = {}
          resp[this.programId] = this.items[this.programId]
          return resp
        }
        return this.items
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getInvoices: 'getInvoices',
        getCredits: 'getCredits',
        getPreorders: 'getPreorders'
      }),
      getAll () {
        if (this.user && this.seasonId) {
          Promise.all([
            this.getInvoices({organizationId: this.user.organizationId, seasonId: this.seasonId}),
            this.getCredits({organizationId: this.user.organizationId, seasonId: this.seasonId}),
            this.getPreorders({organizationId: this.user.organizationId, seasonId: this.seasonId})
          ]).then(values => {
            let items = reduceInvoices(values[0])
            reduceCredits(values[1], items)
            reducePreorders(values[2], items)
            this.items = items
            this.$emit('setItems', items)
          })
        }
      },
      selectProgram (program) {
        this.$emit('programSelected', program)
      }
    },
    watch: {
      seasonId () {
        this.getAll()
      }
    }
  }
</script>

