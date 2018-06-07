<template>
  <div class="programs-page">
    <div class="details">
      <div class="pre-cards-title">Details</div>
      <div class="details-box">
        <pu-details-selects></pu-details-selects>
        <pu-details-totals></pu-details-totals>
      </div>
    </div>
    <div class="programs">
      <div class="pre-cards-title">Programs</div>
      <div class="cards-layout">

        <pu-score-card v-for="invoice in invoices" :key="invoice.id" :item="invoice"></pu-score-card>

      </div>
    </div>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import PuDetailsSelects from './score_board/PUDetailsSelects.vue'
  import PuDetailsTotals from './score_board/PUDetailsTotals.vue'
  import PuScoreCard from './score_board/PUScoreCArd.vue'
  export default {
    components: { PuDetailsSelects, PuDetailsTotals, PuScoreCard },
    data: function () {
      return {
        movie: 'godfather',
        invoices: []
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      })
    },
    methods: {
      ...mapActions('organizationModule', {
        getInvoices: 'getInvoices'
      }),
      reduce () {
        this.getInvoices({organizationId: this.user.organizationId}).then(invoices => {
          this.invoices = invoices.reduce((val, current) => {
            let prd = val[current.productId]
            if (prd) {
              prd.total = prd.total + current.priceBase
              prd.players[current.beneficiaryId] = {firstName: current.beneficiaryFirstName, lastName: current.beneficiaryLastName}
            } else {
              prd = {
                id: current.productId,
                name: current.productName,
                total: current.priceBase,
                players: {}
              }
              prd.players[current.beneficiaryId] = {firstName: current.beneficiaryFirstName, lastName: current.beneficiaryLastName}
              val[current.productId] = prd
            }
            return val
          }, {})
        })
      }
    },
    watch: {
      user () {
        this.reduce()
      }
    },
    mounted () {
      this.reduce()
    }
  }
</script>
