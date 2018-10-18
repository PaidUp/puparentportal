<template>
  <div class="search-page">
    <v-pay-animation :animate="this.$apollo.queries.searchResult.loading" :result="searchResult"/>
    <div class="title">
      Search Results
    </div>
    <div v-if="!noResults" class="not-found">
      <md-icon class="md-size-5x">search</md-icon>
      <div class="bolder">No search results found</div>
      <div>Please try again with a different search query</div>
    </div>
    <div v-else>
      <div class="table-title">Invoices ({{invoices.length}})</div>
      <md-table md-card v-model="searchResult.invoices" md-sort="invoiceId" md-sort-order="asc" class="custom-table">
        <md-table-row class="pointer" slot="md-table-row" slot-scope="{ item }" @click="actionInvoice(item)">
          <md-table-cell md-label="Invoice ID" class="col-10">{{ item.invoiceId }}</md-table-cell>
          <md-table-cell md-label="Player" class="col-20 col-with-img">
            <md-icon class="md-size-2">account_circle</md-icon>
            <!-- md-avatar class="md-small">
              <img src="@/assets/avatar.jpg" alt="img">
            </md-avatar -->
            {{ item.beneficiaryFirstName }} {{ item.beneficiaryLastName }}
          </md-table-cell>
          <md-table-cell md-label="Parent Email" md-sort-by="name" class="col-15">{{ item.user.userEmail }}</md-table-cell>
          <md-table-cell md-label="Parent" class="col-20 col-with-img">
            <md-icon class="md-size-2">account_circle</md-icon>
            <!-- md-avatar class="md-small">
              <img src="@/assets/avatar.jpg" alt="img">
            </md-avatar -->
            {{ item.user.userFirstName }} {{ item.user.userLastName }}
          </md-table-cell>
        </md-table-row>
      </md-table>

      <div class="table-title">Players ({{players.length}})</div>
      <md-table md-card v-model="searchResult.beneficiaries" md-sort="lastName" md-sort-order="asc" class="custom-table">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="lastName" class="col-with-img col-10">
            <md-icon class="md-size-2">account_circle</md-icon>
            <!-- <md-avatar class="md-small" v-if="item.id ===2">
              <img src="@/assets/avatar.jpg" alt="img">
            </md-avatar> -->
            <div>
              {{ item.firstName }} {{ item.lastName }}
            </div>
          </md-table-cell>
          <md-table-cell md-label="Organization" class="col-25" md-sort-by="item.organizationName">{{ item.organizationName }}</md-table-cell>
          <!-- <md-table-cell md-label="Email Parents" class="col-25">{{ item.assigneesEmail.join(', ') }}</md-table-cell> -->
        </md-table-row>
      </md-table>

      <div class="table-title">Parents ({{users.length}})</div>
      <md-table md-card v-model="searchResult.users" md-sort="name" md-sort-order="asc" class="custom-table">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="name" class="col-25 col-with-img">
            <md-icon class="md-size-2">account_circle</md-icon>
            <!-- md-avatar class="md-small">
              <img src="@/assets/avatar.jpg" alt="img">
            </md-avatar -->
            {{ item.firstName }} {{ item.lastName }}
          </md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="name" class="col-25">{{ item.email }}</md-table-cell>
          <md-table-cell md-label="Phone" md-sort-by="name" class="col-10">{{ item.phone }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import { mapState } from 'vuex'
  export default {
    components: { VPayAnimation },
    mounted () {
    },
    watch: {
    },
    data: function () {
      return {
        criteria: this.$route.query.criteria,
        loading: true,
        searchResult: {
          users: [],
          beneficiaries: [],
          invoices: []
        }
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      }),
      users () {
        return this.searchResult.users
      },
      players () {
        return this.searchResult.beneficiaries
      },
      invoices () {
        return this.searchResult.invoices
      },
      noResults () {
        return this.searchResult.users.length + this.searchResult.beneficiaries.length + this.searchResult.invoices.length
      }
    },
    methods: {
      actionInvoice (invoice) {
        console.log(invoice)
        this.$router.push({
          name: 'clubprograms',
          params: {id: invoice.organizationId, seasonId: invoice.season, program: invoice.productId, player: invoice.beneficiaryId}
        })
      }
    },
    apollo: {
      // Query with parameters
      searchResult: {
    // gql query
        query: gql`query ASearch($criteria: String!) {
      search(criteria: $criteria) {
        users {
          _id
          firstName
          lastName
          email
          phone
        }
        beneficiaries {
          _id
          firstName
          lastName
          organizationId
          organizationName
          assigneesEmail
        }
        invoices {
          _id
          invoiceId
          beneficiaryId
          beneficiaryFirstName
          beneficiaryLastName
          organizationId
          organizationName
          productId
          productName
          season
          user {
            userFirstName
            userLastName
            userEmail
          }
        }
      }
    }`,
    // Static parameters
        variables () {
          return {
            criteria: this.criteria
          }
        },
        skip () {
          return !this.criteria || this.criteria.length < 4
        },
        update: result => {
          return result.search
        }  // ,
        // pollInterval: 1000
      }
    }
  }
</script>
