import config from '@/config'
window.fbAsyncInit = function () {
  // eslint-disable-next-line
  FB.init({
    appId: config.fbId,
    cookie: true,  // enable cookies to allow the server to access the session
    xfbml: true,  // parse social plugins on this page
    version: 'v2.8' // use graph api version 2.8
  })
};
(function (d, s, id) {
  // eslint-disable-next-line
  var js, fjs = d.getElementsByTagName(s)[ 0 ]
  if (d.getElementById(id)) return
  js = d.createElement(s); js.id = id
  js.src = '//connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))
