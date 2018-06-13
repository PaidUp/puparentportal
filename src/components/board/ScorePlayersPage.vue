<template>
  <div class="programs-page">
    <div class="breadcrums-box">
      <md-icon>arrow_back</md-icon>
      <div>2017/2018</div>
      <md-icon>keyboard_arrow_right</md-icon>
      <div>12U Red</div>
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
    <div class="program-players">
      <md-tabs class="tabs-lblue">
        <md-tab id="tab-player" md-label="Players">
          <div class="cards-layout">
            <md-card md-with-hover class="card-player-eligibility">
              <div class="top-box">
                <md-avatar class="md-size-c">
                  <img src="@/assets/avatar.jpg" alt="avatar">
                </md-avatar>
                <div class="name">Mylo Fernandez</div>
                <div class="eligibility cred">Inelegible</div>
                <div class="total-label">Total</div>
                <div class="total-amount">$3,500</div>
              </div>
              <div class="bars-with-hover">
                <div class="green">
                  <div class="hover">
                    <div class="hover-title">Paid</div>
                    <div class="hover-number">$38,000</div>
                  </div>
                </div>
                <div class="gray">
                  <div class="hover">
                    <div class="hover-title">Lack</div>
                    <div class="hover-number">$38,000</div>
                  </div>
                </div>
                <div class="red">
                  <div class="hover">
                    <div class="hover-title">Overdue</div>
                    <div class="hover-number">$38,000</div>
                  </div>
                </div>
                <div class="blue">
                  <div class="hover">
                    <div class="hover-title">Some</div>
                    <div class="hover-number">$38,000</div>
                  </div>
                </div>
              </div>
            </md-card>

            <md-card md-with-hover class="card-player-eligibility">
              <div class="top-box">
                <md-icon class="md-size-2x">
                  account_circle
                </md-icon>
                <div class="name">Lolo Fernandez</div>
                <div class="eligibility">&nbsp;</div>
                <div class="total-label">Total</div>
                <div class="total-amount">$2,500</div>
              </div>
              <div class="bars-with-hover">
                <div class="green">
                  <div class="hover">
                    <div class="hover-title">Paid</div>
                    <div class="hover-number">$38,000</div>
                  </div>
                </div>
                <div class="gray">
                  <div class="hover">
                    <div class="hover-title">Lack</div>
                    <div class="hover-number">$38,000</div>
                  </div>
                </div>
                <div class="red">
                  <div class="hover">
                    <div class="hover-title">Overdue</div>
                    <div class="hover-number">$38,000</div>
                  </div>
                </div>
                <div class="blue">
                  <div class="hover">
                    <div class="hover-title">Some</div>
                    <div class="hover-number">$38,000</div>
                  </div>
                </div>
              </div>
            </md-card>

          </div>
        </md-tab>
        <md-tab id="tab-plans" md-label="Program Payment Plans">
          <div class="cards-layout">
            <md-card md-with-hover class="card-payment-plan">
              <div class="title">
                Dues - Installments
              </div>
              <div class="body">
                <div class="number-big cgreen">$3.250.00</div>
                <div class="title-info">2 Installments</div>
                <div class="title-info">Nov 15, 2018 - Mar 1, 2019</div>
              </div>
              <div class="actions">
                <md-button class="md-icon-button">
                  <md-icon>visibility</md-icon>
                </md-button>
                <md-menu md-size="small" md-direction="top-start">
                  <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
                    <md-icon>more_vert</md-icon>
                  </md-button>
                  <md-menu-content>
                    <md-menu-item @click="cannotDeleteAlert = true">
                      DELETE
                    </md-menu-item>
                    <md-menu-item @click="confirmDeleteAlert = true">
                      DUPLICATE
                    </md-menu-item>
                    <md-menu-item @click="btnData = 'click 1'">
                      EDIT
                    </md-menu-item>
                  </md-menu-content>
                </md-menu>
              </div>
            </md-card>
            <md-card md-with-hover class="card-payment-plan">
              <div class="title">
                Dues - Installments (Salt Lake travel)
              </div>
              <div class="body">
                <div class="number-big cgreen">$3.250.00</div>
                <div class="title-info">2 Installments</div>
                <div class="title-info">Nov 15, 2018 - Mar 1, 2019</div>
              </div>
              <div class="actions">
                <md-button class="md-icon-button">
                  <md-icon>visibility_off</md-icon>
                </md-button>
                <md-menu md-size="small" md-direction="top-start">
                  <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
                    <md-icon>more_vert</md-icon>
                  </md-button>
                  <md-menu-content>
                    <md-menu-item @click="cannotDeleteAlert = true">
                      DELETE
                    </md-menu-item>
                    <md-menu-item @click="confirmDeleteAlert = true">
                      DUPLICATE
                    </md-menu-item>
                    <md-menu-item @click="btnData = 'click 1'">
                      EDIT
                    </md-menu-item>
                  </md-menu-content>
                </md-menu>

              </div>
            </md-card>
          </div>
        </md-tab>
      </md-tabs>

    </div>
    <md-dialog-alert class="alert-dialog" :md-active.sync="cannotDeleteAlert" md-content="This payment plan cannot be deleted because it has paid and/or unpaid parents assigned to it"
      md-confirm-text="Dismiss" />
    <md-dialog-confirm class="alert-dialog confirm" :md-active.sync="confirmDeleteAlert" md-title="Are you sure you want to delete this payment plan?" md-content="" md-confirm-text="DELETE"
      md-cancel-text="Cancel" @md-cancel="onCancel" @md-confirm="onConfirm" />
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
        btnData: 'example',
        cannotDeleteAlert: false,
        confirmDeleteAlert: false,
        value: ''
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      })
    },
    methods: {
      onConfirm () {
        this.value = 'Agreed'
      },
      onCancel () {
        this.value = 'Disagreed'
      }
    }
  }
</script>
