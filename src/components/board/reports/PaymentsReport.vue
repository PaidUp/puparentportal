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
      <md-chip v-if="invoiceDateStart" class="lblue" md-deletable @md-delete="invoiceDateStart = null">Receipt date start: {{$moment.formatDate(invoiceDateStart)}}</md-chip>
      <md-chip v-if="invoiceDateEnd" class="lblue" md-deletable @md-delete="invoiceDateEnd = null">Receipt date end: {{$moment.formatDate(invoiceDateEnd)}}</md-chip>
      <md-chip v-if="chargeDateStart" class="lblue" md-deletable @md-delete="chargeDateStart = null">Charge date start: {{$moment.formatDate(chargeDateStart)}}</md-chip>
      <md-chip v-if="chargeDateEnd" class="lblue" md-deletable @md-delete="chargeDateEnd = null">Charge date end: {{$moment.formatDate(chargeDateEnd)}}</md-chip>
      <md-chip class="lblue" @md-delete="removeProgram(chip)" v-for="chip in programFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeStatus(chip)" v-for="chip in statusFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeTag(chip)" v-for="chip in tagsFilter" :key="chip" md-deletable>{{ chip }}</md-chip>

    </div>

    <!-- TABLE -->
    <div class="table-container">
    <md-table v-model="paymentsFilteredPag" class="md-table custom-table" >
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
      <div class="pagination">
      <md-button class="md-icon-button md-primary" :disabled="paginationStart <= 0" @click="previous">
        <md-icon>chevron_left</md-icon>
      </md-button>
      <md-button class="md-icon-button md-primary" :disabled="paginationStart >= paymentsFiltered.length - 1" @click="next">
        <md-icon>chevron_right</md-icon>
      </md-button>
      </div>
      <!-- <div class="pagination">
        <a href="#" :class="{disabled: paginationStart <= 0}" @click="previous"><md-icon>chevron_left</md-icon> Previous</a>
        <a href="#" :class="{disabled: paginationStart >= paymentsFiltered.length - 1}" @click="next">Next <md-icon class="md-primary">chevron_right</md-icon></a>
      </div> -->
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
  import currency from '@/helpers/currency'
  import capitalize from '@/helpers/capitalize'
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
        invoiceDateStartTZ: null,
        invoiceDateEnd: null,
        invoiceDateEndTZ: null,
        chargeDateStart: null,
        chargeDateStartTZ: null,
        chargeDateEnd: null,
        chargeDateEndTZ: null,
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
        pag: 100
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('organizationModule', {
        payments: 'payments'
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
      paymentsFilteredPag () {
        return this.paymentsFiltered.reduce((curr, pf, idx) => {
          if (idx >= this.paginationStart && idx <= (this.paginationStart + this.pag)) {
            curr.push(pf)
          }
          return curr
        }, [])
      }
    },
    mounted () {
      this.loading = true
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
        this.getPaymentsFiltered()
      },
      seasonSelected () {
        this.loading = true
        this.programFilter = []
        this.statusFilter = []
        this.fetchPayments({organizationId: this.user.organizationId, seasonId: this.seasonSelected})
      },
      showFiltersPanel () {
        if (!this.showFiltersPanel) {
          this.loading = true
          this.getPaymentsFiltered()
        }
      },
      invoiceDateStart () {
        this.invoiceDateStartTZ = this.invoiceDateStart ? this.$moment.removeTimeZone(this.invoiceDateStart) : null
        this.getPaymentsFiltered()
      },
      invoiceDateEnd () {
        this.invoiceDateEndTZ = this.invoiceDateEnd ? this.$moment.removeTimeZone(this.invoiceDateEnd) : null
        this.getPaymentsFiltered()
      },
      chargeDateStart () {
        this.chargeDateStartTZ = this.chargeDateStart ? this.$moment.removeTimeZone(this.chargeDateStart) : null
        this.getPaymentsFiltered()
      },
      chargeDateEnd () {
        this.chargeDateEndTZ = this.chargeDateEnd ? this.$moment.removeTimeZone(this.chargeDateEnd) : null
        this.getPaymentsFiltered()
      },
      search () {
        this.getPaymentsFiltered()
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization',
        fetchPayments: 'fetchPayments'
      }),
      currency (value) {
        return currency(value)
      },
      capitalize (value) {
        if (!value) return value
        return capitalize(value)
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
      },
      loadOrganiztion (organizationId) {
        this.getOrganization(organizationId).then(organization => {
          this.organization = organization
          this.seasonSelected = organization.seasons[organization.seasons.length - 1]._id
        })
      },
      getPaymentsFiltered () {
        this.paginationStart = 0
        this.loading = true
        let response = this.payments.reduce((curr, receipt, idx) => {
          let receiptDate = receipt.receiptDate ? new Date(receipt.receiptDate) : null
          let chargeDate = receipt.chargeDate ? new Date(receipt.chargeDate) : null
          let resp = true
          // invoice date filter
          if (this.invoiceDateStartTZ && resp) {
            if (!receiptDate) resp = false
            else {
              resp = (this.invoiceDateStartTZ.startOf('day').toDate().getTime() <= receiptDate.getTime()) && resp
            }
          }
          if (this.invoiceDateEndTZ && resp) {
            if (!receiptDate) resp = false
            else {
              let tmpDate = this.invoiceDateEndTZ.endOf('day').toDate().getTime()
              resp = (tmpDate >= receiptDate.getTime()) && resp
            }
          }
          // charge date filter
          if (this.chargeDateStartTZ && resp) {
            if (!chargeDate) resp = false
            else {
              resp = (this.chargeDateStartTZ.startOf('day').toDate().getTime() <= chargeDate.getTime()) && resp
            }
          }
          if (this.chargeDateEndTZ && resp) {
            if (!chargeDate) resp = false
            else {
              console.log('chargeDate: ', chargeDate)
              console.log('chargeDateEndTZ: ', this.chargeDateEndTZ.endOf('day').toDate())
              let tmpDate = this.chargeDateEndTZ.endOf('day').toDate().getTime()
              resp = (tmpDate >= chargeDate.getTime()) && resp
              console.log('resp: ', resp)
            }
          }
          if (this.programFilter.length && resp) {
            resp = (this.programFilter.indexOf(receipt.program) > -1) && resp
          }
          if (this.statusFilter.length && resp) {
            resp = (this.statusFilter.indexOf(receipt.status) > -1) && resp
          }
          if (this.tagsFilter.length && resp) {
            if (!receipt.tags) resp = false
            else {
              resp = receipt.tags.some(r => this.tagsFilter.indexOf(r) >= 0) && resp
            }
          }
          if (this.search && resp) {
            resp = receipt.index.toLowerCase().includes(this.search.toLowerCase()) && resp
          }
          if (resp) {
            let tmp = JSON.parse(JSON.stringify(receipt)
            )
            tmp.chargeDate = tmp.chargeDate || ''
            tmp.receiptDate = tmp.receiptDate || ''
            tmp.status = this.capitalize(tmp.status)
            tmp.amount = this.currency(tmp.amount)
            tmp.processingFee = this.currency(tmp.processingFee)
            tmp.paidupFee = this.currency(tmp.paidupFee)
            tmp.totalFee = this.currency(tmp.totalFee)
            curr.push(tmp)
          }
          return curr
        }, [])
        this.loading = false
        this.paymentsFiltered = response
      },
      previous (event) {
        if (this.paginationStart <= 0) return false
        this.paginationStart = this.paginationStart - this.pag
      },
      next (event) {
        if (this.paginationStart >= this.paymentsFiltered.length - 1) return false
        this.paginationStart = this.paginationStart + this.pag
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

