<template>
  <div class="program-player-invoices">
      <md-tabs class="tabs-lblue" v-if="items">
        <md-tab id="tab-invoices" md-label="Invoices">
          <div class="cards-layout" >
            <pu-player-invoice-card :item="item" v-for="item in items" :key="item.id"></pu-player-invoice-card>
          </div>
        </md-tab>
        <md-tab id="tab-invoices-approval" md-label="Invoices requiring approval">
          <md-table md-card v-model="tableData" md-sort="name" md-sort-order="asc" class="custom-table">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Description">
                Dues Installment {{item.id}}
              </md-table-cell>
              <md-table-cell md-label="Amount" md-numeric>
                $300
              </md-table-cell>
              <md-table-cell md-label="Charge Date">
                05-01-2018
              </md-table-cell>
              <md-table-cell md-label="Max Charge Date">
                -
              </md-table-cell>
              <md-table-cell md-label="Status">
                PAID
              </md-table-cell>
              <md-table-cell md-label="Parent" md-sort-by="parentName" class="col-with-img">
                <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
                <md-avatar class="md-small" v-if="item.id !==1">
                  <img src="@/assets/avatar.jpg" alt="img">
                </md-avatar>
                <div>
                  {{ item.parentName }}
                </div>
              </md-table-cell>
              <md-table-cell md-label="Tags">
                <div class="col-chips">
                  <md-chip class="lblue">Travel</md-chip>
                </div>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
        <md-tab id="tab-parents" md-label="Parents">
          <div class="cards-layout">
            <md-card class="card-person">
              <md-avatar class="md-large">
                <img src="@/assets/avatar.jpg" alt="avatar">
              </md-avatar>
              <div class="name">Felipe Fernandez</div>
              <div class="title-info">Isotopes Club</div>
              <div class="title-info">(512) 234-1233</div>
            </md-card>
            <md-card class="card-person">
              <md-icon class="md-size-3x">account_circle</md-icon>
              <div class="name">Felipe Fernandez</div>
              <div class="title-info">Red Bull Team</div>
              <div class="title-info">(512) 234-1233</div>
            </md-card>
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

