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
      <md-chip class="lblue" md-deletable>Deposit Date: 03/05/2018 - 04/23/2018</md-chip>
    </div>

    <!-- INFO -->
    <div class="report-info">
      <span class="bold">ESTIMATES ONLY.</span> Cash Flow report assumes PaidUp will process 100% of payments successfully on the original chanrge
      date.
    </div>

    <!-- TABLE -->
    <md-table v-model="tableData" md-sort="name" md-sort-order="asc" class="custom-table">
      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="{totals: item.desc === 'TOTALS', 'red-row': item.id === 3}">
        <md-table-cell md-label="Deposit ID">
          <div class="col-150">
            {{item.desc}}
          </div>
        </md-table-cell>
        <md-table-cell md-label="Deposit Date">
          {{item.date}}
        </md-table-cell>
        <md-table-cell md-label="Processed" md-numeric>
          {{item.amount}}
        </md-table-cell>
        <md-table-cell md-label="Processing Fee" md-numeric>
          {{item.amount}}
        </md-table-cell>
        <md-table-cell md-label="PaidUp Fee" md-numeric>
          {{item.amount}}
        </md-table-cell>
        <md-table-cell md-label="Total Fee" md-numeric>
          {{item.amount}}
        </md-table-cell>
        <md-table-cell md-label="Net Deposit" md-numeric>
          {{item.amount}}
        </md-table-cell>
        <md-table-cell md-label="Account">
          {{item.account}}
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
          <md-button class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <md-checkbox class="lblue" v-model="indeterminateCheck" :indeterminate="checkArray.length">All</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="2">2018/2019</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="3">2017/2018</md-checkbox>

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
          <md-datepicker md-immediately class="no-date-icon">
            <label>Start</label>
          </md-datepicker>
          <md-datepicker md-immediately class="no-date-icon">
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
          <md-datepicker md-immediately class="no-date-icon">
            <label>Start</label>
          </md-datepicker>
          <md-datepicker md-immediately class="no-date-icon">
            <label>End</label>
          </md-datepicker>
        </div>

        <!-- PROGRAMS -->
        <div class="filter-title">
          <div class="bold">
            Programs
          </div>
          <md-button class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <md-checkbox class="lblue" v-model="indeterminateCheck" :indeterminate="checkArray.length">All</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="2">12U Red</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="3">Isotopes Volleybal</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="3">17U Regional</md-checkbox>

        <!-- DEPOSIT DATE -->
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
        </div>

        <!-- STATUS -->
        <div class="filter-title">
          <div class="bold">
            Status
          </div>
          <md-button class="md-dense md-icon-button md-accent lblue">
            <md-icon>clear</md-icon>
          </md-button>
        </div>
        <md-checkbox class="lblue" v-model="indeterminateCheck" :indeterminate="checkArray.length">All</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="2">Autopay</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="3">Due</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="3">Failed</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="3">Overdue</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="3">Scheduled</md-checkbox>
        <md-checkbox class="lblue" v-model="checkArray" value="3">Submitted</md-checkbox>

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
          <md-chip class="lblue">JVA Worlds</md-chip>
          <md-chip class="lblue">Travel</md-chip>
          <md-chip class="blue">Camps</md-chip>
          <md-chip class="lblue">17U-18U</md-chip>
        </div>
      </div>
    </md-drawer>


  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data: function () {
      return {
        movie: 'godfather',
        showFiltersPanel: false,
        checkArray: [],
        indeterminateCheck: false,
        tableData: [ {
          id: 1,
          desc: 'TOTALS',
          account: '',
          date: '',
          amount: '$99913.50'
        },
        {
          id: 2,
          desc: 'DUES installment 4',
          account: 'Bank of America NA****12344',
          date: '05-12-2018',
          amount: '$3913.00'
        },
        {
          id: 3,
          desc: 'DUES 33',
          account: 'Bank of America NA****12344',
          date: '05-12-2018',
          amount: '$3913.00'
        },
        {
          id: 4,
          desc: 'DUES 44',
          account: 'Bank of America NA****12344',
          date: '05-12-2018',
          amount: '$3913.00'
        },
        {
          id: 5,
          desc: 'DUES installment 3',
          account: 'Bank of America NA****12344',
          date: '05-12-2018',
          amount: '$3913.00'
        }
        ]
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      })
    },
    methods: {}
  }
</script>
