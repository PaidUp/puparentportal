<template>
  <div>
      <md-tabs class="tabs-lblue" v-if="items">
        <md-tab id="tab-invoices" md-label="Invoices">
          <div class="players-page">
            <div class="player-with-payments">
              <div class="invoices">
                <div class="cards-layout">
                  <div v-for="item in items" :key="item.id">
                    <chap-invoice-card v-if="item.type ==='invoice'" @deleted="reloadItems" @select="setItem" :item="item"></chap-invoice-card>
                    <chap-credit-card v-if="item.type ==='credit'" @deleted="reloadItems" :item="item" @select="setCreditItem"></chap-credit-card>
                    <chap-preorder-card v-if="item.type ==='preorder'" :key="item.id" :item="item"></chap-preorder-card>
                  </div>
                  <div class="md-card-add-circle">
                    <md-button @click="showNewInvoiceDialog = true" class="md-fab lblue">
                      <md-icon>add</md-icon>
                    </md-button>
                  </div>
                </div>
              </div>

            </div>

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
      <chap-invoice-dialog :invoice="item" :isClone="isClone" @updated="reloadItems" @changeStatus="changeInvoceDialogStatus"></chap-invoice-dialog>
      <chap-credit-dialog :invoice="creditItem" :isClone="isCreditClone" @updated="reloadItems" @changeStatus="changeCreditDialogStatus"></chap-credit-dialog>
      <chap-new-invoice-dialog :show="showNewInvoiceDialog" @created="reloadItems" @changeStatus="changeNewInvoceDialogStatus"></chap-new-invoice-dialog>
    </div>
</template>
<script>
import currency from '@/helpers/currency'
import ChapInvoiceCard from './ChapPlayerInvoices/ChapInvoiceCard.vue'
import ChapCreditCard from './ChapPlayerInvoices/ChapCreditCard.vue'
import ChapPreorderCard from './ChapPlayerInvoices/ChapPreorderCard.vue'
import ChapInvoiceDialog from './ChapPlayerInvoices/ChapInvoiceDialog.vue'
import ChapCreditDialog from './ChapPlayerInvoices/ChapCreditDialog.vue'
import ChapNewInvoiceDialog from './ChapPlayerInvoices/ChapNewInvoiceDialog.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { ChapInvoiceCard, ChapCreditCard, ChapPreorderCard, ChapInvoiceDialog, ChapNewInvoiceDialog, ChapCreditDialog },
  data () {
    return {
      items: null,
      item: null,
      creditItem: null,
      isClone: false,
      isCreditClone: false,
      showNewInvoiceDialog: false,
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
    this.reloadItems()
  },
  watch: {
    parents () {
      this.loadPaymentMethods()
    }
  },
  methods: {
    ...mapActions('clubprogramsModule', {
      getReducePlayerInvoices: 'getReducePlayerInvoices',
      getReducePrograms: 'getReducePrograms'
    }),
    ...mapActions('playerInvoicesModule', {
      loadPaymentMethods: 'loadPaymentMethods'
    }),
    changeInvoceDialogStatus (status) {
      if (!status) {
        this.item = null
      }
    },
    changeCreditDialogStatus (status) {
      if (!status) {
        this.creditItem = null
      }
    },
    changeNewInvoceDialogStatus (status) {
      this.showNewInvoiceDialog = status
    },
    reloadItems () {
      this.getReducePlayerInvoices().then(items => {
        this.items = items
      })
      this.getReducePrograms()
    },
    currency (value) {
      return currency(value)
    },
    setItem (value) {
      this.isClone = value.isClone
      this.item = value.item
    },
    setCreditItem (value) {
      this.isCreditClone = value.isClone
      this.creditItem = value.item
    }
  }
}
</script>


