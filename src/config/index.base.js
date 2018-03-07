const config = {
  api: {
    user: 'http://localhost:9001',
    payment: 'http://localhost:9004'
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
