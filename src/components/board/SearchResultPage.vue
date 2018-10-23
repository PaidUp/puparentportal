<template>
  <div class="search-page">
    <!-- <v-pay-animation :animate="this.$apollo.queries.searchResult.loading" :result="searchResult"/> -->
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
            <md-table-cell md-label="Parent Email" class="col-15">{{ item.user.userEmail }}</md-table-cell>
            <md-table-cell md-label="Parent" class="col-20 col-with-img">
              <md-icon class="md-size-2">account_circle</md-icon>
              <!-- md-avatar class="md-small">
                <img src="@/assets/avatar.jpg" alt="img">
              </md-avatar -->
              {{ item.user.userFirstName }} {{ item.user.userLastName }}
            </md-table-cell>
            <md-table-cell md-label="Product" class="col-15">{{ item.productName }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      
      <div v-if="credits.length">
        <div class="table-title">Credits ({{credits.length}})</div>
        <md-table md-card v-model="searchResult.credits" md-sort="invoiceId" md-sort-order="asc" class="custom-table">
          <md-table-row class="pointer" slot="md-table-row" slot-scope="{ item }" @click="actionInvoice(item)">
            <md-table-cell md-label="Credit ID" class="col-10">{{ item.memoId }}</md-table-cell>
            <md-table-cell md-label="Parent Email" class="col-15">{{ item.assigneeEmail }}</md-table-cell>
            <md-table-cell md-label="Description" class="col-15">{{ item.label }}</md-table-cell>
            <md-table-cell md-label="Product" class="col-15">{{ item.productName }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <div v-if="preorders.length">
        <div class="table-title">Preorders ({{preorders.length}})</div>
        <md-table md-card v-model="searchResult.preorders" md-sort="invoiceId" md-sort-order="asc" class="custom-table">
          <md-table-row class="pointer" slot="md-table-row" slot-scope="{ item }" @click="actionInvoice(item)">
            <md-table-cell md-label="Product" class="col-10">{{ item.productName }}</md-table-cell>
            <md-table-cell md-label="Parent Email" class="col-15">{{ item.assigneeEmail }}</md-table-cell>
            <md-table-cell md-label="Status" class="col-15">{{ item.status }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      
      <div v-if="players.length">
        <div class="table-title">Players ({{players.length}})</div>
        <md-table md-card v-model="searchResult.beneficiaries" md-sort="lastName" md-sort-order="asc" class="custom-table">
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name" class="col-with-img col-10">
              <md-icon class="md-size-2">account_circle</md-icon>
              <!-- <md-avatar class="md-small" v-if="item.id ===2">
                <img src="@/assets/avatar.jpg" alt="img">
              </md-avatar> -->
              <div>
                {{ item.firstName }} {{ item.lastName }}
              </div>
            </md-table-cell>
            <md-table-cell md-label="Organization" class="col-25">{{ item.organizationName }}</md-table-cell>
            <md-table-cell md-label="Parent Email" class="col-25">
              <span v-for="email in item.assigneesEmail" :key="email">
                <a href="#" @click="searchEmail(email)">{{ email }}</a>&nbsp;
              </span>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <div v-if="users.length">
        <div class="table-title">Parents ({{users.length}})</div>
        <md-table md-card v-model="searchResult.users" md-sort="name" md-sort-order="asc" class="custom-table">
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name" class="col-25 col-with-img">
              <md-icon class="md-size-2">account_circle</md-icon>
              <!-- md-avatar class="md-small">
                <img src="@/assets/avatar.jpg" alt="img">
              </md-avatar -->
              {{ item.firstName }} {{ item.lastName }}
            </md-table-cell>
            <md-table-cell md-label="Email" class="col-25"><a href="#" @click="search(item.email)">{{ item.email }}</a></md-table-cell>
            <md-table-cell md-label="Phone" class="col-10">{{ item.phone }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>

    </div>
    
  </div>
</template>

<script>
  import VPayAnimation from '@/components/shared/VPayAnimation.vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    components: { VPayAnimation },
    mounted () {
      this.search(this.criteria)
    },
    watch: {
    },
    data: function () {
      return {
        criteria: this.$route.query.criteria,
        loading: true
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      }),
      ...mapState('searchModule', {
        'searchResult': 'searchResult'
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
        return this.searchResult && this.searchResult.users.length +
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
      ...mapActions('searchModule', {
        'search': 'search'
      }),
      actionInvoice (invoice) {
        this.$router.push({
          name: 'clubprograms',
          params: {id: invoice.organizationId, seasonId: invoice.season, program: invoice.productId, player: invoice.beneficiaryId}
        })
      },
      searchEmail (email) {
        this.setCriteria(email)
        this.$router.push(`/search?criteria=${encodeURI(email)}`)
      }
    }
  }
</script>
