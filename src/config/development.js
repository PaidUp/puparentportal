const config = {
  api: {
    user: 'https://devapi.getpaidup.com/api/v1/user',
    payment: 'https://devapi.getpaidup.com/api/v1/payment',
    organization: 'https://devapi.getpaidup.com/api/v1/organization',
    commerce: 'https://devapi.getpaidup.com/api/v1/commerce',
    broker: 'https://devapi.getpaidup.com'
  },
  stripe: {
    publicKey: 'pk_test_9WTTkvwiNjZ9IMJVls1iF0fv'
  },
  fbId: '521919851516443',
  plaid: {
    env: 'sandbox',
    publicKey: '5a537132a52c4ead4feab6358c62eb',
    clientName: 'Paidup dev.',
    product: 'auth',
    selectAccount: 'true',
    apiVersion: 'v2'
  },
  media: {
    beneficiary: {
      url: 'https://s3.amazonaws.com/pu-media-dev/beneficiary/'
    },
    organization: {
      url: 'https://s3.amazonaws.com/pu-media-dev/organization/'
    },
    user: {
      url: 'https://s3.amazonaws.com/pu-media-dev/user/'
    }
  }
}

export default config
