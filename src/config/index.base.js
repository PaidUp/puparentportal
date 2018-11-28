const config = {
  api: {
    user: 'http://localhost:9001/api/v1/user',
    payment: 'http://localhost:9004/api/v1/payment',
    organization: 'http://localhost:9002/api/v1/organization',
    commerce: 'http://localhost:9003/api/v1/commerce',
    broker: 'http://localhost:9005'
  },
  stripe: {
    publicKey: 'pk_test_9WTTkvwiNjZ9IMJVls1iF0fv'
  },
  fbId: '2313938718834150',
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
