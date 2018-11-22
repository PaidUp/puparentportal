<template>
  <div style="padding: 16px;">
    <div style="margin: 0 30px 30px 30px;">
      <h5>CHAP/SCOREBOARD new designs and instructions</h5>
      Cards should be placed inside cards-layout DIV wrapper in any page and they should work fine. 
      <br>Read the Code Comments before each card to identify.
      <br>After the plus icon are the COACH cards
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

      <!-- SCOREBOARD: 2040A EXAMPLE 1 RED -->
      <md-card md-with-hover class="card-invoice2">
        <md-card-header>
          <div class="title cgray">JVA World Championship - Gro</div>
          <div class="caption clblue">Felipe Fernandez</div>
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
      <!-- SCOREBOARD: 2040A EXAMPLE 2 YELLOW -->
      <md-card md-with-hover class="card-invoice2">
        <md-card-header>
          <div class="title cgray">JVA World - Airfare</div>
          <div class="caption clblue">Felipe Fernandez</div>
        </md-card-header>
        <md-card-content>
          <div class="status">
            <md-icon class="md-size-c cyellow">note_add</md-icon>
            <div class="md-caption">DUE
              <br> NEW INVOICE</div>
          </div>
          <div class="amount-details">
            <div class="details">
              <span class="md-caption">11-01-2018</span>
            </div>
            <v-currency :amount="433.00" clazz="total md-title"></v-currency>
          </div>
        </md-card-content>
        <md-card-actions>
          <!-- Important do not delete this tag -->
          &nbsp;
        </md-card-actions>
      </md-card>
    
      <!-- SCOREBOARD: 2022A EXAMPLE 1-->
      <md-card md-with-hover class="card-invoice2">
        <md-card-header>
          <div class="title cgray">Dues Payment 2 May Funds</div>
        </md-card-header>
        <md-card-content>
          <div class="status">
            <md-icon class="md-size-c">check_circle</md-icon>
            <div class="md-caption">PAID</div>
          </div>
          <div class="amount-details">
            <div class="details">
              <span class="md-caption">11-01-2018</span>
            </div>
            <v-currency :amount="433.00" clazz="total md-title"></v-currency>
          </div>
        </md-card-content>
        <md-card-actions>
          <!-- Important do not delete this tag -->
          &nbsp;
        </md-card-actions>
      </md-card>
      <!-- SCOREBOARD: 2022A EXAMPLE2 YELLOW -->
      <md-card md-with-hover class="card-invoice2">
        <md-card-header>
          <div class="title cgray">Dues Payment 2 May Funds</div>
        </md-card-header>
        <md-card-content>
          <div class="status">
            <md-icon class="md-size-c cyellow">note_add</md-icon>
            <div class="md-caption">DUE</div>
          </div>
          <div class="amount-details">
            <div class="details">
              <span class="md-caption">11-01-2018</span>
            </div>
            <v-currency :amount="433.00" clazz="total md-title"></v-currency>
          </div>
        </md-card-content>
        <md-card-actions>
          <!-- Important do not delete this tag -->
          &nbsp;
        </md-card-actions>
      </md-card>

      <!-- 2023A SB - Program View > Program Payment Plans > Unpaid Parents -->
      <md-card class="card-person2">
        <div class="top">
          <md-avatar>
            <img src="@/assets/avatar.jpg" alt="avatar">
          </md-avatar>
          <div class="name">Monica Fernandez</div>
          <div class="title-info">monica@monigmal.com</div>
          <div class="title-info">(512) 234-1233</div>
        </div>
        <div class="bottom">
          <md-avatar class="md-small">
            <img src="@/assets/avatar.jpg" alt="img">
          </md-avatar>
          <div class="cblue bold">Robert Nestla Marley</div>
        </div>
      </md-card>

      <!-- 2111A. SB - Search (Invoice) -->
      <md-card md-with-hover class="card-invoice2">
        <md-card-header>
          <div class="title cgray">Dues Payment 5</div>
          <div class="caption">Visa****1321</div>
        </md-card-header>
        <md-card-content>
          <div class="status">
            <md-icon class="md-size-c cblue">event</md-icon>
            <div class="md-caption">AUTOPAY</div>
          </div>
          <div class="amount-details">
            <div class="details">
              <span class="md-caption">INV1234567</span> 
              <br>
              <span class="md-caption">11-01-2018</span>
            </div>
            <v-currency :amount="595.50" clazz="total md-title"></v-currency>
          </div>
        </md-card-content>
        <md-card-actions>
          <!-- Important do not delete this tag -->
          &nbsp;
        </md-card-actions>
      </md-card>

      <md-table md-card v-model="tableData" md-sort="name" md-sort-order="asc" class="custom-table">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Description">
            Dues Installment {{item.id}}
          </md-table-cell>
          <md-table-cell md-label="Amount" md-numeric>
            $300
          </md-table-cell>
          <md-table-cell md-label="Charge Date">
            05-01-2018
          </md-table-cell>
          <md-table-cell md-label="Max Charge Date">
            -
          </md-table-cell>
          <md-table-cell md-label="Status">
            PAID
          </md-table-cell>
          <md-table-cell md-label="Parent" md-sort-by="parentName" class="col-with-img">
            <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
            <md-avatar class="md-small" v-if="item.id !==1">
              <img src="@/assets/avatar.jpg" alt="img">
            </md-avatar>
            <div>
              {{ item.parentName }}
            </div>
          </md-table-cell>
          <md-table-cell md-label="Tags">
            <div class="col-chips">
              <md-chip class="lblue">Travel</md-chip>
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>

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
      return {
        tableData: [ {
          id: 1,
          name: 'Shawna Dubbin',
          email: 'sdubbin0@geocities.com',
          phone: '888-999-8888',
          playerName: 'Eliana Fernandez',
          parentName: 'Fernando Lopex'
        },
        {
          id: 2,
          name: 'Odette Demageard',
          email: 'odemageard1@spotify.com',
          phone: '888-999-1111',
          playerName: 'Rockefel Eslo',
          parentName: 'Simano Cigar'
        }
        ]
      }
    },
    methods: {}
  }
</script>
