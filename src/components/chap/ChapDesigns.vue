<template>
  <div style="padding: 16px;">
    <div style="margin: 40px;">
      Cards should be placed inside cards-layout DIV wrapper in any page and they should work fine
    </div>
    <div class="cards-layout">
      <!-- NORMAL INVOICE -->
      <md-card md-with-hover class="card-invoice2">
        <md-card-header>
          <div class="title cgray">Normal Invoice 1</div>
          <div class="caption">Visa****1321</div>
        </md-card-header>
        <md-card-content>
          <div class="status">
            <md-icon class="md-size-c">check_circle</md-icon>
            <div class="md-caption">PAID</div>
          </div>
          <div class="amount-details">
            <div class="details">
              <span class="md-caption">INV12344123</span>
              <br/>
              <span class="md-caption">11-01-2018</span>
            </div>
            <v-currency :amount="230" clazz="total md-title"></v-currency>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>replay</md-icon>
          </md-button>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>file_copy</md-icon>
          </md-button>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>

      <!-- INVOICE REQUIRES APPROVAL -->
      <md-card md-with-hover class="card-invoice2">
        <md-card-header>
          <div class="title cgray">Invoice Requires Approval</div>
          <div class="caption">Visa****1321</div>
        </md-card-header>
        <md-card-content>
          <div class="status">
            <md-icon class="md-size-c">check_circle</md-icon>
            <div class="md-caption">PAID</div>
          </div>
          <div class="amount-details">
            <div class="details">
              <span class="md-caption">INV12344123</span>
              <br/>
              <span class="md-caption">11-01-2018</span>
            </div>
            <v-currency :amount="230" clazz="total md-title"></v-currency>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-avatar class="md-small">
            <img src="@/assets/avatar.jpg" alt="img">
          </md-avatar>
          <div class="cblue bold">Felipe Fernandez</div>
        </md-card-actions>
      </md-card>

      <!-- UNPAID PARENT -->
      <md-card class="card-person2">
        <div class="top">
          <md-avatar>
            <img src="@/assets/avatar.jpg" alt="avatar">
          </md-avatar>
          <div class="name">Felipe Fernandez</div>
          <div class="title-info">Isotopes Club</div>
          <div class="title-info">(512) 234-1233</div>
        </div>
        <div class="bottom">
          <md-avatar class="md-small">
            <img src="@/assets/avatar.jpg" alt="img">
          </md-avatar>
          <div class="cblue bold">Felipe Fernandez</div>
        </div>
      </md-card>

      <!-- SEARCH RESULT -->
      <md-card class="card-person">
        <md-avatar class="md-large">
          <img src="@/assets/avatar.jpg" alt="avatar">
        </md-avatar>
        <div class="name">Felipe Fernandez</div>
        <div class="title-info">Isotopes Club</div>
        <div class="title-info">(512) 234-1233</div>
      </md-card>

      <!-- 1711. AP - Parent View > Assigned Payment Plan -->
      <md-card md-with-hover class="card-invoice2">
        <md-card-header>
          <div class="title cgray">JVA World Championship</div>
        </md-card-header>
        <md-card-content>
          <div class="status">
            <md-icon class="md-size-c cred">note_add</md-icon>
            <div class="md-caption">OVERDUE
              <br> NEW INVOICE</div>
          </div>
          <div class="amount-details">
            <div class="details">
              <span class="md-caption">11-01-2018</span>
            </div>
            <v-currency :amount="595.50" clazz="total md-title cred"></v-currency>
          </div>
        </md-card-content>
        <md-card-actions>
          <!-- Important do not delete this tag -->
          &nbsp;
        </md-card-actions>
      </md-card>

      <!-- 1713. AP - Parent View > Accounts -->
      <md-card md-with-hover class="card-account">
        <div class="card-account-body">
          <img class="card-img" src="@/assets/icons/mastercard.svg" alt="card">
          <div class="name">Felipe Fernandez</div>
          <div class="title-info">Visa****1234</div>
          <div class="title-info">Exp. 11/23</div>
        </div>
        <md-card-actions>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
      <!-- 1713. AP - Parent View > Accounts -->
      <md-card md-with-hover class="card-account">
        <div class="card-account-body">
          <md-icon class="md-size-2x">account_balance</md-icon>
          <div class="name">Felipe Fernandez</div>
          <div class="title-info">Wells Fargo Bank</div>
          <div class="title-info">Acc. NA*****9234</div>
        </div>
        <md-card-actions>
          <md-button class="md-icon-button md-dense md-accent lblue">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>

      <!-- ADD CIRCLE CARD -->
      <div class="md-card-add-circle">
        <md-button class="md-fab lblue">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
  import VCurrency from '@/components/shared/VCurrency.vue'
  export default {
    components: {
      VCurrency
    },
    data: function () {
      return {}
    },
    methods: {}
  }
</script>
