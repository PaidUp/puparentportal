<template>
  <div class="programs-page">
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
    <div class="programs">
      <div class="pre-cards-title">Programs</div>
      <div class="cards-layout">

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
        </md-card>

        <md-card md-with-hover>
          <div>
            <div class="title">12U Red</div>
            <div class="caption">9 players</div>
          </div>
          <div class="main-box">
            <div class="eligibility-box">
              <div>
                <div class="concept">
                  Eligible
                </div>
                <div class="number">7</div>
              </div>
              <div>
                <div class="concept">
                  Ineligible
                </div>
                <div class="number cred bolder">9</div>
              </div>
            </div>
            <div class="total">
              <div class="tot-title">Total</div>
              <div class="tot-number">$38,000</div>
            </div>
            <div class="bars">
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
          </div>
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
