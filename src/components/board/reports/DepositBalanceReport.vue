<template>
  <div class="reports-page">
    <div class="top-bar">
      <div class="">
        <md-button @click="goBack" class="md-button md-accent lblue md-icon-button">
          <md-icon>arrow_back</md-icon>
        </md-button>
        <div class="title title-align">Deposits</div>
      </div>
      <div>
        
        

        <download-excel :data= "transfersFiltered" :fields="reportFields" type= "csv" name= "transfers.csv">
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
      <!-- <md-chip v-if="seasonSelectedObj" class="lblue">Season: {{seasonSelectedObj.name}}</md-chip> -->
      <md-chip class="lblue" @md-delete="removeProgram(chip)" v-for="chip in programFilter" :key="chip" md-deletable>{{ chip }}</md-chip>
      <md-chip class="lblue" @md-delete="removeTag(chip)" v-for="chip in tagsFilter" :key="chip" md-deletable>{{ chip }}</md-chip>

    </div>

    <!-- TABLE -->
    <div class="table-container">
    <md-table v-model="transfersFiltered" class="md-table custom-table" >
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
          {{item.invoiceId}}
        </md-table-cell>
        <md-table-cell md-label="Invoice Date">
          {{item.invoiceDate}}
        </md-table-cell>
        <md-table-cell md-label="Charge Date">
          {{item.chargeDate}}
        </md-table-cell>
        <md-table-cell md-label="Processed">
          ${{item.processed}}
        </md-table-cell>
        <md-table-cell md-label="Processing Fee">
          ${{item.processingFee}}
        </md-table-cell>
        <md-table-cell md-label="PaidUp Fee">
          ${{item.paidupFee}}
        </md-table-cell>
        <md-table-cell md-label="Total Fee">
          ${{item.totalFee}}
        </md-table-cell>
        <md-table-cell md-label="Net Deposit">
          ${{item.netDeposit}}
        </md-table-cell>
        <md-table-cell  md-label="Description">
          {{item.description}}
        </md-table-cell>
        <md-table-cell  md-label="Program">
          {{item.program}}
        </md-table-cell>
        <md-table-cell  md-label="Parent Name">
          {{item.parentName}}
        </md-table-cell>
        <md-table-cell md-label="Player Name">
          {{item.playerName}}
        </md-table-cell>
      </md-table-row>
    </md-table>
    </div>
     <!-- FILTERS SIDEBAR -->
    <md-drawer class="md-right filters-sidebar" :md-active.sync="showFiltersPanel">
      <div class="title-section">
        <span class="md-title">Edit Filters</span>
        <md-button @click="clearAll" class="md-accent lblue md-dense">clear all filters</md-button>
      </div>
      <div class="filters-section">
        <!-- SEASONS -->
        <!-- <div class="filter-title">
          <div class="bold">
            Season
          </div>
        </div>
        <md-checkbox :v-if="organization" v-for="season of seasons" :key="season._id" v-model="seasonSelected" :value="season._id" class="md-primary">{{season.name}}</md-checkbox> -->


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
        tagsFilter: [],
        tags: [],
        seasonSelected: null,
        programs: [],
        search: '',
        reportFields: {
          'Invoice ID': 'invoiceId',
          'Invoice Date': 'invoiceDate',
          'Charge Date': 'chargeDate',
          'Processed': 'processed',
          'Processing Fee': 'processingFee',
          'PaidUp Fee': 'paidupFee',
          'Total Fee': 'totalFee',
          'Net Deposit': 'netDeposit',
          'Description': 'description',
          'Program': 'program',
          'Parent Name': 'parentName',
          'Player Name': 'playerName',
          'Tags': 'tags'
        },
        loading: false,
        transfers: [],
        transfersFiltered: [],
        payout: this.$route.params.payout,
        startingAfterPrev: this.$route.params.startingAfterPrev
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      seasons () {
        if (!this.organization) return []
        return this.organization.seasons
      }
    },
    mounted () {
      this.loading = true
      if (!this.payout) {
        this.goBack()
      } else if (this.user && this.user.organizationId) {
        this.getOrganization(this.user.organizationId).then(organization => {
          this.organization = organization
          this.fetchBalanceHistory({
            account: organization.connectAccount,
            payout: this.payout
          }).then(transfers => {
            this.transfers = transfers
            this.loading = false
          })
        })
      }
    },
    watch: {
      search () {
        this.getTransfersFiltered()
      },
      programFilter () {
        this.getTransfersFiltered()
      },
      tagsFilter () {
        this.getTransfersFiltered()
      },
      transfers () {
        let programs = new Set()
        let tags1 = new Set()
        this.transfers.forEach(tr => {
          programs.add(tr.program)
          if (tr.tags) {
            tr.tags.forEach(tag => {
              tags1.add(tag)
            })
          }
        })
        this.programs = Array.from(programs).sort()
        this.tags = Array.from(tags1).sort()
        this.getTransfersFiltered()
      },
      user () {
        this.loading = true
        this.getOrganization(this.user.organizationId).then(organization => {
          this.organization = organization
          this.fetchBalanceHistory({
            account: organization.connectAccount,
            arrival: this.arrival,
            source: this.source
          }).then(transfers => {
            this.transfers = transfers
            this.loading = false
          })
        })
      }
    },
    methods: {
      ...mapActions('organizationModule', {
        getOrganization: 'getOrganization',
        fetchBalanceHistory: 'fetchBalanceHistory'
      }),
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
      removeAllTags () {
        this.tags = this.tags.concat(this.tagsFilter)
        this.tagsFilter = []
      },
      clearAll () {
        this.removeAllTags()
        this.programFilter = []
      },
      getTransfersFiltered () {
        let response = this.transfers.reduce((curr, tr) => {
          let resp = true
          if (this.programFilter.length) {
            resp = (this.programFilter.indexOf(tr.program) > -1)
          }
          if (this.tagsFilter.length && resp) {
            if (!tr.tags) resp = false
            else {
              resp = tr.tags.some(r => this.tagsFilter.indexOf(r) >= 0) && resp
            }
          }
          if (this.search && resp) {
            resp = tr.index.toLowerCase().includes(this.search.toLowerCase()) && resp
          }
          if (resp) {
            curr.push(tr)
          }
          return curr
        }, [])
        this.transfersFiltered = response
      },
      goBack () {
        this.$router.push({
          name: 'depositsReport',
          params: {
            startingAfterPrev: this.$route.params.startingAfterPrev
          }
        })
      }
    }
  }
</script>
<style>
.title-align {
  float: right;
  padding-top: 10px;
}
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

