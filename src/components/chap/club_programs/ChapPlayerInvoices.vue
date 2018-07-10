<template>
  <div class="program-player-invoices">
      <md-tabs class="tabs-lblue" v-if="items">
        <md-tab id="tab-invoices" md-label="Invoices">



          <div class="table-actions-box">
            <md-button class="lblue md-accent md-raised md-dense">Add row</md-button>
            <md-button class="lblue md-accent md-raised md-dense" @click="showRefundDialog = true">REFUND DIALOG</md-button>
          </div>
          <div class="table-wrapper">
            <div class="table-scroll">
              <table class="gridtable">
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Charge Date</th>
                  <th>Max Charge Date</th>
                  <th>Parent</th>
                  <th>Payment Account</th>
                  <th>Status</th>
                  <th>Invoice Number</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
                <pi-row v-for="item in items" :key="item.id" :item="item"></pi-row>
              </table>
            </div>
          </div>

          <div class="table-actions-box">
            <md-button class="lblue md-accent">Cancel</md-button>
            <md-button class="lblue md-accent md-raised">Save</md-button>
          </div>

        </md-tab>
        


        <md-tab id="tab-assigned-parents" md-label="PAID/UNPAID PARENTS">
          <div class="table-actions-box">
            <md-button class="lblue md-accent md-raised md-dense">Add row</md-button>
            <md-button class="lblue md-accent md-raised md-dense" to="/chapassignplanparent">GO TO PARENTS STEPPERS</md-button>
          </div>
          <md-table md-card v-model="tableData" md-sort="name" md-sort-order="asc" class="custom-table">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Player Name" md-sort-by="playerName" class="col-with-img">
                <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
                <md-avatar class="md-small" v-if="item.id !==1">
                  <img src="@/assets/avatar.jpg" alt="img">
                </md-avatar>
                <div>
                  {{ item.playerName }}
                </div>
              </md-table-cell>
              <md-table-cell md-label="Parent Name" md-sort-by="parentName" class="col-with-img">
                <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
                <md-avatar class="md-small" v-if="item.id !==1">
                  <img src="@/assets/avatar.jpg" alt="img">
                </md-avatar>
                <div>
                  {{ item.parentName }}
                </div>
              </md-table-cell>
              <md-table-cell md-label="Parent Email" md-sort-by="email">{{ item.email }}</md-table-cell>
              <md-table-cell md-label="Parent Phone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
              <md-table-cell md-label="Actions">
                <div class="">
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>delete</md-icon>
                  </md-button>
                </div>
              </md-table-cell>
            </md-table-row>
          </md-table>

          <div class="table-actions-box">
            <md-button class="lblue md-accent">Cancel</md-button>
            <md-button class="lblue md-accent md-raised">Save</md-button>
          </div>

        </md-tab>



      </md-tabs>

    </div>
</template>
<script>
import PiRow from './ChapPlayerInvoices/PiRow'
import currency from '@/helpers/currency'
import { mapActions, mapState } from 'vuex'
export default {
  components: { PiRow },
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
  computed: {
    ...mapState('playerInvoicesModule', {
      parents: 'parents'
    })
  },
  mounted () {
    this.getReducePlayerInvoices().then(items => {
      this.items = items
    })
  },
  watch: {
    parents () {
      this.loadPaymentMethods()
    }
  },
  methods: {
    ...mapActions('clubprogramsModule', {
      getReducePlayerInvoices: 'getReducePlayerInvoices'
    }),
    ...mapActions('playerInvoicesModule', {
      loadPaymentMethods: 'loadPaymentMethods'
    }),
    currency (value) {
      return currency(value)
    }
  }
}
</script>
<style>
.table-wrapper {
  position:relative;
}
.table-scroll {
  overflow-x: scroll; 
  margin-top:20px;
}
.table-wrapper table {
  width:100%;
    
}
table.gridtable {
  overflow: scroll;    
	font-family: verdana,arial,sans-serif;
	font-size:11px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
	border-collapse: collapse;
}
table.gridtable th {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #dedede;
}
table.gridtable td {
  white-space:nowrap;
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
}
</style>


