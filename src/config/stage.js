const config = {
  api: {
    user: 'https://stgapi.getpaidup.com/api/v1/user',
    payment: 'https://stgapi.getpaidup.com/api/v1/payment',
    organization: 'https://stgapi.getpaidup.com/api/v1/organization',
    commerce: 'https://stgapi.getpaidup.com/api/v1/commerce',
    broker: 'https://stgapi.getpaidup.com'
  },
  stripe: {
    publicKey: 'pk_test_jQmpXGw5GUbXSyDi0TN5gx9R'
  },
  fbId: '2313938718834150',
  plaid: {
    env: 'sandbox',
    publicKey: 'c104e73c056e34530e2c5774e6fc5f',
    clientName: 'Paidup',
    product: 'auth',
    selectAccount: 'true',
    apiVersion: 'v2'
  },
  media: {
    beneficiary: {
      url: 'https://s3.amazonaws.com/pu-media-stg/beneficiary/'
    },
    organization: {
      url: 'https://s3.amazonaws.com/pu-media-stg/organization/'
    },
    user: {
      url: 'https://s3.amazonaws.com/pu-media-stg/user/'
    }
  }
}

export default config
