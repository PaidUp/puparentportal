<template>
  <div class="print-page">
    <div class="header">
      <div class="logo-box">
        <img src="@/assets/shuttle.svg" alt="icon">
        <div>INVOICE</div>
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
            <div>Date Invoiced:</div>
            <div>Inovice No:</div>
            <div>Status:</div>
          </div>
          <div>
            <div>13 Sept 2018</div>
            <div>INV123444</div>
            <div>PAID</div>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="table-header">
        <div class="first-col">DESCRIPTION</div>
        <div class="sec-col">UNITS</div>
        <div class="third-col">UNIT COST</div>
        <div class="fourth-col">SUBTOTAL</div>
      </div>
      <div class="table-row">
        <div class="first-col">Dues - Payment 1 of 4</div>
        <div class="sec-col">1</div>
        <div class="third-col">$550.00</div>
        <div class="fourth-col">$550.00</div>
      </div>
      <div class="table-row">
        <div class="first-col">Dues - Payment 2 of 4</div>
        <div class="sec-col">2</div>
        <div class="third-col">$500.00</div>
        <div class="fourth-col">$1000.00</div>
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
