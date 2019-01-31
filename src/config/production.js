const config = {
  api: {
    user: 'https://api.getpaidup.com/api/v1/user',
    payment: 'https://api.getpaidup.com/api/v1/payment',
    organization: 'https://api.getpaidup.com/api/v1/organization',
    commerce: 'https://api.getpaidup.com/api/v1/commerce',
    broker: 'https://api.getpaidup.com'
  },
  stripe: {
    publicKey: 'pk_live_DSQ3sB20S4wFlOST7eexy8F1'
  },
  fbId: '499580560213861',
  plaid: {
    env: 'production',
    publicKey: 'c104e73c056e34530e2c5774e6fc5f',
    clientName: 'Paidup',
    product: 'auth',
    selectAccount: 'true',
    apiVersion: 'v2'
  },
  media: {
    beneficiary: {
      url: 'https://s3.amazonaws.com/pu-media-prd/beneficiary/'
    },
    organization: {
      url: 'https://s3.amazonaws.com/pu-media-prd/organization/'
    },
    user: {
      url: 'https://s3.amazonaws.com/pu-media-prd/user/'
    }
  },
  bugsnag: {
    apiKey: 'bdba250d6f17ab6a90cc462b79b36d6f',
    releaseStage: 'production'
  }
}

export default config
