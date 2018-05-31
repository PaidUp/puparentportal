<template>
  <div class="print-page">
    <div>
      <div class="header">
        <div class="logo-box">
          <img src="@/assets/shuttle.svg" alt="icon">
          <div>STATEMENT</div>
        </div>
        <div class="header-data">
          <div>
            <div class="club">
              Isotopes Baseball Club
            </div>
            <div class="columns">
              <div class="first">
                <div>Player/Guradian:</div>
                <div>Player:</div>
              </div>
              <div>
                <div>Felipe Fernandes</div>
                <div>Enzo Fernandes</div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="first">
              <div>Statement Date:</div>
              <div>Player Status:</div>
            </div>
            <div>
              <div>13 Sept 2018</div>
              <div class="cred">INELIGIBLE</div>
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="table-header">
          <div class="first-col">DESCRIPTION</div>
          <div class="sec-col">STATUS</div>
          <div class="third-col">DATE</div>
          <div class="fourth-col">SUBTOTAL</div>
        </div>
        <div class="table-row">
          <div class="first-col">Dues - Payment 1 of 4</div>
          <div class="sec-col">PAIDUP</div>
          <div class="third-col">01 Oct 2018</div>
          <div class="fourth-col">$550.00</div>
        </div>
        <div class="table-row cred">
          <div class="first-col">Dues - Payment 2 of 4</div>
          <div class="sec-col">FAILED</div>
          <div class="third-col">01 Nov 2018</div>
          <div class="fourth-col">$550.00</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="table-right-header">
        <div class="first-col">OVERDUE</div>
        <div class="sec-col">TOTAL</div>
      </div>
      <div class="table-right-row">
        <div class="first-col cred">$500.00</div>
        <div class="sec-col">$2,000.00</div>
      </div>
      <div class="message cred">
        Ezno is currently INELIGIBLE to Play. Please make a payment of $500.00 via PaidUp ASAP
      </div>
      <div class="thanks-box">
        <md-icon>favorite</md-icon>
        <span>Thank You from</span>
        <img src="@/assets/app-logo.svg" alt="logo" class="logo">
        <span>down in Austin</span>
        <img src="@/assets/texas.svg" alt="texas" class="texas">
      </div>
      <div class="foot-info">
        support@getpaidup.com &nbsp; | &nbsp; (855) 764-3232 &nbsp; | &nbsp; app.getpaidup.com
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
