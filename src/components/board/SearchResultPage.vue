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
      <div class="table-title">Players ({{players.length}})</div>
      <md-table md-card v-model="searchResult.beneficiaries" md-sort="lastName" md-sort-order="asc" class="custom-table">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="">
            <md-icon class="md-size-2">account_circle</md-icon>
            <!-- md-avatar class="md-small">
              <img src="@/assets/avatar.jpg" alt="img">
            </md-avatar -->
          </md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="lastName" class="col-with-img">
            <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
            <md-avatar class="md-small" v-if="item.id ===2">
              <img src="@/assets/avatar.jpg" alt="img">
            </md-avatar>
            <div>
              {{ item.firstName }} {{ item.lastName }}
            </div>
          </md-table-cell>
          <md-table-cell md-label="Organization" md-sort-by="item.organizationName">{{ item.organizationName }}</md-table-cell>
          <md-table-cell md-label="Email Parents">{{ item.assigneesEmail.join(', ') }}</md-table-cell>
        </md-table-row>
      </md-table>

      <div class="table-title">Parents ({{users.length}})</div>
      <md-table md-card v-model="searchResult.users" md-sort="name" md-sort-order="asc" class="custom-table">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="name" class="col-25">{{ item.firstName }} {{ item.lastName }}</md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="name" class="col-25">{{ item.email }}</md-table-cell>
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
      console.log('$apollo: ', this.$apollo.queries.searchResult.loading)
    },
    watch: {
      $apollo () {
        console.log('aaaa')
      }
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
    methods: {},
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
