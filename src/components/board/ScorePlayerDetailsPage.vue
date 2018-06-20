<template>
  <div class="programs-page">
    <div class="breadcrums-box">
      <md-icon>arrow_back</md-icon>
      <div>2017/2018</div>
      <md-icon>keyboard_arrow_right</md-icon>
      <div>12U Red</div>
      <md-icon>keyboard_arrow_right</md-icon>
      <div>Mylo Fernandez</div>
    </div>
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
    <div class="program-player-invoices">
      <md-tabs class="tabs-lblue">
        <md-tab id="tab-invoices" md-label="Invoices">
          <div class="cards-layout">
            <md-card>
              <div class="title">Dues - Payment 2 resiz title long</div>
              <div class="caption">Paid to club</div>
              <div class="card-content">
                <div class="status">
                  <md-icon class="md-size-c cgreen">check_circle</md-icon>
                  <div class="md-caption">PAID</div>
                </div>
                <div class="amount-details">
                  <div class="detail">
                    <span class="md-caption">
                      INV1001X3
                    </span>
                    <br>
                    <span class="md-caption">
                      4/1/2018
                    </span>
                  </div>
                  <div class="total md-title">$500.
                    <sup>00</sup>
                  </div>
                </div>
              </div>
            </md-card>
            <md-card>
              <div class="title">Dues - Payment 1</div>
              <div class="caption">Paid to club</div>
              <div class="card-content">
                <div class="status">
                  <md-icon class="md-size-c cblue">check_circle</md-icon>
                  <div class="md-caption">APPLIED CREDIT</div>
                </div>
                <div class="amount-details">
                  <div class="detail">
                    <span class="md-caption">
                      INV1001X3
                    </span>
                    <br>
                    <span class="md-caption">
                      4/1/2018
                    </span>
                  </div>
                  <div class="total md-title">$500.
                    <sup>00</sup>
                  </div>
                </div>
              </div>
            </md-card>
            <md-card>
              <div class="title">Dues - Payment 1</div>
              <div class="caption">Paid to club</div>
              <div class="card-content">
                <div class="status">
                  <md-icon class="md-size-c cred">cancel</md-icon>
                  <div class="md-caption">FAILED</div>
                </div>
                <div class="amount-details">
                  <div class="detail">
                    <span class="md-caption">
                      INV1001X3
                    </span>
                    <br>
                    <span class="md-caption">
                      4/1/2018
                    </span>
                  </div>
                  <div class="total md-title">$500.
                    <sup>00</sup>
                  </div>
                </div>
              </div>
            </md-card>
            <md-card>
              <div class="title">Dues - Payment 1</div>
              <div class="caption">Paid to club</div>
              <div class="card-content">
                <div class="status">
                  <md-icon class="md-size-c cred">note_add</md-icon>
                  <div class="md-caption">OVERDUE NEW INVOICE</div>
                </div>
                <div class="amount-details">
                  <div class="detail">
                    <span class="md-caption">
                      INV1001X3
                    </span>
                    <br>
                    <span class="md-caption">
                      4/1/2018
                    </span>
                  </div>
                  <div class="total md-title">$500.
                    <sup>00</sup>
                  </div>
                </div>
              </div>
            </md-card>
            <md-card>
              <div class="title">Dues - Payment 1</div>
              <div class="caption">Paid to club</div>
              <div class="card-content">
                <div class="status">
                  <md-icon class="md-size-c cyellow">today</md-icon>
                  <div class="md-caption">OVERDUE NEW INVOICE</div>
                </div>
                <div class="amount-details">
                  <div class="detail">
                    <span class="md-caption">
                      INV1001X3
                    </span>
                    <br>
                    <span class="md-caption">
                      4/1/2018
                    </span>
                  </div>
                  <div class="total md-title">$500.
                    <sup>00</sup>
                  </div>
                </div>
              </div>
            </md-card>
          </div>
        </md-tab>
        <md-tab id="tab-invoices-approval" md-label="Invoices requiring approval">
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
        </md-tab>
        <md-tab id="tab-parents" md-label="Parents">
          <div class="cards-layout">
            <md-card class="card-person">
              <md-avatar class="md-large">
                <img src="@/assets/avatar.jpg" alt="avatar">
              </md-avatar>
              <div class="name">Felipe Fernandez</div>
              <div class="title-info">Isotopes Club</div>
              <div class="title-info">(512) 234-1233</div>
            </md-card>
            <md-card class="card-person">
              <md-icon class="md-size-3x">account_circle</md-icon>
              <div class="name">Felipe Fernandez</div>
              <div class="title-info">Red Bull Team</div>
              <div class="title-info">(512) 234-1233</div>
            </md-card>
          </div>
        </md-tab>
      </md-tabs>

    </div>
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
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      })
    },
    methods: {}
  }
</script>
