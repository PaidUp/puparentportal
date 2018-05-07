<template>
  <div class="pay-animation">
    <div :class="{container: true, animate: startTrigger}">
      <svg class="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle class="circle circle-base"></circle>
        <circle class="circle circle-bar"></circle>
      </svg>
      <div class="content">
        <img src="@/assets/app-logo-white.svg" class="logo-img" alt="logo">
        <!-- <md-icon class="material-icons place">place</md-icon> -->
        <md-icon class="material-icons check">check</md-icon>
      </div>
      <svg class="mask-shadow" viewBox="0 0 115 115" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <circle id="path-1" cx="50" cy="50" r="50"></circle>
          <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-3">
            <feOffset dx="0" dy="6" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.12 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
          </filter>
        </defs>
        <g id="Páginas-|-Padrinhos" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Padrinhos-(08-A)---Desktop" transform="translate(-584.000000, -473.000000)">
            <g id="Dialog">
              <g id="Dialog-Hotel-01" transform="translate(304.000000, 262.000000)">
                <g id="Icon" transform="translate(286.000000, 211.000000)">
                  <g id="Mask">
                    <mask id="mask-2" fill="white">
                      <use xlink:href="#path-1"></use>
                    </mask>
                    <g fill-opacity="1" fill="black">
                      <use filter="url(#filter-3)" xlink:href="#path-1"></use>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      callback: Function,
      startTrigger: Boolean
    },
    watch: {
      startTrigger: function () {
        const vueInstance = this
        setTimeout(function () {
          vueInstance.callback()
        }, 2500)
      }
    }
  }
</script>
