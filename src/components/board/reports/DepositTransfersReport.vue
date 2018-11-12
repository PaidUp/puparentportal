<template>
  <div class="reports-page">
    <div class="top-bar">
      <div class="title">
        Deposits
      </div>
      <div>
        <md-button v-if="false" class="md-button md-accent lblue">
          <md-icon>print</md-icon> Print
        </md-button>
        

        <download-excel :data= "paymentsFiltered" :fields="reportFields" type= "csv" name= "payments.csv">
          <md-button class="md-button md-accent lblue">
            <md-icon>get_app</md-icon> Export
          </md-button>
        </download-excel>
      </div>
    </div>

    <!-- FILTERS CHIPS AND TRIGGER FILTER BAR -->
    <div class="filter-chips">
      <md-chip class="blue with-icon" @click="showFiltersPanel = true">Add Filter
        <md-button class="md-icon-button md-input-action">
          <md-icon>add</md-icon>
        </md-button>
      </md-chip>
      <!-- <md-chip v-if="seasonSelectedObj" class="lblue">Season: {{seasonSelectedObj.name}}</md-chip>
      <md-chip v-if="invoiceDateStart" class="lblue" md-deletable @md-delete="invoiceDateStart = null">Receipt date start: {{$d(invoiceDateStart, 'short')}}</md-chip>
      <md-chip v-if="invoiceDateEnd" class="lblue" md-deletable @md-delete="invoiceDateEnd = null">Receipt date end: {{$d(invoiceDateEnd, 'short')}}</md-chip>
      <md-chip v-if="chargeDateStart" class="lblue" md-deletable @md-delete="chargeDateStart = null">Charge date start: {{$d(chargeDateStart, 'short')}}</md-chip>
      <md-chip v-if="chargeDateEnd" class="lblue" md-deletable @md-delete="chargeDateEnd = null">Charge date end: {{$d(chargeDateEnd, 'short')}}</md-chip>
      <md-chip class="lblue" @md-delete="removeProgram(chip)" v-for="chip in programFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeStatus(chip)" v-for="chip in statusFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeTag(chip)" v-for="chip in tagsFilter" :key="chip" md-deletable>{{ chip }}</md-chip> -->

    </div>

    <!-- TABLE -->
    <div class="table-container">
    <md-table v-model="transfers" class="md-table custom-table" >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title"></h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search..." v-model="search" />
        </md-field>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{totals: (item.status === 'failed'), 'red-row': item.id === 3}">
        <md-table-cell md-label="Invoice Id">
          {{item.source_transaction.metadata.invoiceId}}
        </md-table-cell>
        <md-table-cell md-label="Charge Date">
          {{formatDate(item.source_transaction.created)}}
        </md-table-cell>
        <md-table-cell md-label="Amount">
          ${{currency(item.amount)}}
        </md-table-cell>
        <md-table-cell md-label="Fee">
          ${{currency(item.source_transaction.application_fee.amount)}}
        </md-table-cell>
        <md-table-cell md-label="Net Deposit">
          ${{currency(item.amount - item.source_transaction.application_fee.amount)}}
        </md-table-cell>
        <md-table-cell  md-label="Description">
          {{item.source_transaction.description}}
        </md-table-cell>
        <md-table-cell  md-label="Program">
          {{item.source_transaction.metadata.productName}}
        </md-table-cell>
        <md-table-cell  md-label="Parent Name">
          {{item.source_transaction.metadata.userFirstName + ' ' + item.source_transaction.metadata.userLastName}}
        </md-table-cell>
        <md-table-cell md-label="Player Name">
          {{item.source_transaction.metadata.beneficiaryFirstName + ' ' + item.source_transaction.metadata.beneficiaryLastName}}
        </md-table-cell>
        <md-table-cell md-label="Arrival Date">
          
        </md-table-cell>
      </md-table-row>
    </md-table>
    </div>
     <!-- FILTERS SIDEBAR -->
    <md-drawer class="md-right filters-sidebar" :md-active.sync="showFiltersPanel">
      <div class="title-section">
        <span class="md-title">Edit Filters</span>
        <md-button class="md-accent lblue md-dense">clear all filters</md-button>
      </div>
      <div class="filters-section">
        <!-- SEASONS -->
        <div class="filter-title">
          <div class="bold">
            Season
          </div>
        </div>
        <md-radio :v-if="organization" v-for="season of seasons" :key="season._id" v-model="seasonSelected" :value="season._id" class="md-primary">{{season.name}}</md-radio>

        <!-- DATES -->
        <div class="filter-title">
          <div class="bold">
            Invoice Date
          </div>
          <md-button class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <div class="range-date">
          <md-datepicker md-immediately v-model="invoiceDateStart" class="no-date-icon">
            <label>Start</label>
          </md-datepicker>
          <md-datepicker md-immediately v-model="invoiceDateEnd" class="no-date-icon">
            <label>End</label>
          </md-datepicker>
        </div>
        <div class="filter-title">
          <div class="bold">
            Charge Date
          </div>
          <md-button class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <div class="range-date">
          <md-datepicker md-immediately v-model="chargeDateStart" class="no-date-icon">
            <label>Start</label>
          </md-datepicker>
          <md-datepicker md-immediately v-model="chargeDateEnd" class="no-date-icon">
            <label>End</label>
          </md-datepicker>
        </div>

        <!-- PROGRAMS -->
        <div class="filter-title">
          <div class="bold">
            Programs
          </div>
          <md-button class="md-dense md-icon-button md-accent lblue" @click="programFilter = []">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <md-checkbox v-for="program in programs" :key="program" class="lblue" v-model="programFilter" :value="program">{{program}}</md-checkbox>

        <!-- DEPOSIT DATE 
        <div class="filter-title">
          <div class="bold">
            Deposit Date
          </div>
          <md-button class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <div class="range-date">
          <md-datepicker md-immediately class="no-date-icon">
            <label>Start</label>
          </md-datepicker>
          <md-datepicker md-immediately class="no-date-icon">
            <label>End</label>
          </md-datepicker>
        </div>-->

        <!-- STATUS -->
        <div class="filter-title">
          <div class="bold">
            Status
          </div>
          <md-button @click="statusFilter = []" class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <md-checkbox v-for="sts in status" :key="sts" class="lblue" v-model="statusFilter" :value="sts">{{capitalize(sts)}}</md-checkbox>

        <!-- TAGS -->
        <div class="filter-title">
          <div class="bold">
            Tags
          </div>
          <md-button @click="removeAllTags" class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <div class="tags-box">
          <md-chip class="lblue" @md-delete="removeTag(chip)" v-for="chip in tagsFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
          <md-chip class="" @click="selectTag(chip)" v-for="chip in tags" :key="chip" md-clickable>{{ chip }}</md-chip>
        </div>
      </div>
      <br/>
      <br/>
    </md-drawer>

    <v-pay-animation :animate="loading" :result="{}"/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import {currency, formatDate, capitalize} from '@/helpers'
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'

  export default {
    components: { VPayAnimation },
    data: function () {
      return {
        showFiltersPanel: false,
        checkArray: [],
        indeterminateCheck: false,
        organization: null,
        programFilter: [],
        statusFilter: [],
        tagsFilter: [],
        tags: [],
        seasonSelected: null,
        invoiceDateStart: null,
        invoiceDateEnd: null,
        chargeDateStart: null,
        chargeDateEnd: null,
        status: [],
        programs: [],
        search: '',
        reportFields: {
          'Invoice ID': 'receiptId',
          'Charge Date': 'chargeDate',
          'Invoice Date': 'receiptDate',
          'Description': 'description',
          'Program': 'program',
          'Status': 'status',
          'Parent Name': 'parentName',
          'Parent Email': 'parentEmail',
          'Parent Phone': 'parentPhone',
          'Player Name': 'playerName',
          'Amount': 'amount',
          'Processing Fee': 'processingFee',
          'PaidUp Fee': 'paidupFee',
          'Total Fee': 'totalFee',
          'Tags': 'tags',
          'Payment Account Brand': 'paymentMethodBrand',
          'Payment Account Last4': 'paymentMethodLast4'
        },
        loading: false,
        paymentsFiltered: [],
        paginationStart: 0,
        pag: 100,
        arrival: this.$route.params.arrival,
        source: this.$route.params.source
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('organizationModule', {
        transfers: 'transfers'
      }),
      seasons () {
        if (!this.organization) return []
        return this.organization.seasons
      }
    },
    mounted () {
      if (this.user && this.user.organizationId) {
        this.getOrganization(this.user.organizationId).then(organization => {
          this.organization = organization
          this.fetchTransfers({
            account: organization.connectAccount,
            arrival: this.arrival,
            source: this.source
          })
        })
      }
    },
    watch: {
      user () {
        this.getOrganization(this.user.organizationId).then(organization => {
          this.organization = organization
          this.fetchTransfers({
            account: organization.connectAccount,
            arrival: this.arrival,
            source: this.source
          })
        })
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization',
        fetchTransfers: 'fetchTransfers'
      }),
      currency (value) {
        return currency(value / 100)
      },
      capitalize (value) {
        return capitalize(value)
      },
      formatDate (value) {
        return formatDate.unix(value)
      },
      selectTag (value) {
        this.tagsFilter.push(value)
        this.tags.splice(this.tags.indexOf(value), 1)
      },
      removeTag (value) {
        this.tags.push(value)
        this.tagsFilter.splice(this.tagsFilter.indexOf(value), 1)
        this.getPaymentsFiltered()
      },
      removeProgram (value) {
        this.programFilter.splice(this.programFilter.indexOf(value), 1)
        this.getPaymentsFiltered()
      },
      removeStatus (value) {
        this.statusFilter.splice(this.statusFilter.indexOf(value), 1)
        this.getPaymentsFiltered()
      },
      removeAllTags () {
        this.tags = this.tags.concat(this.tagsFilter)
        this.tagsFilter = []
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

