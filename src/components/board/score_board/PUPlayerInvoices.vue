<template>
  <div class="program-player-invoices">
      <md-tabs class="tabs-lblue" v-if="items">
        <md-tab id="tab-invoices" md-label="Invoices">
          <div class="cards-layout" >
            <pu-player-invoice-card :item="item" v-for="item in items" :key="item.id"></pu-player-invoice-card>
          </div>
        </md-tab>
      </md-tabs>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import PuPlayerInvoiceCard from './PUPlayerInvoiceCard'
export default {
  components: { PuPlayerInvoiceCard },
  data () {
    return {
      items: null,
      tableData: [ {
        id: 1,
        name: 'Shawna Dubbin',
        email: 'sdubbin0@geocities.com',
        phone: '888-999-8888',
        playerName: 'Eliana Fernandez',
        parentName: 'Fernando Lopex'
      },
      {
        id: 2,
        name: 'Odette Demageard',
        email: 'odemageard1@spotify.com',
        phone: '888-999-1111',
        playerName: 'Rockefel Eslo',
        parentName: 'Simano Cigar'
      }
      ]
    }
  },
  mounted () {
    this.getReducePlayerInvoices().then(items => {
      this.items = items
    })
  },
  methods: {
    ...mapActions('scoreboardModule', {
      getReducePlayerInvoices: 'getReducePlayerInvoices'
    })
  }
}
</script>

