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
      <div v-if="invoices.length">
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
      </div>
      
      <div v-if="credits.length">
        <div class="table-title">Credits ({{credits.length}})</div>
        <md-table md-card v-model="searchResult.credits" md-sort="invoiceId" md-sort-order="asc" class="custom-table">
          <md-table-row class="pointer" slot="md-table-row" slot-scope="{ item }" @click="actionInvoice(item)">
            <md-table-cell md-label="Credit ID" class="col-10">{{ item.memoId }}</md-table-cell>
            <md-table-cell md-label="Parent Email" md-sort-by="name" class="col-15">{{ item.assigneeEmail }}</md-table-cell>
            <md-table-cell md-label="Description" md-sort-by="name" class="col-15">{{ item.label }}</md-table-cell>
            <md-table-cell md-label="Product" md-sort-by="name" class="col-15">{{ item.productName }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <div v-if="preorders.length">
        <div class="table-title">Preorders ({{preorders.length}})</div>
        <md-table md-card v-model="searchResult.preorders" md-sort="invoiceId" md-sort-order="asc" class="custom-table">
          <md-table-row class="pointer" slot="md-table-row" slot-scope="{ item }" @click="actionInvoice(item)">
            <md-table-cell md-label="Product Name" class="col-10">{{ item.productName }}</md-table-cell>
            <md-table-cell md-label="Parent Email" md-sort-by="name" class="col-15">{{ item.assigneeEmail }}</md-table-cell>
            <md-table-cell md-label="Status" md-sort-by="name" class="col-15">{{ item.status }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      
      <div v-if="players.length">
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
            <md-table-cell md-label="Email Parents" class="col-25">
              <span v-for="email in item.assigneesEmail" :key="email">
                <a href="#" @click="search(email)">{{ email }}</a>
              </span>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <div v-if="users.length">
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
            <md-table-cell md-label="Email" md-sort-by="name" class="col-25"><a href="#" @click="search(item.email)">{{ item.email }}</a></md-table-cell>
            <md-table-cell md-label="Phone" md-sort-by="name" class="col-10">{{ item.phone }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>

    </div>
    
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import { mapState, mapMutations } from 'vuex'
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
          invoices: [],
          credits: [],
          preorders: []
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
      credits () {
        return this.searchResult.credits
      },
      preorders () {
        return this.searchResult.preorders
      },
      noResults () {
        return this.searchResult.users.length +
        this.searchResult.beneficiaries.length +
        this.searchResult.invoices.length +
        this.searchResult.credits.length +
        this.searchResult.preorders.length
      }
    },
    methods: {
      ...mapMutations('uiModule', {
        setCriteria: 'setCriteria'
      }),
      actionInvoice (invoice) {
        this.$router.push({
          name: 'clubprograms',
          params: {id: invoice.organizationId, seasonId: invoice.season, program: invoice.productId, player: invoice.beneficiaryId}
        })
      },
      search (email) {
        this.setCriteria(email)
        this.$router.push(`/search?criteria=${encodeURI(email)}`)
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
        },
        credits {
          _id
          memoId,
          label,
          assigneeEmail
          organizationId
          productId
          productName
          season
          beneficiaryId
        },
        preorders {
          _id
          productName
          assigneeEmail
          organizationId
          productId
          season
          beneficiaryId,
          status
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
