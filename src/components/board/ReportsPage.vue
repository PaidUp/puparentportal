<template>
  <div class="reports-page">
    <div class="top-bar">
      <div class="title">
        Payments
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
      <md-chip v-if="seasonSelectedObj" class="lblue">Season: {{seasonSelectedObj.name}}</md-chip>
      <md-chip v-if="invoiceDateStart" class="lblue" md-deletable @md-delete="invoiceDateStart = null">Receipt date start: {{$d(invoiceDateStart, 'short')}}</md-chip>
      <md-chip v-if="invoiceDateEnd" class="lblue" md-deletable @md-delete="invoiceDateEnd = null">Receipt date end: {{$d(invoiceDateEnd, 'short')}}</md-chip>
      <md-chip v-if="chargeDateStart" class="lblue" md-deletable @md-delete="chargeDateStart = null">Charge date start: {{$d(chargeDateStart, 'short')}}</md-chip>
      <md-chip v-if="chargeDateEnd" class="lblue" md-deletable @md-delete="chargeDateEnd = null">Charge date end: {{$d(chargeDateEnd, 'short')}}</md-chip>
      <md-chip class="lblue" @md-delete="removeProgram(chip)" v-for="chip in programFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeStatus(chip)" v-for="chip in statusFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeTag(chip)" v-for="chip in tagsFilter" :key="chip" md-deletable>{{ chip }}</md-chip>

    </div>

    <!-- TABLE -->
    <div class="table-container">
    <md-table v-model="paymentsFiltered" class="md-table custom-table" >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title"></h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search..." v-model="search" />
        </md-field>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{totals: (item.status === 'failed' || item.status === 'overdue'), 'red-row': item.id === 3}">
        <md-table-cell md-sort-by="receiptId" md-label="Invoice ID">
          {{item.receiptId}}
        </md-table-cell>
        <md-table-cell  md-label="Charge Date">
          {{item.chargeDate}}
        </md-table-cell>
        <md-table-cell md-label="Invoice Date">
          {{item.receiptDate}}
        </md-table-cell>
        <md-table-cell md-sort-by="description" md-label="Description">
          {{item.description}}
        </md-table-cell>
        <md-table-cell md-sort-by="program" md-label="Program">
          {{item.program}}
        </md-table-cell>
        <md-table-cell md-label="Status">
          {{item.status}}
        </md-table-cell>
        <md-table-cell md-label="Parent Name">
          {{item.parentName}}
        </md-table-cell>
        <md-table-cell md-label="Parent Email">
          {{item.parentEmail}}
        </md-table-cell>
        <md-table-cell md-label="Parent Phone">
          {{item.parentPhone}}
        </md-table-cell>
        <md-table-cell md-label="Player Name">
          {{item.playerName}}
        </md-table-cell>
        <md-table-cell md-label="Payment Account">
          {{item.paymentMethodBrand ? item.paymentMethodBrand + '••••' : ''}}{{item.paymentMethodLast4}}
        </md-table-cell>
        <md-table-cell md-label="Amount" md-numeric>
          ${{item.amount}}
        </md-table-cell>
        <md-table-cell md-label="Processing Fee" md-numeric>
          ${{item.processingFee}}
        </md-table-cell>
        <md-table-cell md-label="PaidUp Fee" md-numeric>
          ${{item.paidupFee}}
        </md-table-cell>
        <md-table-cell md-label="Total Fee" md-numeric>
          ${{item.totalFee}}
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


  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import { mapState, mapActions } from 'vuex'
  import currency from '@/helpers/currency'
  import capitalize from '@/helpers/capitalize'

  export default {
    data: function () {
      return {
        showFiltersPanel: false,
        checkArray: [],
        indeterminateCheck: false,
        organization: null,
        payments: [],
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
        }
      }
    },
    apollo: {
  // Query with parameters
      payments: {
    // gql query
        query: gql`query APayments($organizationId: String!, $seasonId: String!) {
      payments(organizationId: $organizationId, seasonId: $seasonId) {
        receiptId
        type
        chargeDate
        receiptDate
        description
        program
        status
        parentName
        parentEmail
        parentPhone
        playerName
        amount
        processingFee
        paidupFee
        totalFee,
        tags,
        paymentMethodBrand,
        paymentMethodLast4,
        index
      }
    }`,
    // Static parameters
        variables () {
          return {
            organizationId: this.organization._id,
            seasonId: this.seasonSelected
          }
        },
        skip () {
          return !this.organization && !this.seasonSelected
        }  // ,
        // pollInterval: 1000
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      seasons () {
        if (!this.organization) return []
        return this.organization.seasons
      },
      seasonSelectedObj () {
        let ssn = null
        if (!this.seasonSelected) return ssn

        this.organization.seasons.forEach(season => {
          if (season._id === this.seasonSelected) {
            ssn = season
          }
        })
        return ssn
      },
      paymentsFiltered () {
        return this.payments.reduce((curr, receipt) => {
          let receiptDate = receipt.receiptDate ? new Date(receipt.receiptDate) : ''
          let chargeDate = receipt.chargeDate ? new Date(receipt.chargeDate) : ''
          let resp = true
          // invoice date filter
          if (this.invoiceDateStart) {
            if (!receiptDate) resp = false
            else {
              resp = (this.invoiceDateStart.getTime() <= receiptDate.getTime()) && resp
            }
          }
          if (this.invoiceDateEnd) {
            if (!receiptDate) resp = false
            else {
              resp = (this.invoiceDateEnd.getTime() >= receiptDate.getTime()) && resp
            }
          }
          // charge date filter
          if (this.chargeDateStart) {
            if (!chargeDate) resp = false
            else {
              resp = (this.chargeDateStart.getTime() <= chargeDate.getTime()) && resp
            }
          }
          if (this.chargeDateEnd) {
            if (!chargeDate) resp = false
            else {
              resp = (this.chargeDateEnd.getTime() >= chargeDate.getTime()) && resp
            }
          }
          if (this.programFilter.length) {
            resp = (this.programFilter.indexOf(receipt.program) > -1) && resp
          }
          if (this.statusFilter.length) {
            resp = (this.statusFilter.indexOf(receipt.status) > -1) && resp
          }
          if (this.tagsFilter.length) {
            if (!receipt.tags) resp = false
            else {
              resp = receipt.tags.some(r => this.tagsFilter.indexOf(r) >= 0) && resp
            }
          }
          if (this.search) {
            resp = receipt.index.toLowerCase().includes(this.search.toLowerCase()) && resp
          }
          let tmp = JSON.parse(JSON.stringify(receipt))

          tmp.chargeDate = tmp.chargeDate ? this.$d(new Date(tmp.chargeDate), 'short') : ''
          tmp.receiptDate = tmp.receiptDate ? this.$d(new Date(tmp.receiptDate), 'short') : ''
          tmp.status = this.capitalize(tmp.status)
          tmp.amount = this.currency(tmp.amount)
          tmp.processingFee = this.currency(tmp.processingFee)
          tmp.paidupFee = this.currency(tmp.paidupFee)
          tmp.totalFee = this.currency(tmp.totalFee)
          if (resp) curr.push(tmp)
          return curr
        }, [])
      }
    },
    mounted () {
      if (this.user && this.user.organizationId) {
        this.loadOrganiztion(this.user.organizationId)
      }
    },
    watch: {
      user () {
        if (this.user && this.user.organizationId) {
          this.loadOrganiztion(this.user.organizationId)
        }
      },
      payments () {
        let programs = new Set()
        let status = new Set()
        let tags = new Set()
        this.payments.forEach(pmnt => {
          programs.add(pmnt.program)
          status.add(pmnt.status)
          if (pmnt.tags) {
            pmnt.tags.forEach(tag => {
              tags.add(tag)
            })
          }
        })
        this.programs = Array.from(programs).sort()
        this.status = Array.from(status).sort()
        this.tags = Array.from(tags).sort()
      },
      seasonSelected () {
        this.programFilter = []
        this.statusFilter = []
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization'
      }),
      currency (value) {
        return currency(value)
      },
      capitalize (value) {
        return capitalize(value)
      },
      selectTag (value) {
        this.tagsFilter.push(value)
        this.tags.splice(this.tags.indexOf(value), 1)
      },
      removeTag (value) {
        this.tags.push(value)
        this.tagsFilter.splice(this.tagsFilter.indexOf(value), 1)
      },
      removeProgram (value) {
        this.programFilter.splice(this.programFilter.indexOf(value), 1)
      },
      removeStatus (value) {
        this.statusFilter.splice(this.statusFilter.indexOf(value), 1)
      },
      removeAllTags () {
        this.tags = this.tags.concat(this.tagsFilter)
        this.tagsFilter = []
      },
      loadOrganiztion (organizationId) {
        this.getOrganization(organizationId).then(organization => {
          this.organization = organization
          this.seasonSelected = organization.seasons[organization.seasons.length - 1]._id
        })
      }
    }
  }
</script>
