<template>
  <div class="reports-page">
    <div class="top-bar">
      <div class="title">
        Payments
      </div>
      <div>
        <md-button class="md-button md-accent lblue">
          <md-icon>print</md-icon> Print
        </md-button>
        <md-button class="md-button md-accent lblue">
          <md-icon>get_app</md-icon> Export
        </md-button>
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
      <md-chip v-if="invoiceDateStart" class="lblue" md-clickable @click="invoiceDateStart = null">Receipt date start: {{$d(invoiceDateStart, 'short')}}</md-chip>
      <md-chip v-if="invoiceDateEnd" class="lblue" md-clickable @click="invoiceDateEnd = null">Receipt date end: {{$d(invoiceDateEnd, 'short')}}</md-chip>
      <md-chip v-if="chargeDateStart" class="lblue" md-clickable @click="chargeDateStart = null">Charge date start: {{$d(chargeDateStart, 'short')}}</md-chip>
      <md-chip v-if="chargeDateEnd" class="lblue" md-clickable @click="chargeDateEnd = null">Charge date end: {{$d(chargeDateEnd, 'short')}}</md-chip>
    </div>

    <!-- TABLE -->
    <md-table v-model="paymentsFiltered" class="custom-table" md-card md-fixed-header>
      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{totals: (item.status === 'failed' || item.status === 'overdue'), 'red-row': item.id === 3}">
        <md-table-cell md-label="Deposit ID">
            {{item.receiptId}}
        </md-table-cell>
        <md-table-cell md-label="Charge Date">
          {{item.chargeDate}}
        </md-table-cell>
        <md-table-cell md-label="Receipt Date">
          {{item.receiptDate}}
        </md-table-cell>
        <md-table-cell md-label="Description">
          {{item.description}}
        </md-table-cell>
        <md-table-cell md-label="Program">
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
        <md-table-cell md-label="Player Name">
          {{item.playerName}}
        </md-table-cell>
        <md-table-cell md-label="Amount" md-numeric>
          ${{currency(item.amount)}}
        </md-table-cell>
        <md-table-cell md-label="Refund" md-numeric>
          ${{currency(item.refund)}}
        </md-table-cell>
        <md-table-cell md-label="Processing Fee" md-numeric>
          ${{currency(item.processingFee)}}
        </md-table-cell>
        <md-table-cell md-label="PaidUp Fee" md-numeric>
          ${{currency(item.paidupFee)}}
        </md-table-cell>
        <md-table-cell md-label="Total Fee" md-numeric>
          ${{currency(item.totalFee)}}
        </md-table-cell>
      </md-table-row>
    </md-table>
    
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
          <md-button class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <md-checkbox v-for="sts in status" :key="sts" class="lblue" v-model="statusFilter" :value="sts">{{capitalize(sts)}}</md-checkbox>

        <!-- TAGS -->
        <div class="filter-title">
          <div class="bold">
            Tags
          </div>
          <md-button class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <div class="tags-box">
          <md-chip class="md-accent" @md-delete="removeTag(chip)" v-for="chip in tagsFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
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
        programs: []
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
        playerName
        amount
        refund
        processingFee
        paidupFee
        totalFee,
        tags
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
          // let chargeDate = receipt.chargeDate ? new Date(receipt.chargeDate) : ''
          let resp = true
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

          if (resp) curr.push(receipt)
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
        this.programs = Array.from(programs)
        this.status = Array.from(status)
        this.tags = Array.from(tags)
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
      loadOrganiztion (organizationId) {
        this.getOrganization(organizationId).then(organization => {
          this.organization = organization
          this.seasonSelected = organization.seasons[organization.seasons.length - 1]._id
        })
      }
    }
  }
</script>
