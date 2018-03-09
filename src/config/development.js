const config = {
  api: {
    user: 'https://devapi.getpaidup.com/api/v1/user',
    payment: 'https://devapi.getpaidup.com/api/v1/payment',
    organization: 'https://devapi.getpaidup.com/api/v1/organization',
    commerce: 'https://devapi.getpaidup.com/api/v1/commerce'
  },
  stripe: {
    publicKey: 'pk_test_9WTTkvwiNjZ9IMJVls1iF0fv'
  },
  plaid: {
    env: 'sandbox',
    publicKey: '5a537132a52c4ead4feab6358c62eb',
    clientName: 'Paidup dev.',
    product: 'auth',
    selectAccount: 'true',
    apiVersion: 'v2'
  }
}

export default config
