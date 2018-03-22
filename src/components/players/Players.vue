<template>
  <div class="players-view">
    <div class="player">
      <md-avatar>
        <img src="@/assets/avatar.jpg" />
      </md-avatar>
      <div class="name md-title md-primary">Enzo Fernandez</div>
      <div class="team">Isotopes Baseball Club</div>
      <div class="location">Austin, TX</div>
    </div>
    <div class="details">
      <div class="md-subheading">Details</div>
      <md-content class="md-elevation-4 md-layout md-alignment-center-space-between">
        <div class="md-layout-item md-size-33">
          <div class="md-layout md-alignment-center-space-between md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="season">Season</label>
                <md-select v-model="season" name="season" id="season">
                  <md-option value="2017/2018">2017/2018</md-option>
                  <md-option value="2016/2017">2016/2017</md-option>
                  <md-option value="2015/2016">2015/2016</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field class="md-layout-item">
                <label for="program">Program</label>
                <md-select v-model="program" name="program" id="program">
                  <md-option value="12U Red">12U Red Premier</md-option>
                  <md-option value="12U Red2">12U Red2 Premier</md-option>
                  <md-option value="12U Red3">12U Red3 Premier</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </div>
        <div class="md-layout-item md-size-40 md-layout md-alignment-center-space-between md-gutter">
          <div class="md-layout-item">
            <div class="md-caption">Total</div>
            <div>$3042</div>
          </div>
          <div class="md-layout-item">
            <div class="md-caption">Paid</div>
            <div>$3042</div>
          </div>
          <div class="md-layout-item">
            <div class="md-caption">Unpaid</div>
            <div>$3042</div>
          </div>
          <div class="md-layout-item">
            <div class="md-caption">Overdue</div>
            <div>$3042</div>
          </div>
          <div class="md-layout-item">
            <div class="md-caption">Credited</div>
            <div>$3042</div>
          </div>
        </div>
      </md-content>
    </div>
    <div class="invoices">
      <div class="md-subheading">Invoices</div>
      <div class="md-layout md-alignment-top-space-between">
        <md-card md-with-hover class="md-layout-item">
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee</div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="md-layout md-gutter md-alignment-top-space-between">
              <div class="md-layout-item">
                Paid
              </div>
              <div class="md-layout-item">
                $350
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button>Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
        <md-card md-with-hover class="md-layout-item">
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee</div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="md-layout md-gutter md-alignment-top-space-between">
              <div class="md-layout-item">
                Paid
              </div>
              <div class="md-layout-item">
                $350
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button>Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
        <md-card md-with-hover class="md-layout-item">
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee</div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="md-layout md-gutter md-alignment-top-space-between">
              <div class="md-layout-item">
                Paid
              </div>
              <div class="md-layout-item">
                $350
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button>Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
        <md-card md-with-hover class="md-layout-item">
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee</div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="md-layout md-gutter md-alignment-top-space-between">
              <div class="md-layout-item">
                Paid
              </div>
              <div class="md-layout-item">
                $350
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button>Fix</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
        <md-card md-with-hover class="md-layout-item">
          <md-ripple>
            <md-card-header>
              <div class="md-subheading">Dues - Commitment Fee</div>
              <div class="md-subhead">Paid to club</div>
            </md-card-header>
            <md-card-content class="md-layout md-gutter md-alignment-top-space-between">
              <div class="md-layout-item">
                Paid
              </div>
              <div class="md-layout-item">
                $350
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button>Fix</md-button>
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

  export default {
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
