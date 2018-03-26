<template>
  <div class="players-view">
    <div class="player">
      <VPlayerInfo :user="userP"/>
    </div>
    <div class="details">
      <div class="md-subheading title">Details</div>
      <md-content class="md-elevation-4 details-box">
        <div class="details-selects">
          <md-field class="season-select">
            <label for="season">Season</label>
            <md-select name="season" id="season">
              <md-option value="2017/2018">2017/2018</md-option>
              <md-option value="2016/2017">2016/2017</md-option>
              <md-option value="2015/2016">2015/2016</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label for="program">Program</label>
            <md-select name="program" id="program">
              <md-option value="12U Red">12U Red Premier</md-option>
              <md-option value="12U Red2">12U Red2 Premier</md-option>
              <md-option value="12U Red3">12U Red3 Premier</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="details-numbers">
          <div>
            <div class="md-body-2 concept">Total</div>
            <div class="md-title">$3,250.<sup>00</sup></div>
          </div>
          <div>
            <div class="md-body-2 concept">Paid</div>
            <div class="md-title green">$1,250.<sup>00</sup></div>
          </div>
          <div>
            <div class="md-body-2 concept">Unpaid</div>
            <div class="md-title gray">$1,400.<sup>00</sup></div>
          </div>
          <div>
            <div class="md-body-2 concept">Overdue</div>
            <div class="md-title red">$350.<sup>00</sup></div>
          </div>
          <div>
            <div class="md-body-2 concept">Credited</div>
            <div class="md-title blue">$250.<sup>00</sup></div>
          </div>
        </div>
      </md-content>
    </div>
    <div class="invoices">
      <div class="md-subheading title">Invoices</div>
      <div class="inv-cards">
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee paid to coach </div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="card-content">
              <div class="status">
                <md-icon class="md-size-2x">check_circle</md-icon>
                <div class="md-caption">
                  PAID
                </div>
              </div>
              <div class="amount-details">
                <div class="details">
                  <span class="md-caption">INV9203848848</span><br>
                  <span class="md-caption">09/15/2017</span>
                </div>
                <div class="total md-title">
                  $350.<sup>00</sup>
                </div>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-accent">Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee paid to coach </div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="card-content">
              <div class="status">
                <md-icon class="md-size-2x" style="color: #e35565">error</md-icon>
                <div class="md-caption">
                  FAILED
                </div>
              </div>
              <div class="amount-details">
                <div class="details">
                  <span class="md-caption">INV9203848848</span><br>
                  <span class="md-caption">09/15/2017</span>
                </div>
                <div class="total md-title">
                  $350.<sup>00</sup>
                </div>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-accent">Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee paid to coach </div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="card-content">
              <div class="status">
                <md-icon class="md-size-1x" style="color: #006E82">today</md-icon>
                <div class="md-caption">
                  AUTOPAID
                </div>
              </div>
              <div class="amount-details">
                <div class="details">
                  <span class="md-caption">INV9203848848</span><br>
                  <span class="md-caption">09/15/2017</span>
                </div>
                <div class="total md-title">
                  $350.<sup>00</sup>
                </div>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-accent">Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee paid to coach </div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="card-content">
              <div class="status">
                <md-icon class="md-size-2x">check_circle</md-icon>
                <div class="md-caption">
                  PAID
                </div>
              </div>
              <div class="amount-details">
                <div class="details">
                  <span class="md-caption">INV9203848848</span><br>
                  <span class="md-caption">09/15/2017</span>
                </div>
                <div class="total md-title">
                  $350.<sup>00</sup>
                </div>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-accent">Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee paid to coach </div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="card-content">
              <div class="status">
                <md-icon class="md-size-2x">check_circle</md-icon>
                <div class="md-caption">
                  PAID
                </div>
              </div>
              <div class="amount-details">
                <div class="details">
                  <span class="md-caption">INV9203848848</span><br>
                  <span class="md-caption">09/15/2017</span>
                </div>
                <div class="total md-title">
                  $350.<sup>00</sup>
                </div>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button class="md-accent">Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import VPlayerInfo from '@/components/shared/VPlayerInfo.vue'
  export default {
    components: {
      VPlayerInfo
    },
    data: function () {
      return {
        userP: {
          name: 'Enzo Perez',
          avatar: 'avatar.jpg',
          team: 'Isotopes of Springfield'
        }
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
