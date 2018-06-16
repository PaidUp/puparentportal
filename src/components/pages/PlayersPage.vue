<template lang="pug">
  .players-page
    .player
      v-player-info(v-if="beneficiary" :player="beneficiary", :numInvoices="allInvoices.length" @avatarChanged="reloadBeneficiaries")
    .player-empty(v-if="!allInvoices.length")
      div(class="title bold cgray") {{ beneficiary ? beneficiary.firstName : '' }} does not have any payment history yet.
      div(class="cgray") Start by making a payment to {{ beneficiary ? beneficiary.organizationName : '' }}.
      md-button(v-if="beneficiary" class="md-raised md-accent lblue" :to="'/payments/'+beneficiary._id") MAKE A NEW PAYMENT
      div
        img(src="@/assets/shield.svg" alt="pay")
    .player-with-payments(v-show="allInvoices.length")
      .details
        .pre-cards-title Details
        .details-box
          v-player-details-selection(:invoices="allInvoices" @selectSeason="setSeason" @selectProgram="setProgram")
          v-player-details-totals(:invoices="invoices")
      button(v-if="false" class="md-button md-raised" @click="showDuplicateDialog = true") Duplicate Payment Dialog
      .invoices(v-if="invoices")
        .pre-cards-title
          div Invoices
          div.sort-filter-box(v-if="false")
            md-menu(md-direction="bottom-start")
                md-button(md-menu-trigger class="md-button md-accent lblue")
                  md-icon sort
                  | Sort
                md-menu-content.sort-box
                  .title Sort
                  .caption Date:
                  div
                    md-radio(class="lblue" v-model="sortRadio" value="asc") Ascending
                  div 
                    md-radio(class="lblue" v-model="sortRadio" value="desc") Descending
                  div.actions
                    md-button(class="md-button md-accent lblue") Cancel
                    md-button(class="md-button md-accent md-raised lblue") OK
            md-menu(md-direction="bottom-start")
                md-button(md-menu-trigger class="md-button md-accent lblue")
                  md-icon filter_list
                  | Filter
                md-menu-content.filter-box
                    .title Filter
                    .caption Invoice Status:
                    div
                      md-checkbox(indeterminate v-model="filterChecks" class="lblue" value="1") All
                      md-checkbox(v-model="filterChecks" class="lblue" value="2") Credited
                      md-checkbox(v-model="filterChecks" class="lblue" value="3") Disabled
                      md-checkbox(v-model="filterChecks" class="lblue" value="4") Due
                      md-checkbox(v-model="filterChecks" class="lblue" value="5") Failed
                    div.actions
                      md-button(class="md-button md-accent lblue") Cancel
                      md-button(class="md-button md-accent md-raised lblue") OK

        .cards-layout
          v-player-invoices(:invoice="invoice" v-for="invoice in invoices" :key="invoice._id" @select="selectInvoice")
    view-invoice-dialog(:invoice="viewInvoice" :closeDialog="closeDialog" @updated="reloadBeneficiaries")
    duplicate-payment-dialog(:showDialog="showDuplicateDialog" :closeDialog="closeDialog")
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VPlayerInfo from '@/components/shared/VPlayerInfo.vue'
  import VPlayerDetailsTotals from '@/components/shared/VPlayerDetailsTotals.vue'
  import VPlayerDetailsSelection from '@/components/shared/VPlayerDetailsSelection.vue'
  import VPlayerInvoices from '@/components/shared/VPlayerInvoices.vue'
  import ViewInvoiceDialog from '@/components/shared/ViewInvoiceDialog.vue'
  import DuplicatePaymentDialog from '@/components/shared/DuplicatePaymentDialog.vue'
  
  function sort (a, b) {
    let dataA = a.dateCharge || a.createOn
    let dataB = b.dateCharge || b.createOn
    return new Date(dataA).getTime() - new Date(dataB).getTime()
  }
  
  export default {
    components: {
      VPlayerInfo,
      VPlayerInvoices,
      VPlayerDetailsTotals,
      VPlayerDetailsSelection,
      ViewInvoiceDialog,
      DuplicatePaymentDialog
    },
    data: function () {
      return {
        season: null,
        program: null,
        viewInvoice: {},
        showDuplicateDialog: false,
        sortRadio: 'asc',
        filterChecks: []
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('playerModule', {
        beneficiaries: 'beneficiaries',
        allInvoices: 'allInvoices',
        allCredits: 'allCredits',
        organization: 'organization'
      }),
      invoices () {
        if (this.beneficiary && this.season && this.program) {
          let invs = this.allInvoices.filter(inv => {
            return this.season === inv.season && this.program.split('|')[0] === inv.productId
          })
          let creds = this.allCredits.filter(cred => {
            return this.season === cred.season && this.program.split('|')[0] === cred.productId
          })
          return invs.concat(creds).sort(sort)
        }
        return []
      },
      id () {
        return this.$route.params.id
      },
      beneficiary () {
        if (this.beneficiaries) {
          let id = this.$route.params.id
          return this.beneficiaries.find(function (element) {
            return element._id === id
          })
        }
        return null
      },
      loaded () {
        return (this.user && this.beneficiary)
      }
    },
    mounted () {
      if (this.loaded) {
        this.getOrganization({ id: this.beneficiary.organizationId }).then(org => {
          this.loadInvoices()
          this.getCredits(this.beneficiary)
        })
      }
    },
    watch: {
      loaded () {
        this.getOrganization({ id: this.beneficiary.organizationId }).then(org => {
          this.loadInvoices()
          this.getCredits(this.beneficiary)
        })
      },
      beneficiary () {
        this.getOrganization({ id: this.beneficiary.organizationId })
      }
    },
    methods: {
      ...mapActions('playerModule', {
        getInvoices: 'getInvoices',
        getCredits: 'getCredits',
        getBeneficiaries: 'getBeneficiaries',
        getOrganization: 'getOrganization'
      }),
      loadInvoices () {
        this.getInvoices({ beneficiary: this.beneficiary })
      },
      reloadBeneficiaries () {
        this.getBeneficiaries(this.user.email)
      },
      closeDialog: function () {
        this.viewInvoice = {}
        this.getInvoices({ beneficiary: this.beneficiary })
      },
      selectInvoice (invoice) {
        this.viewInvoice = invoice
      },
      setSeason (season) {
        this.season = season
      },
      setProgram (program) {
        this.program = program
      }
    }
  }
</script>
