<template>
  <div class="program-player-invoices">
      <md-tabs class="tabs-lblue" v-if="items">
        <md-tab id="tab-invoices" md-label="Invoices">



          <div class="table-actions-box">
            <md-button class="lblue md-accent md-raised md-dense">Add row</md-button>
            <md-button class="lblue md-accent md-raised md-dense" @click="showRefundDialog = true">REFUND DIALOG</md-button>
          </div>
          <md-table md-card v-model="items" md-sort="date" md-sort-order="asc" class="custom-table">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Description">
                <div class="col-150">
                  <input type="text" class="custom-input" :value="item.title">
                </div>
              </md-table-cell>
              <md-table-cell md-label="Amount" md-numeric>
                ${{currency(item.price)}}
              </md-table-cell>
              <md-table-cell md-label="Charge Date" class="centered">
                {{ $d(item.date, 'short') }}
              </md-table-cell>
              <md-table-cell md-label="Max Charge Date" class="centered">
                <md-datepicker v-model="item.maxDate">
                </md-datepicker>
              </md-table-cell>
              <md-table-cell md-label="Payment Account" class="centered">
                <div class="">
                  {{ item.type === 'invoice' ? `${item.paymentDetails.brand}••••${item.paymentDetails.last4}` : ' - ' }}
                </div>
              </md-table-cell>
              <md-table-cell md-label="Parent" class="centered">
                <div class="col-150">
                  <select v-if="item.user" name="parent-s" class="custom-select" v-model="item.user.userEmail">
                    <option value="volvo">Felipe Fernandex</option>
                    <option value="saab">Savier Commns</option>
                    <option value="ricardo@getpaidup.com">Rdo Lara</option>
                    <option value="audi">Samuel Jaxson Super long input name</option>
                  </select>
                </div>
              </md-table-cell>
              <md-table-cell md-label="Status">
                {{ item.status }}
              </md-table-cell>
              <md-table-cell md-label="Invoice Number">
                {{ item.seq }}
              </md-table-cell>
              <md-table-cell md-label="Tags">
                <div class="col-chips">
                  <md-chip class="lblue" md-deletable>Dues</md-chip>
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>add_circle_outline</md-icon>
                  </md-button>
                </div>
              </md-table-cell>
              <md-table-cell md-label="Actions">
                <div class="col-actions">
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>refresh</md-icon>
                  </md-button>
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>file_copy</md-icon>
                  </md-button>
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
import currency from '@/helpers/currency'
import { mapActions } from 'vuex'
export default {
  components: { },
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
    ...mapActions('clubprogramsModule', {
      getReducePlayerInvoices: 'getReducePlayerInvoices'
    }),
    currency (value) {
      return currency(value)
    }
  }
}
</script>

