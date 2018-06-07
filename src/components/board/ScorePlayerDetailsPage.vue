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
      <md-tabs>
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
          Invoices approval
        </md-tab>
        <md-tab id="tab-parents" md-label="Parents">
          Parents
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
        movie: 'godfather'
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
