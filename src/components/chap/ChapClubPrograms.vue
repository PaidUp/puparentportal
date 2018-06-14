<template>
  <div class="club-programs-page">

    <!-- BREADCRUMBS -->
    <div class="breadcrums-box">
      <md-icon>arrow_back</md-icon>
      <div>2017/2018</div>
      <md-icon>keyboard_arrow_right</md-icon>
      <div>12U Red</div>
      <md-icon>keyboard_arrow_right</md-icon>
      <div>Mylo Fernandez</div>
    </div>

    <div class="common-player-info">
      VPlayerInfo Component goes here
    </div>

    <!-- DETAILS -->
    <div class="details">
      <div class="pre-cards-title">Details</div>
      <div class="details-box">
        <div class="details-selects">
          <md-field>
            <label>Season</label>
            <md-select v-model="movie">
              <md-option value="godfather">Example Sel</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Program</label>
            <md-select v-model="movie">
              <md-option value="godfather">Example Sel</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Parent</label>
            <md-select v-model="movie">
              <md-option value="godfather">Example Sel</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="details-numbers">
          <div>
            <div class="concept">Total</div>
            <div class="title-big">$1233</div>
          </div>
          <div>
            <div class="concept">Paid</div>
            <div class="title-big green">$1233</div>
          </div>
          <div>
            <div class="concept">Unpaid</div>
            <div class="title-big gray">$1233</div>
          </div>
          <div>
            <div class="concept">Overdue</div>
            <div class="title-big red">$1233</div>
          </div>
          <div>
            <div class="concept">Credited</div>
            <div class="title-big blue">$1233</div>
          </div>
        </div>
      </div>
    </div>

    <!-- TABS -->
    <div class="tabs-section">
      <md-tabs class="tabs-lblue">

        <!-- TAB INVOICES -->
        <md-tab id="tab-invoices" md-label="Invoices">
          <div class="table-actions-box">
            <md-button class="lblue md-accent md-raised md-dense">Add row</md-button>
            <md-button class="lblue md-accent md-raised md-dense" @click="showRefundDialog = true">REFUND DIALOG</md-button>
          </div>
          <md-table md-card v-model="tableData" md-sort="name" md-sort-order="asc" class="custom-table">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Description">
                <div class="col-with-input">
                  <input type="text" class="custom-input" v-model="inputModel">
                </div>
              </md-table-cell>
              <md-table-cell md-label="Amount" md-numeric>
                $300
              </md-table-cell>
              <md-table-cell md-label="Charge Date" class="centered">
                05-01-2018
              </md-table-cell>
              <md-table-cell md-label="Max Charge Date" class="centered">
                -
              </md-table-cell>
              <md-table-cell md-label="Payment Account" class="centered">
                <div class="">
                  Visa ****1234
                </div>
              </md-table-cell>
              <md-table-cell md-label="Parent" class="centered">
                <div class="col-with-input">
                  <select name="parent-s" id="parent-s" class="custom-select">
                    <option value="volvo">Felipe Fernandex</option>
                    <option value="saab">Savier Commns</option>
                    <option value="mercedes">Lucas Felix</option>
                    <option value="audi">Samuel Jaxson Super long input name</option>
                  </select>
                </div>
              </md-table-cell>
              <md-table-cell md-label="Status">
                PAID
              </md-table-cell>
              <md-table-cell md-label="Invoice Number">
                INV12345
              </md-table-cell>
              <md-table-cell md-label="Tags">
                <div class="col-chips">
                  <md-chip class="lblue" md-deletable>Dues</md-chip>
                  <!-- <md-chip class="lblue add">Add</md-chip> -->
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>add_circle_outline</md-icon>
                  </md-button>
                </div>
              </md-table-cell>
              <md-table-cell md-label="Actions">
                <div class="col-actions">
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>refresh</md-icon>
                  </md-button>
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>file_copy</md-icon>
                  </md-button>
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>delete</md-icon>
                  </md-button>
                </div>
              </md-table-cell>
            </md-table-row>
          </md-table>

          <div class="table-actions-box">
            <md-button class="lblue md-accent">Cancel</md-button>
            <md-button class="lblue md-accent md-raised">Save</md-button>
          </div>


        </md-tab>


        <!-- TAB PARENTS -->
        <md-tab id="tab-assigned-parents" md-label="PAID/UNPAID PARENTS">
          <div class="table-actions-box">
            <md-button class="lblue md-accent md-raised md-dense">Add row</md-button>
            <md-button class="lblue md-accent md-raised md-dense" to="/chapassignplanparent">GO TO PARENTS STEPPERS</md-button>
          </div>
          <md-table v-model="tableData" md-sort="name" md-sort-order="asc" class="custom-table">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Player Name" md-sort-by="playerName" class="col-with-img">
                <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
                <md-avatar class="md-small" v-if="item.id !==1">
                  <img src="@/assets/avatar.jpg" alt="img">
                </md-avatar>
                <div>
                  {{ item.playerName }}
                </div>
              </md-table-cell>
              <md-table-cell md-label="Parent Name" md-sort-by="parentName" class="col-with-img">
                <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
                <md-avatar class="md-small" v-if="item.id !==1">
                  <img src="@/assets/avatar.jpg" alt="img">
                </md-avatar>
                <div>
                  {{ item.parentName }}
                </div>
              </md-table-cell>
              <md-table-cell md-label="Parent Email" md-sort-by="email">{{ item.email }}</md-table-cell>
              <md-table-cell md-label="Parent Phone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
              <md-table-cell md-label="Actions">
                <div class="">
                  <md-button class="md-icon-button md-dense md-accent lblue">
                    <md-icon>delete</md-icon>
                  </md-button>
                </div>
              </md-table-cell>
            </md-table-row>
          </md-table>

          <div class="table-actions-box">
            <md-button class="lblue md-accent">Cancel</md-button>
            <md-button class="lblue md-accent md-raised">Save</md-button>
          </div>

        </md-tab>


      </md-tabs>

    </div>
    <refund-invoice-dialog :showDialog="showRefundDialog" :closeDialog="closeDialog"></refund-invoice-dialog>
  </div>

</template>

<script>
  import RefundInvoiceDialog from '@/components/shared/RefundInvoiceDialog.vue'
  export default {
    components: {
      RefundInvoiceDialog
    },
    data: function () {
      return {
        showRefundDialog: false,
        movie: 'godfather',
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
        ],
        inputModel: 'Dues Payments'

      }
    },
    methods: {}
  }
</script>
