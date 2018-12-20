<template>
  <div class="reports-page">
    <div class="top-bar">
      <div class="title">
        Deposits <br/>
        <br/>
      </div>
      <!-- <div>
        <md-button v-if="false" class="md-button md-accent lblue">
          <md-icon>print</md-icon> Print
        </md-button>
        

        <download-excel :data= "paymentsFiltered" :fields="reportFields" type= "csv" name= "payments.csv">
          <md-button class="md-button md-accent lblue">
            <md-icon>get_app</md-icon> Export
          </md-button>
        </download-excel>
      </div> -->
    </div>

    <!-- FILTERS CHIPS AND TRIGGER FILTER BAR -->
    <!-- <div class="filter-chips">
      <md-chip class="blue with-icon" @click="showFiltersPanel = true">Add Filter
        <md-button class="md-icon-button md-input-action">
          <md-icon>add</md-icon>
        </md-button>
      </md-chip>
      <md-chip v-if="seasonSelectedObj" class="lblue">Season: {{seasonSelectedObj.name}}</md-chip>
      <md-chip v-if="invoiceDateStart" class="lblue" md-deletable @md-delete="invoiceDateStart = null">Receipt date start: {{$d(invoiceDateStart, 'short')}}</md-chip>
      <md-chip v-if="invoiceDateEnd" class="lblue" md-deletable @md-delete="invoiceDateEnd = null">Receipt date end: {{$d(invoiceDateEnd, 'short')}}</md-chip>
      <md-chip v-if="chargeDateStart" class="lblue" md-deletable @md-delete="chargeDateStart = null">Charge date start: {{$d(chargeDateStart, 'short')}}</md-chip>
      <md-chip v-if="chargeDateEnd" class="lblue" md-deletable @md-delete="chargeDateEnd = null">Charge date end: {{$d(chargeDateEnd, 'short')}}</md-chip>
      <md-chip class="lblue" @md-delete="removeProgram(chip)" v-for="chip in programFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeStatus(chip)" v-for="chip in statusFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeTag(chip)" v-for="chip in tagsFilter" :key="chip" md-deletable>{{ chip }}</md-chip>

    </div> -->

    <!-- TABLE -->
    <div class="table-container">
    <md-table v-model="payouts" class="md-table custom-table" >
      <!--- md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title"></h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search..." v-model="search" />
        </md-field>
      </md-table-toolbar -->

      <md-table-row @click="goTransfers(item)" slot="md-table-row" slot-scope="{ item }" class="pointer" :class="{totals: (item.status === 'failed'), 'red-row': item.id === 3}">
        <md-table-cell md-label="Amount" class="col-15">
          ${{currency(item.amount)}}
        </md-table-cell>
        <md-table-cell  md-label="Status" class="col-15">
          {{capitalize(item.status)}}
        </md-table-cell>
        <md-table-cell md-label="Bank/Card" class="col-25">
          {{`${item.destination.bank_name}••••${item.destination.last4}`}}
        </md-table-cell>
        <md-table-cell md-label="Arrival Date" class="col-15">
          {{$moment.formatDate(item.arrival_date)}}
        </md-table-cell>
      </md-table-row>
    </md-table>
      <div class="pagination">
      <md-button :disabled="!previousMore" class="md-icon-button md-primary"  @click="previous">
        <md-icon>chevron_left</md-icon>
      </md-button>
      <md-button :disabled="!nextMore" class="md-icon-button md-primary" @click="next">
        <md-icon>chevron_right</md-icon>
      </md-button>
      </div>
    </div>
     <!-- FILTERS SIDEBAR TODO -->


    <v-pay-animation :animate="loading" :result="{}"/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import {currency, capitalize} from '@/helpers'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'

  export default {
    components: { VPayAnimation },
    data: function () {
      return {
        payouts: [],
        nextMore: false,
        previousMore: false,
        loading: false,
        pag: 10,
        startingAfterPrev: this.$route.params.startingAfterPrev,
        startingAfter: null,
        endingBefore: null,
        paginationPos: 0
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    },
    mounted () {
      if (this.user && this.user.organizationId) {
        this.getOrganization(this.user.organizationId).then(organization => {
          this.organization = organization
          this.load({startingAfter: this.startingAfterPrev})
        })
      }
    },
    watch: {
      user () {
        this.getOrganization(this.user.organizationId).then(organization => {
          this.organization = organization
          this.load({startingAfter: this.startingAfterPrev})
        })
      },
      payouts () {
        // this.loading = false
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization',
        fetchPayouts: 'fetchPayouts'
      }),
      load ({startingAfter, endingBefore} = {}) {
        this.startingAfterPrev = startingAfter
        this.loading = true
        this.fetchPayouts({ account: this.organization.connectAccount, startingAfter, endingBefore }).then(resp => {
          this.payouts = resp.data
          if (!startingAfter && !endingBefore) this.nextMore = resp.has_more
          else if (startingAfter) {
            this.nextMore = resp.has_more
            this.previousMore = true
          } else if (endingBefore) {
            this.nextMore = true
            this.previousMore = resp.has_more
          }
          if (resp.data.length) {
            this.startingAfter = resp.data[resp.data.length - 1].id
            this.endingBefore = resp.data[0].id
          }
          this.loading = false
        })
      },
      next () {
        this.load({startingAfter: this.startingAfter})
      },
      previous () {
        this.load({endingBefore: this.endingBefore})
      },
      currency (value) {
        return currency(value / 100)
      },
      capitalize (value) {
        const tmp = value.replace(new RegExp('_', 'g'), ' ')
        return capitalize(tmp)
      },
      goTransfers (payout) {
        this.$router.push({
          name: 'depositsBalanceReport',
          params: {
            startingAfterPrev: this.startingAfterPrev,
            payout: payout.id
          }
        })
      }
    }
  }
</script>
<style>
.pagination {
    display: inline-block;
    margin-top: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
}

.disabled {
  background-color: #ddd;
  color: white !important;
  border: 1px solid #ddd;
}

.pagination a {
    color: black;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid #00B29F;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px
}

.pagination a.active {
    background-color: #00B29F;
    color: white;
    border: 1px solid #00B29F;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>

